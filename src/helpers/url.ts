import { isDate, isPlainObject, isURLSearchParams } from './utils'

// URL源
interface URLOrigin {
  // 协议
  protocol: string
  // 域名
  host: string
}

// 进行URI编码 支持特殊字符
/**
 * 特殊字符支持
 * 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
 * params: {
 *     foo: '@:$, '
 * }
 * 最终请求的 url 是 /base/get?foo=@:$+，注意，我们会把空格 转换成 +
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/g, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 *  axios({
 *      method: 'get',
 *      url: '/base/get',
 *      params: {
 *      }
 * })
 * 根据params来构建url
 */
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]

      /**
       * 空值忽略
       * 对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的
       * params: {
       *     foo: 'bar',
       *     baz: null
       * }
       * 最终请求的 url 是 /base/get?foo=bar
       */
      if (val === null || typeof val === 'undefined') {
        return
      }

      let values = []
      /**
       * 参数值为数组
       * params: {
       *     foo: ['bar', 'baz']
       * }
       * 最终请求的 url 是 /base/get?foo[]=bar&foo[]=baz'
       */
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          /**
           * 参数值为Date类型
           * params: {
           *     foo: new Date()
           * }
           * 最终请求的 url 是 /base/get?date=2019-04-01T05:55:39.030Z，date 后面拼接的是 date.toISOString() 的结果
           */
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          /**
           * 参数值为对象
           * params: {
           *     foo: {
           *          bar: 'baz'
           *     }
           * }
           * 最终请求的 url 是 /base/get?foo=%7B%22bar%22:%22baz%22%7D，foo 后面拼接的是 {"bar":"baz"} encode 后的结果
           */
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  // 拼接
  if (serializedParams) {
    /**
     * 丢弃 url 中的哈希标记
     * url: '/base/get#hash',
     * params: {
     *     foo: 'bar'
     * }
     * 最终请求的 url 是 /base/get?foo=bar
     */
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    /**
     * 保留 url 中已存在的参数
     * url: '/base/get?foo=bar',
     * params: {
     *     bar: 'baz'
     * }
     * 最终请求的 url 是 /base/get?foo=bar&bar=baz
     */
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

// 判断是否是同源
export function isURLSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL)
  return parseOrigin.host === currentOrigin.host && parseOrigin.protocol === currentOrigin.protocol
}
// 通过构建a标签类获取url的protocol和host
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
// 解析URL => protocol:host
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode
  return { protocol, host }
}
