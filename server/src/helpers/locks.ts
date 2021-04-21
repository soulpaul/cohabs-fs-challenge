import { BadRequestError, ServiceUnavailableError } from 'restify-errors'
import { houses, ILock } from '../models/houses'

/**
 * A function returning a Promise mocking an api call
 * Getting house id and lock id it can then fetch local database to gather info and, supposing
 * to have multiple lock providers, call the right API.
 */

// setting the waiting time for the Timeout function to be less when in test environment
const waitingTime = process.env.NODE_ENV === 'test' ? 200 : 2000

export const locking = (houseId: number, lockId: number) => {
  return new Promise<ILock>((resolve, reject) =>
    // mocking response time, 2 seconds
    setTimeout(() => {
      // getting house info by finding its index in the array
      const houseIndex = houses.map((house) => house.id).indexOf(houseId)
      const house = houses[houseIndex]
      // checking if a lock list exists for the house
      if (house.locks && house.locks.length > 0) {
        // getting lock info by finding the index of the given lock in the locks array
        const lockIndex = house.locks?.map((lock) => lock.id).indexOf(lockId)
        const lock = house.locks[lockIndex]
        // updating lock status for the new lock object. Changes are not yet reflected in the application state
        if (lock.status == 'locked') {
          lock.status = 'unlocked'
        } else if (lock.status == 'unlocked') {
          lock.status = 'locked'
        } else {
          // lock is offline so return bad request. An offline lock should not be called by the front end
          reject(new BadRequestError('000h1: We are unable to process your request at this time'))
        }
        /**
         * Randomizing return errors
         * We don't want to return too many errors so we set a error return rate
         * of 15%. If we are in a testing environment we don't want to reject the Promise
         * we need consistence.
         */
        const randomInteger = Math.floor(Math.random() * 100) // gets a random value from 0 to 99
        if (process.env.NODE_ENV === 'test' || randomInteger < 85) {
          // commit lock status in the application state and resolve Promise
          houses[houseIndex].locks![lockIndex] = lock
          resolve(lock)
        } else {
          // mocking a server error and Reject Promise
          reject(new ServiceUnavailableError('Service unavailable'))
        }
      } else {
        // should not happen, if it does it's an error made on the client side or it's a forged wrong request
        reject(new BadRequestError('000h2: We are unable to process your request at this time'))
      }
    }, waitingTime)
  )
}
