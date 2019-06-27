import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'

const strateMap = Object.create(null)

// 默认合并策略 val2 覆盖 val1
// 自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置
function defaultStrate(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// val2策略，存在val2直接覆盖
// 因为对于 url、params、data 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取
function fromVal2Strate(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 复杂对象策略
function deepMergeStrate(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const strateKeysFromVal2 = ['url', 'params', 'data']

strateKeysFromVal2.forEach(key => {
  strateMap[key] = fromVal2Strate
})

const strateKeysDeepMerge = ['headers']

strateKeysDeepMerge.forEach(key => {
  strateMap[key] = deepMergeStrate
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (let key in config2) {
    mergeFiled(key)
  }

  // 没有自定配置的，使用默认配置
  for (let key in config1) {
    if (config2[key]) continue

    mergeFiled(key)
  }

  function mergeFiled(key: string): void {
    const strate = strateMap[key] || defaultStrate
    config[key] = strate(config1[key], config2![key])
  }

  return config
}
