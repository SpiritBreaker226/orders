import styled from 'styled-components'
import { FC, useState } from 'react'

import { getOrders } from './helpers'
import { OrderTable } from '../OrderTable'
import { Order } from '../types'

const AppBodyConainer = styled.main`
  margin: 0 16px 16px;
`

export const AppBody: FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  getOrders((ordersFromServer) => setOrders(ordersFromServer))

  return (
    <AppBodyConainer>
      <OrderTable orders={orders} />
    </AppBodyConainer>
  )
}
