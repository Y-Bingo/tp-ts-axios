import { isPlainObject } from './utils'

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
