<?php
// Database credentials
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password_confirmation = $_POST['password_confirmation'];

// Validate user input
if (empty($name) || empty($email) || empty($password) || $password !== $password_confirmation) {
    // Display error messages if validation fails
    header("Location: signup.html?error=incomplete_data");
    exit();
}

// Prepare SQL statement
$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, password_hash($password, PASSWORD_DEFAULT));

// Execute statement and check for errors
if ($stmt->execute()) {
    // Redirect to success page
    header("Location: login.html?signup=success");
} else {
    // Display error message
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>