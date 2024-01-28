// Function to validate the sign up form
function validateSignUpForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      alert("All fields are required");
      return false;
  }

  if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
  }

  // Additional validation logic can be added here if needed

  return true;
}

// Function to validate the login form
function validateLoginForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email.trim() === '' || password.trim() === '') {
      alert("Email and password are required");
      return false;
  }

  // Additional validation logic can be added here if needed

  return true;
}