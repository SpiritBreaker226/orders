import { Action, InitialState, Types } from '../types'

export const ordersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
      return {
        ...state,
        orders: {},
      }
    default:
      return state
  }
}
