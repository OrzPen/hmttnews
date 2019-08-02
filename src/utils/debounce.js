// 防抖函数的写法
/**
 * debounce
 * 形参1: func 函数->频繁触发的函数
 * 形参2: wait 延迟执行的事件
 * return 函数
 */
// const fn = (debounce(fn1,800))
// fn()
export const debounce = function (func, wait) {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
