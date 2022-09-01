import { EventName } from '../../types'
import cachingOrders from '../cachingOrders'

describe('OrderSearchTree', () => {
  afterEach(() => {
    cachingOrders.resetCache()
  })

  describe('addOrUpdateCache', () => {
    describe('when cachingOrders is null', () => {
      it('should add order', () => {
        cachingOrders.addOrUpdateCache({
          id: '2948357',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        })

        expect(cachingOrders.getCache()).not.toBeNull()
        expect(cachingOrders.getCache()?.order.id).toEqual('2948357')
      })
    })

    describe('when cachingOrders is not null', () => {
      it('should add order', () => {
        cachingOrders.addOrUpdateCache({
          id: '2948357',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        })

        expect(cachingOrders.getCache()).not.toBeNull()
        expect(cachingOrders.getCache()?.order.id).toEqual('2948357')
      })
    })

    it('should update existing order', () => {
      const order = {
        id: '2483795',
        event_name: EventName.CREATED,
        price: 1024,
        item: 'Pizza',
        customer: 'John Smith',
        destination: '123 Test Ave',
        sent_at_second: 36,
      }

      cachingOrders.addOrUpdateCache(order)
      cachingOrders.addOrUpdateCache({
        ...order,
        event_name: EventName.DELIVERED,
      })

      expect(cachingOrders.getCache()?.order.event_name).toEqual(
        EventName.DELIVERED
      )
    })

    describe('when price is update', () => {
      it('should update existing order', () => {
        const order = {
          id: '2483795',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        }

        cachingOrders.addOrUpdateCache(order)
        cachingOrders.addOrUpdateCache({
          ...order,
          price: 512,
        })

        expect(cachingOrders.getCache()?.order.price).toEqual(512)
      })
    })
  })

  describe('bulkModifyCache', () => {
    it('should add order in an array', () => {
      cachingOrders.bulkModifyCache([
        {
          id: '2948357',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
      ])

      expect(cachingOrders.getCache()).not.toBeNull()
      expect(cachingOrders.getCache()?.order.id).toEqual('2948357')
    })
  })
})
