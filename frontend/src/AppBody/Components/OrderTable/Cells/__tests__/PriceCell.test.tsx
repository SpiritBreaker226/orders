import { render, screen } from '@testing-library/react'

import { PriceCell, PriceCellProps } from '../PriceCell'

describe('PriceCell', () => {
  const defaultProps: PriceCellProps = {
    price: 0,
  }
  const setUp = (props: Partial<PriceCellProps> = {}) => {
    render(<PriceCell {...defaultProps} {...props} />)
  }

  it('should show price with cents', async () => {
    setUp({ price: 512 })

    await screen.findByText('$5.12')
  })

  it('should show price with no cents', async () => {
    setUp({ price: 600 })

    await screen.findByText('$6.00')
  })

  it('should show zero price', async () => {
    setUp({ price: 0 })

    await screen.findByText('$0.00')
  })

  it('should handle negative numbers', async () => {
    setUp({ price: -200 })

    await screen.findByText('-$2.00')
  })
})
