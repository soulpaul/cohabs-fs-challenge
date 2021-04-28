import React, { useEffect, useState } from 'react'
import styled, { css } from '../styles'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { IconDanger, IconLocked, IconUnlocked } from '../components' // same folder import. Look at index.ts
import { toggleLockState, ILock as IProps } from '../features/lock/lockSlice'

const Lock = ({ id, name, category, status }: IProps) => {
  const dispatch = useAppDispatch()
  const selectedHouse = useAppSelector((state) => state.house.selected)
  const [secureLocking, setSecureLocking] = useState<boolean>(false)
  useEffect(() => {
    // let's make sure locking/unlocking action is not accidental
    if (secureLocking) {
      let lockTimeout = setTimeout(
        () => dispatch(toggleLockState({ houseId: selectedHouse, lockId: id })),
        500
      )
      return () => {
        clearTimeout(lockTimeout)
      }
    }
  }, [dispatch, id, secureLocking, selectedHouse])

  // need to call this multiple times, let's abstract. Also easier to understand just by looking at
  // the name of the function
  const isStatusInactive = () => {
    return status === 'offline' || status === 'issue'
  }

  // let's decide which icon to show using a function for better abstraction
  const Icon = () => {
    if (isStatusInactive()) {
      return <IconDanger />
    }
    if (status === 'locked' || status === 'unlocking...') {
      return <IconLocked />
    } else {
      return <IconUnlocked />
    }
  }

  return (
    <>
      <LockWrapper>
        <RoomInfo>
          <RoomType>{category.toUpperCase()}</RoomType>
          {name}
          <RoomStatus>{status}</RoomStatus>
        </RoomInfo>
        <LockButtonWrapper
          onTouchStart={() => {
            if (!isStatusInactive()) {
              setSecureLocking(true)
            }
          }}
          onTouchEnd={() => {
            if (!isStatusInactive()) {
              setSecureLocking(false)
            }
          }}
          disabled={isStatusInactive()}
        >
          <CircleSvg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            secureLocking={secureLocking}
            lockStatus={status}
          >
            <circle cx="50" cy="50" r="45" />
          </CircleSvg>
          <LockIconWrapper>
            <Icon />
          </LockIconWrapper>
        </LockButtonWrapper>
      </LockWrapper>
    </>
  )
}

export default Lock

interface ICircleProps {
  secureLocking: boolean
  lockStatus: string
}

const LockWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
`

const RoomInfo = styled.div`
  position: relative;
  display: block;
  width: 30vw;
`

const RoomType = styled.span`
  display: block;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`

const RoomStatus = styled.span`
  display: block;
  color: ${({ theme: { colors } }) => colors.lightSecondary};
`

const LockButtonWrapper = styled.button`
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  position: relative;
  width: 45vw;
`

const LockIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 100%;
  width: 100%;
  top: 0;
`

const CircleSvg = styled.svg<ICircleProps>`
  position: relative;
  display: block;
  fill: #213b48;
  transform: all ease-out 0.2s;
  ${(props) => {
    if (props.lockStatus === 'unlocked' || props.lockStatus === 'locking...') {
      return css`
        fill: ${({ theme: { colors } }) => colors.blueMarineAlpha7};
      `
    } else if (props.lockStatus === 'offline') {
      return css`
        opacity: 0.4;
      `
    }
  }}
  ${(props) => {
    if (props.secureLocking) {
      return css`
        circle {
          stroke: ${({ theme: { colors } }) => colors.blueMarine};
          stroke-width: 3px;
          stroke-dasharray: 283;
          stroke-linecap: round;
          stroke-dashoffset: 283;
          transform-origin: 50% 50%;
          animation: 0.5s ease-out 1 both circle--animation;
        }
      `
    }
  }}
  @keyframes circle--animation {
    0% {
      stroke-dashoffset: 283;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }
`
