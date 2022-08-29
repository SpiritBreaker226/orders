import { render, screen } from '@testing-library/react'

import { AppProvider, initialState } from '../../testUtil'
import { EventName, InitialState } from '../../types'

import { AppBody } from '../AppBody'

describe('AppBody', () => {
  const setUp = (state: Partial<InitialState> = {}) => {
    render(
      <AppProvider state={{ ...initialState, ...state }}>
        <AppBody />
      </AppProvider>
    )
  }

  it('should show table with non filter orders', async () => {
    setUp({
      orders: {
        dfsajkllf423: {
          id: 'dfsajkllf423',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
      },
    })

    await screen.findByText('John Smith')
    await screen.findByText('123 Test Ave')
    await screen.findByText('$10.24')
  })

  it('should show table with filter orders', async () => {
    setUp({
      orders: {
        dfsajkllf423: {
          id: 'dfsajkllf423',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
        asdf: {
          id: 'asdf',
          event_name: EventName.CREATED,
          price: 720,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
        adfslj: {
          id: 'adfslj',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
      },
      filteredOrders: [
        {
          id: 'dfsajkllf423',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
        {
          id: 'adfslj',
          event_name: EventName.CREATED,
          price: 1024,
          item: 'Pizza',
          customer: 'John Smith',
          destination: '123 Test Ave',
          sent_at_second: 36,
        },
      ],
    })

    expect(screen.queryAllByText('$7.20').length).toEqual(0)
    expect((await screen.findAllByText('$10.24')).length).toEqual(2)
  })
})
