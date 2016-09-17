/* @flow */

import 'jasmine-fix'
import CompositeDisposable from '../src/composite-disposable'

describe('CompositeDisposable', function() {
  function getCompositeDisposable(...params) {
    return new CompositeDisposable(...params)
  }

  it('validates all the parameters given to constructor', function() {
    expect(function() {
      getCompositeDisposable()
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable(null)
    }).toThrow('Invalid disposable provided')
    expect(function() {
      getCompositeDisposable(function() {})
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable(function() {}, null)
    }).toThrow('Invalid disposable provided')
    expect(function() {
      getCompositeDisposable(function() {}, function() {})
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable(function() {}, function() {}, null)
    }).toThrow('Invalid disposable provided')
  })
  it('adds all the constructor params to disposables', function() {
    const disposable1 = jasmine.createSpy('disposable1')
    const disposable2 = jasmine.createSpy('disposable2')
    const compositeDisposable = getCompositeDisposable(disposable1, disposable2)
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).not.toHaveBeenCalled()
    compositeDisposable.dispose()
    expect(disposable1).toHaveBeenCalled()
    expect(disposable2).toHaveBeenCalled()
  })
  it('validates all the parameters given to add', function() {
    expect(function() {
      getCompositeDisposable().add()
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable().add(null)
    }).toThrow('Invalid disposable provided')
    expect(function() {
      getCompositeDisposable().add(function() {})
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable().add(function() {}, null)
    }).toThrow('Invalid disposable provided')
    expect(function() {
      getCompositeDisposable().add(function() {}, function() {})
    }).not.toThrow()
    expect(function() {
      getCompositeDisposable().add(function() {}, function() {}, null)
    }).toThrow('Invalid disposable provided')
  })
  it('adds all the add params to disposables', function() {
    const disposable1 = jasmine.createSpy('disposable1')
    const disposable2 = jasmine.createSpy('disposable2')
    const compositeDisposable = getCompositeDisposable()
    compositeDisposable.add(disposable1, disposable2)
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).not.toHaveBeenCalled()
    compositeDisposable.dispose()
    expect(disposable1).toHaveBeenCalled()
    expect(disposable2).toHaveBeenCalled()
  })
  it('has a working delete method', function() {
    const disposable1 = jasmine.createSpy('disposable1')
    const disposable2 = jasmine.createSpy('disposable2')
    const compositeDisposable = getCompositeDisposable()
    compositeDisposable.add(disposable1, disposable2)
    compositeDisposable.delete(disposable1)
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).not.toHaveBeenCalled()
    compositeDisposable.dispose()
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).toHaveBeenCalled()
  })
  it('has a working clear method', function() {
    const disposable1 = jasmine.createSpy('disposable1')
    const disposable2 = jasmine.createSpy('disposable2')
    const compositeDisposable = getCompositeDisposable()
    compositeDisposable.add(disposable1, disposable2)
    compositeDisposable.clear()
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).not.toHaveBeenCalled()
    compositeDisposable.dispose()
    expect(disposable1).not.toHaveBeenCalled()
    expect(disposable2).not.toHaveBeenCalled()
  })
  it('has a working disposed attribute', function() {
    const compositeDisposable = getCompositeDisposable()
    expect(compositeDisposable.disposed).toBe(false)
    compositeDisposable.dispose()
    expect(compositeDisposable.disposed).toBe(true)
  })
})
