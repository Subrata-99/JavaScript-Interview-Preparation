//Q1. What is closure ?
//-> It basically means a function bind together with its lexical environment.
// In other words, a closure gives you access to an outer function's scope from an inner function

function outer() {
  var a = 10;
  function inner() {
    console.log(a);
  }

  return inner;
}

const callInner = outer();
callInner(); // We can say, function when they returned from another function they remember their lexical environment, where they were actually present.
//So here after line 13 even th outer doesn't exist, inner still remember its lexical environment. hence get the result to console as 10

//Q2. Scope chain O/p ?
// var e = 10;
// function sum(a) {
//   return function (b) {
//     return function (c) {
//       return function (d) {
//         return a + b + c + d + e;
//       };
//     };
//   };
// }

// console.log(sum(1)(2)(3)(4)); // 20

//Q3. What will be the O/p ?
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
})();

//Q4. Write the function for this.
// var addSix = createBase(6);
// addSix(10); //16
// addSix(21); //27

//ans:
function createBase(base) {
  return function (num) {
    console.log(num + base);
  };
}
var addSix = createBase(6);
addSix(10); //16
addSix(21); //27

//Q5. Time Optimization, Optimize the time for the code below.****************************************************
// function find(index) {
//   let a = [];
//   for (let i = 0; i < 1000000; i++) {
//     a[i] = i * i;
//   }
//   console.log(a[index]);
// }

// console.time("6");
// find(6);
// console.timeEnd("6");
// console.time("12");
// find(12);
// console.timeEnd("12");

//ans->
function find(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

const closure = find();
// console.time("6");
// closure(6);
// console.timeEnd("6");
// console.time("12");
// closure(12);
// console.timeEnd("12");

//Q6. Block scope and setTimeout, Find O/P ?
// (function a() {
//   for (var i = 0; i < 3; i++) {
//     setTimeout(function log() {
//       console.log(i);
//     }, i * 1000);
//   }
// })(); // 3, 3, 3
// how to make it 0, 1, 2
// (function a() {
//   for (let i = 0; i < 3; i++) {
//     setTimeout(function log() {
//       console.log(i);
//     }, i * 1000);
//   }
// })();
//Modify without using let.
// (function a() {
//   for (var i = 0; i < 3; i++) {
//     function closure(i) {
//       setTimeout(function log() {
//         console.log(i);
//       }, i * 1000);
//     }
//     closure(i);
//   }
// })();

//Q7. How would you use closure to create a private counter ?********************************************

function counter() {
  var _counter = 0; //In js its just convention to write private variables by _ at sufix
  function increment(val) {
    _counter += val;
  }
  function decrement(val) {
    _counter -= val;
  }

  function retrive() {
    return console.log("counter = " + _counter);
  }

  return {
    increment,
    decrement,
    retrive,
  };
}

const c = counter();

c.increment(10);
c.decrement(5);
c.retrive();

//Q8. What is module pattern ?********************************************************
//-> It is a function writing pattern where we can private and publicly available our code for security purpose.

var Module = (function () {
  function privateMethod() {
    // do something
    console.log("private");
  }

  return {
    publicMethod: function () {
      //can call privateMethod()
      console.log("public");
    },
  };
})();

// Module.publicMethod();//public
// Module.privateMethod();//Uncaught TypeError: Module.privateMethod is not a function
//It gives error as we are not returning this function

//Q9. Make this run only once.*********************************************************
// let view;
// function loveJavascript() {
//   view = "JavaScript";
//   console.log("I love", view);
// }
// loveJavascript();
// loveJavascript();
// loveJavascript();
// loveJavascript();
// loveJavascript();

//->
// function loveJavascript() {
//   let view;
//   let isReturned = false;

//   return function () {
//     if (isReturned == true) return console.log("Already loved");
//     view = "JavaScript";
//     console.log("I love", view);
//     isReturned = true;
//   };
// }
// let isCalled = loveJavascript();
// isCalled();
// isCalled();
// isCalled();

// More generic and better approach.(Polyfill for Once)******************************************

function once(func, context) {
  let ran; //this will determine the function has already been called once or not.

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments); // as its apply method arguments will be of array format
      func = null;
    }

    return ran;
  };
}

// const hello = () => console.log("hello");
// hello();
// hello();
// hello();
// hello();
// hello();
// now we will wrap hello inside our once function.

const hello = once((a, b) => console.log("hello", a, b));
// hello();
// hello();
// hello();
// hello();
// hello();
// if we pass arguments
// hello(1, 2);
// hello(3, 2);
// hello(10, 20);

//Q10. Polyfill of meomize./Implement caching/Memoize function*********************************************************
// const clumsyFunction = (num1, num2) => {
//   for (let i = 0; i < 999999999; i++) {}
//   return num1 * num2;
// };

// console.time("First call");
// console.log(clumsyFunction(968, 832));
// console.timeEnd("First call");

// console.time("Second call");
// console.log(clumsyFunction(968, 832));
// console.timeEnd("Second call");
//If the parameters of the function are same, then we need to cache the results of the previous call somewhere.

function myMemoize(fn, context) {
  const res = {}; // this is the place where our value of previous call will be stored or cached

  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache]; // for example if we have same agrs for previous call, the the return res will be like
    // res = {"5,6": 30}
  };
}

const clumsyFunction = (num1, num2) => {
  for (let i = 0; i < 999999999; i++) { }
  return num1 * num2;
};

const memoizeClumsyFunction = myMemoize(clumsyFunction);
console.time("First call");
console.log(memoizeClumsyFunction(968, 832));
console.timeEnd("First call");

console.time("Second call");
console.log(memoizeClumsyFunction(968, 832));
console.timeEnd("Second call");

//Q11. Difference between Closure and Scope.
//-> Whenever we create a function within a function, then the inner function forms a closure with the outer function.
//Thus when the clousre of inner function returns we can use th variables of outer function in later time.

//Whereas a scope in javascript, defines what variable we can access where.
//There are two kinds of scope, global and local scope.

/*---------------------------------------------------Function Currying-------------------------------------------------------*/
//Currying in JavaScript transforms a function with multiple arguments into a nested series of functions, each taking a single argument.
// In currying a function takes one argument at a time and returns a new function expecting the next argument.
// if we have f(a, b)  ----currying---> f(a)(b)

function f(a) {
  return function (b) {
    return `${a} ${b}`;
  };
}

console.log(f(5)(6));

//Q12. Why do we use currying ?

//a. It makes a function pure which makes it expose to less errors and side effects.
//b. It helps in avoiding the same variable again and again.
//c. It is a checking method that checks if you have all the things before you proceed.
//d. It divides one function into multiple functions so that one handles one set of responsibility.

//Q13. How does currying work ?
//eg:
/*-----Simple function-----*/
const add = (a, b, c) => {
  return a + b + c;
};
// console.log(add(1, 2, 3)); //6
/*-----Curried function-----*/
const addCurry = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};
// console.log(addCurry(1)(2)(3)); //6

//Q14. implement sum function like sum(2)(6)(1).

// const sum = (a) => {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// };
// console.log(sum(2)(6)(1)); //9

/*Q15.  evaluate ("sum")(4)(2) => 6
        evaluate ("multiply")(4)(2) => 8
        evaluate ("divide")(4)(2) => 2
        evaluate ("substract")(4)(2) => 2
*/

function evaluate(type) {
  return (num1) => {
    return (num2) => {
      if (type == "sum") return num1 + num2;
      else if (type == "substract") return num1 - num2;
      else if (type == "multiply") return num1 * num2;
      else if (type == "divide") return num1 / num2;
      else return "Invalid operation";
    };
  };
}
// console.log(evaluate("sum")(4)(2));
// console.log(evaluate("multiply")(4)(2));
// console.log(evaluate("divide")(4)(2));
// console.log(evaluate("substract")(4)(2));

//Q16. Infinite currying -> sum(1)(2)(3)...(n)

// const sum = (a) => {
//   return (b) => {
//     if (b) return sum(a + b);
//     return a;
//   };
// };

// console.log(sum(1)(2)(3)(4)());

//Q17. Curring vs Partial Application

//Partial application transformation a function into another function with small arity.
//Arity means the number of operands or arguments a function receives.

// function sum(a) {
//   return function (b, c) {
//     return a + b + c;
//   };
// }

// console.log(sum(20)(5, 10));
// According to last example the number of nested functions in a currying function depends on the number of arguments it receives.
// In above example the the total number of arguments are 3 but nested functions only one.
// For currying function the nested function would be two.

//this is the major difference between currying and partial application.

//Q18. Manipuate DOM using currying.
function upadteElementText(id) {
  return function (content) {
    document.querySelector("#" + id).textContent = content;
  };
}

const updateH2Header = upadteElementText("heading2"); // We bascially can initialise the function by id once and repeatedly update the text whenever we want.
updateH2Header("this is currying");
updateH2Header("javascript is magic");

//Q19. currying() implementation--> convert f(a, b, c ) => f(a)(b)(c)

function curry(func) {
  return function curriedFunc(...args) {
    console.log("length", args.length, func.length);
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c) => a + b + c; // the number of arguments is equivalent to the number of functions. so for this case func.length is 3
const totalSum = curry(sum);

console.log(totalSum(5)(10)(5));
