// @Compiler-Babel "true"
// @Compiler-Output "../dist/Disposable.js"
class Disposable{
  constructor(callback){
    this.disposed = false
    this.callback = callback
  }
  dispose(){
    if(this.disposed) return
    if(typeof this.callback === 'function'){
      this.callback()
    }
    this.callback = null
    this.disposed = true
  }
}
module.exports = Disposable
