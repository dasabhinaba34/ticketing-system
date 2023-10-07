document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const autofillButton = document.getElementById("autofill-button");
    const loginButton = document.querySelector(".login-button"); // Select the "Login" button by class

    // Add click event listener to the Autofill button
    autofillButton.addEventListener("click", function () {
        // Autofill the fields with "admin" and "password"
        usernameInput.value = "admin";
        passwordInput.value = "password";

        // Simulate a click on the "Login" button
        loginButton.click();
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Check if the username and password are correct (you can replace this with your logic)
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === "admin" && password === "password") {
            // Redirect to the main ticketing page
            window.location.href = "ticketing.html";
        } else {
            alert("Invalid username or password. Please try again.");
            usernameInput.value = "";
            passwordInput.value = "";
        }
    });
});
