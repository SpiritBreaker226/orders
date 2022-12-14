import styled from 'styled-components'
import { FC, useCallback, useContext, useEffect } from 'react'

import { getOrders } from './helpers'
import { Message, OrderTable } from './Components'
import { Types } from '../types'
import { AppContext } from '../contexts'
import cachingOrders from '../cache/cachingOrders'

const AppBodyConainer = styled.main`
  margin: 112px 16px 16px;
`

export const AppBody: FC = () => {
  const {
    state: { orders: nonFillterOrders, filteredOrders, searchText },
    dispatch,
  } = useContext(AppContext)
  const orders = searchText ? filteredOrders : Object.values(nonFillterOrders)
  const dispatchOrders = useCallback(() => {
    getOrders((orders) => {
      // update cache first so that any new orders can be display in the search
      // if it meets the search criteria
      cachingOrders.bulkModifyCache(orders)

      dispatch({
        type: Types.ModifyOrders,
        payload: { orders },
      })

      dispatch({
        type: Types.RemoveComplatedOrders,
        payload: { orders },
      })
    })

    if (searchText.length) {
      dispatch({ type: Types.Search, payload: {} })
    }
  }, [dispatch])

  useEffect(() => {
    dispatchOrders()
  }, [dispatchOrders])

  return (
    <AppBodyConainer>
      {orders.length ? (
        <OrderTable orders={orders} />
      ) : (
        <Message hasNoOrdersInSearch={!!searchText} />
      )}
    </AppBodyConainer>
  )
}
