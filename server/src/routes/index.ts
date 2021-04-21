import { Server } from 'restify'

import houses from './houses'
import house from './house'
import locks from './locks'
import lock from './lock'

export default (server: Server) => {
  // @get /house/:houseId (shows house info)
  house(server)
  // @get /houses (lists all houses)
  houses(server)
  // @get /house/:houseId/locks/:lockId (shows info of a lock in a house)
  // @patch /house/:houseId/locks/:lockId/locking (triggers the update of the lock status - External API)
  lock(server)
  // @get /house/:houseId/locks (lists all locks in a house)
  locks(server)
}
