import { OrderObject } from './../../types/Order'
import { initialState } from '../../contexts'
import { Action, EventName, InitialState, Types } from '../../types'
import { searchReducer } from '../searchReducer'
import cachingOrders from '../../cache/cachingOrders'

// would mock the OrderSearchTree however jest is not making it easy to mock

describe('searchReducer', () => {
  const setUp = ({
    action,
    state = {},
  }: {
    action: Action
    state?: Partial<InitialState>
  }) => searchReducer({ ...initialState, ...state }, action)

  afterEach(() => {
    cachingOrders.resetCache()
  })

  it('should search orders', () => {
    const order = {
      id: '2483795',
      event_name: EventName.CREATED,
      price: 1024,
      item: 'Pizza',
      customer: 'John Smith',
      destination: '123 Test Ave',
      sent_at_second: 36,
    }
    // add to orders in state
    const orders: OrderObject = {}

    orders[order.id] = order
    orders['3658047'] = { ...order, id: '3658047', price: 1236 }
    orders['1430287'] = { ...order, id: '1430287', price: 1500 }
    orders['356047'] = { ...order, id: '356047', price: 270 }

    // add to cache
    cachingOrders.addOrUpdateCache(order)

    cachingOrders.addOrUpdateCache(orders['1430287'])
    cachingOrders.addOrUpdateCache(orders['1430287'])
    cachingOrders.addOrUpdateCache(orders['356047'])

    const state = setUp({
      state: {
        orders,
        searchText: '2.70',
      },
      action: {
        type: Types.Search,
        payload: {},
      },
    })

    expect(state.filteredOrders.length).toEqual(1)
    expect(state.filteredOrders[0].price).toEqual(270)
  })

  it('should show search orders that are no longer in order', () => {
    const order = {
      id: '2483795',
      event_name: EventName.DELIVERED,
      price: 1024,
      item: 'Pizza',
      customer: 'John Smith',
      destination: '123 Test Ave',
      sent_at_second: 36,
    }
    // add to orders in state
    const orders: OrderObject = {}

    orders[order.id] = order
    orders['3658047'] = { ...order, id: '3658047', price: 1236 }
    orders['356047'] = { ...order, id: '356047', price: 270 }

    // add to cache
    cachingOrders.addOrUpdateCache(order)

    cachingOrders.addOrUpdateCache({
      ...order,
      id: '1430287',
      price: 1500,
      event_name: EventName.CANCELLED,
    })
    cachingOrders.addOrUpdateCache(orders['356047'])

    const state = setUp({
      state: {
        orders,
        searchText: '15.00',
      },
      action: {
        type: Types.Search,
        payload: {},
      },
    })

    expect(state.filteredOrders.length).toEqual(1)
    expect(state.filteredOrders[0].price).toEqual(1500)
  })

  it('should have no orders when state orders does not exist', () => {
    const state = setUp({
      state: {
        searchText: '2.70',
      },
      action: {
        type: Types.Search,
        payload: {},
      },
    })

    expect(state.filteredOrders.length).toEqual(0)
  })
})
