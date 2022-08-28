import { debounce } from '../debounce'

jest.useFakeTimers()

describe('debounce', () => {
  const mockCallback = jest.fn()

  it('should execute callback function once', () => {
    const debounceFunc = debounce(mockCallback, 1000)

    expect(mockCallback).toHaveBeenCalledTimes(0)

    debounceFunc()
    debounceFunc()

    expect(mockCallback).toHaveBeenCalledTimes(0)

    jest.runAllTimers()

    expect(mockCallback).toBeCalledTimes(1)
  })
})
