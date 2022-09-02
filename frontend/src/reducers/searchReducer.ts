import { Action, InitialState, Types } from '../types'
import cachingOrders from '../cache/cachingOrders'

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.ModifyOrders:
    case Types.Search:
      const cacheOrders = cachingOrders.getCache()
      const filteredCacheOrders = cacheOrders
        ? cacheOrders.find(
            Number(Number(Number(state.searchText) * 100).toFixed())
          )
        : []

      return {
        ...state,
        filteredOrders: filteredCacheOrders.length
          ? filteredCacheOrders.map((order) => state.orders[order.id] || order)
          : [],
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
