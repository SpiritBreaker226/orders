import { FC, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from './contexts'

import { Search } from './Search'

const HeaderContainer = styled.div`
  padding: 0 8px;
`

const Header = styled.header`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin 16px 0;
  }
`

const NumberOfOrders = styled.div`
  padding-bottom: 8px;
  text-align: right;
`

export const AppHeader: FC = () => {
  const {
    state: { orders: nonFillterOrders, filteredOrders, searchText },
  } = useContext(AppContext)
  const orders = searchText ? filteredOrders : Object.values(nonFillterOrders)
  const numberOfOrderText = `number of order${orders.length > 1 ? 's' : ''}`

  return (
    <HeaderContainer>
      <Header>
        <h1>CloudKitchens</h1>

        <Search />
      </Header>

      <NumberOfOrders>
        {orders.length} {numberOfOrderText}
      </NumberOfOrders>
    </HeaderContainer>
  )
}
