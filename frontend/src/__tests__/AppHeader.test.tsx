import { render, screen } from '@testing-library/react'

import { AppHeader } from '../AppHeader'
import { AppProvider, initialState } from '../testUtil'
import { EventName, InitialState } from '../types'

describe('AppHeader', () => {
  const setUp = (state: Partial<InitialState> = {}) => {
    render(
      <AppProvider state={{ ...initialState, ...state }}>
        <AppHeader />
      </AppProvider>
    )
  }

  describe('when displaying number of orders', () => {
    it('should use not plrarly one order', async () => {
      setUp({
        orders: {
          '9817324': {
            id: '9817324',
            event_name: EventName.CREATED,
            price: 1024,
            item: 'Pizza',
            customer: 'John Smith',
            destination: '123 Test Ave',
            sent_at_second: 36,
          },
        },
      })

      await screen.findByText('1 number of order')
    })

    it('should use plrarly for more then one order', async () => {
      setUp({
        orders: {
          '9817324': {
            id: '9817324',
            event_name: EventName.CREATED,
            price: 1024,
            item: 'Pizza',
            customer: 'John Smith',
            destination: '123 Test Ave',
            sent_at_second: 36,
          },
          '2789345': {
            id: '2789345',
            event_name: EventName.CREATED,
            price: 512,
            item: 'Salad',
            customer: 'John Smith',
            destination: '123 Test Ave',
            sent_at_second: 36,
          },
        },
      })

      await screen.findByText('2 number of orders')
    })
  })
})
