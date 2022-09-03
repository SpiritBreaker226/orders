import { FC, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from './contexts'

import { Search } from './Search'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
  transition: all 0.3s linear 0s;
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const HeaderContent = styled.div`
  padding: 0 12px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin 16px 0;
  }
`

const NumberOfOrders = styled.div`
  padding-bottom: 12px;
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
      <HeaderContent>
        <Header>
          <h1>CloudKitchens</h1>

          <Search />
        </Header>

        <NumberOfOrders>
          {orders.length} {numberOfOrderText}
        </NumberOfOrders>
      </HeaderContent>
    </HeaderContainer>
  )
}
