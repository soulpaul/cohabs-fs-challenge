import { BadRequestError } from 'restify-errors'
import { getHouse, getHouses } from './houses'

describe('House getters', () => {
  test('House list should always return an array', () => {
    expect(Array.isArray(getHouses())).toBe(true)
  })
  test('House getter should return a house with the same id as the one requested', () => {
    expect(getHouse(1).id).toBe(1)
    expect(getHouse(2).id).toBe(2)
    expect(getHouse(3).id).toBe(3)
  })
  test('House getter should return a Bad Request Error when house does not exist', () => {
    expect(getHouse(11)).toBeInstanceOf(BadRequestError)
  })
})
