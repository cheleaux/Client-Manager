import User from "./UserAPI.js"
import ManagerView from "./ManagerView.js"


const app = document.getElementById("app-container");
const view = new ManagerView( app, {
    addUser( { firstName, lastName, dateOfBirth, password } ) {

        const ul = document.getElementById("user-list");
        const newUser = new User(  firstName, lastName, dateOfBirth, password );
        User.saveUser(newUser);
        ul.insertAdjacentElement( "afterbegin", ManagerView.constructUserListHTML(newUser) );

    },
    removeUser(id) {

        

    }
})


const john = {
    firstName: "Dave",
    lastName: "chappel",
    dateOfBirth: new Date(),
    password: "thetree"
}

view.addUser( john );





// function constructUser({ firstName, lastName, dateOfBirth }) {
//     const li = document.createElement("li")
//     li.classList.add("user")
//     li.innerHTML = `
//         <h1 id="full-name">${ firstName + " " + lastName }</h1>
//         <div class="age-container">
//             <h2 class="age">${ calcAge(dateOfBirth) }</h2>
//         </div>
//         `
//     return li
// }

// function calcAge(dateOfBirth) {
//     const dob = dateOfBirth;
//     const Bday = +new Date((dob));
//     if (dob == 0){ console.log("dob is 0") }
//     return ~~((Date.now() - Bday) / 31557600000);
// }

// function passwordCheck(user) {
//     const retypePassword = document.getElementById("re-password");
//     user.password === retypePassword.value ?
//      true : alert("Passwords don't match");
// }