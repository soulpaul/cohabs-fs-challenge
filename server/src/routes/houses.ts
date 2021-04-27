import { Server } from 'restify'
import { getHouses } from '../controllers/houses'

export default (server: Server) => {
  server.get('/houses', (_req, res, next) => {
    res.send(getHouses())
    return next()
  })
}
