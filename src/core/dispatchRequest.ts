import xhr from './xhr'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformResponse } from '../helpers/data'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequest(config)
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transform(res.data, config.headers, res.config.transformResponse)
    return res
  })
}

// 请求参数预处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// url处理
function transformURL(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}

// token检查，使用过的token则抛出
function throwIfCancellationRequest(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}

export default dispatchRequest
