import { ChangeEvent, FC, useContext, useState } from 'react'
import styled from 'styled-components'

import { Textbox } from './Textbox'
import { debounce, isCurrency } from './helpers'
import { AppContext } from '../contexts'
import { Types } from '../types'

const DELAY_BEFORE_SEARCH = 2000

const SearchContainer = styled.section`
  text-align: right;
`

export const Search: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    state: { searchText },
    dispatch,
  } = useContext(AppContext)

  const debounceCallback = (searchText: string) => {
    if (searchText === '') {
      return
    }

    if (!isCurrency(searchText)) {
      setErrorMessage('Error: Search must format ###.## i.e. 6.00')
      return
    }

    dispatch({
      type: Types.UpdateSearchText,
      payload: { searchText },
    })
  }
  const debounceFn = debounce(debounceCallback, DELAY_BEFORE_SEARCH)
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')

    debounceFn(e.target.value.trim())
  }

  return (
    <SearchContainer>
      <Textbox
        id="order"
        inputProps={{
          value: searchText,
          placeholder: 'Search for price',
          onChange: handleTextChange,
        }}
        errorMessage={errorMessage}
      />
    </SearchContainer>
  )
}
