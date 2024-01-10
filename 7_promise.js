const heading = document.getElementById("heading");
heading.innerText = "Starting Promise";

console.log("Starting Promise", heading);

//Q. What is callback hell and how to handle it.(using promise chains)
/*------------- Callbacks hell --------------------*/
function firstFunction(cb) {
  setTimeout(() => {
    cb("1st function called");
    //   reject("1st function rejected");
  }, 1000);
}
function secondFunction(cb) {
  setTimeout(() => {
    //   resolve("2nd function called");
    cb("2nd function called");
  }, 2000);
}
function thirdFunction(cb) {
  setTimeout(() => {
    cb("3rd function called");
    //   reject("3rd function rejected");
  }, 3000);
}

// const callback = firstFunction(function (message) {
//   console.log("Callback 1", message);
//   secondFunction(function (message) {
//     console.log("Callback 2", message);
//     thirdFunction(function (message) {
//       console.log("Callback 3", message); // This we if this nest becomes too large its hard to maintain and understand code that leads to callback hell or pyramid of doom.
//     });
//   });
// });

/*----------------------Now Using Promise-------------------------------*/
function firstFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1st function called");
      //   reject("1st function rejected");
    }, 1000);
  });
}
function secondFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2nd function called");
      // reject("2nd function rejected");
    }, 600);
  });
}
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("3rd function called");
      //   reject("3rd function rejected");
    }, 800);
  });
}

// firstFunction()
//   .then((res) => {
//     console.log(res);
//     return secondFunction();
//   })
//   .then((res) => {
//     // Promise chaining
//     console.log(res);
//     return thirdFunction();
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log("err-------", err));

/*-------------Promise Combinators------------*/

//Promise.all:
//It helps us to run multiple promises in parallel and in the end it returns an array with all fulfilled promises.
//But if any of the promises fails then its going to fail the whole promise.all.
// Promise.all([firstFunction(), secondFunction(), thirdFunction()])
//   .then((res) => console.log(res))
//   .catch((err) => console.log("err---------", err));

//Promise.allSettled
//Same as Promise.all except even if any one of the promises fails it's going to return all of the promises fulfilled as well.
// Promise.allSettled([firstFunction(), secondFunction(), thirdFunction()])
//   .then((res) => console.log(res))
//   .catch((err) => console.log("err---------", err));

// Promise.race
//Same as Promise.all except it returns first promise fulfilled or rejected.
// Promise.race([firstFunction(), secondFunction(), thirdFunction()])
//   .then((res) => console.log("race---", res))
//   .catch((err) => console.log("race err---------", err));

// Promise.any
//Same as Promise.race except it returns first promise fulfilled.
//If any promise is rejected first then it simply ignores it and keep going untill find the first fulfilled promise.
// Promise.any([firstFunction(), secondFunction(), thirdFunction()])
//   .then((res) => console.log("any---", res))
//   .catch((err) => console.log("any err---------", err));

/*-------------Async & Await------------*/
// A modern approach to solve promises.

// const asyncFunc = async () => {
//   try {
//     const message1 = await firstFunction(); // Instead of chaining .then we use await. It will basically waits until the fuction is resolved or rejected.
//     const message2 = await secondFunction();
//     const message3 = await thirdFunction();

//     console.log({ message1, message2, message3 });
//   } catch (error) {
//     // We use try catch method to catch error from async function using await
//     console.log("asyncFunc err---------", error);
//   }
// };

// asyncFunc();

/*-------------O/P questions------------------*/
//Q1.
// console.log("Start");

// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve(2);
// });

// promise.then((res) => console.log("result----------", res));
// console.log("End"); // O/P- Start 1 End 2

//Q2.
// function job(state) {
//   return new Promise((resolve, reject) => {
//     if (state) resolve("Success");
//     else reject("Error");
//   });
// }

// let promise = job(true);

// promise
//   .then((res) => {
//     console.log(res); //Success
//     return job(false);
//   })
//   .catch((err) => {
//     console.log(err); //Error

//     return "Error caught"; // Since we are returning a string here, this will be counted as resolved promise.
//   })
//   .then((res) => {
//     console.log(res); //Error caught
//     return job(true); // as job true returns resolve not reject, so, won't go to next catch block and end here.
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Q3.
// function job(state) {
//   return new Promise((resolve, reject) => {
//     if (state) resolve("Success");
//     else reject("Error");
//   });
// }

// let promise = job(true);

// promise
//   .then((res) => {
//     console.log(res); // Success

//     return job(true);
//   })
//   .then((res) => {
//     if (res !== "victory") throw "Defeat"; // throwing error so a rejected promise.

//     return job(true);
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err); // Defeat

//     return job(false);
//   })
//   .then((res) => {
//     console.log(res);
//     return job(true);
//   })
//   .catch((err) => {
//     console.log(err); //Error
//     return "Error caught"; // Returning a string turns as resolved promise
//   })
//   .then((res) => {
//     console.log(res); // Error caught
//     return new Error("test"); // Its also not error a resloved promise
//   })
//   .then((res) => {
//     console.log("Success:", res.message); // Success: test
//   })
//   .catch((res) => {
//     console.log("Error:", res.message);
//   });

//Q4. Create a promsie called 1st promise which will resolve a text called "first". then create another promise called 2nd Promise which will resolve our first promise.
//Then we will resolve our 2nd promise and o/p of which we have to pass to our 1st promise and then print the 1st promise.

// firstPromise = new Promise((resolve, reject) => {
//   resolve("first");
// });

// secondPromise = new Promise((resolve, reject) => {
//   resolve(firstPromise);
// });

// secondPromise.then((res) => res).then((res) => console.log(res));

//Q5. Create a function called promRecurse which takes promises as an array and resolves them recursively.

// function promRecurse(functions) {
//   if (!functions?.length) return;
//   const currPromise = functions.shift();
//   currPromise.then((res) => console.log(res)).catch((err) => console.log(err));

//   promRecurse(functions); // Calling recursively
// }

// promRecurse([firstFunction(), secondFunction(), thirdFunction()]);

/*-------------Polyfill for Promise------------*/

function MyPromise(executor) {
  let onResolve,
    onReject,
    //We need these for making promise work for even synchronous tasks
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    console.log("Calling resolve", onResolve);

    // While synchronous task onResolve will not be a function so need to check
    if (typeof onResolve === "function") {
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;
    console.log("Calling reject", onReject);

    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    console.log("Calling this.then", this, callback);
    onResolve = callback;

    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    console.log("Calling this.catch", this, callback);
    onReject = callback;
    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
  console.log("Calling MyPromise", executor(resolve, reject));
}

// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     //   resolve("success");
//     reject("error");
//   }, 3000);
// })
//   .then((data) => console.log("data-------", data))
//   .catch((err) => console.log("catch------", err));

/*-------------Polyfill for Promise.resolve------------*/

// MyPromise.resolve = (val) => {
//   return new MyPromise(function executor(resolve, reject) {
//     resolve(val);
//   });
// };

/*-------------Polyfill for Promise.reject------------*/

// MyPromise.reject = (val) => {
//   return new MyPromise(function executor(resolve, reject) {
//     reject(val);
//   });
// };

/*-------------Polyfill for Promise.all()------------*/

// Promise.allPolyfill = (promises) => {
//   return new Promise((resolve, reject) => {
//     let result = [];

//     if (!promises?.length) return resolve(result);

//     let pending = promises.length; // keep track of number of promises executing

//     promises.forEach((promise, index) => {
//       Promise.resolve(promise).then((res) => {
//         result[index] = res;
//         pending--;

//         if (pending === 0) return resolve(result);
//       }, reject); // if any promise did not get resolved then reject
//     });
//   });
// };

// Promise.allPolyfill([firstFunction(), secondFunction(), thirdFunction()])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

/*-------------Polyfill for Promise.race()------------*/

export function promiseRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}

/*-------------Polyfill for Promise.allSettled()------------*/
function allSettled(promises) {
  let mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: "fulfilled",
          value,
        };
      })
      .catch((reason) => {
        return {
          status: "rejected",
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
}

/*-------------Polyfill for Promise.any()------------*/
function any(promises) {
  let results = [];
  var counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        resolve(result);
      }).catch((err) => {
        results.push(err);
        ++counter;
        if (counter === promises.length) {
          reject(results);
        }
      });
    });
  });
}

//Important thing to note. If browser sends a promise and gets 404 or similer error code it will come to catch.
//Why?-> Because catch only handles if request couldn't send properly. Then that comes to catch block.
