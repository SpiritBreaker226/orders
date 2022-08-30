import { Order } from './Order'

export enum Types {
  ModifyOrders = 'MODIFY_ORDERS',
  UpdateSearchText = 'UPDATE_SEARCH_TEXT',
  Search = 'SEARCH',
}

interface OrdersPayload {
  [Types.ModifyOrders]: {
    orders: Order[]
  }
}

type SearchPayload = {
  [Types.Search]: {}
  [Types.UpdateSearchText]: {
    searchText: string
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type OrdersActions =
  ActionMap<OrdersPayload>[keyof ActionMap<OrdersPayload>]

export type SearchActions =
  ActionMap<SearchPayload>[keyof ActionMap<SearchPayload>]

export type Action = OrdersActions | SearchActions
