import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()
    // 打开一个连接
    request.open(method.toUpperCase(), url, true)
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

    // 监听请求状态
    request.onreadystatechange = function() {
      // 判断请求状态
      if (request.readyState !== 4) return
      // 获取响应数据
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      // 获取响应头
      const responseHeaders = request.getAllResponseHeaders()
      // 购将响应数据
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
    // 发送
    request.send(data)
  })
}
