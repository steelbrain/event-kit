'use strict'

/* @flow */

export class Disposable{
  disposed: boolean;
  callback: ?(() => void);

  constructor(callback: (() => void)){
    this.disposed = false
    this.callback = callback
  }
  isDisposed(): boolean {
    return this.disposed
  }
  dispose(){
    if (!this.disposed) {
      this.disposed = true
      if(typeof this.callback === 'function'){
        this.callback()
      }
      this.callback = null
    }
  }
}
