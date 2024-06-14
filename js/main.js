// Sign Up

const signUpName = document.querySelector("#signUpName");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpButton = document.querySelector("#signUpButton");
const signUpmessage = document.querySelector("#signUpmessage");

let allUsers = [];

if (JSON.parse(localStorage.getItem("usersData")) != null) {
    allUsers = JSON.parse(localStorage.getItem("usersData"));
}

function signUp() {
    userInputsValidation();
    isExist();
    checkInputs();
    if(userInputsValidation() == true && isExist() == false && checkInputs() == false){
        let user = {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        }
        allUsers.push(user);
        localStorage.setItem('usersData',JSON.stringify(allUsers));
        signUpmessage.innerHTML = `<p class="text-success" id="signUpmessage"><i class="fa-solid fa-check"></i> Success</p>`;
        setTimeout(() => {
            open('index.html', '_self');
        }, 300);
    }
}

function userNameValidation() {
    let userNameAlert = document.querySelector("#userNameAlert");
    let regex = /^[A-Za-z0-9_]{3,16}$/
    if(regex.test(signUpName.value) == true && signUpName.value != ""){
        signUpName.classList.add("is-valid");
        signUpName.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block", "d-none");
        return true
    } else {
        signUpName.classList.add("is-invalid");
        signUpName.classList.remove("is-valid");
        userNameAlert.classList.replace("d-none", "d-block");
        return false
    }
}

function signUpEmailValidation() {
    let emailAlert = document.querySelector("#emailAlert");
    let regex = /^([a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/
    if(regex.test(signUpEmail.value) == true && signUpEmail.value != ""){
        signUpEmail.classList.add("is-valid");
        signUpEmail.classList.remove("is-invalid");
        emailAlert.classList.replace("d-block", "d-none");
        return true
    } else {
        signUpEmail.classList.add("is-invalid");
        signUpEmail.classList.remove("is-valid");
        emailAlert.classList.replace("d-none", "d-block");
        return false
    }
}

function signUpPasswordValidation() {
    let passwordAlert = document.querySelector("#passwordAlert")
    let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    if(regex.test(signUpPassword.value) == true && signUpPassword.value != ""){
        signUpPassword.classList.add("is-valid");
        signUpPassword.classList.remove("is-invalid");
        passwordAlert.classList.replace("d-block", "d-none");
        return true
    } else {
        signUpPassword.classList.add("is-invalid");
        signUpPassword.classList.remove("is-valid");
        passwordAlert.classList.replace("d-none", "d-block");
        return false
    }
}

function userInputsValidation () {
    userNameValidation();
    signUpEmailValidation();
    signUpPasswordValidation();
    if (userNameValidation() == true && signUpEmailValidation() == true && signUpPasswordValidation() == true ) {
        return true
    } else {
        return false
    }
}

function isExist() {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            signUpmessage.innerHTML = `<p class="text-danger" id="signUpmessage"><i class="fa-solid fa-triangle-exclamation"></i> Email already exist</p>`
            return true
        }
    }
    return false
}

function checkInputs() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        signUpmessage.innerHTML = `<p class="text-danger" id="signUpmessage"><i class="fa-solid fa-triangle-exclamation"></i> All inputs are required</p>`
        return true
    } else {
        return false
    }
}

signUpButton?.addEventListener('click', function () {
    signUp();
})


// Log In

const logInEmail = document.querySelector("#logInEmail");
const logInPassword = document.querySelector("#logInPassword");
const logInMessage = document.querySelector("#logInMessage");
const logInButton = document.querySelector("#logInButton");

function LogIn () {
    if (logInEmail.value == "" || logInPassword.value == "") {
    logInMessage.innerHTML = `<p class="text-danger" id="logInMessage"><i class="fa-solid fa-triangle-exclamation"></i> All inputs are required</p>`
    }
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email.toLowerCase() == logInEmail.value.toLowerCase() && allUsers[i].password == logInPassword.value) {
            logInMessage.innerHTML = `<p class="text-success" id="logInMessage"><i class="fa-solid fa-check"></i> Success</p>`
            localStorage.setItem("userName", JSON.stringify(allUsers[i].name))
            setTimeout(() => {
                open('home.html', '_self');
            }, 300);
            return
        } else {
            logInMessage.innerHTML = `<p class="text-danger" id="logInMessage"><i class="fa-solid fa-triangle-exclamation"></i> Wrong email or password</p>`
        }
    }
}

logInButton?.addEventListener('click', function () {
    LogIn();
})

let userName = localStorage.getItem('userName');
let userMessage = document.querySelector('#userMessage');
function sayWelcomeToUser() {
    userMessage.innerHTML = `<h1 id="userMessage">Welcome ${userName}</h1>`;
}