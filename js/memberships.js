let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');
let phoneError = document.getElementById('phoneError');
let dateError = document.getElementById('dateError');

let submitError = document.getElementById('error-submit')
 
//let bronze = document.getElementById('bronze');
//let silver = document.getElementById('silver');
//let gold = document.getElementById('gold');
let submit = document.getElementById('submit');






function validateName(){

    let name = document.getElementById('contact-name');
    
    

    if(name.value.length==0){
        nameError.innerHTML='Name is required';
        name.style.border='1.5px solid red';
        return false;
    }
    if(!name.value.match(/^[A-Za-z]+ [A-Za-z]+$/)){
        nameError.innerHTML='Write full name'
        name.style.border='1.5px solid red';
        return false
    }
    nameError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    name.style.border='1.5px solid green';
    return true;
    
}

function validateEmail(){
    let email = document.getElementById('contact-email');

    if(email.value.length==0){
        emailError.innerHTML='Email is required';
        email.style.border='1.5px solid red';
        return false;
    }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.innerHTML = 'Invalid email format';
         email.style.border='1.5px solid red';
         return false;
    }
    emailError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    email.style.border='1.5px solid green';
    return true;



}

function validatePhone(){
    let phone = document.getElementById('contact-phone');
    
     if(phone.value.length==0){
        phoneError.innerHTML='Phone is required';
        phone.style.border='1.5px solid red';
        return false;
    }
     if (!phone.value.match(/^0[567][0-9]{8}$/)) {
        phoneError.innerHTML = 'Invalid phone number';
        phone.style.border='1.5px solid red';
        return false;
    }
     phoneError.innerHTML='<i class="fa-solid fa-circle-check"></i>'
     phone.style.border='1.5px solid green';
     return true;

}

function validateDate(){
    let date = document.getElementById('contact-date');

    if(date.value===""){
        dateError.innerHTML='Date is required';
        date.style.border='1.5px solid red';
        return false;

    }

    let birthDate =new Date(date.value);
    let today = new Date();

    let age = today.getFullYear()-birthDate.getFullYear();
    let month = today.getMonth()-birthDate.getMonth();

    if(month < 0 || month === 0 && today.getDate() < birthDate.getDate() ){
        age--;
    }
    if(age < 18){
        dateError.innerHTML='You must be 18 years old'
        date.style.border='1.5px solid red';
        return false;
    }
    dateError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    date.style.border='1.5px solid green';
    return true
}

function getPlane(){
    let radios = document.getElementsByName('planselec');
    let checkbox = document.getElementById('conditions');
    let submit = document.getElementById('submit');
    
    let radiosSelected= false;

    if(radios.length > 0){
        radiosSelected = true;
        
    
    }

    if(radiosSelected=true && checkbox.checked ){
        submit.style.display='block';
    }else{
        submit.style.display='none';
    }

    
    

    
}



function validateSubmit(){
    if(!validateName() || !validateEmail()|| !validatePhone()|| !validateDate()){
      
        submitError.innerHTML='plaese fix the error';
        setTimeout(function(){
            submitError.style.display='none';
        },3000);
        return false; 
    }

}




