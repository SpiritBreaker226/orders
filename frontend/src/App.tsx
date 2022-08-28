import styled from 'styled-components'
import { useState } from 'react'

import { OrderTable } from './OrderTable'
import { Order } from './types'
import { Search } from './Search'

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`

const AppBody = styled.main`
  margin: 0 16px 16px;
`

const App = () => {
  const [orders, setOrders] = useState<Order[]>([])

  return (
    <AppContainer>
      <AppHeader>
        <h1>CloudKitchens</h1>

        <Search />
      </AppHeader>

      <AppBody>
        <OrderTable orders={orders} />
      </AppBody>
    </AppContainer>
  )
}

export default App
