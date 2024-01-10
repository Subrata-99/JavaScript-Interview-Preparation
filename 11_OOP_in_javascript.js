/*----------------------------------------------- JavaScript and Classes ---------------------------------------------------*/

/* 
    JavaScript introduced classes to ES6. It is important to note that javascript is primarily a prototype-based language.
    And it's classes are primarily syntactic sugar over existing prototype-based inheritance mechanism. In other words, it provides
    more familier syntax for developers coming from class-based languages such as  Java or C++, but under the hood, it works somewhat differently.
*/

/*
    OOP: This is basically a programming paradigm, meaning, How we are writing code or the structure of code, Style of programming.

    Object: It is basically collections of properties and methods.

    Why we use OOP ?
    - It basically came into the picture when we were encountering messy code. Theres a concept called Spaghetti code, means code is so unstructured
    or nonmangleable that no chuck can be reused.

    Parts of OOP:
    Object literal

    - Constructors
    - Prototypes
    - Classes
    - Instances (new, this)

    Four pillars of OOP
    - Abstraction
    - Encapsulation
    - Inheritance
    - Polymorphism
*/

//Object Literal: Its nothing but making objects literally
const user = {
  username: "Subrata",
  loginCount: 8,
  signedIn: true,

  getUserDetails: function () {
    console.log("Got user details from database");
  },
};
//In js this is the basic unit, our object is the object literal and also basic unit.
// username, loginCount, these are properties of object literal
// As well as we have object

console.log(user.username);
console.log(user.getUserDetails());

//Constructor:
// const promiseOne = new Promise();
const date = new Date();

//This "new" keyword is actually constructor function.
//What it does is, It allows us to create multiple instances from a single object literal.
// So this new keyword is used to create new instances and keep the different contexts for them.

//Let's see how we use it.

function User(username, loginCount, isLogin) {
  this.username = username; //Here lets say we already have a variable username and we want to set the parameter value to username.
  // to identify in which username we want to set, we use the context this.
  this.loginCount = loginCount;
  this.isLogin = isLogin;

  //   return this; //It doesn't matter if we return this or not, implicitly this will always return.
}

const userOne = User("Subrata", 8, true); //Lets make a user from our User

console.log(userOne); //this gives all the details of this along with our username, loginCount, isLogin

//Now lets make another user from our User.

const userTwo = User("San", 0, false);

//Now let's print userOne again
console.log(userOne);

//As we can see even though we are not printing userTwo, still userOne is already overwritten.
// This the problem here we can't have different contexs for different users here.

// Thus constructor comes into the picture. everytime we use it, it gives a new copy or instance.
// Other instances will not effected by that.

//So to solve this now we can write,

const userOneNew = new User("Subrata", 8, true);
const userTwoNew = new User("San", 0, false);

console.log(userOneNew); //User {username: 'Subrata', loginCount: 8, isLogin: true}
console.log(userTwoNew); //User {username: 'San', loginCount: 0, isLogin: false}

//So this new keyword is making new instances.

/* 
Note: 
    - Whenever we use "new" keyword an empty object will be created. Which is also known as instance.
    - A constructor funtion will be called for this "new" keyword.
    - Then the this keyword will inject all the arguments provided by user.
    - Then lastly we get all these in our function
*/

//Now lets see if constructor is really available and if so, then what is inside,

console.log("isConstructor inside", userOneNew.constructor); // ƒ User(username, loginCount, isLogin)

//So this proves constructor is the reference of the function created (User)
