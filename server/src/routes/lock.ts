import { Server } from 'restify'
import { getHouseLock, setLockStatus } from '../controllers/locks'

export default (server: Server) => {
  server.get('/houses/:houseId/locks/:lockId', (req, res, next) => {
    const houseId = parseInt(req.params.houseId)
    const lockId = parseInt(req.params.lockId)
    try {
      const lock = getHouseLock(houseId, lockId)
      res.send(lock)
      return next()
    } catch (error) {
      return next(error)
    }
  })

  server.patch('/houses/:houseId/locks/:lockId/locking', async (req, res, next) => {
    const houseId = parseInt(req.params.houseId)
    const lockId = parseInt(req.params.lockId)
    try {
      const lock = await setLockStatus(houseId, lockId)
      res.send(lock)
      return next(lock)
    } catch (error) {
      return next(error)
    }
  })
}
