import lockReducer, { dismissError } from './lockSlice'

describe('locks reducer', () => {
  const initialState = {
    entities: {
      locks: {},
    },
    result: {},
    loading: 'idle',
    error: undefined,
    lockError: undefined,
  }

  const errorState = {
    entities: {
      locks: {},
    },
    result: {},
    loading: 'idle',
    error: 'Some error thrown',
    lockError: undefined,
  }

  it('should handle initial state', () => {
    expect(lockReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should clear error state', () => {
    const updatedState = lockReducer(errorState, dismissError())
    expect(updatedState).toEqual(initialState)
  })
})
