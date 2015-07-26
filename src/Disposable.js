class Disposable{
  constructor(callback){
    this.disposed = false
    this.callback = callback
  }
  dispose(){
    if(this.disposed) return
    if(this.callback){
      this.callback()
      this.callback = null
    }
    this.disposed = true
  }
}
module.exports = Disposable
