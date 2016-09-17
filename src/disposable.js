/* @flow */

import invariant from 'assert'

export default class Disposable {
  callback: ?(() => void);

  constructor(callback: (() => void)) {
    invariant(typeof callback === 'function', 'callback should be a function')
    this.callback = callback
  }
  get disposed(): boolean {
    return this.callback === null
  }
  dispose(): void {
    if (this.callback) {
      this.callback()
      this.callback = null
    }
  }
}
