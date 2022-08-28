import { io } from 'socket.io-client'

const socket = io(`${process.env.REACT_APP_SERVER_URL}`)

export const searchForOrders = (
  query: string,
  onError: (errorMessage: string) => void
) => {
  socket.emit('orders', query, (errorMessage: string) => {
    if (errorMessage) {
      return onError(errorMessage)
    }
  })
}
