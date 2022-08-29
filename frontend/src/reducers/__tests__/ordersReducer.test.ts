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

  it('should add order to state', () => {
    const state = setUp({
      action: {
        type: Types.ModifyOrders,
        payload: {
          orders: [
            {
              id: 'dfsajkllf423',
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

    expect(state.orders['dfsajkllf423']).toBeTruthy()
  })

  it('should update existing order', () => {
    const order = {
      id: 'adksflj',
      event_name: EventName.CREATED,
      price: 1024,
      item: 'Pizza',
      customer: 'John Smith',
      destination: '123 Test Ave',
      sent_at_second: 36,
    }
    const newOrder: OrderObject = {}
    newOrder[order.id] = order

    const state = setUp({
      state: {
        orders: newOrder,
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

    expect(state.filteredOrders).toEqual([])
    expect(state.orders[order.id].event_name).toEqual(EventName.DELIVERED)
  })

  it('should modify order when filter', () => {
    const order = {
      id: 'adksflj',
      event_name: EventName.CREATED,
      price: 1024,
      item: 'Pizza',
      customer: 'John Smith',
      destination: '123 Test Ave',
      sent_at_second: 36,
    }
    const newOrder: OrderObject = {}

    newOrder['lkjasdf'] = { ...order, price: 1236 }
    newOrder['asdfa'] = { ...order, price: 1500 }
    newOrder['zdsjkf'] = { ...order, price: 270 }

    const state = setUp({
      state: {
        orders: newOrder,
        searchText: '$2.70',
      },
      action: {
        type: Types.ModifyOrders,
        payload: {
          orders: [{ ...order }],
        },
      },
    })

    expect(state.filteredOrders.length).toEqual(1)
    expect(state.filteredOrders[0].price).toEqual(270)
    expect(state.orders['zdsjkf']).toBeTruthy()
  })
})
