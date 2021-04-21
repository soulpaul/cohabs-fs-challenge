import { Server } from 'restify'
import { getHouse } from '../controllers/houses'

export default (server: Server) => {
  server.get('/houses/:houseId', (req, res, next) => {
    const houseId = parseInt(req.params.houseId)
    const house = getHouse(houseId)
    res.send(house)
    return next()
  })
}
