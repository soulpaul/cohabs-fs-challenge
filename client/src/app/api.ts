export const apiEndpoint = 'http://' + process.env.REACT_APP_HOST + ':8080/houses'

// abstracting api calls to handle errors
const callServerApi = async (uri: string, method: string) => {
  try {
    const response = await fetch(uri, { method })
    if (response.status === 200) {
      return await response.json()
    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    throw error
  }
}

// actual calls exported to handle params
export const getHouses = async () => {
  const uri = apiEndpoint
  return await callServerApi(uri, 'GET')
}

export const getHouse = async (houseId: number) => {
  const uri = apiEndpoint + '/' + houseId
  return await callServerApi(uri, 'GET')
}

export const getLocks = async (houseId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks'
  return await callServerApi(uri, 'GET')
}

export const getLock = async (houseId: number, lockId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks/' + lockId
  return await callServerApi(uri, 'GET')
}

export const toggleLock = async (houseId: number, lockId: number) => {
  const uri = apiEndpoint + '/' + houseId + '/locks/' + lockId + '/locking'
  return await callServerApi(uri, 'PATCH')
}
