const toString = Object.prototype.toString

// ts 谓词保护
// 是否为日期
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// 是否为对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
