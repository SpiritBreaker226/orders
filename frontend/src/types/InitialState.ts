import { Order, OrderObject } from './Order'

export type InitialState = {
  orders: OrderObject
  filteredOrders: Order[]
  searchText: string
}
