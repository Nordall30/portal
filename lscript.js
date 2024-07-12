// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYrcXkSzYNauCY6QypJKtNk_IVHYmn6Gs",
    authDomain: "login-fc3db.firebaseapp.com",
    databaseURL: "https://login-fc3db-default-rtdb.firebaseio.com",
    projectId: "login-fc3db",
    storageBucket: "login-fc3db.appspot.com",
    messagingSenderId: "363044743065",
    appId: "1:363044743065:web:a50a43257c1a12b9955508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Login successful', user);
            alert('Login successful!');
            // Redirect to main page
            window.location.href = 'Homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error [${errorCode}]: ${errorMessage}`);
            alert(`Error: ${errorMessage}`);
        });
}

// Signup function
function signupUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signup successful', user);
            alert('Signup successful!');
            // Redirect to main page
            window.location.href = 'Homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error [${errorCode}]: ${errorMessage}`);
            alert(`Error: ${errorMessage}`);
        });
}

// Event listeners for form submissions
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log('Logging in with', email, password);
    loginUser(email, password);
});

document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    console.log('Signing up with', email, password);
    signupUser(email, password);
});

// Show/Hide password functionality
const pwShowHide = document.querySelectorAll(".eye-icon");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
    })
});

const forms = document.querySelector(".forms");
const links = document.querySelectorAll(".link");

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
});

// Monitor authentication state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in, you can redirect to the protected page if needed
    console.log("User is signed in:", user);
    // Example: redirect to main.html if currently on login.html or signup.html
    if (window.location.pathname === '/login.html' || window.location.pathname === '/signup.html') {
      window.location.href = 'Homepage.html';
    }
  } else {
    // No user is signed in, redirect to login page if needed
    console.log("No user is signed in.");
    // Example: redirect to login.html if currently on a protected page
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/signup.html') {
      window.location.href = 'login.html';
    }
  }
});

// Function to log out
function logout() {
  firebase.auth().signOut().then(() => {
    console.log('User signed out.');
    window.location.href = 'login.html'; // Redirect to login page after logout
  }).catch((error) => {
    console.error('Sign out error:', error);
  });
}