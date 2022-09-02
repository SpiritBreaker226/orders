import { Action, InitialState, Types } from '../types'

export const combineReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
    case Types.Search:
      return {
        ...state,
        filteredOrders: state.filteredOrders.length
          ? state.filteredOrders.map((order) => state.orders[order.id] || order)
          : [],
      }
    default:
      return state
  }
}
