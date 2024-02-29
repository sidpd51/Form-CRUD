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
    let isValid = true;

    const validateField = (input, message)=> {
        if(input.value.trim()==='' ){   
            input.classList.add('is-invalid');
            message.innerHTML='Inavlid Input!';
            message.classList.add('text-danger');
            isValid=false;
        }
    }

    const validateEmail = (message) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailRegex.test(email.value)){
            email.classList.add('is-invalid');
            message.innerHTML='Inavlid Input!';
            message.classList.add('text-danger');
            isValid=false;
        }
    }
    
    const validateDate = (dateInput, message, minAge) => {
        const dateValue = new Date(dateInput);
        const currentYear = new Date().getFullYear;
        const yearDiff = currentYear - dateValue.getFullYear();

        if(dateInput.value === '' || yearDiff < minAge){
            dateInput.classList.add('is-invalid');
            message.innerHTML=`Age must be at least ${minAge} years!`;
            message.classList.add('text-danger');
            isValid=false;
        }
    }

    let degree = document.querySelectorAll('degree');
    degree.forEach(element => {
        element.addEventListener('blur', () => {
            validateDegree(element, )
        })
    })

    const validateDegree = (element, message) => {
        if(element.value.trim()===''){
        message.classList.add('is-invalid')
        message.classList.add
        }

    }
    

    // validating each input field
    validateField(firstName, msgFname);
    validateEmail(msgEmail);
    validateField(address, msgAddress);
    validateDate(dob, msgDob, 18); // Minimum age required: 18 years
    validateDate(graduation, msgGraduation, 0); // graduation year not in the future



    if(isValid){
        console.log('success');
        // reset form validation state 
        reset();

        if(add.dataset.action === 'add'){
            addUser();
        }else if(add.dataset.action === 'update'){
            updateUserInList();
        }

        // close the modal 
        add.setAttribute('data-bs-dismiss','modal');
        add.click();
        (()=>{
            add.setAttribute('data-bs-dismiss','');
        })()
    }
}

let users = [];
let addUser = () => {
    // for add 
    let user = {
        id: userId++,
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

    return ( tbody.innerHTML= users.map((user,index)=> {
        let { id, firstName, lastName, address, email, dob, graduation} = user;

        return `
        <tr data-user-id="${id}" >
            <th scope="row">${index+1}</th>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${dob}</td>
            <td>${graduation}</td>
            <td>
                <button onclick="updateUser(${index})" class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#form">
                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                </button>
                <button onclick="deleteUser(${index})" class="btn btn-outline-danger" >
                    <i class="fa-regular fa-trash-can fa-lg"></i>
                </button>
            </td>
        </tr>
        `
    }).join(' '))
}

let updateUser = (index) => {
    let currentUser = users[index]

    if(currentUser){

        firstName.value= currentUser.firstName;
        lastName.value= currentUser.lastName;
        email.value= currentUser.email;
        address.value= currentUser.address;
        dob.value= currentUser.dob;
        graduation.value= currentUser.graduation;

        // Update the button attribute to indicate it's an update action
        add.setAttribute('data-action', 'update')
        add.setAttribute('data-user-id', currentUser.id)
    }
}

// function to update users in the array or list
let updateUserInList = () => {
    let userIdToUpdate = add.dataset.userId; // Retrieve the user ID from the button attribute

    // Find the user in the list and update their data
    let index = users.findIndex((user) => user.id == userIdToUpdate);
    if (index !== -1) {
        users[index] = {
            id: userIdToUpdate,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            address: address.value,
            dob: dob.value,
            graduation: graduation.value
        };

        renderUsers(); // Update the UI
        alert('User updated successfully!');
    }
}

let deleteUser = (index)=> {
    let result = confirm('Are you sure?')
    if(result){
        users.splice(index, 1)
        renderUsers();
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

let resetForm = () => {
    firstName.value='';
    lastName.value='';
    email.value='';
    address.value='';
    dob.value='';
    graduation.value='';
    add.setAttribute('data-action', 'add');
    add.removeAttribute('data-user-id');
}
