(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EventKit = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Disposable {
  constructor(callback) {
    this.disposed = false;
    this.callback = callback;
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      if (typeof this.callback === 'function') {
        this.callback();
      }
      this.callback = null;
    }
  }
}
exports.Disposable = Disposable;
},{}],3:[function(require,module,exports){
'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emitter = undefined;

var _disposable = require('./disposable');

class Emitter {
  constructor() {
    this.disposed = false;
    this.handlers = {};
  }
  dispose() {
    this.disposed = true;
    this.handlers = null;
  }
  on(eventName, handler) {
    var _this = this;

    if (this.disposed) {
      throw new Error('Emitter has been disposed');
    }
    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function');
    }
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [handler];
    } else {
      this.handlers[eventName].push(handler);
    }
    return new _disposable.Disposable(function () {
      _this.off(eventName, handler);
    });
  }
  off(eventName, handler) {
    if (this.disposed || typeof this.handlers[eventName] === 'undefined') {
      return;
    }
    const index = this.handlers[eventName].indexOf(handler);
    if (index !== -1) {
      this.handlers[eventName].splice(index, 1);
    }
  }
  clear() {
    this.handlers = [];
  }
  emit(eventName) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (this.disposed || typeof this.handlers[eventName] === 'undefined') {
      return;
    }
    const paramsLength = params.length;
    this.handlers[eventName].forEach(function (callback) {
      if (paramsLength === 1) {
        callback(params[0]);
      } else if (paramsLength === 2) {
        callback(params[0], params[1]);
      } else {
        callback.apply(undefined, params);
      }
    });
  }
}
exports.Emitter = Emitter;
},{"./disposable":2}],4:[function(require,module,exports){
'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _disposable = require('./disposable');

Object.defineProperty(exports, 'Disposable', {
  enumerable: true,
  get: function () {
    return _disposable.Disposable;
  }
});

var _compositeDisposable = require('./composite-disposable');

Object.defineProperty(exports, 'CompositeDisposable', {
  enumerable: true,
  get: function () {
    return _compositeDisposable.CompositeDisposable;
  }
});

var _emitter = require('./emitter');

Object.defineProperty(exports, 'Emitter', {
  enumerable: true,
  get: function () {
    return _emitter.Emitter;
  }
});
},{"./composite-disposable":1,"./disposable":2,"./emitter":3}]},{},[4])(4)
});