import { initialState } from '../../contexts'
import {
  Action,
  EventName,
  InitialState,
  OrderObject,
  Types,
} from '../../types'
import { searchReducer } from '../searchReducer'

describe('searchReducer', () => {
  const setUp = ({
    action,
    state = {},
  }: {
    action: Action
    state?: Partial<InitialState>
  }) => searchReducer({ ...initialState, ...state }, action)

  it('should search orders', () => {
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
        searchText: '2.70',
      },
      action: {
        type: Types.Search,
        payload: {},
      },
    })

    expect(state.filteredOrders.length).toEqual(1)
    expect(state.filteredOrders[0].price).toEqual(270)
    expect(state.orders['zdsjkf']).toBeTruthy()
  })
})
