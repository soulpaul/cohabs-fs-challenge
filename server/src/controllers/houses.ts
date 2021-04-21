import { BadRequestError } from 'restify-errors'
import { houses } from '../models/houses'

/**
 * Returns the list of the houses in the json object mocking the database or an empty
 * array if no house are found in the json object
 */
export const getHouses = () => {
  const houseList = houses.map((house) => ({
    id: house.id,
    name: house.name,
  }))
  if (houseList && houseList.length > 0) {
    return houseList
  } else {
    return []
  }
}

/**
 * Returns a selected house info given its id or an empty object if house does not exist
 */
export const getHouse = (id: number) => {
  return (
    getHouses().filter((house) => house.id === id)[0] ||
    new BadRequestError('000cgh: We are unable to process your request at this time')
  )
}
