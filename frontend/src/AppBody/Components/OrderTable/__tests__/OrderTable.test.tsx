import { render, screen } from '@testing-library/react'
import { EventName } from '../../../../types'

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
          id: '89170234',
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
  })
})
