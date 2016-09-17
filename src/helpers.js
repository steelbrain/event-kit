/* @flow */

export function validate(params: Array<any>): void {
  for (let i = 0, length = params.length; i < length; ++i) {
    const param = params[i]
    if (typeof param.dispose !== 'function' && typeof param !== 'function') {
      throw new Error('Invalid disposable provided')
    }
  }
}
