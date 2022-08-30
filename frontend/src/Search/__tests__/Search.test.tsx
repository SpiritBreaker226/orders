import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AppProvider, initialState } from '../../testUtil'
import { InitialState } from '../../types'

import { Search } from '../Search'

let mockIsCurrency = false
const mockDispatch = jest.fn()

jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  isCurrency: () => mockIsCurrency,
}))

jest.useFakeTimers()

describe('Search', () => {
  const setUp = (
    state: Partial<InitialState> = {},
    dispatch = mockDispatch
  ) => {
    render(
      <AppProvider state={{ ...initialState, ...state }} dispatch={dispatch}>
        <Search />
      </AppProvider>
    )
  }

  beforeEach(() => {
    mockIsCurrency = false
  })

  describe('when text is a proper format currecy', () => {
    it('should call dispatch', async () => {
      mockIsCurrency = true

      setUp()

      fireEvent.change(await screen.findByRole('textbox'), {
        target: { value: '$5.12' },
      })

      expect(mockDispatch).toBeCalled()
    })
  })

  it('should show error message on not formated as a currency', async () => {
    setUp()

    fireEvent.change(await screen.findByRole('textbox'), {
      target: { value: 'really' },
    })

    screen.getByText('format ###.##', { exact: false })
  })

  describe('after deleting its value', () => {
    it('should have an empty value with no error message', async () => {
      setUp()

      fireEvent.change(await screen.findByRole('textbox'), {
        target: { value: ' ' },
      })

      expect(
        screen.queryByText('format ###.##', { exact: false })
      ).not.toBeInTheDocument()
    })
  })
})
