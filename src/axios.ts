import { AxiosInstance, AxiosRequestConfig } from './types'
import { Axios } from './core/core'
import { extend } from './helpers/utils'
import defaults from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // 把 context 中的原型方法和实例方法全部拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
