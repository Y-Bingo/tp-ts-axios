import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'

/**
 *
 * 规范化 header 属性名
 * @param headers
 * @param normalizeName
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理headers
 * @param headers
 * @param data
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * 解析响应头
 * string  =》 [ object Object ]
 * @param headers
 */
export function parseHeaders(headers: string): any {
  let parse = Object.create(null)
  if (!headers) return parse

  headers.split(`\r\n`).forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      parse[key] = val
    }
  })

  return parse
}

/**
 * 扁平化请求头
 * 根据请求的方法，把配置中的headers 扁平化 成只有一层
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  // 参数右边覆盖左边的的headers
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  // 清空headers其他的不需要的东西
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(methods => {
    delete headers[methods]
  })

  return headers
}
