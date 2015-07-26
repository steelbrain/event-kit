class Disposable{
  disposed = false
  constructor(callback){
    this.callback = callback
  }
  dispose(){
    if(this.disposed) return
    this.callback()
    this.callback = null
  }
}
module.exports = Disposable
