//Objects in JavaScript

// const user = {
//   name: "Subrata",
//   age: 24,
// };

// user.name = "Sangeetha"; // modifying the object

// console.log(user);

// delete user.age; // deleting the properties of the object

// delete user; //We can not delete object directly like this

// console.log(user);

//what is O/P ?

const func = (function (a) {
  delete a;
  return a;
})(5);

console.log(func); //5, As delete works only for object properties, but here a is just local variable.

// const person = {
//   name: "Subrata",
//   age: 24,
//   "I love Coding": true, // to write space while naming keys we must put inside " "
// };

// console.log(person["I love Coding"]); // to access this type of key we shoul put inside []

// const property = "firstName";
// const name = "Subrata";
// const person1 = {
//   //   property: name, // { "property": "Subrata","age": 24 }
//   [property]: name, // { "firstName": "Subrata","age": 24 }
//   age: 24,
// };

// console.log(person1);

//If we want to loop through each of it's keys and print the values and even name of the keys.
// for that we use for in loop.

// for (key in person) {
//   console.log("key", key); // for keys
//   console.log("value", person[key]); // for values
// }

//Q1. what is O/P ?
const obj = {
  a: "one", //If we have two keys with same name the first key will be replaced
  b: "two", //And It will still be in the first position with the last specified value.
  a: "three",
};
console.log(obj); //{"a": "three","b": "two"}

//Q2. Create a function that multiplies all numeric property values of nums by 2.

// let nums = {
//   a: 200,
//   b: 100,
//   title: "My nums",
// };

// function multiplyByTwo(obj) {
//   for (key in obj) {
//     if (typeof obj[key] == "number") obj[key] = obj[key] * 2;
//   }
// }
// multiplyByTwo(nums);
// console.log("multiplyByTwo", nums);

//Q3. what is O/P ?****************************************

// const a = {};
// b = { key: "b" };
// const c = { key: "c" };
// a[b] = 123;
// a[c] = 456;

// console.log(a[b]);
// when we are assigning b as a[b] it will look like a["[object Object]"].
// Because the b= {key: "b"} can not be converted into a key unless it's a string. and the same goes for a[c].
// So for both a[b] and a[c] the object will be a["[object object]"].
// So as we know for same key name ("[object Object]")  the last specified value will be taken.
// so instead of 123 456 will be the o/p.

//Q4. What is JSON.stringify and JSON.parse ?

// const user = {
//   name: "Subrata",
//   age: 24,
// };

// const strObj = JSON.stringify(user); // for stringify the object

// console.log(JSON.parse(strObj)); // for parsing the string to object.

//Q5. what is the o/p ?
console.log([..."Lydia"]);

//Q6. what is the o/p ?
// const user = { name: "Subrata", age: 21 };
// const admin = { admin: true, ...user };

// console.log(admin);

//Q7. what is the o/p ?
const settings = {
  username: "subrata",
  level: 24,
  health: 82,
};

const data = JSON.stringify(settings, ["level", "health"]); // this means only stringify level, health properties
console.log(data);

//Q8. what is the o/p ?

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());
console.log(shape.perimeter());

//Q9. Destructuring in objects

// let user = {
//   name: "Subrata",
//   age: 24,
//   fullName: {
//     first: "Subrata",
//     last: "Das",
//   },
// };

// const { name } = user; //destructuring
// const { age: myAge } = user; //destructuring with naming***
// console.log(myAge);
// const {
//   fullName: { first, last },
// } = user; //Nested destructuring
// console.log(first, last);

//Q10. whats the o/p ?
// function getItems(fruitList, ...args, favouriteFruit) { //Uncaught SyntaxError: Rest parameter must be last formal parameter
//   return [...fruitList, ...args, favouriteFruit]
// }
function getItems(fruitList, favouriteFruit, ...args) {
  return [...fruitList, ...args, favouriteFruit];
}

console.log(getItems(["banana", "apple"], "pear", "orange"));

//Q11. whats the o/p ?******************************
// let c = { greeting: "hey!" };
// let d;

// d = c;
// c.greeting = "hello";
// console.log(d.greeting); //hello, When we assign one object to another, we are not copying all the properties inside, instead we are providing the reference to the object.
// So if we change anything of d or c it will effect for both of them

//Q12. whats the o/p ?********************************************************
// console.log({ a: 1 } == { a: 1 });
// console.log({ a: 1 } === { a: 1 });
// false as both refer to different space in the memory

// const b = { c: 2 };
// const d = b;
// console.log(b === d);

//Q13. whats the o/p ?******************
let person = { name: "San" };
const members = [person];
// person = null;
console.log(members);
//[{name: 'San'}], As we are modifying the variable but not whats inside (object properties),
//but if we do this,
person.name = null;
console.log(members); //{name: null}

//Q14. whats the o/p ?************************************************
const value = { number: 10 };
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
// for above two case we are not passing anything so basically x is assiging with default value.
// where we simply destructure the value object and clone into x.
multiply(value); //20
multiply(value); //40
// in last two case we are assigning x to our object value so, x and value both point to same object,
// hence after first call when x.number updated to 20 the number property is upadted automatically.
// so in last with new number 20 go inside the function and we get the output 40

//Q15. whats the o/p ?*****************************************************
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John", // We are reassiging with new object so reference will be lost and its a new object itself
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1);
console.log(personObj2);

//Q16. What is shallow copy and deep copy ?
//-> When we copy an object to another object if one object holds the reference of another object, then its shallow copy.
// When we completely clone an object into another object that is called deep copy. here no reference will be there

let user = {
  name: "Subrata",
  age: 24,
};

//object deep copy/ clone
const objClone = Object.assign({}, user);
objClone.name = "San"; //Here it will not effect user object
console.log(user, objClone);

//other ways to clone.
const objClone1 = JSON.parse(JSON.stringify(user));
console.log(objClone1);

const objClone2 = { ...user };
console.log(objClone2);
