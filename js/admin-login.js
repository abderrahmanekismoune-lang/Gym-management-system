

let ADMIN_USERNAME = 'Alaa';
let ADMIN_PASSWORD = 'Alaa123';




let usernameInput  = document.getElementById('username');
let passwordInput  = document.getElementById('password');
let errorMessage   = document.getElementById('error-message');
let successMessage = document.getElementById('success-message');




function validateLogin() {

    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();

    errorMessage.style.display   = 'none';
    successMessage.style.display = 'none';

    if (username === '' || password === '') {
        errorMessage.textContent    = '❌ Please enter both username and password.';
        errorMessage.style.display  = 'block';

        if (username === '') {
            usernameInput.style.border = '1.5px solid red';
        }
        if (password === '') {
            passwordInput.style.border = '1.5px solid red';
        }

        return false; 
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

        usernameInput.style.border = '1.5px solid green';
        passwordInput.style.border = '1.5px solid green';

        successMessage.style.display = 'block';

        sessionStorage.setItem('adminLoggedIn', 'true');

        setTimeout(function() {
            window.location.href = 'admin-dashboard.html';
        }, 1500);

        return false; 

    } else {

        usernameInput.style.border = '1.5px solid red';
        passwordInput.style.border = '1.5px solid red';

        errorMessage.textContent   = '❌ Incorrect username or password. Please try again.';
        errorMessage.style.display = 'block';

        passwordInput.value = '';

        return false; 
    }
}




function clearError() {
    errorMessage.style.display   = 'none';
    successMessage.style.display = 'none';

    usernameInput.style.border = '1.5px solid #1e3060';
    passwordInput.style.border = '1.5px solid #1e3060';
}
