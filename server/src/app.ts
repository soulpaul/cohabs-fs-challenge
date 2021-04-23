import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'

import routes from './routes'

/**
 * we need to export the server and make it start in a different file to be
 * able to run tests on its endpoints
 */
export const server = restify.createServer({ name: 'Cohabs-test' })
const cors = corsMiddleware({
  origins: ['http://localhost:3000'],
  allowHeaders: [],
  exposeHeaders: [],
})
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

routes(server)
