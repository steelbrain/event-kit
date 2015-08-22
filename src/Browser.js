if (typeof window !== 'undefined') {
  window.EventKit = window.EventKit || {
      CompositeDisposable: require('./CompositeDisposable'),
      Disposable: require('./Disposable'),
      Emitter: require('./Emitter')
    }
  module.exports = window.EventKit
} else if (typeof self !== 'undefined') {
  self.EventKit = self.EventKit || {
      CompositeDisposable: require('./CompositeDisposable'),
      Disposable: require('./Disposable'),
      Emitter: require('./Emitter')
    }
  module.exports = self.EventKit
}
