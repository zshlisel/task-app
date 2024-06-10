const TITLE = 'Welcome to our ToDo App!!!';
let loggedInUser = {};

async function loginBtnClicked() {
  let inputname = document.querySelector("#user-name-input");
  let username = inputname.value;
  let inputpass = document.querySelector("#password-input");
  let password = inputpass.value;
  if (!username || !password) return;

  let loginObject = {
    username: username,
    password: password
  };

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginObject)
  });

  if (response.ok) {
    const result = await response.json();
    if (result.ok) {
      console.log('Login successful');
      sessionStorage.setItem('userId', result.userId)
      setTimeout(displayApp, 1000);
      let loginBtn = document.querySelector('#login-btn');
      loginBtn.innerText = 'Logging In...';
    } else {
      console.error('login failed');
    }
  } else {
    console.error('Login request failed');
  }
}








async function signUpBtnClicked() {
  let inputname = document.querySelector("#new-user-name-input");
  let newUserValue = inputname.value;
  let inputpass = document.querySelector("#new-password-input");
  let newPassValue = inputpass.value;
  let inputEmail = document.querySelector("#email-input");
  let newEmailValue = inputEmail.value;
  if (!newUserValue) return;
  if (!newPassValue) return;


  let newUserObject = {

    name: newUserValue,
    pass: newPassValue,
    email: newEmailValue
  };

  // Send the new user to the server
  const response = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUserObject)
  });

  if (response.ok) {
    let result = await response.json();

    let doneRegistering = setTimeout(displayApp, 3000);
    let signInBtn = document.querySelector('#signUp-btn');
    setTimeout(() => {
      signInBtn.innerText = 'Logging in...';
      console.log('Successfully Signed Up');
      sessionStorage.setItem('userId', result.userId);
      doneRegistering
    }, 1500);
    signInBtn.innerText = 'Registering...';

    console.error('Login failed');


  } else {
    console.error('failed to add user');
  }

}

function displayApp() {
  let container = document.querySelector(".todo-container");
  container.style.display = "block";

  let welcomeCtr = document.querySelector(".getUser");
  welcomeCtr.style.display = "none";

  displayTitle();
  main();
}

function displayTitleTillIndex(index) {
  let subTitle = TITLE.substring(0, index + 1);
  let h1El = document.querySelector('#app-title');
  if (index < TITLE.length - 1) subTitle += '_';
  h1El.innerText = subTitle;
}


function displayTitle() {
  for (let i = 0; i < TITLE.length; i++) {
    setTimeout(function () {
      displayTitleTillIndex(i);
    }, i * 50);
  }

}

function togglePassword() {
  const passwordInput = document.getElementById('password-input');
  const toggleButton = document.getElementById('toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = 'Show';
  }
}

function switchToSignUp() {
  let signUp = document.querySelector(".signup");
  signUp.style.display = "block";

  let login = document.querySelector(".login");
  login.style.display = "none";
}

function switchToLogin() {
  let login = document.querySelector(".login");
  login.style.display = "block";

  let signUp = document.querySelector(".signup");
  signUp.style.display = "none";
}