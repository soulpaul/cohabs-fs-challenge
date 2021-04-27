import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { normalize, denormalize } from 'normalizr'

import { getHouses } from '../../app/api'
import { houseSchema } from '../../app/schema'
import { RootState } from '../../app/store'

export const fetchHouses = createAsyncThunk('houses/fetchAll', async () => {
  try {
    const response = await getHouses()
    const normalized = normalize({ houses: response }, houseSchema)
    return normalized
  } catch (error) {
    throw error
  }
})

interface ISliceState {
  entities: {
    house: {}
  }
  result: {}
  loading: string
  error: string | undefined
  selected: number
}

export const houseSlice = createSlice({
  name: 'house',
  initialState: {
    entities: {
      house: {},
    },
    result: {},
    loading: 'idle',
    error: undefined,
    selected: 0,
  } as ISliceState,
  reducers: {
    dismissError(state) {
      if (state.error) {
        state.error = undefined
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
        state.entities.house = { ...action.payload.entities.house }
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
      .addCase(fetchHouses.rejected, (state, action) => {
        if ((state.loading = 'pending')) {
          state.loading = 'idle'
          state.error = action.error.message
        }
      })
  },
})

export const { selectHouse, deselectHouse, dismissError } = houseSlice.actions

export const selectHouseList = (state: RootState) =>
  denormalize(state.house.result, houseSchema, state.house.entities).houses

export default houseSlice.reducer
