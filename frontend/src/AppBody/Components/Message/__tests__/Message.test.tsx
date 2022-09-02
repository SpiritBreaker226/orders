import { render, screen } from '@testing-library/react'
import { EventName } from '../../../../types'

import { Message, MessageProps } from '../Message'

describe('Message', () => {
  const defaultProps: MessageProps = {
    hasNoOrdersInSearch: false,
  }
  const setUp = (props: Partial<MessageProps> = {}) => {
    render(<Message {...defaultProps} {...props} />)
  }

  it('should show waiting for order message', async () => {
    setUp({ hasNoOrdersInSearch: false })

    await screen.findByText('Waiting for more orders', { exact: false })
  })

  describe('when no orders are found', () => {
    it('should show not found message', async () => {
      setUp({ hasNoOrdersInSearch: true })

      await screen.findByText('No Orders Found', { exact: false })
    })
  })
})
