Event-Kit
===========
Event-Kit is a JS port of [Atom's EventKit][1].

#### API

```js
export class CompositeDisposable {
  constructor()
  dispose()
  add(...disposables)
  remove(...disposables)
  clear()
}
export class Disposable {
  constructor(callback)
  dispose()
}
export class Emitter {
  constructor()
  dispose()
  on(eventName, handler): Disposable
  off(eventName, handler) <-- alias to Disposable.dispose()
  clear()
  emit(eventName, ...params)
}
```

#### License
This project is licensed under the terms of MIT License. See the License file for more info.

[1]:https://github.com/atom/event-kit
