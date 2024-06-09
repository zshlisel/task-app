const TITLE = 'Welcome to our ToDo App!!!';
let loggedInUser = {};

function loginBtnClicked() {
  let inputEl = document.querySelector("#user-name-input");
  let userName = inputEl.value;
  window.userName = userName;


  setTimeout(displayApp, 1000);

  let loginBtn = document.querySelector('#login-btn');

  loginBtn.innerText = 'Logging In...';

  
}

async function signUpBtnClicked(){
    let inputname = document.querySelector("#new-user-name-input");
    let newUserValue = inputname.value;
    let inputpass = document.querySelector("#new-password-input");
    let newPassValue = inputpass.value;
    let inputEmail = document.querySelector("#email-input");
    let newEmailValue = inputEmail.value;
    if (!newUserValue) return;
    if (!newPassValue) return;

  
    let newUserObject = {
      
      name : newUserValue,
      pass : newPassValue,
      email : newEmailValue
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
      loggedInUser = await response.json();
      console.log(loggedInUser);
      
    
    displayApp()
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

function displayTitleTillIndex(index){
  let subTitle = TITLE.substring(0, index+1);
  let h1El = document.querySelector('#app-title');
  if(index < TITLE.length-1) subTitle += '_';
  h1El.innerText = subTitle;
}


function displayTitle(){
  for(let i = 0; i < TITLE.length; i++){
    setTimeout(function() {
      displayTitleTillIndex(i);
    }, i*50);
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