import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { normalize } from 'normalizr'

import { getHouses } from '../../app/api'
import { houseSchema } from '../../app/schema'

export const fetchHouses = createAsyncThunk('houses/fetchAll', async () => {
  const response = await getHouses()
  const normalized = normalize({ houses: response }, houseSchema)
  return normalized
})

export const houseSlice = createSlice({
  name: 'house',
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
    selectHouse(state, action: PayloadAction<number>) {
      state.selected = action.payload
    },
    deselectHouse(state) {
      if (state.selected > 0) {
        state.selected = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.entities = action.payload.entities
        state.result = action.payload.result
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
        }
      })
      .addCase(fetchHouses.pending, (state) => {
        if ((state.loading = 'idle')) {
          state.loading = 'pending'
        }
      })
      .addCase(fetchHouses.rejected, (state) => {
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
          state.error = true
        }
      })
  },
})

export const { selectHouse, deselectHouse, dismissError } = houseSlice.actions

export default houseSlice.reducer
