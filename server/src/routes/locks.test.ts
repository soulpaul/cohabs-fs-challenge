import supertest from 'supertest'

import { server } from '../app'

const request = supertest(server)

test('GET request to get house lock list', async (done) => {
  const res = await request.get('/houses/1/locks')
  // should return a populated array
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body)).toBe(true)
  expect(res.body.length).toBeGreaterThan(0)
  done()
})

test('GET request to get lock list of a house without locks', async (done) => {
  const res = await request.get('/houses/3/locks')
  // should return a 200 response containing an empty array
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body)).toBe(true)
  expect(res.body.length).toBe(0)
  done()
})

test('GET request to get lock list of a non existing house', async (done) => {
  const res = await request.get('/houses/9/locks')
  // should return a 400 response: Bad Request
  expect(res.status).toBe(400)
  expect(res.body.code).toEqual('BadRequest')
  done()
})
