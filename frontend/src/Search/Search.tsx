import { ChangeEvent, FC, useContext, useState } from 'react'
import styled from 'styled-components'

import { Textbox } from './Textbox'
import { isCurrency } from './helpers'
import { AppContext } from '../contexts'
import { Types } from '../types'

const SearchContainer = styled.section`
  text-align: right;
`

export const Search: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    state: { searchText },
    dispatch,
  } = useContext(AppContext)
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')

    if (e.target.value === '') {
      return
    }

    if (!isCurrency(e.target.value)) {
      setErrorMessage('Error: Search must format ###.## i.e. 6.00')
      return
    }

    dispatch({
      type: Types.UpdateSearchText,
      payload: { searchText: e.target.value },
    })
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
