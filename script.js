document.addEventListener("DOMContentLoaded", function() {
  // Open popup function
  function openPopup() {
    document.getElementById("popup-container").style.display = "block";
  }

  // Close popup function
  function closePopup() {
    document.getElementById("popup-container").style.display = "none";
  }

  // Event listener for login button to open popup
  document.getElementById("loginBtn").addEventListener("click", openPopup);

  // Event listener for close popup button
  document.getElementById("close-popup-btn").addEventListener("click", closePopup);
});
