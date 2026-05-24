

let nameError    = document.getElementById('nameError');
let emailError   = document.getElementById('emailError');
let subjectError = document.getElementById('subjectError');
let messageError = document.getElementById('messageError');
let charCount    = document.getElementById('char-count');
let charMin      = document.getElementById('char-min');
let charBox      = document.querySelector('.char-count');
let toast        = document.getElementById('toast');




function validateName() {

    let name = document.getElementById('c-name');

    if (name.value.length === 0) {
        nameError.innerHTML = 'Name is required';
        name.style.border   = '1.5px solid red';
        return false;
    }
    if (name.value.length < 2) {
        nameError.innerHTML = 'Name must be at least 2 characters';
        name.style.border   = '1.5px solid red';
        return false;
    }
    
    nameError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:green"></i>';
    name.style.border   = '1.5px solid green';
    return true;
}




function validateEmail() {

    let email = document.getElementById('c-email');

    if (email.value.length === 0) {
        emailError.innerHTML = 'Email is required';
        email.style.border   = '1.5px solid red';
        return false;
    }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.innerHTML = 'Invalid email format';
        email.style.border   = '1.5px solid red';
        return false;
    }
    
    emailError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:green"></i>';
    email.style.border   = '1.5px solid green';
    return true;
}




function validateSubject() {

    let subject = document.getElementById('c-subject');

    if (subject.value.length === 0) {
        subjectError.innerHTML = 'Subject is required';
        subject.style.border   = '1.5px solid red';
        return false;
    }
    if (subject.value.length < 5) {
        subjectError.innerHTML = 'Subject must be at least 5 characters';
        subject.style.border   = '1.5px solid red';
        return false;
    }
    
    subjectError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:green"></i>';
    subject.style.border   = '1.5px solid green';
    return true;
}




function validateMessage() {

    let message = document.getElementById('c-message');
    let length  = message.value.length;

    
    charCount.textContent = length;

    
    if (length >= 20) {
        charMin.style.display = 'none';
        charBox.classList.add('ok'); 
    } else {
        charMin.style.display = 'inline';
        charBox.classList.remove('ok');
    }

    if (length === 0) {
        messageError.innerHTML = 'Message is required';
        message.style.border   = '1.5px solid red';
        return false;
    }
    if (length < 20) {
        messageError.innerHTML = 'Message must be at least 20 characters';
        message.style.border   = '1.5px solid red';
        return false;
    }
    
    messageError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:green"></i>';
    message.style.border   = '1.5px solid green';
    return true;
}



function showToast() {

    
    toast.classList.add('show');

    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 4000);
}




function saveMessage(name, email, subject, message) {

    
    let messages = [];
    if (localStorage.getItem('contactMessages') !== null) {
        messages = JSON.parse(localStorage.getItem('contactMessages'));
    }

    
    let newMessage = {
        name:    name,
        email:   email,
        subject: subject,
        message: message,
        date:    new Date().toLocaleString() 
    };

    
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}




function validateContact() {

    
    let nameOk    = validateName();
    let emailOk   = validateEmail();
    let subjectOk = validateSubject();
    let messageOk = validateMessage();

    
    if (!nameOk || !emailOk || !subjectOk || !messageOk) {
        return false;
    }


    let name    = document.getElementById('c-name').value.trim();
    let email   = document.getElementById('c-email').value.trim();
    let subject = document.getElementById('c-subject').value.trim();
    let message = document.getElementById('c-message').value.trim();

    
    saveMessage(name, email, subject, message);

    
    showToast();

    
    document.getElementById('c-name').value    = '';
    document.getElementById('c-email').value   = '';
    document.getElementById('c-subject').value = '';
    document.getElementById('c-message').value = '';

    
    document.getElementById('c-name').style.border    = '1.5px solid #1e3060';
    document.getElementById('c-email').style.border   = '1.5px solid #1e3060';
    document.getElementById('c-subject').style.border = '1.5px solid #1e3060';
    document.getElementById('c-message').style.border = '1.5px solid #1e3060';

    nameError.innerHTML    = '';
    emailError.innerHTML   = '';
    subjectError.innerHTML = '';
    messageError.innerHTML = '';

    
    charCount.textContent = '0';
    charMin.style.display = 'inline';
    charBox.classList.remove('ok');

    
    return false;
}
