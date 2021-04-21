import restify from 'restify'

import routes from './routes'

/**
 * we need to export the server and make it start in a different file to be
 * able to run tests on its endpoints
 */
export const server = restify.createServer({ name: 'Cohabs-test' })
server.use(restify.plugins.bodyParser())
routes(server)
