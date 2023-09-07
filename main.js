
const ul = document.getElementById("user-list");
const submitBtn = document.querySelector(".submit-btn");

const userList = localStorage.getItem("users") ? 
JSON.parse(localStorage.getItem('users')) : [];

userList.forEach( user => { addUser(user) } );

submitBtn.addEventListener( "click", () => { addUser() });

function addUser( storedUser ) {
    if ( storedUser ){
        ul.insertAdjacentElement("afterbegin", constructUser(storedUser))
    } 
    else {
        const user = createUser()
        if ( passwordCheck(user) ){
            ul.insertAdjacentElement("afterbegin", constructUser(user))
            userList.push(user);
            localStorage.setItem("users", JSON.stringify(userList));
        }
    }
}

const createUser = () => {
    const user = {    
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        dateOfBirth: document.getElementById("dob").value,
        password: document.getElementById("set-password").value,
    }
    return user
}

function constructUser({ firstName, lastName, dateOfBirth }) {
    const li = document.createElement("li")
    li.classList.add("user")
    li.innerHTML = `
        <h1 id="full-name">${ firstName + " " + lastName }</h1>
        <div class="age-container">
            <h2 class="age">${ calcAge(dateOfBirth) }</h2>
        </div>
        `
    return li
}

function calcAge(dateOfBirth) {
    const dob = dateOfBirth;
    const Bday = +new Date((dob));
    if (dob == 0){ console.log("dob is 0") }
    return ~~((Date.now() - Bday) / 31557600000);
}

function passwordCheck(user) {
    const retypePassword = document.getElementById("re-password");
    user.password === retypePassword.value ?
     true : alert("Passwords don't match");
}