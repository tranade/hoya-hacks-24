function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
  }
  
  // Function to close login popup
  function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
  }
  
  // Event listener for login button
  document.getElementById("loginBtn").addEventListener("click", openLoginPopup);