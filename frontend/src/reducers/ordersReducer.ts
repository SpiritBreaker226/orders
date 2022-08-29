import { Action, InitialState, Types } from '../types'

export const ordersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
      const newOrders = { ...state.orders }
      action.payload.orders.forEach((order) => {
        newOrders[order.id] = { ...order }
      })

      if (state.searchText) {
        state.filteredOrders = Object.values(newOrders).filter((order) => {
          const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(order.price / 100)

          return state.searchText === formattedPrice
        })
      }

      return {
        ...state,
        orders: newOrders,
      }
    default:
      return state
  }
}
