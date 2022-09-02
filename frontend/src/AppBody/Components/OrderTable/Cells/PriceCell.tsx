import { FC } from 'react'
import styled from 'styled-components'
import { formatCurrency } from '../../../../helpers'

import { Order } from '../../../../types'

const OrdersTableCell = styled.td`
  width: 10%;
`

export type PriceCellProps = {
  price: Order['price']
}

export const PriceCell: FC<PriceCellProps> = ({ price }) => (
  <OrdersTableCell>{formatCurrency(price)}</OrdersTableCell>
)
