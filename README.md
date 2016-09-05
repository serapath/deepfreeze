# deepfreeze
recursively Object.freeze() on objects and functions including prototype chain

# usage
```js
  var deepfreeze = require('deepfreeze')

  ;(function(){ "use strict"; deepFreeze(function(){}) })()
  /* WILL NOT THROW => TypeError:
     'caller', 'callee', and 'arguments' properties
     may not be accessed on strict mode functions or
     the arguments objects for calls to them
  */

  deepfreeze(Buffer)
  Buffer.x = 5
  console.log(Buffer.x === undefined)
  Buffer.prototype.z = 3
  console.log(Buffer.prototype.z === undefined)
```
