/**
 * having no database I'm using a JSON object to store data. Data are stored
 * in application memory so that changes during an execution of the application
 * are stored but not persisted when the application stops.
 * To persist data I could have used a JSON file to read/update/write the JSON object
 */

export type LockState = 'locked' | 'unlocked' | 'offline'

export type LockCategory = 'house' | 'room'

export interface ILock {
  id: number
  category: LockCategory
  name: string
  status: LockState
}

export interface IHouse {
  id: number
  name: string
  locks: Array<ILock> // chosen for more clarity instead of ILock[] syntax
}

export let houses: Array<IHouse> = [
  {
    id: 1,
    name: 'Jourdan',
    locks: [
      {
        id: 1,
        category: 'house',
        name: 'Front door',
        status: 'locked',
      },
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
      {
        id: 4,
        category: 'room',
        name: 'Room #2',
        status: 'unlocked',
      },
      {
        id: 5,
        category: 'room',
        name: 'Locker room #2',
        status: 'locked',
      },
    ],
  },
  {
    id: 2,
    name: 'Flagey',
    locks: [
      {
        id: 6,
        category: 'house',
        name: 'Front door',
        status: 'locked',
      },
      {
        id: 7,
        category: 'house',
        name: 'Bicycle door',
        status: 'offline',
      },
      {
        id: 8,
        category: 'room',
        name: 'Room #1',
        status: 'unlocked',
      },
      {
        id: 9,
        category: 'room',
        name: 'Room #2',
        status: 'unlocked',
      },
      {
        id: 10,
        category: 'room',
        name: 'Locker room #2',
        status: 'locked',
      },
    ],
  },
  {
    id: 3,
    name: 'Ma Campagne',
    locks: [],
  },
]
