import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'

import { getLocks, toggleLock } from '../../app/api'
import { lockSchema } from '../../app/schema'

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

export const lockSlice = createSlice({
  name: 'lock',
  initialState: {
    entities: {},
    result: {},
    loading: 'idle',
    error: false,
    selected: 0,
  },
  reducers: {
    dismissError(state) {
      if (state.error) {
        state.error = false
      }
    },
    selectLock(state, action: PayloadAction<number>) {
      state.selected = action.payload
    },
    deselectLock(state) {
      if (state.selected > 0) {
        state.selected = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocks.fulfilled, (state, action) => {
        state.entities = action.payload.entities
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
      .addCase(fetchLocks.rejected, (state) => {
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
          state.error = true
        }
      })
    builder
      .addCase(toggleLockState.fulfilled, (state, action) => {
        return {
          ...state,
          loading: 'pending',
          entities: {
            ...state.entities,
            [action.payload.id]: { ...action.payload },
          },
        }
      })
      .addCase(toggleLockState.pending, (state) => {
        if ((state.loading = 'idle')) {
          state.loading = 'pending'
        }
      })
      .addCase(toggleLockState.rejected, (state) => {
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
          state.error = true
        }
      })
  },
})

export const { dismissError, selectLock, deselectLock } = lockSlice.actions

export default lockSlice.reducer
