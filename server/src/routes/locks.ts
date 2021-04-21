import { Server } from 'restify'
import { getHouseLocks } from '../controllers/locks'

export default (server: Server) => {
  server.get('/houses/:houseId/locks', (req, res, next) => {
    const houseId = parseInt(req.params.houseId)
    res.send(getHouseLocks(houseId))
    return next()
  })
}
