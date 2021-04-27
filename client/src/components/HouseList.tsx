import React from 'react'
import styled from 'styled-components'

import { useAppDispatch } from '../app/hooks'
import { selectHouse } from '../features/house/houseSlice'

interface IHouse {
  id: number
  name: string
}

interface IProps {
  houseList: IHouse[]
}

const HouseList = ({ houseList }: IProps) => {
  const dispatch = useAppDispatch()
  return (
    <HouseListWrapper>
      {houseList &&
        houseList.map((house: IHouse) => (
          <House key={house.id} onClick={() => dispatch(selectHouse(house.id))}>
            {house.name}
          </House>
        ))}
    </HouseListWrapper>
  )
}

export default HouseList

const HouseListWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const House = styled.button`
  position: relative;
  display: block;
  width: calc(100% - 2rem);
  line-height: 1.2rem;
  padding: 1.5rem 1rem;
  color: white;
  background-color: transparent;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid white;
  margin: 1rem;
  box-sizing: border-box;
`
