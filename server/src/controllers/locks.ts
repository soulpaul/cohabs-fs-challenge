import { BadRequestError } from 'restify-errors'

import { houses } from '../models/houses'
import { recordAccess } from '../helpers/audit'
import { locking } from '../helpers/locks'

/**
 * Returns the list of the locks of a given house
 */
export const getHouseLocks = (id: number) => {
  const house = houses.filter((house) => house.id === id)[0]
  if (house && house.locks && house.locks.length > 0) {
    return house.locks
  } else if (house) {
    return []
  } else {
    return new BadRequestError('000cghl: We are unable to process your request at this time')
  }
}

/**
 * Returns info about a given lock of a given house
 */
export const getHouseLock = (houseId: number, lockId: number) => {
  const lockList = getHouseLocks(houseId)
  if (lockList && !(lockList instanceof BadRequestError) && lockList.length > 0) {
    return lockList.filter((lock) => lock.id === lockId)[0]
  } else if (lockList instanceof BadRequestError) {
    return lockList
  } else {
    return {}
  }
}

/**
 * Tries to lock/unlock a lock given its id and the id of its house
 * Checks the existence of the lock and handles restify errors if a lock is not found
 * Relies on a function calling a Promise mocking an api call
 * Returns updated lock info or given error
 */
export const setLockStatus = async (houseId: number, lockId: number) => {
  // check that lock exists
  const lockList = getHouseLocks(houseId)
  // getting index of lock with id as lockId in array
  if (!(lockList instanceof BadRequestError)) {
    const lockIndex = lockList.map((lock) => lock.id).indexOf(lockId)
    // if lockIndex < 0 there is no lock with given id in given house
    if (lockIndex >= 0) {
      // deep copying the lock object to preserve its original status
      const lockBeforeStatusUpdate = { ...lockList[lockIndex] }
      try {
        const lockAfterStatusUpdate = await locking(houseId, lockId)
        // checking that lock status is changed
        if (lockBeforeStatusUpdate.status !== lockAfterStatusUpdate.status) {
          // let's log the access to the room
          recordAccess(1, lockAfterStatusUpdate.status, lockId, houseId)
        }
        return lockAfterStatusUpdate
      } catch (error) {
        // server error
        return error
      }
    } else {
      // lock does not exist sending an error code to be able to check where the error comes from
      return new BadRequestError('000csls: We are unable to process your request at this time')
    }
  } else {
    // returning the error got from the getHouseLocks function
    return lockList
  }
}
