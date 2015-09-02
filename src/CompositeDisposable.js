// @Compiler-Babel "true"
// @Compiler-Output "../dist/CompositeDisposable.js"
class CompositeDisposable{
  constructor(){
    this.disposed = false
    this.disposables = new Set(arguments)
  }
  dispose(){
    if(this.disposed) return
    this.disposed = true
    this.disposables.forEach(item => item.dispose())
    this.disposables = null
  }
  add(){
    if(this.disposed) return
    Array.prototype.forEach.call(arguments, item => this.disposables.add(item))
  }
  remove(){
    if(this.disposed) return
    Array.prototype.forEach.call(arguments, item => this.disposables.delete(item))
  }
  clear(){
    if(this.disposed) return
    this.disposables.clear()
  }
}
module.exports = CompositeDisposable
