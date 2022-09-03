import { Order } from '../types'

type ReturnValues = {
  currentRoot: OrderSearchTree
  node: OrderSearchTree | null
}

export class OrderSearchTree {
  order: Order
  left: OrderSearchTree | null
  right: OrderSearchTree | null

  constructor(order: Order) {
    this.order = order
    this.left = null
    this.right = null
  }

  convertToArray() {
    const orders: Order[] = []

    const traversal = (order: OrderSearchTree | null) => {
      if (!order) return

      traversal(order.left)

      orders.push(order.order)

      traversal(order.right)
    }

    traversal(this)

    return orders
  }

  find(price: Order['price']): Order[] {
    const orders: Order[] = []
    let currentNode: OrderSearchTree | null = this

    while (currentNode !== null) {
      if (price < currentNode.order.price) {
        currentNode = currentNode.left
      } else if (price > currentNode.order.price) {
        currentNode = currentNode.right
      } else {
        orders.push(currentNode.order)

        // all equals go to the right
        currentNode = currentNode.right
      }
    }

    return orders
  }

  getOrderById(id: Order['id']): Order | null {
    let currentNode: OrderSearchTree | undefined = this
    const queue = [currentNode]

    while (queue.length > 0) {
      currentNode = queue.shift()

      if (!currentNode) {
        return null
      }

      if (currentNode.order.id === id) {
        return currentNode?.order
      }

      if (currentNode.left) queue.push(currentNode.left)
      if (currentNode.right) queue.push(currentNode.right)
    }

    return null
  }

  getOrderByPrice(id: Order['id'], price: Order['price']): Order | null {
    let currentNode: OrderSearchTree | null = this

    while (currentNode !== null) {
      if (price < currentNode.order.price) {
        currentNode = currentNode.left
      } else if (price > currentNode.order.price) {
        currentNode = currentNode.right
      } else {
        // check if the price is the same but not the id
        if (currentNode.order.price === price && currentNode.order.id !== id) {
          // all equals go to the right
          currentNode = currentNode.right
        } else {
          return currentNode.order
        }
      }
    }

    return null
  }

  insert(order: Order): ReturnValues | null {
    let currentNode: OrderSearchTree = this

    // only blocks order with the same price and id
    // if they have a differnt price then this will
    // NOT update orders with same id and different price
    if (this.getOrderByPrice(order.id, order.price)) {
      return null
    }

    while (true) {
      if (order.price < currentNode.order.price) {
        if (currentNode.left === null) {
          currentNode.left = new OrderSearchTree(order)
          break
        }

        currentNode = currentNode.left
        // for both greaker and qual then the partent node
      } else {
        if (currentNode.right === null) {
          currentNode.right = new OrderSearchTree(order)
          break
        }

        currentNode = currentNode.right
      }
    }

    return {
      currentRoot: this,
      node: currentNode,
    }
  }

  remove(
    order: Order,
    parentNode: OrderSearchTree | null = null
  ): ReturnValues | null {
    let currentNode: OrderSearchTree | null = this

    while (currentNode !== null) {
      if (order.price < currentNode.order.price) {
        parentNode = currentNode
        currentNode = currentNode.left
      } else if (order.price > currentNode.order.price) {
        parentNode = currentNode
        currentNode = currentNode.right
      } else {
        // if the price is the same but not the id
        if (
          currentNode.order.price === order.price &&
          currentNode.order.id !== order.id
        ) {
          // cannot be null as right must have node since it has the same price but different id
          currentNode = currentNode.right as OrderSearchTree

          // redoes the loop with the new currentNode as there courld be nodes between
          // the same price but differnt id and the node that needs to be remove
          continue
        }

        if (currentNode.left !== null && currentNode.right !== null) {
          currentNode.order = currentNode.right.getMinValue()
          currentNode.right.remove(currentNode.order, currentNode)
        } else if (parentNode === null) {
          if (currentNode.left !== null) {
            currentNode.order = currentNode.left.order
            currentNode.right = currentNode.left.right
            currentNode.left = currentNode.left.left
          } else if (currentNode.right !== null) {
            currentNode.order = currentNode.right.order
            currentNode.left = currentNode.right.left
            currentNode.right = currentNode.right.right
          } else {
            // This is a single-node tree; skip removal
            return null
          }
        } else if (parentNode.left === currentNode) {
          parentNode.left =
            currentNode.left !== null ? currentNode.left : currentNode.right
        } else if (parentNode.right === currentNode) {
          parentNode.right =
            currentNode.left !== null ? currentNode.left : currentNode.right
        }

        break
      }
    }

    return {
      currentRoot: this,
      node: currentNode,
    }
  }

  update(oldOrder: Order, newOrder: Order): ReturnValues | null {
    // if a single-node tree the update
    if (!this.left && !this.right) {
      this.order = { ...oldOrder, ...newOrder }

      return {
        currentRoot: this,
        node: this,
      }
    }

    const currentTreeState = this.remove(oldOrder)

    if (!currentTreeState || !currentTreeState.node) {
      return null
    }

    return currentTreeState?.currentRoot?.insert({ ...oldOrder, ...newOrder })
  }

  private getMinValue(): Order {
    let currentNode: OrderSearchTree = this

    while (currentNode.left !== null) {
      currentNode = currentNode.left
    }

    return currentNode.order
  }
}
