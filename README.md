# deepfreeze
recursively Object.freeze() on objects and functions with properties

# usage
```js
  var deepfreeze = require('deepfreeze')

  /*******************************************************/
  Person.prototype.say=function(){console.log('hi')}
  Person.prototype.bye=function(){console.log('bye')}
  function Person (name) {
    return { __proto__: Person.prototype, name: name }
  }
  Barterer.prototype.__proto__ = Person.prototype
  Barterer.prototype.clear=function(){this.inventory=[]}
  function Barterer (name, inventory) {
    var o = Person(name)
    o.__proto__ = Barterer.prototype
    o.inventory = inventory
    return o
  }
  /*******************************************************/
  var tom = new Barterer('tom', [{sugar:1},{salt:2}])

  deepfreeze(tom)

  tom.name = 'bill'
  console.log(tom.name) // => 'tom'
  tom.inventory = ['m3h']
  console.log(tom.inventory) // [{sugar:1},{salt:2}]
  tom.inventory.push({x:3}) // throws

  deepfreeze(tom.__proto__)

  tom.__proto__.clear=function (){ return 7}
  tom.clear() // => 'clear'
  tom.__proto__.say=function (){ return 6 }
  tom.say() // => 'say'
  tom.__proto__.bye=function (){ return 5 }
  tom.bye() // => 'bye'

```
