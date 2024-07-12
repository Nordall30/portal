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
