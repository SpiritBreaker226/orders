import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../../types'

const OrdersTableCell = styled.td`
  width: 30%;
`

export type CustomerCellProps = {
  customer: Order['customer']
}

export const CustomerCell: FC<CustomerCellProps> = ({ customer }) => {
  return <OrdersTableCell>{customer}</OrdersTableCell>
}
