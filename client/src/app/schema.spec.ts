import { normalize } from 'normalizr'
import { houseSchema, lockSchema } from './schema'

const mockHouseList = {
  houses: [
    {
      id: 1,
      name: 'Jourdan',
    },
    {
      id: 2,
      name: 'Flagey',
    },
  ],
}

const mockLockList = {
  locks: [
    { id: 1, category: 'house', name: 'Front door', status: 'locked' },
    {
      id: 2,
      category: 'house',
      name: 'Bicycle door',
      status: 'offline',
    },
    {
      id: 3,
      category: 'room',
      name: 'Room #1',
      status: 'unlocked',
    },
  ],
}

describe('serializers', () => {
  it('should serialize house list', () => {
    const serialized = normalize(mockHouseList, houseSchema)
    expect(serialized).toEqual({
      entities: {
        house: {
          1: { id: 1, name: 'Jourdan' },
          2: { id: 2, name: 'Flagey' },
        },
      },
      result: {
        houses: [1, 2],
      },
    })
  })
  it('should serialize lock list', () => {
    const serialized = normalize(mockLockList, lockSchema)
    expect(serialized).toEqual({
      entities: {
        locks: {
          1: { id: 1, category: 'house', name: 'Front door', status: 'locked' },
          2: { id: 2, category: 'house', name: 'Bicycle door', status: 'offline' },
          3: { id: 3, category: 'room', name: 'Room #1', status: 'unlocked' },
        },
      },
      result: {
        locks: [1, 2, 3],
      },
    })
  })
})
