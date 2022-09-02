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
})
