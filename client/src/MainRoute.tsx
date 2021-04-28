import React, { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from './app/hooks'
import { fetchHouses, selectHouseList } from './features/house/houseSlice'

import { Error, HouseList, Loader, LockList } from './components'

const MainRoute = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHouses())
  }, [dispatch])
  const houseList = useAppSelector(selectHouseList)
  const loading = useAppSelector((state) => state.house.loading)
  const selectedHouse = useAppSelector((state) => state.house.selected)
  const houseError = useAppSelector((state) => state.house.error)
  const lockError = useAppSelector((state) => state.lock.error)
  if (loading === 'pending') {
    return <Loader />
  }
  if (selectedHouse) {
    return <LockList />
  }
  if (houseError || lockError) {
    return <Error />
  }
  return <HouseList houseList={houseList} />
}

export default MainRoute
