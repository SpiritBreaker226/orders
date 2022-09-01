import { OrderSearchTree } from '../libs'
import { Order } from '../types'

class CachingOrders {
  orderCache: OrderSearchTree | null

  constructor() {
    this.orderCache = null
  }

  addOrUpdateCache(order: Order) {
    if (!this.orderCache) {
      this.orderCache = new OrderSearchTree(order)
      return
    }

    const currentOrder = this.orderCache.getOrderById(order.id)

    if (!currentOrder) {
      this.orderCache.insert(order)
    } else {
      this.orderCache.update(currentOrder, order)
    }
  }

  bulkModifyCache(orders: Order[]): OrderSearchTree | null {
    orders.forEach((order) => this.addOrUpdateCache(order))

    return this.orderCache
  }

  getCache(): OrderSearchTree | null {
    return this.orderCache
  }

  resetCache() {
    this.orderCache = null
  }
}

// Use a singleton here so that there is one Cache Object in use
// those saving memory and keeping the complex done since a application
// should only have a cache order
export default new CachingOrders()
