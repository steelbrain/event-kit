'use strict'

/* @flow */

import type {Disposable} from './disposable'

export class CompositeDisposable {
  disposed: boolean;
  disposables: Set<Disposable>;

  constructor(){
    this.disposed = false
    this.disposables = new Set(arguments)
  }
  add(){
    if (!this.disposed) {
      let length = arguments.length
      for (let i = 0; i < length; ++i) {
        this.disposables.add(arguments[i])
      }
    }
  }
  remove(){
    if (!this.disposed) {
      let length = arguments.length
      for (let i = 0; i < length; ++i) {
        this.disposables.delete(arguments[i])
      }
    }
  }
  clear(){
    if (!this.disposed) {
      this.disposables.clear()
    }
  }
  isDisposed(): boolean {
    return this.disposed
  }
  dispose(){
    if (!this.disposed) {
      this.disposed = true
      this.disposables.forEach(function(item) {
        item.dispose()
      })
      this.disposables.clear()
    }
  }
}
