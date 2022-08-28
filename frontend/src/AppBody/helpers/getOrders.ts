import { io } from 'socket.io-client'

import { Order } from '../../types'

const socket = io(`${process.env.REACT_APP_SERVER_URL}`)

// TODO: create a global orders object to keep track of the orders

export const getOrders = (onGettingOrders: (orders: Order[]) => void) => {
  socket.on('order_event', (orders) => onGettingOrders(orders))
}
