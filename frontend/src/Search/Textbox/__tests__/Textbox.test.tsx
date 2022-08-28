import { render, screen } from '@testing-library/react'

import { Textbox, TextBoxProps } from '../Textbox'

describe('Textbox', () => {
  const defaultProps: TextBoxProps = {
    id: 'test',
    inputProps: { placeholder: 'Testing the test' },
  }
  const setUp = (props: Partial<TextBoxProps> = {}) =>
    render(<Textbox {...defaultProps} {...props} />)

  it('should show label', async () => {
    setUp({ inputProps: { placeholder: 'testing' } })

    await screen.findByPlaceholderText('testing')
  })

  it('should show error message', async () => {
    setUp({ errorMessage: 'erroring' })

    await screen.findByText('erroring')
  })
})
