import lockReducer, { selectLock, deselectLock, dismissError } from './lockSlice'

describe('locks reducer', () => {
  const initialState = {
    entities: {},
    result: {},
    loading: 'idle',
    error: false,
    selected: 0,
  }

  const errorState = {
    entities: {},
    result: {},
    loading: 'idle',
    error: true,
    selected: 0,
  }

  const selectedLockState = {
    entities: {},
    result: {},
    loading: 'idle',
    error: false,
    selected: 1,
  }

  it('should handle initial state', () => {
    expect(lockReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should set a selected house', () => {
    const updatedState = lockReducer(initialState, selectLock(1))
    expect(updatedState.selected).toBe(1)
  })

  it('should deselect house', () => {
    const updatedState = lockReducer(selectedLockState, deselectLock())
    expect(updatedState).toEqual(initialState)
  })

  it('should clear error state', () => {
    const updatedState = lockReducer(errorState, dismissError())
    expect(updatedState).toEqual(initialState)
  })
})
