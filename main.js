const form = document.getElementById('form');
const closeBtn = document.getElementById('close-btn');
const submitBtn = document.getElementById('submit-btn');
const createForm = document.getElementById('create-form');

// input fields 
const firstName = document.getElementById('validationCustom01');
const lastName = document.getElementById('validationCustom02');
const email = document.getElementById('validationCustom03');
const dob = document.getElementById('validationCustom04');
const graduationYear = document.getElementById('validationCustom05');
const address = document.getElementById('validationCustom06');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const firstNameError = document.querySelector('.validationCustom01Error');
const emailError = document.querySelector('.validationCustom03Error');
const dobError = document.querySelector('.validationCustom04Error');
const graduationYearError = document.querySelector('.validationCustom05Error');
const addressError = document.querySelector('.validationCustom06Error');

const getUsers = ()=>{
    return JSON.parse(localStorage.getItem('users'))||[];
}

const setUsers = (users)=>{
    localStorage.setItem('users', JSON.stringify(users));
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    formValidation(); 
})

createForm.addEventListener('click', ()=>{
    submitBtn.setAttribute('data-bs-action','add');
    submitBtn.removeAttribute('data-bs-index');
    resetInputErrors();
    defaultRows();
    form.reset();
})

const formValidation = () =>{
    // reset errors 
    resetInputErrors();

    const firstName = document.getElementById('validationCustom01');
    const email = document.getElementById('validationCustom03');
    const dob = document.getElementById('validationCustom04');
    const graduationYear = document.getElementById('validationCustom05');
    const address = document.getElementById('validationCustom06');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let currentYear = new Date().getFullYear();
    let dobYear = new Date(dob.value).getFullYear();
    let gradYear = new Date(graduationYear.value).getFullYear();
    let dobDiff = currentYear-dobYear;
    let gradDiff = currentYear-gradYear;

    let isValid = true;
    if(firstName.value.trim()===''){
        isValid= false;
        firstName.classList.add('is-invalid');
        firstNameError.innerHTML="First Name can't be empty";
        console.log('firstname error')
    }

    if(!emailRegex.test(email.value)){
        isValid=false;
        email.classList.add('is-invalid');
        emailError.innerHTML="Invalid email!";
        console.log('email error')
    }

    if(address.value.trim()===''){
        isValid=false;
        address.classList.add('is-invalid');
        addressError.innerHTML="Address can't be empty";
        console.log('address error')
    }

    if(dobDiff<18 || dob.value===''){
        isValid=false;
        dob.classList.add('is-invalid');
        dobError.innerHTML="Min age should be 18!";
        console.log('dob error')
    }
    if(gradDiff<1 || graduationYear.value===''){
        isValid=false;
        graduationYear.classList.add('is-invalid');
        graduationYearError.innerHTML="Must before current year!";
        console.log('graduation error')
    }

    const rows = document.querySelectorAll('#tbody-education-field tr');

    for(const row of rows){

        let university = row.querySelector('.university');
        let degree = row.querySelector('.degree');
        let startYear = row.querySelector('.startYear');
        let passoutYear = row.querySelector('.passoutYear');
        let percentage = row.querySelector('.percentage');
        let backlog = row.querySelector('.backlog');

        let universityError = row.querySelector('.universityError');
        let degreeError = row.querySelector('.degreeError');
        let startYearError = row.querySelector('.startYearError');
        let passoutYearError = row.querySelector('.passoutYearError');
        let percentageError = row.querySelector('.percentageError');
        let backlogError = row.querySelector('.backlogError');

        let sy = new Date(startYear.value).getFullYear();
        let py = new Date(passoutYear.value).getFullYear();

        if(university.value.trim()==='') {
            isValid= false;
            university.classList.add('is-invalid');
            universityError.innerHTML='Invalid input!';
        }

        if(degree.value.trim()==='') {
            isValid= false;
            degree.classList.add('is-invalid');
            degreeError.innerHTML='Invalid input!';
        }
        if(passoutYear.value==='') {
            isValid=false;
            passoutYear.classList.add('is-invalid');
            passoutYearError.innerHTML="Can't be empty!";
        }

        if(sy>=py || startYear.value===''){
            isValid=false;
            startYear.classList.add('is-invalid');
            startYearError.innerHTML='Must before passout Year!';
        }

        if(percentage.value===''){
            isValid=false;
            percentage.classList.add('is-invalid')
            percentageError.innerHTML='Invalid input!';
        }

        if(backlog.value===''){
            isValid=false;
            backlog.classList.add('is-invalid')
            backlogError.innerHTML='Invalid input!';
        }
    }

    if(isValid){
        const action = submitBtn.getAttribute('data-bs-action');
        if(action==='update'){
            updateUserToList();
        }else{
            addUser();
        }
        
    }
}

const addUser = () =>{
    const firstName = document.getElementById('validationCustom01');
    const lastName = document.getElementById('validationCustom02');
    const email = document.getElementById('validationCustom03');
    const dob = document.getElementById('validationCustom04');
    const graduationYear = document.getElementById('validationCustom05');
    const address = document.getElementById('validationCustom06');
    const rows = document.querySelectorAll('#tbody-education-field tr');

    let educations=[];

    for(const row of rows){
        let education={
            university: row.querySelector('.university').value,
            degree: row.querySelector('.degree').value,
            startYear: row.querySelector('.startYear').value,
            passoutYear: row.querySelector('.passoutYear').value,
            percentage: row.querySelector('.percentage').value,
            backlog: row.querySelector('.backlog').value,
        }
        educations.push(education);
    }

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        dob: dob.value,
        graduationYear: graduationYear.value,
        address: address.value,
        educations: educations
    }

    let users = getUsers();
    users.push(user);
    setUsers(users);

    displayUsers();
    closeBtn.click();
    form.reset();
    alert('user created successfully!');
}

const displayUsers = () =>{
    const tBody = document.getElementById('tbody-main');
    let users = getUsers();
    tBody.innerHTML= users.map((element,index) =>{
        
        return `<tr>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.email}</td>
            <td>${element.dob}</td>
            <td>${element.graduationYear}</td>
            <td>${element.address}</td>
            <td><button class="btn btn-outline-primary" onclick="viewUser(${index})"><i class="fa-solid fa-eye"></i></button></td>
            <td><button class="btn btn-outline-warning" onclick="updateUser(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    `
    }).join('');
}

const updateUser = (index) =>{

    let users = getUsers();
    let currentUser = users[index];
    createForm.click();

    firstName.value= currentUser.firstName;
    lastName.value= currentUser.lastName;
    email.value= currentUser.email;
    dob.value= currentUser.dob;
    graduationYear.value= currentUser.graduationYear;
    address.value= currentUser.address;

    let educations = currentUser.educations;

    let educationFields = document.getElementById('tbody-education-field');

    educationFields.innerHTML=educations.map((element, index)=>{
        let {university, degree, startYear, passoutYear, percentage, backlog} = element;
        let isDisabled = index<2? 'disabled': '';
        return `
        <tr>
            <td>
                <input type="text" class="form-control university" placeholder="University" value="${university}">
                <div class="universityError text-danger"></div>
            </td>
            <td>
                <input type="text" class="form-control degree" placeholder="Degree" value="${degree}">
                <div class="degreeError text-danger"></div>
            </td>
            <td>
                <input type="date" class="form-control startYear" value="${startYear}">
                <div class="startYearError text-danger"></div>
            </td>
            <td>
                <input type="date" class="form-control passoutYear" value="${passoutYear}">
                <div class="passoutYearError text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control percentage" min="45" max="100" step="0.01" value="${percentage}">
                <div class="percentageError text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control backlog" min="0" max="50" value="${backlog}">
                <div class="backlogError text-danger"></div>
            </td>
            <td>
                <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-primary remove-education-field" ${isDisabled}><i class="fa-solid fa-minus"></i></button>
            </td>
        </tr>`
    }).join('');

    submitBtn.setAttribute('data-bs-action','update');
    submitBtn.setAttribute('data-bs-index', index);
}

const updateUserToList = () =>{
    let currentIndex = submitBtn.getAttribute('data-bs-index');
    const rows = document.querySelectorAll('#tbody-education-field tr');

    let educations=[];

    for(const row of rows){
        let education={
            university: row.querySelector('.university').value,
            degree: row.querySelector('.degree').value,
            startYear: row.querySelector('.startYear').value,
            passoutYear: row.querySelector('.passoutYear').value,
            percentage: row.querySelector('.percentage').value,
            backlog: row.querySelector('.backlog').value,
        }
        educations.push(education);
    }

    let currentUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        dob: dob.value,
        graduationYear: graduationYear.value,
        address: address.value,
        educations: educations
    }

    let users = getUsers();
    users[currentIndex]=currentUser;
    setUsers(users);

    displayUsers();
    alert('user updated successfully!');
    closeBtn.click();
}

const deleteUser = (index)=>{
    const result = confirm('Are you sure?');
    let users = getUsers();
    if(result) users.splice(index,1);
    setUsers(users);
    displayUsers();
}

const resetInputErrors = () =>{

    firstName.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    dob.classList.remove('is-invalid');
    graduationYear.classList.remove('is-invalid');
    address.classList.remove('is-invalid');

    firstNameError.innerHTML='';
    emailError.innerHTML='';
    dobError.innerHTML='';
    graduationYearError.innerHTML='';
    addressError.innerHTML='';

    const rows = document.querySelectorAll('#tbody-education-field tr');
    for(const row of rows){

        row.querySelector('.university').classList.remove('is-invalid');
        row.querySelector('.degree').classList.remove('is-invalid');
        row.querySelector('.startYear').classList.remove('is-invalid');
        row.querySelector('.passoutYear').classList.remove('is-invalid');
        row.querySelector('.percentage').classList.remove('is-invalid');
        row.querySelector('.backlog').classList.remove('is-invalid');

        row.querySelector('.universityError').innerHTML='';
        row.querySelector('.degreeError').innerHTML='';
        row.querySelector('.startYearError').innerHTML='';
        row.querySelector('.passoutYearError').innerHTML='';
        row.querySelector('.percentageError').innerHTML='';
        row.querySelector('.backlogError').innerHTML='';
    }
}

const addEducationRow = () =>{
    const tBody = document.getElementById('tbody-education-field');
    const newRow = `
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="University">
            <div class="universityError text-danger"></div>
        </td>
        <td>
            <input type="text" class="form-control degree" placeholder="Degree">
            <div class="degreeError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear">
            <div class="startYearError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear">
            <div class="passoutYearError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01">
            <div class="percentageError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50">
            <div class="backlogError text-danger"></div>
        </td>
        <td>
            <button type="button" onclick="removeEducationRow(this)" class="btn btn-outline-primary remove-education-field"><i class="fa-solid fa-minus"></i></button>
        </td>
    </tr>
    `
    tBody.insertAdjacentHTML('beforeend', newRow);
}

const removeEducationRow = (button)=> {
    const row = button.closest('tr');
    row.remove();
}

const defaultRows = () => {
    const rows = document.getElementById('tbody-education-field');
    rows.innerHTML=`
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="University">
            <div class="universityError text-danger"></div>
        </td>
        <td>
            <input type="text" class="form-control degree" placeholder="Degree">
            <div class="degreeError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear">
            <div class="startYearError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear">
            <div class="passoutYearError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01">
            <div class="percentageError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50">
            <div class="backlogError text-danger"></div>
        </td>
        <td>
            <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-primary remove-education-field" disabled><i class="fa-solid fa-minus"></i></button>
        </td>
    </tr>
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="University">
            <div class="universityError text-danger"></div>
        </td>
        <td>
            <input type="text" class="form-control degree" placeholder="Degree">
            <div class="degreeError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear">
            <div class="startYearError text-danger"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear">
            <div class="passoutYearError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01">
            <div class="percentageError text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50">
            <div class="backlogError text-danger"></div>
        </td>
        <td>
            <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-primary remove-education-field" disabled><i class="fa-solid fa-minus"></i></button>
        </td>
    </tr>
    `
}

displayUsers();