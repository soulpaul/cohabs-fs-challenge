export const recordAccess = (
  userId: number,
  lockStatus: string,
  lockId: number,
  houseId: number
) => {
  const utcTime = new Date().toUTCString()
  // don't print if its in test environment
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      utcTime +
        ': user ' +
        userId +
        ' has ' +
        lockStatus +
        ' lock ID: ' +
        lockId +
        ' in house ID: ' +
        houseId
    )
  }
}
