// There are two type of object bindings, one is implicit and the other is explicit.

// Implicit binding is applied when we invoke a function in an object using "." notation. This keyword in this scenario points to the object using which the function is invoked.

// Explicit binding can be applied when we use call() apply() and bind() methods

// In javascript "this" keyword use to refer something like an object.

this.a = 5;
console.log(this.a); //5, Here this refer to global or window object.

(function getParam() {
  console.log(this.a);
})(); //5, Here this refer to its parent, which is window object here.

const getParamArrow = (a) => {
  console.log(this.a);
};
getParamArrow(20); //5, In case of arrow function this refers to its outer normal function, if its not there then through scope chain it refers to window object

// let user = {
//   name: "subrata",
//   age: 24,
//   getDetails() {
//     console.log(this); // For, objects this of normal function refers to the object itself.
//   },
//   childObj: {
//     newName: "San",
//     getChildDetails() {
//       console.log(this.newName, this.name); // Here this is only refered to its parent object which is childObj, so this.name which is property of user object can not be accessable.
//     },
//   },
// };

// user.getDetails(); //{name: 'subrata', age: 24, childObj: {…}, getDetails: ƒ}
// user.childObj.getChildDetails(); // "San undefined"

//Let's see the same for arrow function.

// let userArrow = {
//   name: "subrata Das",
//   age: 24,
//   getDetailsArrow: () => {
//     console.log(this.name); // no value,  For objects, this of Arrow function refers to it's parent function. In this case getDetailsArrow() has no parent function, so it's simply refer to window object
//   },
//   getDetailsNested() {
//     const nestedArrow = () => console.log(this.name); //"subrata Das", In this case the arrow function is inside a normal function and the normal function has this referred to ths userArrow object. In
//     return nestedArrow(); // So arrow function gets it's this from it's outer function, hence it get's this here.
//   },
// };

// userArrow.getDetailsArrow();
// userArrow.getDetailsNested();

//This keyword inside a class/constructor.
// class user {
//   constructor(n) {
//     this.name = n; // Inside class this points to whats inside constructor
//   }

//   getName() {
//     console.log(this.name);
//   }
// }

// const User = new user("Subrata");
// console.log("User: ", User); // user {name: 'Subrata'}
// User.getName(); // "Subrata"

//Q1. What is the O/P ?
// const user = {
//   firstName: "Subrata",
//   getName() {
//     const firstName = "San";
//     return this.firstName;
//   },
// };

// console.log(user.getName()); //"Subrata", For normal function this always refer to the object that invokes the function.

//Q2. What is the O/P ?********
// function makeUser() {
//   return {
//     name: "San",
//     ref: this,
//   };
// }

// let user = makeUser(); // as we are calling function here, so inside that this refers to nothing but window object at the time of invokation.
// console.log(user.ref.name); // no value
//how can we fix this ??

// function makeUser() {
//   return {
//     name: "San",
//     ref() {
//       return this;
//     },
//   };
// }
// let user = makeUser();
// console.log(user.ref().name); // "San"

//Q3. What is the O/P ?****************
// const user = {
//   name: "San",
//   logMessage() {
//     console.log(this.name);
//   },
// };
// setTimeout(user.logMessage, 1000); // no value, here setTimeout uses user.logMessage as callback not a method,
// // So the function will be copied to setTimeout. Hence this won't refer to the object anymore.
// //How to fix this ??.
// //-> We can avoide creating user.logMessage as callback. So we can wrap inside a function.
// setTimeout(function () {
//   user.logMessage();
// }, 2000); // "San"

//Q4. What is the O/P ?******
const user = {
  name: "Subrata",
  greet() {
    return `hello, ${this.name}!`;
  },
  farewell: () => {
    return `Goodbye, ${this.name}!`;
  },
};
console.log(user.greet()); //"Subrata"
console.log(user.farewell()); //No value

//Q5. Create a object calculator.*********
// let calculator = {
//   read() {
//     this.a = +prompt("a =", 0);
//     this.b = +prompt("b =", 0);
//   },
//   sum() {
//     return this.a + this.b;
//   },
//   mul() {
//     return this.a * this.b;
//   },
// };
// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

//Q6. What is the O/P ?****************************************
var length = 4;
function callback() {
  console.log(this.length);
}
const object = {
  length: 5,
  method(fn) {
    fn(); //Since this function is called inside the function it will not target to object, instead it will target to global object.
  },
};
object.method(callback); //4
// follow up question*******************************************
const objectModified = {
  length: 5,
  method() {
    //arguments = [callback, 5, 6],  here this array itself is an object and when we call the callback here this will point to this arguments array(object)
    arguments[0](); //So if we check the prototype of array we see the property there length.
  }, //So as the lenth of this array is 3, the O/P will be 3
};
objectModified.method(callback, 5, 6); //3

//Q7. Implement calc.
// const result = calc.add(10).multiply(5).subtract(30).add(10)
// console.log(result.total);

const calc = {
  total: 0,
  add(num) {
    this.total += num;
    return this;
  },
  multiply(num) {
    this.total *= num;
    return this;
  },
  subtract(num) {
    this.total -= num;
    return this;
  },
};
const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total);
