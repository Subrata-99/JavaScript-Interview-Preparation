//Q1. What is event propagation ?
//ans: It is the way how events are propagated and managed or works through the components.
//Q2. What is event bubbling ?******************
//ans: in event bubbling events are propagated like bubbling, meaning, event will go from down to up.
//It is the default behavior of events.

const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector(".event_button");

// div.addEventListener("click", () => {
//   alert("div clicked");
// });
// form.addEventListener("click", () => {
//   alert("form clicked");
// });
// button.addEventListener("click", () => {
//   alert("button clicked");
// });

//when we click on the button, we will see one after another alert will be shown, in order button--> form ---> div
//this is event bubbling.

//Q3. event.target vs this.target vs event.currentTarget*************************
//Ans: lets make a common function for above events.

div.addEventListener("click", func); //currentTarget = DIV , target = BUTTON , this = DIV
form.addEventListener("click", func); //currentTarget = FORM , target = BUTTON , this = FORM
button.addEventListener("click", func); //currentTarget = BUTTON , target = BUTTON , this = BUTTON

function func() {
  alert(
    "currentTarget = " +
      event.currentTarget.tagName + // It refers to the current target while propagating
      ", target = " +
      event.target.tagName + // this refers to the target on which function is invoked.
      ", this = " +
      this.tagName // this refers to the object on which function is called.
  );
}

//Q4. What is event capturing/ Trickling ?*****************************
//ans: it propagates exact opposite of event bubbling.

// div.addEventListener("click", func, { capture: true }); //
// form.addEventListener("click", func); //
// button.addEventListener("click", func); //
//currentTarget = DIV, target = BUTTON, this = DIV
//currentTarget = BUTTON, target = BUTTON, this = BUTTON
//currentTarget = FORM, target = BUTTON, this = FORM
//This happens because only div is using capturing but the button and form have the default behaviour.

//So to achive pure capturing like div --> form --> button we should modify to,
// div.addEventListener("click", func, { capture: true }); //
// form.addEventListener("click", func, { capture: true }); //
// button.addEventListener("click", func, { capture: true }); //

//Q5. How th stop the bubbling or capturing event.*****************************
//ans: we use something called stopPropagation

// div.addEventListener("click", (e) => {
//   e.stopPropagation();
//   alert("div clicked");
// });
// form.addEventListener("click", (e) => {
//   e.stopPropagation();
//   alert("form clicked");
// });
// button.addEventListener("click", (e) => {
//   e.stopPropagation();
//   alert("button clicked");
// });

//now only event will be called for which we click, stop the propagation.

//If we want to trigger button and form and then stop propagation.

// div.addEventListener("click", (e) => {
//   // e.stopPropagation();
//   alert("div clicked");
// });
// form.addEventListener("click", (e) => {
//   e.stopPropagation();
//   alert("form clicked");
// });
// button.addEventListener("click", (e) => {
//   // e.stopPropagation();
//   alert("button clicked");
// });

//Q6. What is event delegation ?**************************************************************
//ans: in UI we have all the e-commerce products.
//So for a product we can have click event. but if there are 1000s of products we have to add click events for each products.
//So, instead we can add the event listener to the parent element, this is called event delegation.
//

// document.querySelector(".products").addEventListener("click", (e) => {
//   console.log(e);
//   if (e.target.tagName === "SPAN")
//     window.location.href += "/" + e.target.className;
// });

//Q7. What is the O/P ?****************************************
// div.addEventListener("click", () => {
//   alert("div clicked");
// });
// form.addEventListener("click", () => {
//   alert("form clicked");
// });
// button.addEventListener("click", () => {
//   alert("button clicked");
// });
// for this the order of execution should be form --> button --> div

//ans:
// div.addEventListener("click", () => {
//   alert("div clicked");
// });
// form.addEventListener(
//   "click",
//   () => {
//     alert("form clicked");
//   },
//   { capture: true }
// );
// button.addEventListener("click", () => {
//   alert("button clicked");
// });

//Q8. Create a modal which closes by clicking on negative space.
const container = document.querySelector(".modalContainer");
const btn = document.querySelector(".modalButton");

btn.addEventListener("click", () => {
  toggleModal(true);
});

function toggleModal(toggle) {
  container.style.display = toggle ? "flex" : "none";
}

container.addEventListener("click", (e) => {
  if (e.target.className === "modalContainer") toggleModal(false);
});
