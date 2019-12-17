
/**
 * @file utils/common.js
 * @author James Wang <github.com/cn-wx>
 */

/*************************************************************
 * Debounce                                                  *
 * @param {Function} fn function to be executed              *
 * @param {Number} wait waiting time to execute the function *
 *************************************************************/
export function debounce (fn, wait) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

/*************************************************************
 * Throttle                                                  *
 * @param {Function} fn                                      *
 * @param {Number} delay delay time                          *
 *************************************************************/
export function throttle (fn, delay) {
  let timer = null
  let startTime = Date.now()
  return function () {
    const self = this
    const args = arguments
    const curTime = Date.now()
    let remaining = delay - (curTime - startTime)
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(self, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}
