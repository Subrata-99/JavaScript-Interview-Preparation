// class User {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }
// }

// const subrata = new User("Subrata", "sub@123");
// console.log(subrata.password); //sub@123

//Sometimes we don't want to give access of all properties of our class to users, like not giving password access or
// return encrypted password, like that, and on that scenario getters and setters come into the picture.

//Suppose we don't want to give access of our password, so how we give error.

// class User {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }

//   get password() {
//     return this.password.toUpperCase();
//   }
// }

// const subrata = new User("Subrata", "sub@123"); //Uncaught TypeError: Cannot set property password of #<User> which has only a getter
// This happens as if we are using getters we must use setters

// class User {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }

//   get password() {
//     return this.password.toUpperCase();
//   }

//   set password(value) {
//     this.password = value;
//   }
// }

//The perspective of getter is if we want to get some value from out side of class
//The perspective of setter is if we want to set some value inside of class

// const subrata = new User("Subrata", "sub@123"); //Uncaught RangeError: Maximum call stack size exceeded
//So basically we are setting password inside constructor also in setter so this error occurs. So it becomes race between constructor and setter whos gonna set the value.

//So, to actually set that we do,

// class User {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }

//   get password() {
//     return this._password.toUpperCase();
//   }

//   set password(value) {
//     this._password = value; //in this approach we are making a new variable so that it won't conflict with constructor.
//   }

//   //Now behind the scenes, even though password is set to this.password inside constructor
//   // get and set methods are executed and returned, so it will not matter and we get updated password.
// }

// const subrata = new User("Subrata", "sub@123");
// console.log(subrata.password); //SUB@123

//Thats how getters and setters give flexibility to control the access of properties inside our classes.

//lets make same for the email

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  get email() {
    return this._email
      .split("@")[0]
      .replaceAll(this._email.split("@")[0], "XXXXX@gmail.com");
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password.toUpperCase();
  }

  set password(value) {
    this._password = value; //in this approach we are making a new variable so that it won't conflict with constructor.
  }

  //Now behind the scenes, even though password is set to this.password inside constructor
  // get and set methods are executed and returned, so it will not matter and we get updated password.

  //Note: Important to remember while writing getters or setters method the method name will be exactly the same as the property.
}

const subrata = new User("subrata@gmail.com", "sub@123");
console.log(subrata.email); //XXXXX@gmail.com

/*-------------------------------Using Setters and Getters with different approach(Function base)----------------------------------*/
//Before class we had functions so the approach was different for setters and getters

function FunUser(email, password) {
  this._email = email;
  this._password = password;

  //As we already know function is function and itself an object too
  //So in this case Object itself allows to access its properties. Here we have a property called defineProperty.

  Object.defineProperty(this, "email", {
    get: function () {
      return this._email
        .split("@")[0]
        .replaceAll(this._email.split("@")[0], "XXXXX@yahoo.com");
    },

    set: function (value) {
      this._email = value.toLowerCase();
    },
  });

  Object.defineProperty(this, "password", {
    get: function () {
      return this._password.replaceAll(this._password, "XXXXX");
    },

    set: function (value) {
      this._password = value.toLowerCase();
    },
  });
}

const funUser = new FunUser("San@yahoo.com", "san@123");
console.log(funUser.email, funUser.password); //XXXXX@yahoo.com XXXXX

/*-------------------------------Using Setters and Getters with different approach(Object base)----------------------------------*/
const ObjUser = {
  _email: "san@sub.com",
  _password: "subsan",

  get email() {
    return this._email.toUpperCase();
  },
  set email(value) {
    this._email = value.toLocaleLowerCase();
  },
};
//This is not so popular and old syntax

const objUser = Object.create(ObjUser);
console.log(objUser.email); //SAN@SUB.COM
//We can see the properties inside ObjUser was _email and _password,
//However we get the result from objUser.email, this is because, here email comes from the method email, created with set and get.

/*A simple example of getter setter:
    We see while using arrays we get length properties. What it basically does is inside the array object class or there also setters and getters.
    Once we pass array it won't store any length instead it calculate the length of array on the go using getter setter and returns the value.
*/

/*In ES2022 there comes a new proposal in javascript for private properties
  There now we use # over _
  It doesn't mean we can't use _. It's still supported.
*/
