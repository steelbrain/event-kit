/* @flow */

import { validate } from './helpers'
import type Disposable from './disposable'

export default class CompositeDisposable {
  disposed: boolean;
  disposables: Set<Disposable | (() => void)>;

  constructor(...params: Array<any>) {
    validate(params)

    this.disposed = false
    this.disposables = new Set(params)
  }
  add(...params: Array<any>): void {
    if (this.disposed) {
      return
    }
    validate(params)
    for (let i = 0, length = params.length; i < length; ++i) {
      this.disposables.add(params[i])
    }
  }
  delete(...params: Array<any>): void {
    if (this.disposed) {
      return
    }
    for (let i = 0, length = params.length; i < length; ++i) {
      this.disposables.delete(params[i])
    }
  }
  clear(): void {
    if (this.disposed) {
      return
    }
    this.disposables.clear()
  }
  dispose(): void {
    if (this.disposed) {
      return
    }
    for (const item of this.disposables) {
      if (typeof item.dispose === 'function') {
        item.dispose()
      } else if (typeof item === 'function') {
        item()
      }
    }
    this.disposed = true
    this.disposables.clear()
  }
}
