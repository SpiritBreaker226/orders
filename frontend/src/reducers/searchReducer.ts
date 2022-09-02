import { Action, InitialState, Types } from '../types'
import cachingOrders from '../cache/cachingOrders'

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    // needs to be apart of the modify orders so that it can search for the newest
    // orders which could have the same price
    case Types.ModifyOrders:
    case Types.Search:
      return {
        ...state,
        filteredOrders: cachingOrders.searchCacheByPrice(
          Number(Number(Number(state.searchText) * 100).toFixed())
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
