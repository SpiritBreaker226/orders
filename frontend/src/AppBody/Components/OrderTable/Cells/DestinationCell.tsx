import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../../../../types'

const OrdersTableCell = styled.td`
  width: 35%;
`

export type DestinationCellProps = {
  destination: Order['destination']
}

export const DestinationCell: FC<DestinationCellProps> = ({ destination }) => {
  return <OrdersTableCell>{destination}</OrdersTableCell>
}
