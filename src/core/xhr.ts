import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()
    // 打开一个连接
    request.open(method.toUpperCase(), url!, true)
    // 设置请求头
    Object.keys(headers).forEach(name => {
      // 判断没有请求body的时候 不设置headers[ content-type ]
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    // 设置请求类型
    if (responseType) {
      request.responseType = responseType
    }
    // 设置超时时间
    if (timeout) {
      request.timeout = timeout
    }

    // 监听网络错误
    request.onerror = function handleError() {
      reject(createError('##NETWORK 网络连接错误', config, null, request))
    }
    // 监听超时
    request.ontimeout = function handlerTimeout() {
      reject(
        createError(` ##TIMEOUT 网络连接超时: ${this.timeout}`, config, 'ECONNABORTED', request)
      )
    }
    // 监听请求状态
    request.onreadystatechange = function handleLoad() {
      // 判断请求状态
      if (request.readyState !== 4) return
      if (request.status === 0) return
      // 获取响应数据
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      // 获取响应头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 购将响应数据
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // 响应错误处理
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `##STATUS 请求失败 状态码: ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
      // handlerResponse( response, resolve, reject )
    }

    if (cancelToken) {
      // tslint:disable-next-line: no-floating-promises
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 发送
    request.send(data)
  })
}

/**
 * @deprecated
 * fixme
 * 响应处理 处理非200状态码
 * 对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，
 * 对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理
 * @param res
 */
function handlerResponse<T extends AxiosResponse>(
  res: T,
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
): void {
  if (res.status >= 200 && res.status < 300) {
    resolve(res)
  } else {
    reject(new Error(`##STATUS 请求失败 状态码: ${res.status}`))
  }
}
