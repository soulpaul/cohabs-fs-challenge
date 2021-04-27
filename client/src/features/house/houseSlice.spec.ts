import houseReducer, { selectHouse, deselectHouse, dismissError } from './houseSlice'

describe('houses reducer', () => {
  const initialState = {
    entities: {
      house: {},
    },
    result: {},
    loading: 'idle',
    error: undefined,
    selected: 0,
  }

  const errorState = {
    entities: {
      house: {},
    },
    result: {},
    loading: 'idle',
    error: 'Some error thrown',
    selected: 0,
  }

  const selectedHouseState = {
    entities: {
      house: {},
    },
    result: {},
    loading: 'idle',
    error: undefined,
    selected: 1,
  }

  it('should handle initial state', () => {
    expect(houseReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should set a selected house', () => {
    const updatedState = houseReducer(initialState, selectHouse(1))
    expect(updatedState.selected).toBe(1)
  })

  it('should deselect house', () => {
    const updatedState = houseReducer(selectedHouseState, deselectHouse())
    expect(updatedState).toEqual(initialState)
  })

  it('should clear error state', () => {
    const updatedState = houseReducer(errorState, dismissError())
    expect(updatedState).toEqual(initialState)
  })
})
