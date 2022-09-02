import { Action, InitialState, Types } from '../types'

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
    default:
      return state
  }
}
