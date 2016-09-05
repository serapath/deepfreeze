var xObject    = require('x-is-object')
var xFunction  = require('x-is-function')
module.exports = deepfreeze
function deepfreeze (o) {
  if (xObject(o)) {
    if (!Object.isFrozen(o)) Object.freeze(o)
    var isFN = xFunction(o)
    deepFreeze(o.__proto__)
    for (prop in o)
      if (isFN && ({ caller: true, callee: true, arguments: true}[prop])) {}
      else deepFreeze(o[prop])
  }
  return o
}
