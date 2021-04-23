import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import houseReducer from '../features/house/houseSlice'
import lockReducer from '../features/lock/lockSlice'

export const store = configureStore({
  reducer: {
    house: houseReducer,
    lock: lockReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
