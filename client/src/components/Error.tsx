import React from 'react'
import styled from 'styled-components'

import { useAppSelector } from '../app/hooks'

const Error = () => {
  const houseErrorMessage = useAppSelector((state) => state.house.error)
  const lockErrorMessage = useAppSelector((state) => state.lock.error)

  return (
    <ErrorWrapper>
      <h1>Error</h1>
      {houseErrorMessage && <p>{houseErrorMessage}</p>}
      {lockErrorMessage && <p>{lockErrorMessage}</p>}
      <p>Please reload the application</p>
    </ErrorWrapper>
  )
}

export default Error

const ErrorWrapper = styled.div`
  position: relative;
  display: block;
  margin: 2rem;
  text-align: center;
  h1 {
    font-size: 1rem;
    margin: 0;
  }
  p  {
    color: #888891;
    line-height: 1.5rem;
  }
`
