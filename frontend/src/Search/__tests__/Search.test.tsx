import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AppProvider, initialState } from '../../testUtil'
import { InitialState } from '../../types'

import { Search } from '../Search'

let mockIsCurrency = false
const mockSearchForOrders = jest.fn()

jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  isCurrency: () => mockIsCurrency,
  searchForOrders: () => mockSearchForOrders,
}))

jest.useFakeTimers()

describe('Search', () => {
  const setUp = (state: Partial<InitialState> = {}) => {
    render(
      <AppProvider state={{ ...initialState, ...state }}>
        <Search />
      </AppProvider>
    )
  }

  beforeEach(() => {
    mockIsCurrency = false
  })

  it('should show error message on not formated as a currency', async () => {
    setUp()

    fireEvent.change(await screen.findByRole('textbox'), {
      target: { value: 'really' },
    })

    jest.runAllTimers()

    await waitFor(() => {
      screen.getByText('format ###.##', { exact: false })
    })
  })

  it('should not show error message or call debounce on empty string', async () => {
    setUp()

    fireEvent.change(await screen.findByRole('textbox'), {
      target: { value: 'really' },
    })

    jest.runAllTimers()

    fireEvent.change(await screen.findByRole('textbox'), {
      target: { value: '' },
    })

    expect(
      screen.queryByText('format of ###.##', { exact: false })
    ).not.toBeInTheDocument()
  })
})
