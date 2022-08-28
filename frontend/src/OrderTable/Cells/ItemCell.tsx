import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../../types'

const OrdersTableCell = styled.td`
  width: 20%;
`

export type ItemCellProps = {
  item: Order['item']
}

export const ItemCell: FC<ItemCellProps> = ({ item }) => {
  return <OrdersTableCell>{item}</OrdersTableCell>
}
