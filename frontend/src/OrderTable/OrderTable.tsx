import { FC } from 'react'
import styled from 'styled-components'

import { Order } from '../types'
import { CustomerCell, DestinationCell, ItemCell, PriceCell } from './Cells'

const NoOrdersFoundWrapper = styled.h2`
  margin: 80px;
  textalign: center;
`

const OrdersTable = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;

  tr {
    color: inherit;
    display: table-row;
    outline: 0;
    vertical-align: middle;
  }

  th {
    font-weight: 500;
    padding-bottom: 16px;
    text-align: left;
  }
`

const OrdersTableHeader = styled.thead`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`

const OrdersTableBody = styled.tbody`
  display: table-row-group;

  td {
    display: table-cell;
    padding: 16px 0;
    text-align: left;
    font-weight: 400;
    border-bottom: 1px solid rgba(81, 81, 81, 1);
  }
`

export type OrderTableProps = {
  orders: Order[]
}

export const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <NoOrdersFoundWrapper>No Orders Found</NoOrdersFoundWrapper>
  }

  return (
    <OrdersTable>
      <OrdersTableHeader>
        <tr>
          <th scope="col">Customer</th>
          <th scope="col">Price</th>
          <th scope="col">Item</th>
          <th scope="col">Destination</th>
        </tr>
      </OrdersTableHeader>
      <OrdersTableBody>
        {orders.map((order: Order) => (
          <tr key={order.id}>
            <CustomerCell customer={order.customer} />
            <PriceCell price={order.price} />
            <ItemCell item={order.item} />
            <DestinationCell destination={order.destination} />
          </tr>
        ))}
      </OrdersTableBody>
    </OrdersTable>
  )
}
