import supertest from 'supertest'

import { server } from '../app'

const request = supertest(server)

test('GET request to get house list', async (done) => {
  const res = await request.get('/houses')
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body)).toBe(true)
  done()
})
