import React from 'react'
import styled, { css, keyframes } from 'styled-components'

export const Locked = () => (
  <Icon viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </Icon>
)

export const Unlocked = () => (
  <Icon viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
  </Icon>
)

export const Back = () => (
  <Icon viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </Icon>
)

export const Danger = () => (
  <Icon viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </Icon>
)

export const Loader = () => (
  <Icon rotating viewBox="0 0 24 24">
    <line x1="12" x2="12" y1="2" y2="6" />
    <line x1="12" x2="12" y1="18" y2="22" />
    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
    <line x1="2" x2="6" y1="12" y2="12" />
    <line x1="18" x2="22" y1="12" y2="12" />
    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
  </Icon>
)

interface IIconProps {
  readonly rotating?: boolean
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const rotating = css`
  animation: ${rotate} 3s linear infinite;
`

const Icon = styled.svg<IIconProps>`
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  width: 2rem;
  height: 2rem;
  ${(props) => (props.rotating ? rotating : null)}
`
