import { EventName, Order } from '../../types'

import { OrderSearchTree } from '../OrderSearchTree'

describe('OrderSearchTree', () => {
  const defaultOrder: Order = {
    id: '',
    event_name: EventName.CREATED,
    price: 0,
    item: 'Pizza',
    customer: 'John Smith',
    destination: '123 Test Ave',
    sent_at_second: 36,
  }
  const setUp = (order: Order) => new OrderSearchTree(order)

  describe('insert', () => {
    it('should create a root node with a right and left node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '8719234',
        price: 900,
      })

      const treeState = OrderSearchTree.insert({
        ...defaultOrder,
        id: '18923',
        price: 1200,
      })

      expect(treeState.currentRoot.left?.order.id).toEqual('8719234')
      expect(treeState.currentRoot.right?.order.id).toEqual('18923')
    })

    it('should return the root node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      const treeState = OrderSearchTree.insert({
        ...defaultOrder,
        id: '8719234',
        price: 900,
      })

      expect(treeState.currentRoot.order.id).toEqual('1908432')
    })

    it('should create a root node with a right nodes with the same price', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      const treeState = OrderSearchTree.insert({
        ...defaultOrder,
        id: '0198432',
        price: 1024,
      })

      expect(treeState.currentRoot.order.id).toEqual('1908432')
      expect(treeState.currentRoot.left).toBeNull()
      expect(treeState.currentRoot.right?.order.id).toEqual('0198432')
    })
  })

  describe('convertToArray', () => {
    it('should return an array with all of the orders in search tree', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '2980435',
        price: 900,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '3986450',
        price: 1200,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '1890243',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const orders = OrderSearchTree.convertToArray()

      expect(orders.length).toEqual(5)
      expect(orders[0].id).toEqual('918023')
      expect(orders[1].id).toEqual('2980435')
    })

    it('should not return an array if no orders found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const orders = OrderSearchTree.find(1024)

      expect(orders.length).toEqual(0)
    })
  })

  describe('find', () => {
    it('should return an array with all of the orders found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '2980435',
        price: 900,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '3986450',
        price: 1200,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '1890243',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const orders = OrderSearchTree.find(1024)

      expect(orders.length).toEqual(2)
      expect(orders[0].id).toEqual('1908432')
      expect(orders[1].id).toEqual('1890243')
    })

    it('should not return an array if no orders found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const orders = OrderSearchTree.find(1024)

      expect(orders.length).toEqual(0)
    })
  })

  describe('getOrderById', () => {
    it('should return an order', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '2980435',
        price: 900,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const order = OrderSearchTree.getOrderById('918023')

      expect(order?.id).toEqual('918023')
    })

    it('should not return an order if no orders found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '2345',
        price: 824,
      })

      const order = OrderSearchTree.getOrderById('918023')

      expect(order).toBeNull()
    })
  })

  describe('getOrderByPrice', () => {
    it('should return an order', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 1024,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '2980435',
        price: 900,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const order = OrderSearchTree.getOrderByPrice('918023', 824)

      expect(order?.id).toEqual('918023')
    })

    it('should not return an order if no orders found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const order = OrderSearchTree.getOrderByPrice('918023', 1024)

      expect(order).toBeNull()
    })
  })

  describe('remove', () => {
    it('should a single non root node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const treeState = OrderSearchTree.remove({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      expect(treeState?.node?.order.id).toEqual('918023')
    })

    it('should not delete the root node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      const treeState = OrderSearchTree.remove({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      expect(treeState).toBeNull()
      expect(OrderSearchTree.order.id).toEqual('1908432')
    })

    it('should return null for node if node is not found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 824,
      })

      const treeState = OrderSearchTree.remove({
        ...defaultOrder,
        id: '1324',
        price: 99,
      })

      expect(treeState?.node).toBeNull()
    })

    it('should delete a middle node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 20,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '178902384797894174891',
        price: 22,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '1028793417890',
        price: 24,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '365048714238',
        price: 28,
      })

      const currentTreeState = OrderSearchTree.insert({
        ...defaultOrder,
        id: '918023',
        price: 30,
      })

      // make sure that node 1028793417890 is where it suppse being deleated
      expect(currentTreeState.currentRoot.left?.right?.right?.order.id).toEqual(
        '1028793417890'
      )

      const treeState = OrderSearchTree.remove({
        ...defaultOrder,
        id: '1028793417890',
        price: 24,
      })

      // same location where node 1028793417890 is deleted from that location
      // and is replace if one of its child node
      expect(treeState?.currentRoot?.left?.right?.right?.order.id).toEqual(
        '365048714238'
      )
    })

    it('should delete the root node and replace with another node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '365048714238',
        price: 28,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '123490',
        price: 7,
      })

      const treeState = OrderSearchTree.remove({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      expect(treeState?.currentRoot?.order.id).toEqual('365048714238')
    })

    describe('when there are two nodes with the same price', () => {
      it('should not delete both of them', () => {
        const OrderSearchTree = setUp({
          ...defaultOrder,
          id: '1908432',
          price: 42,
        })

        OrderSearchTree.insert({
          ...defaultOrder,
          id: '189347',
          price: 7,
        })

        OrderSearchTree.insert({
          ...defaultOrder,
          id: '365048714238',
          price: 28,
        })

        OrderSearchTree.insert({
          ...defaultOrder,
          id: '123490',
          price: 7,
        })

        const treeState = OrderSearchTree.remove({
          ...defaultOrder,
          id: '123490',
          price: 7,
        })

        // make sure that the node that has the same price but differnt id
        // is still located where it should be
        expect(treeState?.currentRoot?.left?.order.id).toEqual('189347')

        // remove the node that has  price and id that we want to remove
        expect(treeState?.node?.order.id).toEqual('123490')
      })
    })
  })

  describe('update', () => {
    it('should update price and add back to new location on non root node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '189347',
        price: 16,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '365048714238',
        price: 28,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '123490',
        price: 7,
      })

      const treeState = OrderSearchTree.update(
        {
          ...defaultOrder,
          id: '189347',
          price: 16,
        },
        {
          ...defaultOrder,
          id: '189347',
          price: 32,
        }
      )

      expect(treeState?.currentRoot?.left?.right?.order.price).toEqual(32)
    })

    it('should update price on only root node', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      const treeState = OrderSearchTree.update(
        {
          ...defaultOrder,
          id: '1908432',
          price: 42,
        },
        {
          ...defaultOrder,
          id: '189347',
          price: 32,
        }
      )

      expect(treeState?.currentRoot?.order.price).toEqual(32)
    })

    it('should update price on root node with nodes', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '365048714238',
        price: 28,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '123490',
        price: 7,
      })

      const treeState = OrderSearchTree.update(
        {
          ...defaultOrder,
          id: '1908432',
          price: 42,
        },
        {
          ...defaultOrder,
          id: '1908432',
          price: 30,
        }
      )

      expect(treeState?.currentRoot?.right?.order.price).toEqual(30)
    })

    it('should not update if order cannot be found', () => {
      const OrderSearchTree = setUp({
        ...defaultOrder,
        id: '1908432',
        price: 42,
      })

      OrderSearchTree.insert({
        ...defaultOrder,
        id: '189347',
        price: 16,
      })

      const treeState = OrderSearchTree.update(
        {
          ...defaultOrder,
          id: '7981234',
          price: 64,
        },
        {
          ...defaultOrder,
          id: '7981234',
          price: 128,
        }
      )

      expect(treeState).toBeNull()
    })
  })
})
