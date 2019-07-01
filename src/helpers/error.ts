import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  // 请求配置
  config: AxiosRequestConfig
  // 错误码
  code?: string | null
  // 请求体
  request?: any
  // 响应体
  response?: AxiosResponse
  // 是否为axios的错误
  isAxiosError: boolean

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 处理ts继承内置对象的问题
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
