import { CancelExecutor, CancelTokenSource, Canceler } from '../types'

import Cancel from './Cancel'

// tslint:disable-next-line: class-name
interface resolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: resolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      // 防止被重复调用
      if (this.reason) {
        return
      }
      // 用过一次之后就被赋值了
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequest() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
