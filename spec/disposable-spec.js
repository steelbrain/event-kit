/* @flow */

import 'jasmine-fix'
import Disposable from '../src/disposable'

describe('Disposable', function() {
  function getDisposable(param: any) {
    return new Disposable(param)
  }

  it('throws if constructor param is not a function', function() {
    expect(function() {
      getDisposable()
    }).toThrow('callback should be a function')
    expect(function() {
      getDisposable({})
    }).toThrow('callback should be a function')
    expect(function() {
      getDisposable(null)
    }).toThrow('callback should be a function')
    expect(function() {
      getDisposable('')
    }).toThrow('callback should be a function')
    expect(function() {
      getDisposable(NaN)
    }).toThrow('callback should be a function')
    expect(function() {
      getDisposable({ dispose() { } })
    }).toThrow('callback should be a function')
  })
  it('triggers callback on dispose', function() {
    const callback = jasmine.createSpy('callback')
    const disposable = getDisposable(callback)
    expect(callback).not.toHaveBeenCalled()
    disposable.dispose()
    expect(callback).toHaveBeenCalled()
  })
  it('has a working disposed attribute', function() {
    const disposable = getDisposable(function() { })
    expect(disposable.disposed).toBe(false)
    disposable.dispose()
    expect(disposable.disposed).toBe(true)
  })
  it('triggers callback only once', function() {
    const callback = jasmine.createSpy('callback')
    const disposable = getDisposable(callback)
    expect(callback.calls.length).toBe(0)
    disposable.dispose()
    expect(callback.calls.length).toBe(1)
    disposable.dispose()
    expect(callback.calls.length).toBe(1)
    disposable.dispose()
    expect(callback.calls.length).toBe(1)
  })
})
