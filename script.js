// Global constants

// Made by Ahmed Magdy as part of the Udacity Frontend Developer Role 

/*
** I am working on another enhanced version of this using React 
** and Bootstrap. I just wanted to provide a version that is 
** straightforward like this one and then use some frameworks
** to enhance it. I will send this enhanced version, hopefully, 
** before the end of the 72 hour deadline.
** Thank you so so so much for this opportunity!
*/

const API_URL = 'https://private-7e7394-udacityfrontendtest.apiary-mock.com'
const API_PATH_SIGNUP = '/signup';
const FORM = document.getElementById("signup-form");
const USERNAME_FIELD = document.getElementById("username");
const PW_FIELD = document.getElementById("password");
const EMAIL_FIELD = document.getElementById("email");
const CONTENT = document.querySelector(".content");

// A function to validate required fields and append error messages to DOM.
function validate(field, message) {
  const ERRMSG = document.createElement("section");
  ERRMSG.setAttribute("style", "display: none");
  ERRMSG.classList.add("error-message", "show");
  ERRMSG.textContent = message;
  field.insertAdjacentElement('afterend', ERRMSG);
}

function post(url, data, cb) {
  // Join the URL with the endpoint
  url = API_URL + API_PATH_SIGNUP;
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    cb(JSON.parse(this.responseText));
  }
  xhr.open('POST', url)
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data))
}


const submitForm = function () {
  const data = {
    username: USERNAME_FIELD.value,
    password: PW_FIELD.value
  }

  if (USERNAME_FIELD.value && PW_FIELD.value &&
    PW_FIELD.value.length >= 8 && EMAIL_FIELD.value) {
    post(API_URL,data, function (res) {
      userCreationStatus(res);
    });
  }
}


FORM.addEventListener("submit", e => {
  e.preventDefault();
  const requiredFields = document.querySelectorAll(".required");

  // loop over the required fields
  for (let requiredField of requiredFields) {
    let userCreationStatus = CONTENT.nextElementSibling;

    // Remove the user creation status message if it exists.
    if (userCreationStatus.classList.contains("user-creation")) {
      userCreationStatus.textContent = "";
      userCreationStatus.setAttribute("style", "display: none !important")
    }

    const errElementId = requiredField.getAttribute('data-err-field');
    const renderField = document.getElementById(errElementId);
    renderField.setAttribute("style", "display: none");
    renderField.classList.add("error-message", "show");

    // Render the error to the user if any required field is left blank
    if (!requiredField.value.length) {
      const err = requiredField.getAttribute("data-err-message");
      renderField.textContent = err;

    } else if (requiredField.value.length) {
      // clear the error message
      renderField.classList.remove("show");
      if (requiredField.id === "password") {
        if (requiredField.value.length < 8) {
          renderField.textContent = "Your password must be at 8 characters at least"
          renderField.classList.add("show");
        }
      }
    }
  }
  e.preventDefault();
  submitForm();
});

function userCreationStatus({message}) {
  if (!CONTENT.nextElementSibling.textContent) {
    const FRAGMENT = document.createElement("section");
    FRAGMENT.textContent = message;
    FRAGMENT.classList.add("user-creation", "show");
    CONTENT.insertAdjacentElement("afterend", FRAGMENT);
  }
}