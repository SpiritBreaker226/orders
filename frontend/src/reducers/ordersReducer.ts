import { Action, InitialState, Types } from '../types'

export const ordersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
      const newOrders = { ...state.orders }
      action.payload.orders.forEach((order) => {
        newOrders[order.id] = { ...order }
      })

      return {
        ...state,
        orders: newOrders,
      }
    default:
      return state
  }
}
