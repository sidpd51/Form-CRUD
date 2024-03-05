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

let degree1 = document.querySelector('.degree-1')
let college1 = document.querySelector('.college-1')
let startYear1 = document.querySelector('.startYear-1')
let passoutYear1 = document.querySelector('.passoutYear-1')
let percentage1= document.querySelector('.percentage-1')
let backlog1 = document.querySelector('.backlog-1')
let degree2 = document.querySelector('.degree-2')
let college2 = document.querySelector('.college-2')
let startYear2 = document.querySelector('.startYear-2')
let passoutYear2 = document.querySelector('.passoutYear-2')
let percentage2= document.querySelector('.percentage-2')
let backlog2 = document.querySelector('.backlog-2')

let msgFname = document.getElementById('msgFname')
let msgEmail = document.getElementById('msgEmail')
let msgAddress = document.getElementById('msgAddress')
let msgDob = document.getElementById('msgDob')
let msgGraduation = document.getElementById('msgGraduation')

createForm.addEventListener('click', () => {
    resetEducationRows();
    resetForm();
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
});


let formValidation = () => {

    let degree_1 = document.querySelector('.degree-1');
    let college_1 = document.querySelector('.college-1');
    let startYear_1 = document.querySelector('.startYear-1');
    let passoutYear_1 = document.querySelector('.passoutYear-1');
    let percentage_1 = document.querySelector('.percentage-1');
    let backlog_1 = document.querySelector('.backlog-1');
    let degree_2 = document.querySelector('.degree-2');
    let college_2 = document.querySelector('.college-2');
    let startYear_2 = document.querySelector('.startYear-2');
    let passoutYear_2 = document.querySelector('.passoutYear-2');
    let percentage_2 = document.querySelector('.percentage-2');
    let backlog_2 = document.querySelector('.backlog-2');

    let msgDegree_1 = document.querySelector('.msgDegree-1');
    let msgCollege_1 = document.querySelector('.msgCollege-1');
    let msgStartYear_1 = document.querySelector('.msgStartYear-1');
    let msgPassoutYear_1 = document.querySelector('.msgPassoutYear-1');
    let msgPercentage_1 = document.querySelector('.msgPercentage-1');
    let msgBacklog_1 = document.querySelector('.msgBacklog-1');

    let msgDegree_2 = document.querySelector('.msgDegree-2');
    let msgCollege_2 = document.querySelector('.msgCollege-2');
    let msgStartYear_2 = document.querySelector('.msgStartYear-2');
    let msgPassoutYear_2 = document.querySelector('.msgPassoutYear-2');
    let msgPercentage_2 = document.querySelector('.msgPercentage-2');
    let msgBacklog_2 = document.querySelector('.msgBacklog-2');
    reset()


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
            dateInput.classList.add('is-invalid');
            message.innerHTML=`Age must be at least ${minAge} years!`;
            message.classList.add('text-danger');
            isValid=false;
        }
    }

    const educationYearValidation = (startyear, passoutyear, message) => {
        const yearRegex = /^\d{4}-\d{2}$/;
        const startFullYear = new Date(startyear.value);
        const passoutFullYear = new Date(passoutyear.value);
        const yearDiff = passoutFullYear.getFullYear()- startFullYear.getFullYear();
        

        if(!yearRegex.test(startyear.value) || !yearRegex.test(passoutyear.value) || yearDiff<0){
            passoutyear.classList.add('is-invalid');
            message.innerHTML="Must be greater than start year!";
            isValid=false;
        }
    }

    const numValidation = (num, message) => {
        if(num.value===''){
            num.classList.add('is-invalid');
            message.innerHTML="Invalid input!";
            isValid=false;
        }
    }

    // validating each input field
    validateField(firstName, msgFname);
    validateEmail(msgEmail);
    validateField(address, msgAddress);
    validateDate(dob, msgDob, 18); // Minimum age required: 18 years
    validateDate(graduation, msgGraduation, 1); // graduation year not in the future

    educationYearValidation(startYear_1, passoutYear_1, msgPassoutYear_1);
    validateField(degree_1, msgDegree_1);
    validateField(college_1, msgCollege_1);
    validateField(startYear_1, msgStartYear_1);
    numValidation(percentage_1, msgPercentage_1);
    numValidation(backlog_1, msgBacklog_1);

    educationYearValidation(startYear_2, passoutYear_2, msgPassoutYear_2);
    validateField(degree_2, msgDegree_2);
    validateField(college_2, msgCollege_2);
    validateField(startYear_2, msgStartYear_2);
    numValidation(percentage_2, msgPercentage_2);
    numValidation(backlog_2, msgBacklog_2);

    let rowsToValidate = document.querySelectorAll('#educationTableBody tr');
    rowsToValidate.forEach(row => {
        let degree = row.querySelector('.degree');
        let college = row.querySelector('.college');
        let startYear = row.querySelector('.startYear');
        let passoutYear = row.querySelector('.passoutYear');
        let percentage = row.querySelector('.percentage');
        let backlog = row.querySelector('.backlog');

        let msgDegree = row.querySelector('.msgDegree');
        let msgCollege = row.querySelector('.msgCollege');
        let msgStartYear = row.querySelector('.msgStartYear');
        let msgPassoutYear = row.querySelector('.msgPassoutYear');
        let msgPercentage = row.querySelector('.msgPercentage');
        let msgBacklog = row.querySelector('.msgBacklog');

        educationYearValidation(startYear, passoutYear, msgPassoutYear);
        validateField(degree, msgDegree);
        validateField(college, msgCollege);
        validateField(startYear, msgStartYear);
        numValidation(percentage, msgPercentage);
        numValidation(backlog, msgBacklog);

    });

    if(isValid){

        // reset form validation state 
        reset();

        //add/update
        if(add.dataset.action === 'add'){
            addUser();
        }else if(add.dataset.action === 'update'){
            console.log('for update ')
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
    let compulsaryField = [
        {
            degree: degree1.value,
            college: college1.value,
            startYear: startYear1.value,
            passoutYear: passoutYear1.value,
            percentage: percentage1.value,
            backlog: backlog1.value
        },
        {
            degree: degree2.value,
            college: college2.value,
            startYear: startYear2.value,
            passoutYear: passoutYear2.value,
            percentage: percentage2.value,
            backlog: backlog2.value
        }
    ];

    let user = {
        id: userId++,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        dob: dob.value,
        graduation: graduation.value,
        educationsCompulsary: compulsaryField,
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
            <p class="msgDegree fs-6 text-danger"></p>
        </td>
        <td>
            <input type="text" class="form-control college" placeholder="College">
            <p class="msgCollege fs-6 text-danger"></p>
        </td>
        <td>
            <input type="month" class="form-control startYear" placeholder="Start Year">
            <p class="msgStartYear fs-6 text-danger"></p>
        </td>
        <td>
            <input type="month" class="form-control passoutYear" placeholder="Passout Year">
            <p class="msgPassoutYear fs-6 text-danger"></p>
        </td>
        <td>
            <input type="number" class="form-control percentage" placeholder="Percentage" min="0" max="100" step="0.01">
            <p class="msgPercentage fs-6 text-danger"></p>
        </td>
        <td>
            <input type="number" class="form-control backlog" placeholder="Backlog" min="0" max="100">
            <p class="msgBacklog fs-6 text-danger"></p>
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

        // show common info 
        firstName.value= currentUser.firstName;
        lastName.value= currentUser.lastName;
        email.value= currentUser.email;
        address.value= currentUser.address;
        dob.value= currentUser.dob;
        graduation.value= currentUser.graduation;

        // show compulsary education fields 

        {
            degree1.value=currentUser.educationsCompulsary[0].degree;
            college1.value=currentUser.educationsCompulsary[0].college;
            startYear1.value=currentUser.educationsCompulsary[0].startYear;
            passoutYear1.value=currentUser.educationsCompulsary[0].passoutYear;
            percentage1.value=currentUser.educationsCompulsary[0].percentage;
            backlog1.value=currentUser.educationsCompulsary[0].backlog;
        }

        {
            degree2.value=currentUser.educationsCompulsary[1].degree;
            college2.value=currentUser.educationsCompulsary[1].college;
            startYear2.value=currentUser.educationsCompulsary[1].startYear;
            passoutYear2.value=currentUser.educationsCompulsary[1].passoutYear;
            percentage2.value=currentUser.educationsCompulsary[1].percentage;
            backlog2.value=currentUser.educationsCompulsary[1].backlog;
        }

        let educationTableBody = document.getElementById('educationTableBody');
        educationTableBody.innerHTML=''
        currentUser.educations.forEach(education => {
            let {degree, college, startYear, passoutYear, percentage, backlog} = education
            const newRow = `
                <tr>
                    <td class="pb-0">
                        <input type="text" class="form-control degree" placeholder="Degree" value="${degree}">
                        <p class="msgDegree text-danger fs-6"></p>
                    </td>
                    <td>
                        <input type="text" class="form-control college" placeholder="College" value="${college}">
                        <p class="msgCollege text-danger fs-6"></p>
                    </td>
                    <td>
                        <input type="month" class="form-control startYear" placeholder="Start Year" value="${startYear}">
                        <p class="msgStartYear text-danger fs-6"></p>
                    </td>
                    <td>
                        <input type="month" class="form-control passoutYear" placeholder="Passout Year" value="${passoutYear}">
                        <p class="msgPassoutYear text-danger fs-6"></p>
                    </td>
                    <td>
                        <input type="text" class="form-control percentage" placeholder="Percentage" min="0" max="100" step="0.01" value="${percentage}">
                        <p class="msgPercentage text-danger fs-6"></p>
                    </td>
                    <td>
                        <input type="number" class="form-control backlog" placeholder="Backlog" min="0" max="100" value="${backlog}">
                        <p class="msgBacklog text-danger fs-6"></p>
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
            educationsCompulsary: [ 
                {
                    degree: degree1.value,
                    college: college1.value,
                    startYear: startYear1.value,
                    passoutYear: passoutYear1.value,
                    percentage: percentage1.value,
                    backlog: backlog1.value
                },
                {
                    degree: degree2.value,
                    college: college2.value,
                    startYear: startYear2.value,
                    passoutYear: passoutYear2.value,
                    percentage: percentage2.value,
                    backlog: backlog2.value
                }
            ],
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

    let msgDegrees = document.querySelectorAll('.msgDegree');
    let msgColleges = document.querySelectorAll('.msgCollege');
    let msgStartYears = document.querySelectorAll('.msgStartYear');
    let msgPassoutYears = document.querySelectorAll('.msgPassoutYear');
    let msgPercentages = document.querySelectorAll('.msgPercentage');
    let msgBacklogs = document.querySelectorAll('.msgBacklog');
    let inputs = document.querySelectorAll('.table input');

    for(let i =0; i<inputs.length; i++){
        inputs[i].classList.remove('is-invalid');
    }

    for(let i =0; i<msgDegrees.length; i++){
        msgDegrees[i].innerHTML=' ';
        msgColleges[i].innerHTML=' ';
        msgStartYears[i].innerHTML=' ';
        msgPassoutYears[i].innerHTML=' ';
        msgPassoutYears[i].innerHTML=' ';
        msgPercentages[i].innerHTML=' ';
        msgBacklogs[i].innerHTML=' ';
    }

}

let resetForm = () => {
    firstName.value='';
    lastName.value='';
    email.value='';
    address.value='';
    dob.value='';
    graduation.value='';
    degree1.value='';
    college1.value='';
    startYear1.value='';
    passoutYear1.value='';
    percentage1.value='';
    backlog1.value='';
    degree2.value='';
    college2.value='';
    startYear2.value='';
    passoutYear2.value='';
    percentage2.value='';
    backlog2.value='';
    add.setAttribute('data-action', 'add');
    add.removeAttribute('data-user-id');
}

let resetEducationRows = () => {
    const educationTableBody = document.getElementById('educationTableBody');
    educationTableBody.innerHTML = '';
}
