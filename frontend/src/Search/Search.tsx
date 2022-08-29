import { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'

import { Textbox } from './Textbox'
import { debounce, isCurrency, searchForOrders } from './helpers'

const DELAY_BEFORE_SEARCH = 2000

const SearchContainer = styled.section`
  text-align: right;
`

export const Search: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const onError = (errorMessageFromServer: string) =>
    setErrorMessage(errorMessageFromServer)
  const debounceCallback = (searchText: string, onError: () => void) => {
    if (searchText === '') {
      return
    }

    if (!isCurrency(searchText)) {
      setErrorMessage('Error: Search must format ###.## i.e. 6.00')
      return
    }

    searchForOrders(searchText, onError)
  }
  const debounceFn = debounce(debounceCallback, DELAY_BEFORE_SEARCH)
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')

    debounceFn(e.target.value.trim(), onError)
  }

  return (
    <SearchContainer>
      <Textbox
        id="order"
        inputProps={{
          placeholder: 'Search for price',
          onChange: handleTextChange,
        }}
        errorMessage={errorMessage}
      />
    </SearchContainer>
  )
}
