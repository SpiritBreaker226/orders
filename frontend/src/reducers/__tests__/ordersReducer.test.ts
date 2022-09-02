import { initialState } from '../../contexts'
import {
  Action,
  EventName,
  InitialState,
  OrderObject,
  Types,
} from '../../types'
import { ordersReducer } from '../ordersReducer'

describe('ordersReducer', () => {
  const setUp = ({
    action,
    state = {},
  }: {
    action: Action
    state?: Partial<InitialState>
  }) => ordersReducer({ ...initialState, ...state }, action)

  describe('ModifyOrders', () => {
    it('should add order to state', () => {
      const state = setUp({
        action: {
          type: Types.ModifyOrders,
          payload: {
            orders: [
              {
                id: '29850734',
                event_name: EventName.CREATED,
                price: 1024,
                item: 'Pizza',
                customer: 'John Smith',
                destination: '123 Test Ave',
                sent_at_second: 36,
              },
            ],
          },
        },
      })

      expect(state.orders['29850734']).toBeTruthy()
    })

    it('should update existing order', () => {
      const order = {
        id: '1237894',
        event_name: EventName.CREATED,
        price: 1024,
        item: 'Pizza',
        customer: 'John Smith',
        destination: '123 Test Ave',
        sent_at_second: 36,
      }
      const orders: OrderObject = {}
      orders[order.id] = order

      const state = setUp({
        state: {
          orders,
        },
        action: {
          type: Types.ModifyOrders,
          payload: {
            orders: [
              {
                ...order,
                event_name: EventName.DELIVERED,
              },
            ],
          },
        },
      })

      expect(state.orders[order.id].event_name).toEqual(EventName.DELIVERED)
    })
  })

  describe('RemoveComplatedOrders', () => {
    it('should remove delivered orders', () => {
      const order = {
        id: '1237894',
        event_name: EventName.CREATED,
        price: 1024,
        item: 'Pizza',
        customer: 'John Smith',
        destination: '123 Test Ave',
        sent_at_second: 36,
      }
      const orders: OrderObject = {}
      orders[order.id] = order

      orders['3658047'] = {
        ...order,
        id: '3658047',
        event_name: EventName.COOKED,
        price: 1236,
      }
      orders['1430287'] = { ...order, id: '1430287', price: 1500 }
      orders['356047'] = {
        ...order,
        id: '356047',
        event_name: EventName.DRIVER_RECEIVED,
        price: 270,
      }

      const state = setUp({
        state: {
          orders,
        },
        action: {
          type: Types.RemoveComplatedOrders,
          payload: {
            orders: [
              {
                ...order,
                event_name: EventName.DELIVERED,
              },
              {
                ...orders['1430287'],
                event_name: EventName.CANCELLED,
              },
            ],
          },
        },
      })

      expect(state.orders[order.id]).toBeUndefined()
      expect(state.orders['1430287']).toBeUndefined()
      expect(state.orders['3658047']).not.toBeUndefined()
      expect(state.orders['356047']).not.toBeUndefined()
    })

    it('should not remove any orders if not status is not delivered', () => {
      const order = {
        id: '1237894',
        event_name: EventName.CREATED,
        price: 1024,
        item: 'Pizza',
        customer: 'John Smith',
        destination: '123 Test Ave',
        sent_at_second: 36,
      }
      const orders: OrderObject = {}
      orders[order.id] = order

      orders['3658047'] = { ...order, id: '3658047', price: 1236 }
      orders['1430287'] = { ...order, id: '1430287', price: 1500 }
      orders['356047'] = { ...order, id: '356047', price: 270 }

      const state = setUp({
        state: {
          orders,
        },
        action: {
          type: Types.RemoveComplatedOrders,
          payload: {
            orders: [
              {
                ...order,
                event_name: EventName.COOKED,
              },
            ],
          },
        },
      })

      expect(state.orders[order.id]).not.toBeUndefined()
      expect(state.orders['1430287']).not.toBeUndefined()
      expect(state.orders['3658047']).not.toBeUndefined()
      expect(state.orders['356047']).not.toBeUndefined()
    })
  })
})
