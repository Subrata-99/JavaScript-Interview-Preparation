function multipleBy5(num) {
  return num * 5;
}

multipleBy5.power = 2;

console.log(multipleBy5(5)); //25
console.log(multipleBy5.power); //2
console.log(multipleBy5.prototype); //{}

// This proves in javascript everything end up being object.
// Function is a function and also function can be behaved as object too.

//   Function---->\
//                 \
//                  \
//   Array-----------> Object ---------> null
//                  /
//                 /
//   String------>/

//Let's make a function
function createUser(username, score) {
  this.username = username;
  this.score = score;
}

//This way we can attach or inject methods to our function.
createUser.prototype.increment = function () {
  this.score++;
};

//lets inject another method
createUser.prototype.printMe = function () {
  console.log(`price is ${this.score}`);
};

// const chai = createUser("chai", 25);
// const greenTea = createUser("greenTea", 250);

// console.log(chai);
// chai.printMe(); // at this moment if we use this method printMe(), will see an error, Uncaught TypeError: Cannot read properties of undefined (reading 'printMe')
//**************This because when we return the value and transfer to the "chai" from the function, we didn't let know that we injected those new properties.***********************
//*******************************So to let javascript know new keyword comes into the picture.**********************************
//So the modified code will be,

const chai = new createUser("chai", 25);
const greenTea = new createUser("greenTea", 250);

console.log(chai); //{"username": "chai","score": 25 }

chai.printMe(); //price is 25

/*
Here what happens behind the scenes when the new keyword is used:

=> A new object is created: The new keyword initiates the creation of new javascript object.

=> A prototype is linked: The newly created object gets linked to the prototype property of the constructor function.
This means that it has access to properties and methods defined on the constructor's prototype.

=> The constructor is called: The constructor function is called with the specified arguments and this is bound to the newly created object.
If no explicit return value is specified from the constructor, javascript assumes this, the newly created object, to be the intended return value.

=> The new object is returned: After the constructor function has been called. If it doesn't return a non-premitive value (object, array, functions, etc),
the newly created object is returned.
*/

//Till now we have discussed about new keyword, now let's discuss prototype in depth.
/*---------------------------------------------------------------------Prototype-------------------------------------------------------------------------------*/

let myName = "Subrata";

//So we know by default we can access many properties, like length,
console.log(myName.length); // 7

let myName2 = "Subrata     ";
console.log(myName2.length); // 12
//Now this is obviously wrong, So we want a property trueLength just like length for actual length removing all the empty spaces.
//So bascially we want this property by default to all the strings.
// Before try to achive that we need to understand so many things, let's do that.

let myHeros = ["batman", "thor"];

let heroPower = {
  thor: "Lightning",
  batman: "Intelligence",

  getBatmanPower: function () {
    console.log(`Batman's power is ${this.batman}`);
  },
  getThorPower: function () {
    console.log(`Thor's power is ${this.thor}`);
  },
};

// If we think do we have any method .subrata() so that we can access like heroPower.subrata()
// Clearly No!.
// Can we inject that property by ourself, Ofcourse!
// Here we actually want, if we ever declare any object, by default this method(.subrata()) should be attcached to the object.

Object.prototype.subrata = function () {
  //So here on Object datatype we chain prototype and make a function.
  console.log("Subrata is present in all objects");
};

// heroPower.subrata(); //Subrata is present in all objects

//So by our theory this method can also be accessable to our myHeros array, everthing is js come to object.
myHeros.subrata(); //Subrata is present in all objects
/* So what we did here,

as in js evrything(array, function, string) comes to an object, so we modified the top hierarchy which is object by attacing the .subrata() method.(refer to line 14)

thats how the method is accessable to all other types (array, function, string). 

*/

//Now what if we inject the method to array, will the method be accessable on object. lets see.

Array.prototype.heySan = function () {
  console.log("San from array");
};

// myHeros.heySan(); // San from array
// heroPower.heySan(); // Uncaught TypeError: heroPower.heySan is not a function

//So, it's clear that .heySan() method is not accessible on object.
// Also, it's not accessable to functons and strings

// so the the conclusion is its depends on direction of hierarchy. (refer to line 14)

/*---------------------------------------------inheritance----------------------------------------------*/

//lets make objects of teaching hierarchy

const User = {
  name: "San",
  email: "san@example.com",
};

const Teacher = {
  makeVideo: true,
};

const TeachingSupport = {
  isAvailable: false,
};

// const QandASupport = {
//   makeAssignment: "JS assignment",
//   fullTime: true,
// };

//Every oject itself is an instance. It's not like we can access everything from one object to another.
// So is there any way to link these objects.
//we can do that by,

const QandASupport = {
  makeAssignment: "JS assignment",
  fullTime: true,
  __proto__: TeachingSupport, //this __proto__ is available inside objects and we can access it.
};
//So we basically we are referencing the prototype with teaching support.
// now they are linked and we can access Teaching support in QandAsupport

//We can access not just inside but also outside.

Teacher.__proto__ = User; // Here teacher can access all the properties of user.

// This is known as prototypal inheritance.

//The above code structure is old and used to access that way long time ago.

//Modern syntax**********
//Here we access object directly

Object.setPrototypeOf(TeachingSupport, Teacher); // .setPrototypeOf sets the prototype of specific object to object proto or null.
//So here TeachingSupport is inheriting properties of Teacher.

//So, this is about Prototype inheritance

//So going back to line 79.
//Now we can solve this

let anotherUserName = "Sangeetha           ";

String.prototype.trueLength = function () {
  console.log(`${this}`);
  console.log(`True length of ${this} is: ${this.trim().length}`);
};

anotherUserName.trueLength();

//As we discussed we can use this method to all the strings. So,

"Subrata".trueLength();
