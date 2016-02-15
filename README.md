Event-Kit
===========

Event-Kit is an Event handling architecture inspired from [Atom's EventKit][1]

#### API

```js
export class CompositeDisposable {
  constructor()
  add(...disposables)
  remove(...disposables)
  clear()
  isDisposed(): boolean
  dispose()
}
export class Disposable {
  constructor(callback)
  isDisposed(): boolean
  dispose()
}
export class Emitter {
  constructor()
  on(eventName, handler): Disposable
  off(eventName, handler)
  clear()
  emit(eventName, ...params): Promise
  isDisposed(): boolean
  dispose()
}
```

#### License
This project is licensed under the terms of MIT License. See the License file for more info.

[1]:https://github.com/atom/event-kit
