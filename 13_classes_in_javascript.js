//Classes in JavaScript

//Classes in JavaScript are introduced after ES6.

//Let's see the syntax and use it.
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  encryptedPassword() {
    //Inside the class we have methods, which is basically function
    return `${this.password}abc`;
  }

  changeUserName() {
    return this.username.toUpperCase();
  }
}

const newUser = new User("San", "san@gmail.com", "2221");
console.log(newUser.encryptedPassword());
console.log(newUser.changeUserName());

//Let's see how behind the scenes the above thing is working

function UserBehindTheScene(username, email, password) {
  this.username = username;
  this.email = email;
  this.password = password;
}

//Now let's attach two functions to User
UserBehindTheScene.prototype.encryptedPassword = function () {
  //Inside the class we have methods, which is basically function
  return `${this.password}abc`;
};
UserBehindTheScene.prototype.changeUserName = function () {
  return this.username.toUpperCase();
};

const behindTheSceneUser = new UserBehindTheScene(
  "San",
  "san@gmail.com",
  "2221"
);
console.log(behindTheSceneUser.encryptedPassword());
console.log(behindTheSceneUser.changeUserName());

/*------------------------------------------Inheritence------------------------------------------*/

class Person {
  constructor(username) {
    this.username = username;
  }

  logMe() {
    console.log(`USERNAME is ${this.username}`);
  }
}

//Now suppose we are making a ed-tech app where we may need to make this person admin, student, teacher, etc.

class Teacher extends Person {
  //Like we had prototype here we have extends keyword, which gives all fucntionalities of Person to Teacher.

  //Lets say we want to overide the constructor as teacher is different type.
  constructor(username, email, password) {
    super(username); /********************************************/
    this.email = email; //This email and password,
    this.password = password; //We are setting from this constructor
  }

  addCourse() {
    console.log(`A new Course was added by ${this.username}`);
  }
}
/*
    But for username should come from Person class.
    So to access the username from Person class we have a super keyword which enables to access from where the class extends.(here Person)*****************


*/
const teacher1 = new Teacher("Subrata", "sub#gmail.com", "subsan");
teacher1.addCourse(); //A new Course was added by Subrata

//lets create a new instance from Person

const person1 = new Person("San");
person1.logMe(); //USERNAME is San

//As teacher1 and person1 come from different class, let's check if they are equal or not.

console.log(person1 === teacher1); //false

//As teacher1 comes from Teacher class, let's check if they are equal or not.

console.log(teacher1 === Teacher); //false
//Obviously because teacher1 is a new instance from Teacher class, so they must be deffrent from each other.

//Now if we want to check if teacher1 comes from Teacher class or not, we can use a keyword called instanceof
console.log(teacher1 instanceof Teacher); //true

//Now as Teacher is an instance of Person, then teacher1 can be instance of Person( instance of instance) also, lets check,
console.log(teacher1 instanceof Person); //true

/*------------------------------------Static props----------------------------------*/

// class NewUser {
//   constructor(username) {
//     this.username = username;
//   }

//   logMeNew() {
//     console.log(`username: ${this.username}`);
//   }

//   //Whenever new user will be created from this class let's return new id
//   createId() {
//     return `123`;
//   }
// }

// const subrata = new NewUser("subrata");
// console.log(subrata.createId()); //123

//Now there will be times when we do not want to give access of createId() method to the objects which are instanciate by this class (NewUser)
// For that we can simply use ****static**** keyword to avoid the method being used by instances.

class NewUser {
  constructor(username) {
    this.username = username;
  }

  logMeNew() {
    console.log(`username: ${this.username}`);
  }

  //Whenever new user will be created from this class let's return new id
  static createId() {
    return `123`;
  }
}

const subrata = new NewUser("subrata");
// console.log(subrata.createId()); //Uncaught TypeError: subrata.createId is not a function

//Same will happen if we extends the class first and the create a new instance.
//Still we can not access the createId.

/*  An interesting question- Math.PI =  3.141592653589793
    If we wanto change that value is it possible or not ?
*/

console.log(Math.PI);
//Now if we want to change this
Math.PI = 4;
console.log(Math.PI); //3.141592653589793, It is not changing

//In Js on Object there are many properties, and among them one is getOwnPropertyDescriptor
// It gives some hidden info of object.
// We can access the information of properties in Math too

const descriptor = Object.getOwnPropertyDescriptor(Math, "PI"); //Second argument is for property for which we want information.

// console.log(descriptor);
/*{
    "value": 3.141592653589793,
    "writable": false,
    "enumerable": false,
    "configurable": false
}

we get this object which says this value cannot be writable, enumerable or configurable.
It is hardcodded in C++ and checked also, we can't change this anyways.
*/

//To create an object we have diffrent ways, like factory functions, create,
//Object.create
// const myNewObj = Object.create();

//Lets make an object normally
const chai = {
  name: "ginger chai",
  price: 250,
  isAvaliable: true,
};

console.log(chai); //{name: 'ginger chai', price: 250, isAvaliable: true}

//Now the question is does this object also has it's own descriptor properties ?(like Math)
//for that we will use same .getOwnPropertyDescriptor()

// console.log(Object.getOwnPropertyDescriptor(chai)); //Undefined, As we didn't put the property that needs to be checked
console.log(Object.getOwnPropertyDescriptor(chai, "name")); //{value: 'ginger chai', writable: true, enumerable: true, configurable: true}

//So we can see all the properities are set as true by default.
//Then this object is mad by us, so we can at least have right to manipualte the properties. and for that js allows too but not for everywhere.

// Object.defineProperty(chai, "name", {
//   //.defineProperty is used to manipulate the property configuration.
//   writable: false,
//   enumerable: false,
// });

console.log(Object.getOwnPropertyDescriptor(chai, "name")); //{value: 'ginger chai', writable: false, enumerable: false, configurable: true}

// Now lets have another scenario.

// const greenTea = {
//   name: "Darjeeling Green tea",
//   price: 450,
//   isAvaliable: true,
// };

// console.log(Object.getOwnPropertyDescriptor(greenTea, "name")); //{value: 'Darjeeling Green tea', writable: true, enumerable: true, configurable: true}

//Now lets use a loop on greenTea

// for (let [key, value] of greenTea) {
//   console.log(`${key}: ${value}`);
// } // Uncaught TypeError: greenTea is not iterable

//This is because of object.
//Here we can do object.entries

// for (let [key, value] of Object.entries(greenTea)) {
//   console.log(`${key}: ${value}`);
// }
//name: Darjeeling Green tea
//price: 450
//isAvaliable: true

//Lets make code fat geye case !
//As greenTea is an object, so, we can add methods inside it.
//so.

const greenTea = {
  name: "Darjeeling Green tea",
  price: 450,
  isAvaliable: true,

  orderTea: function () {
    console.log("green tea goes wrong...");
  },
};

for (let [key, value] of Object.entries(greenTea)) {
  console.log(`${key}: ${value}`);
}
// name: Darjeeling Green tea
// price: 450
// isAvaliable: true
// orderTea: function () {
//     console.log("green tea goes wrong...");
// }

//This is unwanted as we only want key value pairs.
//We can aviod this by modifying our code.

for (let [key, value] of Object.entries(greenTea)) {
  if (typeof value !== "function") console.log(`${key}: ${value}`);
}
// name: Darjeeling Green tea
// price: 450
// isAvaliable: true
//so get only key value pairs

//Now let's see if we make enumerable property false what happens

Object.defineProperty(greenTea, "name", { enumerable: false });
//writing same loop logic
for (let [key, value] of Object.entries(greenTea)) {
  if (typeof value !== "function") console.log(`${key}: ${value}`);
}
// price: 450
// isAvaliable: true

//This time name didn't print as we stopped the iteration of name by enumerable = false
