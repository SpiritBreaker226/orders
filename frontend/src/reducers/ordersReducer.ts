import { formatCurrency } from '../helpers'
import { Action, InitialState, Types } from '../types'

export const ordersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
      const newOrders = { ...state.orders }
      action.payload.orders.forEach((order) => {
        newOrders[order.id] = { ...order }
      })

      if (state.searchText) {
        state.filteredOrders = Object.values(newOrders).filter(
          (order) => state.searchText === formatCurrency(order.price)
        )
      }

      return {
        ...state,
        orders: newOrders,
      }
    default:
      return state
  }
}
