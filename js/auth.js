// auth.js - FIXED FOR YOUR TOGGLE UI
document.addEventListener('DOMContentLoaded', function() {
  const authForm = document.getElementById('authForm');
  const modeToggle = document.getElementById('modeToggle');
  const loginText = document.getElementById('loginText');
  const signupText = document.getElementById('signupText');
  const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
  const submitBtn = document.getElementById('submitBtn');
  const confirmPassword = document.getElementById('confirmPassword');
  
  let isSignup = false;

  // Toggle between login and signup mode
  modeToggle.onclick = () => {
    isSignup = !isSignup;
    modeToggle.classList.toggle('active');
    loginText.classList.toggle('active');
    signupText.classList.toggle('active');
    confirmPasswordGroup.style.display = isSignup ? "block" : "none";
    submitBtn.textContent = isSignup ? "Create Account" : "Sign In";
  };

  // Handle form submission
  authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ⭐ STOPS PAGE RELOAD - THIS WAS THE MAIN BUG!
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (isSignup) {
      // SIGN UP MODE
      if (password !== confirmPassword.value) {
        alert("Passwords don't match!");
        return;
      }
      
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Account created successfully!");
          window.location.href = "dashboard.html";
        })
        .catch(err => alert("Error: " + err.message));
        
    } else {
      // LOGIN MODE
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch(err => alert("Login failed: " + err.message));
    }
  });

  // Auto-redirect if already logged in
  auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname.includes('index.html')) {
      window.location.href = "dashboard.html";
    }
  });
});
  .then(() => alert("Account created"))
  .catch(err => alert(err.message));
};
