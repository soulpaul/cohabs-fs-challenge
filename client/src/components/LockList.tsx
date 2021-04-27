import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  clearFetchedLocks,
  dismissLockError,
  fetchLocks,
  ILock,
  selectLockList,
} from '../features/lock/lockSlice'

import Lock from './Lock'
import Loader from './Loader'

const LockList = () => {
  const dispatch = useAppDispatch()
  const lockList = useAppSelector(selectLockList)
  const loading = useAppSelector((state) => state.lock.loading)
  const house = useAppSelector((state) => state.house.selected)
  const lockError = useAppSelector((state) => state.lock.lockError)
  useEffect(() => {
    // loading lock list on component mount
    dispatch(fetchLocks(house))
    return () => {
      /**
       * whenever the component gets unmounted we want to reset the store so that we
       * don't have any render of the previous lock list
       */
      dispatch(clearFetchedLocks())
      // clearing error as well
      dispatch(dismissLockError())
    }
  }, [dispatch, house])
  if (loading === 'pending') {
    return <Loader />
  }
  if (lockList && lockList.length > 0) {
    return (
      <>
        <ListWrapper>
          <InstructionMessage>
            Stay pressed on the button to lock or unlock the doors
          </InstructionMessage>
          {lockList.map((lock: ILock) => (
            <Lock {...lock} key={lock.id} />
          ))}
        </ListWrapper>
        {lockError ? (
          <MessageWrapper>
            <Message>
              If there's an issue first check if someone's home by ringing the bell. Still locked
              out?
            </Message>
            <MessageLink href="#">Call the communnity manager</MessageLink>
          </MessageWrapper>
        ) : (
          <MessageWrapper>
            <MessageLink href="#">Can't enter?</MessageLink>
          </MessageWrapper>
        )}
      </>
    )
  }
  return (
    <NoLocks>
      <h1>No locks</h1>
      <p>Looks like there are not yet locks for this house. Come back later...</p>
    </NoLocks>
  )
}

export default LockList

const InstructionMessage = styled.div`
  position: relative;
  margin: 2rem;
  text-align: center;
  line-height: 1.8;
  color: #888891;
`

const ListWrapper = styled.div`
  margin: 1rem;
  padding-bottom: 10rem;
`

const MessageWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #1e1f31;
  box-sizing: border-box;
`
const Message = styled.p`
  text-align: center;
  line-height: 1.8;
  color: #888891;
  margin-bottom: 2rem;
`
const MessageLink = styled.a`
  display: block;
  text-align: center;
  color: rgba(76, 171, 168, 1);
  font-weight: 600;
  margin: 1rem 0;
`

const NoLocks = styled.div`
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
