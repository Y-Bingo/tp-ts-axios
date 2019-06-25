import { isPlainObject } from './utils'

/**
 * 转换请求体 data 包含 Document 和 BodyInit 类型，
 * BodyInit包括了Blob,BufferSource,FormData, URLSearchParams, ReadableStream,USVString, 当没有数据的时候可以传入null
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
