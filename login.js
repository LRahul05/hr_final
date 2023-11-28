// login.js

// Function to authenticate user
function authenticateUser() {
    var userType = document.getElementById("usertype").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Define user credentials
    const userCredentials = [
        { userType: "hr", username: "hruser", password: "hrpassword" },
        { userType: "employee", username: "usera", password: "passworda" },
        { userType: "employee", username: "userb", password: "passwordb" },
        { userType: "employee", username: "userc", password: "passwordc" },
        { userType: "employee", username: "userd", password: "passwordd" },
        { userType: "employee", username: "usere", password: "passworde" }
    ];

    // Check if the entered username exists
    const userExists = userCredentials.some(cred =>
        cred.userType === userType && cred.username === username
    );

    // Display error message if the username doesn't exist
    const errorMessage = document.getElementById("username-error");
    errorMessage.style.color = "red";
    errorMessage.innerText = userExists ? "" : "Username doesn't match. Please enter a valid username.";

    if (!userExists) {
        document.getElementById("username").value = ""; // Clear the username field
        return;
    }

    // Check credentials based on user type
    const validUser = userCredentials.find(cred =>
        cred.userType === userType && cred.username === username && cred.password === password
    );

    if (validUser) {
        // Redirect to the respective page based on user type
        window.location.href = validUser.userType === "employee" ? "employee.html" : "dashboard.html";
    } else {
        errorMessage.innerText = "Invalid credentials. Please try again.";
    }
}

// Function to update password input based on username
function updatePasswordInput() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var errorMessage = document.getElementById("username-error");

    // Enable or disable password input based on whether a username is selected
    passwordInput.disabled = !isValidUsername(usernameInput.value.trim());

    // Display error message dynamically while typing the username
    errorMessage.innerText = !isValidUsername(usernameInput.value.trim()) ? "Username doesn't match. Please enter a valid username." : "";
}

// Function to check if a username is valid
function isValidUsername(username) {
    const userCredentials = [
        { userType: "hr", username: "hruser" },
        { userType: "employee", username: "usera" },
        { userType: "employee", username: "userb" },
        { userType: "employee", username: "userc" },
        { userType: "employee", username: "userd" },
        { userType: "employee", username: "usere" }
    ];

    return userCredentials.some(cred => cred.username === username);
}

// Add event listener to username input for dynamic validation
document.getElementById("username").addEventListener("input", function () {
    updatePasswordInput();
});

// Add event listener to password input for Enter key
document.getElementById("password").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !document.getElementById("password").disabled) {
        authenticateUser();
    }
});
