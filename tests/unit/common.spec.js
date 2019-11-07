const utils = require('@/components/utils/common.js')
jest.useFakeTimers()

describe('utils/common.js', () => {
  let func

  beforeEach(() => {
    func = jest.fn()
  })

  it('throttle execute just once', () => {
    const throttle = utils.throttle
    const throttledFunc = throttle(func, 1000)

    for (let i = 0; i < 100; i++) {
      throttledFunc()
    }

    // fast-forward time
    jest.runAllTimers()

    expect(func).toBeCalledTimes(1)
  })

  it('debounce execute just once', () => {
    const debounce = utils.debounce
    const debouncedFunc = debounce(func, 1000)

    for (let i = 0; i < 100; i++) {
      debouncedFunc()
    }

    // fast-forward time
    jest.runAllTimers()

    expect(func).toBeCalledTimes(1)
  })
})
