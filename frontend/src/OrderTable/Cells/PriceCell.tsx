import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../../types'

const OrdersTableCell = styled.td`
  width: 10%;
`

export type PriceCellProps = {
  price: Order['price']
}

export const PriceCell: FC<PriceCellProps> = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)

  return <OrdersTableCell>{formattedPrice}</OrdersTableCell>
}
