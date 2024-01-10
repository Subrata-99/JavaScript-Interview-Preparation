//Debouncing is a technique where we resist our function from calling unnecessarily by doing certain delay or interval after which the function can be called.
//Throtting is a technique that limit the execution of event handler function, even when the event triggers continuously due to user actions. User actions could be anything like scrolling, resizing window, etc...

//Q1. Create a button UI and add debounce as follows =>
//       --> Show "Button Pressed <X> Times" every time button is pressed.
//       --> Increase "Triggered <Y> Times" count after 800ms of debounce.

//ans
const btn = document.getElementById("button");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

// const debounce = _.debounce(() => {
//   count.innerHTML = ++triggerCount;
// }, 800);

// btn.addEventListener("click", () => {
//   btnPress.innerHTML = ++pressedCount;
//   debounce();
// });

//Q2. Create a button UI and add throttle as follows =>
//       --> Show "Button Pressed <X> Times" every time button is pressed.
//       --> Increase "Triggered <Y> Times" count after 800ms of debounce.

//ans. in this case we just use throttle function instead of debounce.
// const throttle = _.throttle(() => {
//   count.innerHTML = ++triggerCount;
// }, 800);

// btn.addEventListener("click", () => {
//   btnPress.innerHTML = ++pressedCount;
//   throttle();
// });

//Q3. Create debounce() polyfill.
// const myDebounce = (cb, delay) => {
//   let timer;

//   return function (...args) {
//     clearTimeout(timer); // the purpose of this, everytime we call debounce, we need to clear the previous timer
//     timer = setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// };

// const debounce = myDebounce(() => {
//   count.innerHTML = ++triggerCount;
// }, 800);

// btn.addEventListener("click", () => {
//   btnPress.innerHTML = ++pressedCount;
//   debounce();
// });

//Q4. Create throttle() polyfill

// const myThrottle = (cb, delay) => {
//   let shouldWait = false;

//   return function (...args) {
//     if (shouldWait) return;
//     cb(...args); //Initially for first call immediately function will be called.

//     shouldWait = true; //Then make shouldWait to true. so that until its false again function will not be called.
//     setTimeout(() => {
//       shouldWait = false; // after the delay completes, make shouldWait to false, so the next time function will be called.
//     }, delay);
//   };
// };

//Alternative approach.(not best approach)
// const myThrottle = (cb, delay) => {
//   let last = 0;

//   return function (...args) {
//     let now = new Date().getTime();
//     if (now - last < delay) return;
//     last = now;
//     return cb(...args);
//   };
// };

// const throttle = myThrottle(() => {
//   count.innerHTML = triggerCount++;
// }, 800);

// btn.addEventListener("click", () => {
//   btnPress.innerHTML = ++pressedCount;
//   throttle();
// });
