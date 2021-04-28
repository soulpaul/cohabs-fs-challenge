import React from 'react'
import styled from '../styles'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deselectHouse } from '../features/house/houseSlice'

import { IconBack } from './' // same folder import. Look at index.ts

const Header = () => {
  const dispatch = useAppDispatch()
  const selectedHouse = useAppSelector((state) => state.house.selected)
  return (
    <HeaderWrapper>
      {selectedHouse > 0 && (
        <HomeButton onClick={() => dispatch(deselectHouse())}>
          <IconBack />
        </HomeButton>
      )}
      <PageTitle>{selectedHouse ? 'Doors Lock' : 'Houses'}</PageTitle>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 1rem;
`

const HomeButton = styled.button`
  position: absolute;
  display: block;
  width: 4rem;
  padding: 0;
  line-height: 2rem;
  border: 0;
  background: transparent;
  color: ${({ theme: { colors } }) => colors.lightPrimary};
  cursor: pointer;
`
const PageTitle = styled.h1`
  display: block;
  width: 100%;
  margin: 0;
  font-size: 1rem;
  line-height: 2rem;
  text-align: center;
`
