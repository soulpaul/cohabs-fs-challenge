import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { denormalize, normalize } from 'normalizr'

import { getLocks, toggleLock } from '../../app/api'
import { lockSchema } from '../../app/schema'
import { RootState } from '../../app/store'

export const fetchLocks = createAsyncThunk('locks/fetchAll', async (houseId: number) => {
  const response = await getLocks(houseId)
  const normalized = normalize({ locks: response }, lockSchema)
  return normalized
})

export const toggleLockState = createAsyncThunk(
  'lock/toggleLockState',
  async ({ houseId, lockId }: { houseId: number; lockId: number }) => {
    const response = await toggleLock(houseId, lockId)
    return response
  }
)

export interface ILock {
  id: number
  name: string
  category: string
  status: string
}

interface ISliceState {
  entities: {
    locks: { [lockId: number]: ILock }
  }
  result: {}
  loading: string
  error: string | undefined
  lockError?: string | undefined
}

export const lockSlice = createSlice({
  name: 'lock',
  initialState: {
    entities: {
      locks: {},
    },
    result: {},
    loading: 'idle',
    error: undefined,
    lockError: undefined,
  } as ISliceState,
  reducers: {
    dismissError(state) {
      if (state.error) {
        state.error = undefined
      }
    },
    dismissLockError(state) {
      if (state.lockError) {
        state.lockError = undefined
      }
    },
    clearFetchedLocks(state) {
      state.entities.locks = {}
      state.result = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocks.fulfilled, (state, action) => {
        state.entities.locks = { ...action.payload.entities.locks }
        state.result = action.payload.result
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
        }
      })
      .addCase(fetchLocks.pending, (state) => {
        if ((state.loading = 'idle')) {
          state.loading = 'pending'
        }
      })
      .addCase(fetchLocks.rejected, (state, action) => {
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
          state.error = action.error.message
        }
      })
    builder
      .addCase(toggleLockState.fulfilled, (state, action) => {
        return {
          ...state,
          entities: {
            locks: { ...state.entities.locks, [action.payload.id]: { ...action.payload } },
          },
        }
      })
      .addCase(toggleLockState.pending, (state, action) => {
        const lockId: number = action.meta.arg.lockId
        const lockState = state.entities.locks[lockId]
        let status =
          lockState.status === 'locked'
            ? 'unlocking...'
            : lockState.status === 'unlocked'
            ? 'locking...'
            : lockState.status
        return {
          ...state,
          entities: {
            locks: {
              ...state.entities.locks,
              [lockId]: {
                ...lockState,
                status: status,
              },
            },
          },
        }
      })
      .addCase(toggleLockState.rejected, (state, action) => {
        const lockId: number = action.meta.arg.lockId
        const lockState = state.entities.locks[lockId]
        return {
          ...state,
          loading: state.loading === 'pending' ? 'idle' : state.loading,
          lockError: action.error.message,
          entities: {
            locks: {
              ...state.entities.locks,
              [lockId]: {
                ...lockState,
                status: 'issue',
              },
            },
          },
        }
      })
  },
})

export const { clearFetchedLocks, dismissError, dismissLockError } = lockSlice.actions

export const selectLockList = (state: RootState) =>
  denormalize(state.lock.result, lockSchema, state.lock.entities).locks

export default lockSlice.reducer
