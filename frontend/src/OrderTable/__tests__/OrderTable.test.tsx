import { render, screen } from '@testing-library/react'
import { EventName } from '../../types'

import { OrderTable, OrderTableProps } from '../OrderTable'

describe('OrderTable', () => {
  const defaultProps: OrderTableProps = {
    orders: [],
  }
  const setUp = (props: Partial<OrderTableProps> = {}) => {
    render(<OrderTable {...defaultProps} {...props} />)
  }

  it('should show table', async () => {
    setUp({
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
    })

    await screen.findByText('John Smith')
    await screen.findByText('123 Test Ave')
    await screen.findByText('$10.24')
    await screen.findByText('1 number of order')
  })

  describe('when displaying number of orders', () => {
    it('should use plrarly for more then one order', async () => {
      setUp({
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
          {
            id: 'asdf',
            event_name: EventName.CREATED,
            price: 1024,
            item: 'Pizza',
            customer: 'John Smith',
            destination: '123 Test Ave',
            sent_at_second: 36,
          },
        ],
      })

      await screen.findByText('2 number of orders')
    })
  })

  describe('when no orders are found', () => {
    it('should show not found message', async () => {
      setUp()

      await screen.findByText('No Orders Found', { exact: false })
    })
  })
})
