import { FC } from 'react'

import { Order } from '../../types'

export type PriceCellProps = {
  price: Order['price']
}

export const PriceCell: FC<PriceCellProps> = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)

  return <td>{formattedPrice}</td>
}
