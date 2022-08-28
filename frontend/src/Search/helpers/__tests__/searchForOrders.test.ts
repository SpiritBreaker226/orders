import { searchForOrders } from '../searchForOrders'

const mockedSocket = jest.fn()

jest.mock('socket.io-client', () => ({
  io: jest.fn(),
}))

describe.skip('searchForOrders', () => {
  const mockCallbackFromSearching = jest.fn()
  it('should call orders socket with query', () => {
    searchForOrders('pizza', mockCallbackFromSearching)
    // expect(callbackFunc).toBeCalledTimes(1)
  })
  it('should return an error on orders socket with query', () => {
    searchForOrders('bad food', mockCallbackFromSearching)
    expect(mockCallbackFromSearching).toBeCalledTimes(1)
  })
})
