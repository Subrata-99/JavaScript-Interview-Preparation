//What is memoization ?
//=> Memoization is an optimization technique that can be used to reduce time-consuming calculations by saving previous input to something called cache and return the result from it.

let sum = 0;
const calc = (n) => {
  //Some calculations
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

const memoize = (cb) => {
  let cache = {};
  return function (...args) {
    let n = args[0]; // getting the 1st param value(n)
    if (n in cache) {
      console.log("cashe", cache);
      return cache[n];
    } else {
      const result = cb(n);
      cache[n] = result;
      return result;
    }
  };
};

// console.time();
// console.log(calc(5));
// console.timeEnd();

const efficientCalc = memoize(calc);
console.time();
console.log(efficientCalc(5));
console.timeEnd();

console.time();
console.log(efficientCalc(5));
console.timeEnd();

// console.time();
// console.log(efficientCalc(5));
// console.timeEnd();
