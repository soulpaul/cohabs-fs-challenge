import supertest from 'supertest'

import { server } from '../app'

const request = supertest(server)

test('GET request to get a house lock given house id and its id', async (done) => {
  const res = await request.get('/houses/1/locks/4')
  expect(res.status).toBe(200)
  // not a deep primitive so let's use toEqual here
  expect(res.body).toEqual({
    id: 4,
    category: 'room',
    name: 'Room #2',
    status: 'unlocked',
  })
  done()
})

test('GET request to get a house lock that does not exist', async (done) => {
  const res = await request.get('/houses/2/locks/1')
  // should return a 200 response with an empty object
  expect(res.status).toBe(200)
  expect(res.body).toEqual({})
  done()
})

test('GET request to get a house lock when house is not existent', async (done) => {
  const res = await request.get('/houses/5/locks/1')
  // should return a 400 response: Bad Request
  expect(res.status).toBe(400)
  expect(res.body.code).toEqual('BadRequest')
  done()
})

test('PATCH request to unlock a room', async (done) => {
  const res = await request.patch('/houses/1/locks/1/locking')
  expect(res.status).toBe(200)
  expect(res.body).toEqual({
    id: 1,
    category: 'house',
    name: 'Front door',
    status: 'unlocked',
  })
  done()
})

test('PATCH request to lock a room', async (done) => {
  const res = await request.patch('/houses/1/locks/3/locking')
  expect(res.status).toBe(200)
  expect(res.body).toEqual({
    id: 3,
    category: 'room',
    name: 'Room #1',
    status: 'locked',
  })
  done()
})

test('PATCH request to an offline lock', async (done) => {
  const res = await request.patch('/houses/1/locks/2/locking')
  expect(res.status).toBe(400)
  expect(res.body.code).toEqual('BadRequest')
  done()
})

test('PATCH request to a non existent house', async (done) => {
  const res = await request.patch('/houses/4/locks/13/locking')
  expect(res.status).toBe(400)
  expect(res.body.code).toEqual('BadRequest')
  done()
})

test('PATCH request to a non existent lock', async (done) => {
  const res = await request.patch('/houses/1/locks/8/locking')
  expect(res.status).toBe(400)
  expect(res.body.code).toEqual('BadRequest')
  done()
})
