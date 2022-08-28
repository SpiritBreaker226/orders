import { InputHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const Textfield = styled.input<{ isErroring: boolean }>`
  margin-top: 4px;
  padding: 12px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  ${({ isErroring }) =>
    isErroring &&
    `
    outline-color: #ff0000;
    outline-style: solid;
    outline-width: 1px;`}
`

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ff0000;
`

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'classname' | 'id' | 'type'
>

export type TextBoxProps = {
  id: string
  inputProps?: InputProps
  errorMessage?: string
}

export const Textbox: FC<TextBoxProps> = ({ id, inputProps, errorMessage }) => {
  return (
    <>
      <Textfield
        type="text"
        id={id}
        isErroring={!!errorMessage}
        {...inputProps}
      />
      {errorMessage && (
        <ErrorMessage>
          <p>{errorMessage}</p>
        </ErrorMessage>
      )}
    </>
  )
}
