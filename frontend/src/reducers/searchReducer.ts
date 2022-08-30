import { Action, InitialState, Types } from '../types'

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.Search:
      return {
        ...state,
        filteredOrders: Object.values(state.orders).filter(
          (order) => Number(state.searchText) === order.price / 100
        ),
      }
    case Types.UpdateSearchText:
      return {
        ...state,
        searchText: action.payload.searchText,
      }
    default:
      return state
  }
}
