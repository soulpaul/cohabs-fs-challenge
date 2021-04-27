import React from 'react'
import styled from 'styled-components'

import { Loader as IconLoader } from './Icons'

const Loader = () => (
  <LoaderWrapper>
    <IconLoader />
    <p>Loading...</p>
  </LoaderWrapper>
)

export default Loader

const LoaderWrapper = styled.div`
  position: relative;
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    color: #888891;
  }
`
