/* @flow */

import { it } from 'jasmine-fix'
import Emitter from '../src/emitter'

describe('Emitter', function() {
  function getEmitter() {
    return new Emitter()
  }

  it('has a working lifecycle', function() {
    let params = []
    let calledSomething = 0
    let calledSomethingElse = 0

    const emitter = getEmitter()
    const callbackSomething = function(...givenParams) {
      calledSomething++
      expect(givenParams).toEqual(params)
    }
    const callbackSomethingElse = function(...givenParams) {
      calledSomethingElse++
      expect(givenParams).toEqual(params)
    }
    const subscriptionSomething = emitter.on('something', callbackSomething)
    const subscriptionSomethingElse = emitter.on('something', callbackSomethingElse)
    expect(calledSomething).toBe(0)
    expect(calledSomethingElse).toBe(0)
    emitter.emit('something', ...(params = [{}, {}, {}, {}, {}]))
    expect(calledSomething).toBe(1)
    expect(calledSomethingElse).toBe(1)
    emitter.emit('something', ...(params = [{}, {}, {}, {}, {}]))
    expect(calledSomething).toBe(2)
    expect(calledSomethingElse).toBe(2)
    emitter.emit('something', ...(params = [{}, {}, {}, {}, {}]))
    expect(calledSomething).toBe(3)
    expect(calledSomethingElse).toBe(3)
    subscriptionSomething.dispose()
    emitter.emit('something', ...(params = [{}, {}, {}, {}, {}]))
    expect(calledSomething).toBe(3)
    expect(calledSomethingElse).toBe(4)
    subscriptionSomethingElse.dispose()
    emitter.emit('something', ...(params = [{}, {}, {}, {}, {}]))
    expect(calledSomething).toBe(3)
    expect(calledSomethingElse).toBe(4)
  })
  it('has a working clear method', function() {
    let timesCalled = 0
    const emitter = getEmitter()
    emitter.on('something', function() {
      timesCalled++
    })
    expect(timesCalled).toBe(0)
    emitter.emit('something')
    expect(timesCalled).toBe(1)
    emitter.emit('something')
    expect(timesCalled).toBe(2)
    emitter.emit('something')
    expect(timesCalled).toBe(3)
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    emitter.clear()
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    emitter.on('something', function() {
      timesCalled++
    })
    emitter.emit('something')
    expect(timesCalled).toBe(5)
    emitter.emit('something')
    expect(timesCalled).toBe(6)
  })
  it('has a working dispose method', function() {
    let timesCalled = 0
    const emitter = getEmitter()
    emitter.on('something', function() {
      timesCalled++
    })
    expect(timesCalled).toBe(0)
    emitter.emit('something')
    expect(timesCalled).toBe(1)
    emitter.emit('something')
    expect(timesCalled).toBe(2)
    emitter.emit('something')
    expect(timesCalled).toBe(3)
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    emitter.dispose()
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    emitter.emit('something')
    expect(timesCalled).toBe(4)
    expect(function() {
      emitter.on('something', function() {
        timesCalled++
      })
    }).toThrow('Emitter has been disposed')
  })
  it('plays well with multiple events', function() {
    let timesACalled = 0
    let timesBCalled = 0

    const emitter = getEmitter()
    const subscriptionA1 = emitter.on('a', function() {
      timesACalled++
    })
    const subscriptionA2 = emitter.on('a', function() {
      timesACalled++
    })
    const subscriptionB1 = emitter.on('b', function() {
      timesBCalled++
    })
    const subscriptionB2 = emitter.on('b', function() {
      timesBCalled++
    })

    expect(timesACalled).toBe(0)
    expect(timesBCalled).toBe(0)
    emitter.emit('a')
    expect(timesACalled).toBe(2)
    expect(timesBCalled).toBe(0)
    emitter.emit('a')
    expect(timesACalled).toBe(4)
    expect(timesBCalled).toBe(0)
    subscriptionA2.dispose()
    emitter.emit('a')
    expect(timesACalled).toBe(5)
    expect(timesBCalled).toBe(0)
    emitter.emit('a')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(0)
    subscriptionA1.dispose()
    emitter.emit('a')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(0)
    emitter.emit('a')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(0)

    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(0)
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(2)
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(4)
    subscriptionB2.dispose()
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(5)
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(6)
    subscriptionB1.dispose()
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(6)
    emitter.emit('b')
    expect(timesACalled).toBe(6)
    expect(timesBCalled).toBe(6)
  })
  it('supports async functions in callbacks', async function() {
    let timesCalled = 0
    const emitter = getEmitter()
    emitter.on('a', function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          timesCalled++
          resolve()
        }, 0)
      })
    })
    emitter.on('a', function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          timesCalled++
          resolve()
        }, 0)
      })
    })
    expect(timesCalled).toBe(0)
    const promise = emitter.emit('a')
    expect(timesCalled).toBe(0)
    await promise
    expect(timesCalled).toBe(2)
  })
})
