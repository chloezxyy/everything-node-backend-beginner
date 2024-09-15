// CommonJS, every file is a module (by default)
// Modules - Encapsulated code (only share minimum)

const names = require('./4-names')
const sayHi = require('./5-utils')
const data = require('./6-alternative-flavor')
// console.log(data)

const { john, peter } = names

sayHi('chloe')
sayHi(john)
sayHi(peter)

// require('./7-mind-grenade') // the sum is 15
