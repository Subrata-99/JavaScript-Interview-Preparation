//Functions in javascript

//Q1- What is Function declaration ?
function square(num) {
  return num * num;
}

//Q2- What is Function expression ?
const squareFunc = function (num) {
  return num * num;
};

//Anonymous Functions
/*function (num) {
    return num * num;
  };*/
// It can be assigned to a variable or passed as a callback

//Q3- What is First class functions ?
//-> The ability to use a function as value and can be passed as an arguments to another function and can be returned from the function, known as the first class function in js.

function displaySquare(fn) {
  console.log("displaySquare", fn);
}

displaySquare(square(5));

//Q4- What is IIFE ?(Immediatelly Invoked Function Expressions)
(function ImmediateSquare(num) {
  console.log(num * num);
})(5);

//Q5- What's the O/P ?
(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

//Q6- Function Hoisting ***********************
console.log(x); // As var is hoested showing value as undefined
var x = 10;

fun(); //o/p- "hoisting is magic",  Functions are completely hoisted in JS.(In global scope the complete function is copied)
function fun() {
  console.log("hoisting is magic");
}

//Q7- What's the O/P ?
var x = 10;

var fun = function () {
  console.log(x); // undefined
  var x = 20;
};

fun();

//Q8- Spread vs rest
function multiply(...nums) {
  // rest
  console.log(nums);
}
var arr = [10, 20];
multiply(...arr); // spread

//Q9- What's the O/P ?
// const fn1 = ((a, ...numbers, x, y) => {
//     console.log(a);
// })
// fn(5, 6, 3, 7)// Will throw an error as rest parameter must be last

const fn2 = (a, x, y, ...numbers) => {
  console.log(x, y, numbers);
};
fn2(5, 6, 3, 7, 10, 100); // 6, 3, [7,10,100]

//Q10- Callback function ?
// Callback function is a function which will be executed after another function has finished execution
// When we pass a function inside another function as callback, like after execution task it will call it back in future. It's known as callback function.
document.addEventListener("click", function (e) {
  console.log("clicked");
});

//Q11- Arrow functions

const add = (num1, num2) => num1 + num2;

//Q12 Difference between arrow functions and normal functions ?***********************************
function addNormal(num1, num2) {
  return num1 + num2;
}

const addArrow = (num1, num2) => num1 + num2;
//a. the syntactical difference.
//b. arrow functions can use Implicit "return" for one line statement whereas normal function doesn't have implicit return.

//c. arguments
function ags() {
  console.log(arguments);
}

ags(1, 2, 3); // Even without using parameters we get the arguments.

// const agsArrow = () => {
//   console.log(arguments);
// };

// agsArrow(1, 2, 3); //error; functions.js:105 Uncaught ReferenceError: arguments is not defined
//d. "this" keyword works differently for arrow and normal functions.

//Q13- What's the O/P ?
var username = "global";
let user = {
  username: "javascript",
  rc1: () => {
    console.log(this.username + " does magic");
  },
  rc2() {
    console.log(this.username + " is beautiful");
  },
};

user.rc1();
user.rc2();
