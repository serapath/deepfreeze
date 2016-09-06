module.exports = function deepfreeze (o) {
  if (o===Object(o)) {
    Object.isFrozen(o) || Object.freeze(o)
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      prop==='constructor'||deepfreeze(o[prop])
    })
  }
  return o
}
