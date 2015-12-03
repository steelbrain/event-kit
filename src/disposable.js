'use babel'

export class Disposable{
  constructor(callback){
    this.disposed = false
    this.callback = callback
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
