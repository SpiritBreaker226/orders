import { FC } from 'react'
import styled from 'styled-components'

const MessageWrapper = styled.section`
  margin: 80px;
  text-align: center;

  p {
    font-weight: bold;
  }
`

export type MessageProps = {
  hasNoOrdersInSearch: boolean
}

export const Message: FC<MessageProps> = ({ hasNoOrdersInSearch }) => {
  return (
    <MessageWrapper>
      {hasNoOrdersInSearch ? (
        <p>No orders found</p>
      ) : (
        <p>Waiting for more orders</p>
      )}
    </MessageWrapper>
  )
}
