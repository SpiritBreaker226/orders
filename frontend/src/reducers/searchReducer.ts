import { Action, InitialState, Types } from '../types'

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateSearchText:
      return {
        ...state,
        searchText: action.payload.searchText,
      }
    default:
      return state
  }
}
