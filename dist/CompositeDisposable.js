"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompositeDisposable = (function () {
  function CompositeDisposable() {
    _classCallCheck(this, CompositeDisposable);

    this.disposed = false;
    this.disposables = new Set(arguments);
  }

  _createClass(CompositeDisposable, [{
    key: "dispose",
    value: function dispose() {
      if (this.disposed) return;
      this.disposed = true;
      this.disposables.forEach(function (item) {
        return item.dispose();
      });
      this.disposables = null;
    }
  }, {
    key: "add",
    value: function add() {
      var _this = this;

      if (this.disposed) return;
      Array.prototype.forEach.call(arguments, function (item) {
        return _this.disposables.add(item);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      if (this.disposed) return;
      Array.prototype.forEach.call(arguments, function (item) {
        return _this2.disposables["delete"](item);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.disposed) return;
      this.disposables.clear();
    }
  }]);

  return CompositeDisposable;
})();

module.exports = CompositeDisposable;