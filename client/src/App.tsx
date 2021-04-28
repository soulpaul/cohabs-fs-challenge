import React from 'react'
import styled from './styles'

import { Header } from './components'
import MainRoute from './MainRoute'

function App() {
  return (
    <AppWrapper>
      <Header />
      <MainRoute />
    </AppWrapper>
  )
}
export default App

const AppWrapper = styled.div`
  position: relative;
  background-color: ${({ theme: { colors } }) => colors.darkPrimary};
  width: 100vw;
  height: 100vh;
  /* preventing text selection on tap hold using styles */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`
