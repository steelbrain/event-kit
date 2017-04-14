/* @flow */

import Disposable from './disposable'

export default class Emitter {
  disposed: boolean;
  handlers: Object;

  constructor() {
    this.disposed = false
    this.handlers = {}
  }
  on(eventName: string, handler: Function): Disposable {
    if (this.disposed) {
      throw new Error('Emitter has been disposed')
    }
    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function')
    }
    let callbacks = this.handlers[eventName]
    if (typeof callbacks === 'undefined') {
      callbacks = [handler]
      this.handlers[eventName] = callbacks
    } else {
      callbacks.push(handler)
    }
    return new Disposable(() => {
      this.off(eventName, handler)
    })
  }
  off(eventName: string, handler: Function): void {
    if (this.disposed) {
      return
    }
    if (!this.handlers[eventName]) {
      return
    }
    const index = this.handlers[eventName].indexOf(handler)
    if (index !== -1) {
      this.handlers[eventName].splice(index, 1)
    }
  }
  clear(): void {
    this.handlers = {}
  }
  emit(eventName: string, ...params: Array<any>): Promise<Array<any>> {
    if (this.disposed) {
      return Promise.resolve([])
    }
    if (!this.handlers[eventName]) {
      return Promise.resolve([])
    }

    const promises = []
    const callbacks = this.handlers[eventName]
    for (let i = 0, length = callbacks.length; i < length; ++i) {
      promises.push(callbacks[i].apply(null, params))
    }
    return Promise.all(promises)
  }
  dispose(): void {
    this.disposed = true
    this.clear()
  }
}
