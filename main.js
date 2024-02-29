let form = document.getElementById('form')
let tbody = document.getElementById('tbody')
let add = document.getElementById('add')
let userId =1;
let createForm = document.getElementById('create-form')
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

createForm.addEventListener('click', () => {
    resetEducationRows();
})

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
        const dateValue = new Date(dateInput.value);
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - dateValue.getFullYear();
        if(dateInput.value === '' || yearDiff < minAge){
            console.log('date error ')
            dateInput.classList.add('is-invalid');
            message.innerHTML=`Age must be at least ${minAge} years!`;
            message.classList.add('text-danger');
            isValid=false;
        }
    }

    // let degree = document.querySelectorAll('degree');
    // degree.forEach(element => {
    //     element.addEventListener('blur', () => {
    //         validateDegree(element, )
    //     })
    // })

    // const validateDegree = (element, message) => {
    //     if(element.value.trim()===''){
    //         message.classList.add('is-invalid')
    //         message.classList.add
    //     }
    // }
    

    // validating each input field
    validateField(firstName, msgFname);
    validateEmail(msgEmail);
    validateField(address, msgAddress);
    validateDate(dob, msgDob, 18); // Minimum age required: 18 years
    validateDate(graduation, msgGraduation, 1); // graduation year not in the future



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
        graduation: graduation.value,
        educations: []
    }

    let educationRows = document.querySelectorAll('#educationTableBody tr');
    educationRows.forEach(row => {
        let education = {
            degree: row.querySelector('.degree').value,
            college: row.querySelector('.college').value,
            startYear: row.querySelector('.startYear').value,
            passoutYear: row.querySelector('.passoutYear').value,
            percentage: row.querySelector('.percentage').value,
            backlog: row.querySelector('.backlog').value
        }

        user.educations.push(education);
    })

    users.push(user);
    // for update 
    renderUsers();
    alert('user created successfully!');
}

// function for adding a new education row in modal 
const addEducationRow = ()=> {
    const educationTableBody = document.getElementById('educationTableBody');
    const newRow = `
    <tr>
        <td class="pb-0">
            <input type="text" class="form-control degree" placeholder="Degree">
            <p class="msgDegree fs-6"></p>
        </td>
        <td>
            <input type="text" class="form-control college" placeholder="College">
            <p class="msgCollege fs-6"></p>
        </td>
        <td>
            <input type="month" class="form-control startYear" placeholder="Start Year">
            <p class="msgStartYear fs-6"></p>
        </td>
        <td>
            <input type="month" class="form-control passoutYear" placeholder="Passout Year">
            <p class="msgPassoutYear fs-6"></p>
        </td>
        <td>
            <input type="text" class="form-control percentage" placeholder="Percentage" min="0" max="100" step="0.01">
            <p class="msgPercentage fs-6"></p>
        </td>
        <td>
            <input type="number" class="form-control backlog" placeholder="Backlog" min="0" max="100">
            <p class="msgBacklog fs-6"></p>
        </td>
        <td>
            <button type="button" onclick="removeEducationRow(this)" class="btn btn-outline-danger remove-education-btn"><i class="fa-solid fa-minus"></i></button>
        </td>
    </tr>
    `;
    educationTableBody.insertAdjacentHTML('beforeend', newRow);
};

const removeEducationRow = (button)=> {
    const row = button.closest('tr');
    row.remove();
};


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
    }).join(' '));
}

let updateUser = (index) => {
    let currentUser = users[index]
    console.log(currentUser)

    if(currentUser){

        firstName.value= currentUser.firstName;
        lastName.value= currentUser.lastName;
        email.value= currentUser.email;
        address.value= currentUser.address;
        dob.value= currentUser.dob;
        graduation.value= currentUser.graduation;


        let educationTableBody = document.getElementById('educationTableBody');
        educationTableBody.innerHTML=''
        currentUser.educations.forEach(education => {
            let {degree, college, startYear, passoutYear, percentage, backlog} = education
            const newRow = `
                <tr>
                    <td class="pb-0">
                        <input type="text" class="form-control degree" placeholder="Degree" value="${degree}">
                        <p class="msgDegree fs-6"></p>
                    </td>
                    <td>
                        <input type="text" class="form-control college" placeholder="College" value="${college}">
                        <p class="msgCollege fs-6"></p>
                    </td>
                    <td>
                        <input type="month" class="form-control startYear" placeholder="Start Year" value="${startYear}">
                        <p class="msgStartYear fs-6"></p>
                    </td>
                    <td>
                        <input type="month" class="form-control passoutYear" placeholder="Passout Year" value="${passoutYear}">
                        <p class="msgPassoutYear fs-6"></p>
                    </td>
                    <td>
                        <input type="text" class="form-control percentage" placeholder="Percentage" min="0" max="100" step="0.01" value="${percentage}">
                        <p class="msgPercentage fs-6"></p>
                    </td>
                    <td>
                        <input type="number" class="form-control backlog" placeholder="Backlog" min="0" max="100" value="${backlog}">
                        <p class="msgBacklog fs-6"></p>
                    </td>
                    <td>
                        <button type="button" onclick="removeEducationRow(this)" class="btn btn-outline-danger remove-education-btn"><i class="fa-solid fa-minus"></i></button>
                    </td>
                </tr>
            `;
            educationTableBody.insertAdjacentHTML('beforeend', newRow);
        });
        // Update the button attribute to indicate it's an update action
        add.setAttribute('data-action', 'update')
        add.setAttribute('data-user-id', currentUser.id)
    }
}

// function to update users in the array or list
let updateUserInList = () => {
    let userIdToUpdate = add.dataset.userId; // Retrieve the user ID from the button attribute
    console.log('inside updateuserlist')
    // Find the user in the list and update their data
    let index = users.findIndex((user) => user.id == userIdToUpdate);
    if (index !== -1) {
        let updatedUser = {
            id: userIdToUpdate,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            address: address.value,
            dob: dob.value,
            graduation: graduation.value,
            educations: []
            
        };

        let educationRows = document.querySelectorAll('#educationTableBody tr');
        educationRows.forEach(row => {
            let education = {  
                degree: row.querySelector('.degree').value,
                college: row.querySelector('.college').value,
                startYear: row.querySelector('.startYear').value,
                passoutYear: row.querySelector('.passoutYear').value,
                percentage: row.querySelector('.percentage').value,
                backlog: row.querySelector('.backlog').value
            }
            updatedUser.educations.push(education);
        })
        users[index]= updatedUser;
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

let resetEducationRows = () => {
    const educationTableBody = document.getElementById('educationTableBody');
    educationTableBody.innerHTML = '';
}
