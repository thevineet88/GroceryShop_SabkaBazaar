
let usersMap = new Map();

 const validateEmail = (email) => {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
};
  
 const checkOnlyLetters = (str) => {
    return /^[a-zA-Z]+$/.test(str);
};

 const vaildatePassword = (password) => {
    let regEx = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return regEx.test(password);
};

function checkAndStoreUser(){
    validdateUserInputs();
}

function validdateUserInputs(event){
    event.preventDefault();
    let email = document.querySelector('#inputEmail1');
    let pwd = document.querySelector('#inputPassword1');
    let firstname = document.querySelector('#inputFirstname');
    let lastname = document.querySelector('#inputLastName');
    if(validateEmail(email.value)  && checkOnlyLetters(firstname.value) && checkOnlyLetters(lastname.value)){
        if( localStorage.getItem(email.value)){
            alert('Email Already present');
        }else{
            localStorage.setItem(email.value,pwd.value);
            alert('Signup Success');
        }
    }
    else {
        alert('Email Not valid!')
    }

}


function checkUserCred(event){
    event.preventDefault();
    let loinForm = document.querySelector('#loginForm');
    let email = document.querySelector('#inputEmail1');
    let pwd = document.querySelector('#inputPassword1');
    let storedPwd = localStorage.getItem(email.value);
    if(storedPwd && pwd.value === storedPwd){
        alert('logged in successful ! You will be redirected to home page!');
        loinForm.reset();
        sessionStorage.setItem('isLoggedIn',true);
        let origin = window.location.origin;
        window.location.href = `${origin}/public/index.html`;
    }else{
        alert('Login failed! Please check email/password');
    }

}