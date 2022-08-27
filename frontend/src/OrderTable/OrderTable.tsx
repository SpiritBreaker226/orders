import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../types'
import { PriceCell } from './Cells'

const NoOrdersFoundWrapper = styled.h2`
  margin: 80px;
  textalign: center;
`

export type OrderTableProps = {
  orders: Order[]
}

export const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <NoOrdersFoundWrapper>No Orders Found</NoOrdersFoundWrapper>
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Customer</th>
          <th scope="col">Price</th>
          <th scope="col">Item</th>
          <th scope="col">Destination</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: Order) => (
          <tr key={order.id}>
            <th scope="row">{order.customer}</th>
            <PriceCell price={order.price} />
            <td>{order.item}</td>
            <td>{order.destination}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
