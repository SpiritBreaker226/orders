import { Action, EventName, InitialState, Types } from '../types'

export const ordersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
      const orders = { ...state.orders }

      action.payload.orders.forEach((order) => {
        orders[order.id] = { ...order }
      })

      return {
        ...state,
        orders,
      }
    case Types.RemoveComplatedOrders:
      const updatedOrders = { ...state.orders }

      action.payload.orders.forEach((order) => {
        if (
          (updatedOrders[order.id] &&
            order.event_name === EventName.DELIVERED) ||
          (updatedOrders[order.id] && order.event_name === EventName.CANCELLED)
        ) {
          delete updatedOrders[order.id]
        }
      })

      return {
        ...state,
        orders: updatedOrders,
      }
    default:
      return state
  }
}
