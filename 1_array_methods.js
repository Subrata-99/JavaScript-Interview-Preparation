// map, filter and reduce

// What is map() ?
//-> Map method used for creating new array from existing one by aplying a function to each elements of the existing array.
// a = 7;
let a;
console.log(window, a);
const nums = [1, 2, 3, 4];

const multiNums = nums.map((num, index, arr) => {
  // map function can have 3 parameters the current element(num), index of array, the array itself
  return num * 3;
});
console.log(multiNums);

/*------------------------Polyfill for map()------------------------*/

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this)); // current, index, array
  }
  return temp;
};

// What is filter() ?
//-> The filter method takes each element of array and it applies a conditon against it. If the condition satisfies, then only the element gets pushed into output array.

const numbers = [1, 2, 3, 4];

const moreThanTwo = numbers.filter((num, index, array) => {
  //Parameters are same as map method
  return num > 2;
});

console.log(moreThanTwo);

/*------------------------Polyfill for filter()------------------------*/

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(this[i]);
  }
  return temp;
};

// What is reduce() ?
//-> The reduce method reduces the array of values down to one value. It's not like reducing in literal sense.
//Basically it's used at a place where we have to take all elements of an array, do some operations and come up with a single value out of it.

const elements = [1, 2, 3, 4];

const sum = elements.reduce((acc, curr, index, array) => {
  // It takes two parameters, a callback function and initial value
  // Also the function parameters are different, this has an accumulator, current value, index and array
  // Accumulator is the result of previous computation.
  /*If theres no initial value, it takes first element of array as value for accumulator*/
  return acc + curr;
}, 0);

console.log(sum);

/*------------------------Polyfill for reduce()------------------------*/

Array.prototype.myReduce = function (cb, initialValue) {
  var accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i]; // if theres no initial value, it takes first element of array as value for accumulator.
  }
  return accumulator;
};

/*--------------------------------Q1 map() vs reduce() ?--------------------------------*/

const arr = [2, 5, 9, 10];

arr.map((a) => {
  return a + 2;
}); // this returns the whole array modified by adding 2 to each elements. It's not gonna modify the original array

arr.forEach((a) => {
  return a + 2;
}); // this returns nothing. Just works like normal for loop.

//To modify array using forEach we can do,

arr.forEach((a, i) => {
  arr[i] = a + 2;
});

//Another difference, we can chain other methods like, sort, filter, reduce on map.
//But forEach won't allow that as it doesn't return any array.

/*--------------------------------Q2 what is the O/P ?--------------------------------*/

let students = [
  { name: "Subrata", rollNumber: 2, marks: 80 },
  { name: "Sangeetha", rollNumber: 1, marks: 90 },
  { name: "Saswata", rollNumber: 69, marks: 90 },
  { name: "Saheli", rollNumber: 111, marks: 99 },
  { name: "lord mousam", rollNumber: 108, marks: 99 },
];

//return only the name of the students in capital letters.
nameWithCapitalLetters = students.map((student) => student.name.toUpperCase());
// console.log("nameWithCapitalLetters", nameWithCapitalLetters);

//return only the details of the students who scored more than 80 marks
const moreThaneighty = students.filter((student) => student.marks > 80);
// console.log("moreThaneighty", moreThaneighty);

//Calculate Sum of marks for all students
const marksSum = students.reduce((acc, curr) => acc + curr.marks, 0);
// console.log("marksSum", marksSum);

//return only names of the students who scored more than 80 marks
const moreThanEightyNames = students
  .filter((student) => student.marks > 80)
  .map((student) => student.name);

//Alternative approach
const moreThanAlt = students.reduce((acc, curr) => {
  if (curr.marks > 80) acc.push(curr.name);
  return acc;
}, []);

// console.log("moreThanEightyNames", moreThanEightyNames);
// console.log("moreThanAlt", moreThanAlt);

//Return total marks for students with marks greater than 94 after 15 marks have been added to those who scored less than 90 marks.
const output = students
  .map((student) => (student.marks < 90 ? student.marks + 15 : student.marks))
  .filter((mark) => mark > 94)
  .reduce((acc, curr) => acc + curr);
// console.log("output", output);

//Find the student having maximum marks
const maxMarks = students.reduce((acc, curr) =>
  acc.marks < curr.marks ? (acc = curr) : acc
);
// console.log("maxMarks", maxMarks);

// show different marks with how many same marks are there. {80: 1, 90: 2, 99: 3}
const diffMarks = students.reduce((acc, curr) => {
  if (acc[curr.marks]) {
    acc[curr.marks]++;
  } else {
    acc[curr.marks] = 1;
  }
  return acc;
}, {});
console.log("diffMarks", diffMarks);

//Write a function to flatten a nested array in JavaScript.*****************************
let nestedArray = [1, 2, 3, [4, 5], 6, [7, 8, 9], [10, [11, 12]]];
console.log(nestedArray);

// console.log([].concat.apply([], nestedArray)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, Array(2)]
//This method is okay for deepth of 1

//for deep nest we can use recursion

// function flattenArrayHandler(arr) {
//   return arr.reduce((acc, curr) => {
//     if (Array.isArray(curr)) {
//       acc = acc.concat(flattenArrayHandler(curr));
//     } else acc.push(curr);

//     return acc;
//   }, []);
// }
// const flattenArray = flattenArrayHandler(nestedArray);
// console.log(flattenArray);

//Polyfill for flat

Array.prototype.flattenArrayHandler = function (depth = 1) {
  function flatten(arr, depth) {
    if (depth < 1) return arr.slice();
    return arr.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        acc = acc.concat(flatten(curr, depth - 1));
      } else acc.push(curr);

      return acc;
    }, []);
  }
  return flatten(this, depth);
};

const flattenArray = nestedArray.flattenArrayHandler(2);
console.log(flattenArray);
