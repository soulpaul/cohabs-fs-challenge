import React from 'react'
import styled from 'styled-components'

function App() {
  return (
    <AppWrapper>
      <HouseListWrapper>
        <House>House #1</House>
        <House>House #2</House>
      </HouseListWrapper>
    </AppWrapper>
  )
}

export default App

const AppWrapper = styled.div`
  position: relative;
  background-color: #1e1f31;
  width: 100vw;
  height: 100vh;
`

const HouseListWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 1rem;
`

const House = styled.div`
  position: relative;
  width: 100%auto;
  line-height: 4rem;
  color: white;
  font-size: 1.5rem;
  text-align: center;
`
