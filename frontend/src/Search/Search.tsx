import { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'

import { Textbox } from './Textbox'
import { debounce, searchForOrders } from './helpers'

const DELAY_BEFORE_SEARCH = 2000

const SearchContainer = styled.section`
  text-align: right;
`

export const Search: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const onError = (errorMessageFromServer: string) =>
    setErrorMessage(errorMessageFromServer)
  const debounceFn = debounce(searchForOrders, DELAY_BEFORE_SEARCH)
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value.trim(), onError)
  }

  return (
    <SearchContainer>
      <Textbox
        id="order"
        inputProps={{
          placeholder: 'Enter order',
          onChange: handleTextChange,
        }}
        errorMessage={errorMessage}
      />
    </SearchContainer>
  )
}
