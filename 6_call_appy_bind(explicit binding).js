//Q1. What is call() ?

// var obj = { name: "subrata" };

// function sayHello(age) {
//   return "hello " + this.name + ", " + age;
// }
// console.log(sayHello()); //hello
// //When we want to call this function to an object this makes an explicit binding.
// //For that we need to use call() method.
// console.log(sayHello.call(obj)); //hello subrata
// console.log(sayHello.call(obj, 24)); //hello subrata, 24, This is for arguments

//Q2. What is apply() ?
//-> it is exactly same as call, except it takes arguments as array.

// function sayHelloApply(age, profession) {
//   return "hello " + this.name + ", " + age + ", " + profession;
// }

// console.log(sayHelloApply.apply(obj, [24, "engineer"])); //hello subrata, 24, engineer

//Q3. What is bind() ?
//-> bind() gives us a function that instead of calling immediately, we can call later in our code.

// const bindFunc = sayHello.bind(obj); //ƒ sayHello(age) {return "hello " + this.name + ", " + age;}, this returns a function
// console.log(bindFunc(24)); //hello subrata, 24

//Q4. What is the O/P ?

// const person = {
//   name: "San",
// };

// function sayHello(age) {
//   return `${this.name} is ${age}`;
// }
// console.log(sayHello.call(person, 24)); //San is 24
// console.log(sayHello.bind(person, 24)); //ƒ sayHello(age) {return `${this.name} is ${age}`;}

//Q5. What is the O/P ?*********************
// const age = 10;
// var person = {
//   name: "Subrata",
//   age: 20,
//   getAge: function () {
//     return console.log(this.age);
//   },
// };

// var person2 = { age: 24 };
// person.getAge.call(person2); //24

//Q6. What is the O/P ?
// var status = "😎";

// setTimeout(() => {
//   const status = "😍";

//   const data = {
//     status: "🥑",
//     getStatus() {
//       return this.status;
//     },
//   };

//   console.log(data.getStatus()); //"🥑"
//   console.log(data.getStatus.call(this)); //"😎",  here this will not point to setTimeout as it's a function, so instead it points to global object.
// }, 0);

//Q7. Call printAnimals such that it prints all animals in object.**************************
const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}

//ans:
for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i); //#0 Lion: King #1 Whale: Queen
}

//Q8. Append an array to another array.************************
const array = ["a", "b"];
const elements = [0, 1, 2];

// array.push(elements);
// console.log(array); // ['a', 'b', Array(3)]
//So to achive that we can do
array.push.apply(array, elements);
console.log(array);

//Q9. Using apply enhance built-in functions.***********
//Find min/max number in an array
const numbers = [5, 6, 2, 3, 7];

//ans:
// Math.max(2,8,7,6,1)
console.log(Math.max.apply(null, numbers));
console.log(Math.min.apply(null, numbers));

//Q10. Bound function, what is the O/P ?***************************

// function f() {
//   console.log(this);
// }

// let user = {
//   g: f.bind(null), //Even if we are calling the function inside user object, but as we are passing the context as null inside bind function, the this will refer to window object.
// };

// user.g(); //window object

//Q11.Bind Chaining. what is the O/P ?
// function f() {
//   console.log(this.name);
// }

// f = f.bind({ name: "John" }).bind({ name: "Ann" });

// f(); //John, once a function is bind by an oject next bind won't work, So bind chain doesn't exist.

//Q12. fix the line 149 to make code work properly.********************

function checkPassword(success, failed) {
  let password = prompt("password", "");
  if (password == "Subrata") success();
  else failed();
}

let user = {
  name: "San",

  loginSuccessful() {
    console.log(`${this.name} logged in`);
  },

  loginFailed() {
    console.log(`${this.name} failed to login`);
  },
};

// checkPassword(user.loginSuccessful, user.loginFailed);

//ans: instead of above code we can write.

// checkPassword(user.loginSuccessful.bind(user), user.loginFailed.bind(user));

//Q13. Follow up question of Q12.

// let userNew = {
//   name: "San",

//   login(result) {
//     console.log(this.name + (result ? " login succesful" : " login failed"));
//   },
// };
// //Now instead of two functions loginSuccessful and loginFailed we have only one function login here. how to write checkPassword now ?

// checkPassword(
//   userNew.login.bind(userNew, true),
//   userNew.login.bind(userNew, false)
// );

//Q14. Explicit Binding with Arrow functions,  what is the O/P ?
const age = 10;

var person = {
  name: "San",
  age: 24,
  getAgeArrow: () => console.log(this.age),
  getAge: function () {
    console.log(this.age);
  },
};

var person2 = { age: 30 };
person.getAge.call(person2); //30
person.getAgeArrow.call(person2); //undefined,  no matter if we add call, apply, bind to arrow function, this will work as usual for arrow function, hence, it will be pointing to window object.

//Q15. Polyfill for call() method***************************************

//ans:
let car1 = {
  color: "red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have a ${this.color} ${this.company} car for ${currency}${price}`
  );
}

// purchaseCar.call(car1, "[₹", 9000000);
//Hence call method takes two arguments, one as context and other can be multiple arguments.
//Now lets make our polyfill for call() method.

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error(this + " is not a function"); //checking if the thing that calls myCall is a function or not

  context.fn = this; // so the function (here purchaseCar) is now point to fnction created inside context(context.fn)************************
  context.fn(...args);
};

// purchaseCar.myCall(car1, "₹", 9000000);

//Q16. Polyfill for apply() method***************************************

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") throw new Error(this + " is not a function"); //checking if the thing that calls myCall is a function or not
  if (!Array.isArray(args))
    throw new TypeError("CreateListFromArrayLike called on non-object");
  context.fn = this; // so the function (here purchaseCar) is now point to fnction created inside context(context.fn)************************
  context.fn(...args);
};
// purchaseCar.myApply(car1, ["₹", 9000000]);

//Q17. Polyfill for bind() method*********************************************************************************
//In case of bind it won't executes the function immediately instead returns a new function that we can execute later.

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function")
    throw new Error(this + " cannot be bound as it's not callable"); //checking if the thing that calls myCall is a function or not

  context.fn = this; // so the function (here purchaseCar) is now point to fnction created inside context(context.fn)************************
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

const newFunc = purchaseCar.myBind(car1, "₹", 9000000);
console.log(newFunc);
newFunc();
