import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器
export default class InterceptorManager<T> {
  private _interceptors: Array<Interceptor<T> | null>

  constructor() {
    this._interceptors = []
  }

  // 注册拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this._interceptors.push({ resolved, rejected })
    return this._interceptors.length - 1
  }

  // 注销拦截器
  eject(id: number): void {
    if (this._interceptors.length <= id) return

    this._interceptors[id] = null
  }

  // 遍历拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this._interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
