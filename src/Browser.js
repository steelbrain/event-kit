window.EventKit = window.EventKit || {
  CompositeDisposable: require('./CompositeDisposable'),
  Disposable: require('./Disposable'),
  Emitter: require('./Emitter')
}
module.exports = window.EventKit
