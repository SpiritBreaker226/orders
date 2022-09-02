import { FC, createContext, Dispatch, useReducer, ReactNode } from 'react'

import { InitialState, Action } from '../types'
import { combineReducer, ordersReducer, searchReducer } from '../reducers'

export const initialState: InitialState = {
  orders: {},
  filteredOrders: [],
  searchText: '',
}

/* istanbul ignore next */
const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<any>
}>({
  state: initialState,
  // Add code coverage ignore to create context as there is no way for
  // developers nor the user to access the dispatch directly. As a result, no
  // test, require to test that path so that this line can safely ignore.
  dispatch: () => null,
})

const mainReducer = (state: InitialState, action: Action) => {
  let currentState = ordersReducer(state, action)

  currentState = searchReducer(currentState, action)

  return combineReducer(currentState, action)
}

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
