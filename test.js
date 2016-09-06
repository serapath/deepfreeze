var test = require('tape')

var deepfreeze = require('./')

test('deepfreeze', function (t) {
  t.plan(6)

  Person.prototype.say=function(){ return 'say'}
  Person.prototype.bye=function(){ return 'bye' }
  function Person (name) {
    return { __proto__: Person.prototype, name: name }
  }
  Barterer.prototype.__proto__ = Person.prototype
  Barterer.prototype.clear=function(){ return 'clear' }
  function Barterer (name, inventory) {
    var o = Person(name)
    o.__proto__ = Barterer.prototype
    o.inventory = inventory
    return o
  }
  /*******************************************************/
  var tom = Barterer('tom', [{sugar:1},{salt:2}])

  deepfreeze(tom)

  var x = tom.name
  tom.name = 'bill'
  t.equal(tom.name, x, 'name did not change')

  x = tom.inventory
  tom.inventory = ['m3h']
  t.deepEqual(tom.inventory, x, 'inventory did not change')

  try { tom.inventory.push({x:3}) }
  catch (e) { t.ok(e, 'couldnt push to inventory') }

  deepfreeze(tom.__proto__)
  x = tom.clear()
  tom.__proto__.clear=function (){console.log(7)}
  t.equal(tom.clear(), x, 'clear() did not change')

  x = tom.say()
  tom.__proto__.say=function (){console.log(6)}
  t.equal(tom.say(), x, 'say() did not change')

  x = tom.bye()
  tom.__proto__.bye=function (){console.log(5)}
  t.equal(tom.bye(), x, 'bye() did not change')

})
