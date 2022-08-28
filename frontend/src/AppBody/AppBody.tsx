import styled from 'styled-components'
import { FC, useCallback, useContext, useEffect } from 'react'

import { getOrders } from './helpers'
import { OrderTable } from '../OrderTable'
import { Types } from '../types'
import { AppContext } from '../contexts'

const AppBodyConainer = styled.main`
  margin: 0 16px 16px;
`

export const AppBody: FC = () => {
  const {
    state: { orders },
    dispatch,
  } = useContext(AppContext)
  const dispatchOrders = useCallback(() => {
    getOrders((orders) =>
      dispatch({
        type: Types.ModifyOrders,
        payload: { orders },
      })
    )
  }, [dispatch])

  useEffect(() => {
    dispatchOrders()
  }, [dispatchOrders])

  return (
    <AppBodyConainer>
      <OrderTable orders={Object.values(orders)} />
    </AppBodyConainer>
  )
}
