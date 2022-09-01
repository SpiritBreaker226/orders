import styled from 'styled-components'
import { FC, useCallback, useContext, useEffect } from 'react'

import { getOrders } from './helpers'
import { OrderTable } from '../OrderTable'
import { Types } from '../types'
import { AppContext } from '../contexts'
import cachingOrders from '../cache/cachingOrders'

const AppBodyConainer = styled.main`
  margin: 0 16px 16px;
`

export const AppBody: FC = () => {
  const {
    state: { orders: nonFillterOrders, filteredOrders, searchText },
    dispatch,
  } = useContext(AppContext)
  const orders = filteredOrders.length
    ? filteredOrders
    : Object.values(nonFillterOrders)
  const dispatchOrders = useCallback(() => {
    getOrders((orders) => {
      dispatch({
        type: Types.ModifyOrders,
        payload: { orders },
      })

      cachingOrders.bulkModifyCache(orders)
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
      <OrderTable orders={orders} />
    </AppBodyConainer>
  )
}
