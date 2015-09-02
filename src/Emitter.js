// @Compiler-Babel "true"
// @Compiler-Output "../dist/Emitter.js"
let Disposable = require('./Disposable')
class Emitter{
  constructor(){
    this.disposed = false
    this.handlersByEventName = {}
  }
  dispose(){
    this.disposed = true
    this.handlersByEventName = null
  }
  on(eventName, handler){
    if(this.disposed) throw new Error('Emitter has been disposed')
    if(typeof handler !== 'function') throw new Error('Handler must be a function')
    if(this.handlersByEventName.hasOwnProperty(eventName)){
      this.handlersByEventName[eventName].push(handler)
    } else {
      this.handlersByEventName[eventName] = [handler]
    }
    return new Disposable(() => this.off(eventName, handler))
  }
  off(eventName, handler){
    if(this.disposed || !this.handlersByEventName.hasOwnProperty(eventName)) return
    let Index
    if((Index = this.handlersByEventName[eventName].indexOf(handler)) !== -1){
      this.handlersByEventName[eventName].splice(Index, 1)
    }
  }
  clear(){
    this.handlersByEventName = {}
  }
  emit(eventName, value){
    if(this.disposed || !this.handlersByEventName.hasOwnProperty(eventName)) return
    this.handlersByEventName[eventName].forEach(callback => callback(value))
  }
}
module.exports = Emitter
