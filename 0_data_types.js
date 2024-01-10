/**
 * In programming language datatypes are deferenciated by how we store them in the memory and how we access them from the memory.
 * 
 * Primitive types: Whenever we call or read primitive types we don't get the actual memory reference, instead the copy of the original value is provided.
 * - string, number, boolean, null, undefined, symbol, bigint.
 * 
 * Non-primitive types/ Reference types: 
 * - array, object, function
 */

const score = 100
const scoreValue = 100.3
const isLoggedIn = false
const outsideTemp = null
let userEmail
const bigNumber = 6348844678648664565n
const nanValue = NaN

const id = Symbol('123')
const anotherId = Symbol('123')
//Even though we pass same input Symbol always return unique value.
console.log(id === anotherId)

const list = [4, 6, 3, 9, 2]

let myObj = {
    name: 'Subrata',
    age: 25
}

const myFunc = function () {
    console.log('Hello world');
}

console.log('value-', score, 'type-', typeof (score));
console.log('value-', scoreValue, 'type-', typeof (scoreValue));
console.log('value-', isLoggedIn, 'type-', typeof (isLoggedIn));
console.log('value-', outsideTemp, 'type-', typeof (outsideTemp));
console.log('value-', userEmail, 'type-', typeof (userEmail));
console.log('value-', bigNumber, 'type-', typeof (bigNumber));
console.log('value-', list, 'type-', typeof (list));
console.log('value-', myObj, 'type-', typeof (myObj));
console.log('value-', myFunc, 'type-', typeof (myFunc));
console.log('value-', nanValue, 'type-', typeof (nanValue));

// Undefined	"undefined"
// Null	"object"
// Boolean	"boolean"
// Number	"number"
// String	"string"
// Object (native and does not implement [[Call]])	"object"
// Object (native or host and does implement [[Call]])	"function"
// Object (host and does not implement [[Call]])	Implementation-defined except may not be "undefined", "boolean", "number", or "string".