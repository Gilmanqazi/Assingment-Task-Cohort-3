// ==========================
// AUTO LOGIN
// ==========================

if (
  localStorage.getItem("loggedIn") === "true" &&
  window.location.pathname.includes("login.html")
) {
  window.location.href = "index.html";
}

// ==========================
// REGISTER
// ==========================

const registerForm =
document.getElementById("registerForm");

registerForm?.addEventListener("submit", function(e){

e.preventDefault();

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

if(name==="" || email==="" || password===""){

alert("Fill all fields");

return;

}

if(password!==confirmPassword){

alert("Passwords do not match");

return;

}

let users=

JSON.parse(

localStorage.getItem("users")

) || [];

const exists=

users.find(

user=>user.email===email

);

if(exists){

alert("Account already exists");

return;

}

users.push({

name,

email,

password

});

localStorage.setItem(

"users",

JSON.stringify(users)

);

alert("Registration Successful");

window.location.href="login.html";

});

// ==========================
// LOGIN
// ==========================

const loginForm=
document.getElementById("loginForm");

loginForm?.addEventListener("submit",function(e){

e.preventDefault();

const email=
document.getElementById("loginEmail").value.trim();

const password=
document.getElementById("loginPassword").value;

const users=

JSON.parse(

localStorage.getItem("users")

) || [];

const user=

users.find(

u=>u.email===email &&
u.password===password

);

if(!user){

alert("Invalid Email or Password");

return;

}

localStorage.setItem(

"loggedIn",

"true"

);

localStorage.setItem(

"currentUser",

JSON.stringify(user)

);

window.location.href="index.html";

});

// ==========================
// LOGOUT
// ==========================

function logout(){

localStorage.removeItem("loggedIn");

localStorage.removeItem("currentUser");

window.location.href="login.html";

}