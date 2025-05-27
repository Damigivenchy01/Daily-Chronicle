const form = document.querySelector(".register");
const error = document.querySelector(".error");
const err = document.querySelector(".err");
const submitter = document.querySelector(".reg-btn");
const logIn = document.querySelector(".log-in");
const todoArea = document.querySelector(".content-area");
const btnAdd = document.querySelector(".btn-add");
const logReg = document.querySelector(".c");
const regLog = document.querySelector(".cl");
const regContainer = document.querySelector(".reg");
const logContainer = document.querySelector(".log");
const todoContainer = document.querySelector(".todo-container");
const formContainer = document.querySelector(".container");
const welcome = document.querySelector(".welcome-message");

let allUsers = [];
let currentUser;

// get users from local storage
getLocalStorage();

/**
 * @registerUsers get form details from registration page
 * then stored them in an object @newUsers
 * used a conditional statement to check if user already exist
 * @returns is used to break out of conditional statement
 */
function registerUsers() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  let newUsers = {
    name: name,
    email: email,
    password: password,
    inputs: ["Welcome", "Add new Task"],
  };
  if (allUsers.find((acc) => acc.name === newUsers.name)) {
    const html = `You Have an Account, Try to LogIn`;
    error.insertAdjacentHTML("afterbegin", html);
    return;
  }
  if (!name && !email && !password) {
    const html = `Input your name, email and choose your password`;
    error.insertAdjacentHTML("afterbegin", html);
    return;
  } else {
    allUsers.push(newUsers);
    currentUser = newUsers;
    todo(currentUser);
    formContainer.classList.add("hidden");
    todoContainer.classList.remove("hidden");
    welcome.textContent = `Welcome, ${currentUser.name}`;
    setLocalStorage();
  }
}

/**
 * @logInUsers gets form details from login Page
 * then check if those details match existing accounts
 * @returns is used to break out of else
 */
function logInUser() {
  const name = document.querySelector("#name-login").value;
  const password = document.querySelector("#password-login").value;
  if (!name && !password) {
    const html = `Input your name and input your password`;
    error.insertAdjacentHTML("afterbegin", html);
    return;
  }
  if (
    allUsers.find((acc) => acc.name === name) &&
    allUsers.find((acc) => acc.password === password)
  ) {
    currentUser = allUsers.find((acc) => acc.name === name);
    formContainer.classList.add("hidden");
    todoContainer.classList.remove("hidden");
    welcome.textContent = `Welcome, ${currentUser.name}`;
    setLocalStorage();
  } else {
    const html = `No user Found, Create an Account or probably you inputed a wrong password`;
    err.insertAdjacentHTML("afterbegin", html);
    return;
  }
}

// For ToDo functionalities

// get Current users inputs and display them

/**
 *
 * @param {object} user  object consisting of user account
 * this function render the user todo task to the DOM
 * also allows for the functionalities which is to delete task or mark as completed
 */
function todo(user) {
  todoArea.innerHTML = "";
  user.inputs.forEach(function (inputs, index) {
    const html = `
    <div class="content">
      <input type="checkbox" name="checkbox" class="check" data-line="${index}"/>
      <p class="words">${inputs}</p> <button class="cancel" data-cancel="${index}"> X </button>
    </div>
    `;
    todoArea.insertAdjacentHTML("afterbegin", html);
  });

  const line = document.querySelectorAll(".check");

  line.forEach((l) =>
    l.addEventListener("click", function () {
      const parent = l.closest(".content");
      const word = parent.querySelector(".words");
      if (l.classList.contains("completed")) {
        l.classList.remove("completed");
        word.style.textDecoration = "none";
        setLocalStorage();
      } else {
        word.style.textDecoration = "line-through";
        l.classList.add("completed");
        setLocalStorage();
      }
      setLocalStorage();
    })
  );

  const cancel = document.querySelectorAll(".cancel");
  cancel.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      const index = e.target.dataset.cancel;
      user.inputs.splice(index, 1);
      todo(currentUser);
      setLocalStorage();
    })
  );
}

submitter.addEventListener("click", function (e) {
  e.preventDefault();
  error.innerHTML = "";
  registerUsers();
});

// allow users to logIn and check if their account can be found
logIn.addEventListener("click", function (e) {
  e.preventDefault();
  // error.innerHTML = "";
  logInUser();
  todo(currentUser);
});

btnAdd.addEventListener("click", function (e) {
  e.preventDefault(e);
  const todoInput = document.querySelector(".input-todo").value;
  let clearInput = document.querySelector(".input-todo");
  const errorText = document.querySelector(".error-text");

  // prevent empty Task
  if (todoInput === "") {
    errorText.classList.remove("hidden");
  } else {
    errorText.classList.add("hidden");
    currentUser.inputs.push(todoInput);
    clearInput.value = "";
    todo(currentUser);
    setLocalStorage();
  }
});

function setLocalStorage() {
  localStorage.setItem("users", JSON.stringify(allUsers));
}

function getLocalStorage() {
  data = JSON.parse(localStorage.getItem("users"));
  if (data) {
    allUsers = data;
  } else return;
}
logReg.addEventListener("click", function (e) {
  e.preventDefault();
  regContainer.classList.remove("hidden");
  logContainer.classList.add("hidden");
});
regLog.addEventListener("click", function (e) {
  e.preventDefault();
  regContainer.classList.add("hidden");
  logContainer.classList.remove("hidden");
});
