import React from 'react'
import styled from 'styled-components'

import Header from './components/Header'
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
  background-color: #1e1f31;
  width: 100vw;
  height: 100vh;
  /* preventing text selection on tap hold using styles */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`
