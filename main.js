let form = document.getElementById('form')

let firstName = document.querySelector('.fname')
let lastName = document.querySelector('.lname')
let email = document.querySelector('.email') 
let address = document.querySelector('.address')
let dob = document.querySelector('.dob')
let graduation = document.querySelector('.graduation')

let msgFname = document.getElementById('msgFname')
let msgEmail = document.getElementById('msgEmail')
let msgAddress = document.getElementById('msgAddress')
let msgDob = document.getElementById('msgDob')
let msgGraduation = document.getElementById('msgGraduation')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation()
});

let formValidation = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let dobFormat = new Date(dob.value);
    let graduationFormat = new Date(graduation.value);
    let current = new Date();
    let yearDiff = current.getFullYear()-dobFormat.getFullYear();

    if(firstName.value.trim()===''){   

        console.log('firstname failure');

        firstName.classList.add('is-invalid');
        msgFname.innerHTML='Inavlid Input!';
        msgFname.classList.add('text-danger')

    }else if(!emailRegex.test(email.value)){
        
        console.log('email failure');

        email.classList.add('is-invalid');
        msgEmail.innerHTML='Inavlid Input!';
        msgEmail.classList.add('text-danger')

    }else if(address.value.trim()===''){

        console.log('address failure');

        address.classList.add('is-invalid');
        msgAddress.innerHTML='Inavlid Input!';
        msgAddress.classList.add('text-danger')

    }else if(yearDiff<18){

        console.log('dob failure');

        dob.classList.add('is-invalid');
        msgDob.innerHTML='Min age must be 19!';
        msgDob.classList.add('text-danger')

    }else if(graduationFormat>current){

        console.log('graduation failure');

        graduation.classList.add('is-invalid');
        msgGraduation.innerHTML='Must be before current Year!';
        msgGraduation.classList.add('text-danger')

    }
    else {
        console.log('success')
    }
}

let reset = () => {
    
    // remove highlights from input
    firstName.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    address.classList.remove('is-invalid');
    dob.classList.remove('is-invalid');
    graduation.classList.remove('is-invalid');

    // reset labels 
    msgFname.innerHTML='First Name';
    msgEmail.innerHTML= 'Email';
    msgAddress.innerHTML= 'Address';
    msgDob.innerHTML='Date Of Birth';
    msgGraduation.innerHTML= 'Graduation Year';
    
    // remove text danger 
    msgFname.classList.remove('text-danger');
    msgEmail.classList.remove('text-danger');
    msgAddress.classList.remove('text-danger');
    msgDob.classList.remove('text-danger');
    msgGraduation.classList.remove('text-danger');

}