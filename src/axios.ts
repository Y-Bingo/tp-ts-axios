import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import { Axios } from './core/core'
import { extend } from './helpers/utils'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // 把 context 中的原型方法和实例方法全部拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config?: AxiosRequestConfig) {
  config = mergeConfig(defaults, config || {})
  return createInstance(config)
}

export default axios
