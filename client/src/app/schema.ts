import { schema } from 'normalizr'

const lock = new schema.Entity('locks')
const house = new schema.Entity('house')
export const houseSchema = {
  houses: [house],
}

export const lockSchema = {
  locks: [lock],
}
