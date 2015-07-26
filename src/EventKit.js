let EventKit = {
  CompositeDisposable: require('./CompositeDisposable'),
  Disposable: require('./Disposable'),
  Emitter: require('./Emitter')
}
if(typeof window !== 'undefined'){
  window.EventKit = EventKit
} else module.exports = EventKit