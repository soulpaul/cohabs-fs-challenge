import { BadRequestError } from 'restify-errors'
import { getHouseLock, getHouseLocks, setLockStatus } from './locks'

describe('Lock getters', () => {
  test('Lock list getter should always return an array', () => {
    expect(Array.isArray(getHouseLocks(1))).toBe(true)
  })
  test('Lock list getter should return an empty object when a house has no locks', () => {
    const locks = getHouseLocks(3)
    if (!(locks instanceof BadRequestError)) {
      expect(locks.length).toBe(0)
    } else {
      fail('Element "locks" should not be an instance of a BadRequestError')
    }
  })
  test('Lock list getter should return a Bad Request Error when house does not exist', () => {
    expect(getHouseLock(11, 1)).toBeInstanceOf(BadRequestError)
  })
})

describe('Lock setters', () => {
  test('Lock status gets updated', async () => {
    // checking a lock status of locked
    expect.assertions(2)
    await expect(setLockStatus(1, 1)).resolves.toEqual({
      id: 1,
      category: 'house',
      name: 'Front door',
      status: 'unlocked',
    })
    // checking a lock status of unlocked
    await expect(setLockStatus(1, 3)).resolves.toEqual({
      id: 3,
      category: 'room',
      name: 'Room #1',
      status: 'locked',
    })
  })
  test('Offline lock should not be called. Throws error', async () => {
    // client should get the lock offline status so no request should be ever made
    await setLockStatus(1, 2).catch((error) => {
      expect.assertions(1)
      expect(error).toBeInstanceOf(BadRequestError)
    })
  })
})
