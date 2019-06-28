import { Interceptors } from '../core/core'

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

  [key: string]: any

  // 请求预处理
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  // 响应预处理
  transformResponse?: AxiosTransformer | AxiosTransformer[]
}

// 预处理函数
export interface AxiosTransformer {
  (data: any, header?: any): any
}

// 响应接口
export interface AxiosResponse<T = any> {
  // 返回数据
  data: T
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
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  // 默认配置
  defaults: AxiosRequestConfig
  // 拦截器
  interceptors: Interceptors

  // 基础请求方法
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // method: GET
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  // method: HEAD
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  // method: OPTIONS
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  // method: DELETE
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  // method: POST
  post<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  // method: PUT
  put<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  // method: PATCH
  patch<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config?: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

// 拦截器管理类
// 拦截器分为两种： 请求拦截器 | 响应拦截器
// T 对应两种不同的类型： AxiosRequestConfig | AxiosResponse
export interface InterceptorManager<T> {
  user(resolved: ResolvedFn<T>, rejected: RejectedFn): number

  eject(id: number): void
}
// resolve函数接口
export interface ResolvedFn<T = any> {
  (val: T): Promise<T> | T
}
// reject函数接口
export interface RejectedFn {
  (err: any): any
}
