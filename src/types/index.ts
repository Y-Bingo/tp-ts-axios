export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'

// 请求配置
export interface AxiosRequestConfig {
  // 请求地址
  url?: string
  // 请求HTTP方式
  method?: Method
  // 请求头
  headers?: any
  // post、patch等请求数据
  data?: any
  // get、head等请求数据
  params?: any
  // 响应类型
  responseType?: XMLHttpRequestResponseType
  // 超时时间( 单位：ms)
  timeout?: number
}

// 响应接口
export interface AxiosResponse {
  // 返回数据
  data: any
  // 状态码
  status: number
  // 状态消息
  statusText: string
  // 响应头
  headers: any
  // 配置对象
  config: AxiosRequestConfig
  // XMLHttpRequest对象实例
  request: any
}

// 返回promise对象
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 错误类型 继承Error
export interface AxiosError extends Error {
  // 请求配置
  config: AxiosRequestConfig
  // 错误码
  code?: string
  // 请求体
  request?: any
  // 响应体
  response?: AxiosResponse
  // 是否为axios的错误
  isAxiosError: boolean
}

export interface Axios {
  // 基础请求方法
  request(config: AxiosRequestConfig): AxiosPromise

  // method: GET
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  // method: HEAD
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  // method: OPTIONS
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  // method: DELETE
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  // method: POST
  post(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise
  // method: PUT
  put(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise
  // method: PATCH
  patch(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config?: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
