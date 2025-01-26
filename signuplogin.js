const users = JSON.parse(localStorage.getItem("users")) || [];

// Function to show Signup form
function showSignup() {
    // Show signup form and hide login form
    document.getElementById('signup-form').classList.remove('d-none');
    document.getElementById('login-form').classList.add('d-none');
}

// Function to show Login form
function showLogin() {
    // Show login form and hide signup form
    document.getElementById('signup-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
}

// Signup function
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    // Regex validation for username and password
    const usernamePattern = /^[a-zA-Z0-9_]{5,15}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernamePattern.test(username)) {
        alert("Username must be 5-15 characters long and can only include letters, numbers, and underscores.");
        return;
    }

    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long and include one letter, one number, and one special character.");
        return;
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists! Please choose a different one.");
        return;
    }

    // Add new user to the array
    users.push({ username, password });

    // Save updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    showLogin();  // Show login form after successful signup
}

// Login function
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Validate username and password input
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if the user exists and credentials match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful! Redirecting to the game...");
        // Redirect to the game page
        window.location.href = "wm2.html"; // replace with your game page URL
    } else {
        alert("Invalid username or password.");
    }
}

// Initially show the Signup form
showSignup();



// Guest Login from Signup Page
function guestLoginFromSignup() {
    // Hide Signup form and show Login form
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}



function showLogin() {
    // Hiding signup form and show the login form
    document.getElementById('signup-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
}

function guestLoginFromSignup() {
    // Simulating transition to the login form
    showLogin();
}

function guestLoginFromLogin() {
    // Redirecting directly to the game
    window.location.href = "wm2.html";
}

function guestLoginFromLogin() {
    // Redirecting to the Whack-a-Mole game page
    window.location.href = "wm2.html";
}










