/**
 * 是否未定义
 */
export function isUndef(v: unknown): boolean {
  return v === undefined || v === null
}

/**
 * 是否定义
 */
export function isDef(v: unknown): boolean {
  return v !== undefined && v !== null
}

/**
 * 是否布尔值 true
 */
export function isTrue(v: unknown): boolean {
  return v === true
}

/**
 * 是否布尔值 false
 */
export function isFalse(v: unknown): boolean {
  return v === false
}

/**
 * 是否对象 object
 */
export function isObject(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString

/**
 * 是否正则表达式
 */
export function isRegExp(v: unknown): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * 是否是promise对象
 */
export function isPromise(val: unknown): boolean {
  return (
    isDef(val) &&
    typeof (val as Promise<unknown>).then === 'function' &&
    typeof (val as Promise<unknown>).catch === 'function'
  )
}

/**
 * 空函数
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

/**
 * 合并对象
 * @param props 输入值
 * @param defaultProps 默认值
 */
export function merge<T>(props: T, defaultProps: unknown): T {
  return Object.assign(props, defaultProps)
}

/**
 * 字符串转小驼峰
 * @param str 字符串
 */
export function toLittleHump(str: string) {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1)
}
/**
 * 找出所以属性中的事件
 * @param props 属性
 */
const onEventReg = /^on(.+)/

type Props = {
  [index: string]: unknown
}

export function pickEvents(props: Props) {
  const result: Array<Array<string>> = []

  let match = null

  Object.keys(props).forEach(key => {
    match = key.match(onEventReg)
    if (match && match[1]) {
      result.push([toLittleHump(match[1]), key])
    }
  })

  return result
}
