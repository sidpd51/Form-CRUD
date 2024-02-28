let form = document.getElementById('form')
let tbody = document.getElementById('tbody')
let add = document.getElementById('add')
let userId =1;
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
    formValidation();
});


let formValidation = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let dobFormat = new Date(dob.value);
    let graduationFormat = new Date(graduation.value);
    let current = new Date();
    let yearDiff = current.getFullYear()-dobFormat.getFullYear();
    let isValid = true;

    if(firstName.value.trim()==='' ){   

        console.log('firstname failure');

        firstName.classList.add('is-invalid');
        msgFname.innerHTML='Inavlid Input!';
        msgFname.classList.add('text-danger');
        isValid=false;

    }
     if(!emailRegex.test(email.value)){
        
        console.log('email failure');

        email.classList.add('is-invalid');
        msgEmail.innerHTML='Inavlid Input!';
        msgEmail.classList.add('text-danger');
        isValid=false;

    }
    if(address.value.trim()===''){

        console.log('address failure');

        address.classList.add('is-invalid');
        msgAddress.innerHTML='Inavlid Input!';
        msgAddress.classList.add('text-danger');
        isValid=false;

    }
    if(dob.value==='' || yearDiff<18){

        console.log('dob failure');

        dob.classList.add('is-invalid');
        msgDob.innerHTML='Min age must be 19!';
        msgDob.classList.add('text-danger');
        isValid=false;

    }
    if(graduation.value==='' || graduationFormat>current){

        console.log('graduation failure');

        graduation.classList.add('is-invalid');
        msgGraduation.innerHTML=`Must be before ${current.getUTCFullYear()}!`;
        msgGraduation.classList.add('text-danger');
        isValid=false;
    }

    if(isValid){
        console.log('success');
        reset();
        addUser();
        add.setAttribute('data-bs-dismiss','modal');
        add.click();
        (()=>{
            add.setAttribute('data-bs-dismiss','');
        })()
    }
}

let users = [];
let addUser = (index, existingUser) => {
    // for add 
    let user = {
        id: userId,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        dob: dob.value,
        graduation: graduation.value
    }
    users.push(user);
    // for update 
    renderUsers();
    alert('user created successfully!');
}

let renderUsers = ()=> {
    resetForm();

    return ( tbody.innerHTML= users.map((x,y)=> {
        let {firstName, lastName, address, email, dob, graduation} = x;

        return `
        <tr >
            <th scope="row">${y+1}</th>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${dob}</td>
            <td>${graduation}</td>
            <td>
                <button onclick="readUser(${y})" class="btn btn-outline-success me-2">
                    <i class="fa-solid fa-eye fa-lg"></i>
                </button>
                <button onclick="updateUser(${y})" class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#form">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                </button>
                <button onclick="deleteUser(${y})" class="btn btn-outline-danger" >
                    <i class="fa-regular fa-trash-can fa-lg"></i>
                </button>
            </td>
        </tr>
        `
    }).join(' '))
}

let updateUser = (id) => {
    let currentUser = users.find((user, index)=> index==id)
    let existingUser = true;
    console.log(currentUser)
    firstName.value= currentUser.firstName;
    lastName.value= currentUser.lastName;
    email.value= currentUser.email;
    address.value= currentUser.address;
    dob.value= currentUser.dob;
    graduation.value= currentUser.graduation;
}

let deleteUser = (id)=> {
    users = users.filter((user, index)=> index!=id);
    renderUsers();
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

let resetForm = () => {
    firstName.value='';
    lastName.value='';
    email.value='';
    address.value='';
    dob.value='';
    graduation.value='';
}