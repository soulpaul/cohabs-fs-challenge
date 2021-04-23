export const apiEndpoint = 'http://127.0.0.1:8080/houses'

export const getHouses = async () => {
  const uri = apiEndpoint
  return (await fetch(uri, { method: 'GET' })).json()
}

export const getHouse = async (houseId: number) => {
  const uri = apiEndpoint + '/' + houseId
  return (await fetch(uri, { method: 'GET' })).json()
}

export const getLocks = async (houseId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks'
  return (await fetch(uri, { method: 'GET' })).json()
}

export const getLock = async (houseId: number, lockId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks/' + lockId
  return (await fetch(uri, { method: 'GET' })).json()
}

export const toggleLock = async (houseId: number, lockId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks/' + lockId + '/locking'
  return (await fetch(uri, { method: 'PATCH' })).json()
}
