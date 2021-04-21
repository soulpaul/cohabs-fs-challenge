import supertest from 'supertest'

import { server } from '../app'

const request = supertest(server)

test('GET request to get a house given its id', async (done) => {
  const res = await request.get('/houses/1')
  expect(res.status).toBe(200)
  // not a deep primitive so let's use toEqual here
  expect(res.body).toEqual({ id: 1, name: 'Jourdan' })
  done()
})

test('GET request to get house that does not exist', async (done) => {
  const res = await request.get('/houses/11')
  // should return a 400 response with a Bad Request Error
  expect(res.status).toBe(400)
  done()
})
