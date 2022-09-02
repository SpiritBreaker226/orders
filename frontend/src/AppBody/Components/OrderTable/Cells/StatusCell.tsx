import { FC } from 'react'
import styled from 'styled-components'

import { EventName, Order } from '../../../../types'

const OrdersTableCell = styled.td`
  width: 10%;
`

export type StatusCellProps = {
  status: Order['event_name']
}

export const StatusCell: FC<StatusCellProps> = ({ status }) => {
  switch (status) {
    case EventName.CREATED:
      return <OrdersTableCell>Order created</OrdersTableCell>
    case EventName.COOKED:
      return <OrdersTableCell>Being prepare</OrdersTableCell>
    case EventName.DRIVER_RECEIVED:
      return <OrdersTableCell>Out for delivery</OrdersTableCell>
    case EventName.DELIVERED:
      return <OrdersTableCell>Delivered</OrdersTableCell>
    default:
      return <OrdersTableCell>Cancelled</OrdersTableCell>
  }
}
