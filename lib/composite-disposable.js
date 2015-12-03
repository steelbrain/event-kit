'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class CompositeDisposable {
  constructor() {
    this.disposed = false;
    this.disposables = new Set(arguments);
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposables.forEach(function (item) {
        item.dispose();
      });
      this.disposables = null;
    }
  }
  add() {
    var _this = this;

    if (!this.disposed) {
      Array.prototype.forEach.call(arguments, function (item) {
        return _this.disposables.add(item);
      });
    }
  }
  remove() {
    var _this2 = this;

    if (!this.disposed) {
      Array.prototype.forEach.call(arguments, function (item) {
        return _this2.disposables.delete(item);
      });
    }
  }
  clear() {
    if (!this.disposed) {
      this.disposables.clear();
    }
  }
}
exports.CompositeDisposable = CompositeDisposable;