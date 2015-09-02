// @Compiler-Babel "true"
// @Compiler-Browserify "true"
// @Compiler-Output "/dev/null"
if (typeof window !== 'undefined') {
  window.EventKit = window.EventKit || require('./EventKit')
  module.exports = window.EventKit
} else if (typeof self !== 'undefined') {
  self.EventKit = self.EventKit || require('./EventKit')
  module.exports = self.EventKit
}
