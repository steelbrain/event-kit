'use babel'

export class CompositeDisposable {
  constructor(){
    this.disposed = false
    this.disposables = new Set(arguments)
  }
  dispose(){
    if (!this.disposed) {
      this.disposed = true
      this.disposables.forEach(function(item) {
        item.dispose()
      })
      this.disposables = null
    }
  }
  add(){
    if (!this.disposed) {
      Array.prototype.forEach.call(arguments, item => this.disposables.add(item))
    }
  }
  remove(){
    if (!this.disposed) {
      Array.prototype.forEach.call(arguments, item => this.disposables.delete(item))
    }
  }
  clear(){
    if (!this.disposed) {
      this.disposables.clear()
    }
  }
}
