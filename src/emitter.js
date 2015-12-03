'use babel'

import {Disposable} from './disposable'

export class Emitter {
  constructor() {
    this.disposed = false
    this.handlers = {}
  }
  dispose(){
    this.disposed = true
    this.handlers = null
  }
  on(eventName, handler){
    if (this.disposed) {
      throw new Error('Emitter has been disposed')
    }
    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function')
    }
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [handler]
    } else {
      this.handlers[eventName].push(handler)
    }
    return new Disposable(() => {
      this.off(eventName, handler)
    })
  }
  off(eventName, handler){
    if (this.disposed || typeof this.handlers[eventName] === 'undefined') {
      return
    }
    const index = this.handlers[eventName].indexOf(handler)
    if (index !== -1) {
      this.handlers[eventName].splice(index, 1)
    }
  }
  clear() {
    this.handlers = []
  }
  emit(eventName, ...params){
    if (this.disposed || typeof this.handlers[eventName] === 'undefined') {
      return
    }
    const paramsLength = params.length
    this.handlers[eventName].forEach(function(callback) {
      if (paramsLength === 1) {
        callback(params[0])
      } else if (paramsLength === 2) {
        callback(params[0], params[1])
      } else {
        callback(...params)
      }
    })
  }
}