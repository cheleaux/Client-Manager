import User from "./UserAPI.js"
import ManagerView from "./ManagerView.js"


const app = document.getElementById("app-container");
const view = new ManagerView( app, {
    addUser( { firstName, lastName, dateOfBirth, password } ) {

        const userList = document.getElementById("user-list");
        const newUser = new User(  firstName, lastName, dateOfBirth, password );
        userList.insertAdjacentElement( "afterbegin", ManagerView.constructUserListHTML(newUser) );

    },
    removeUser(id) {

        // TODO: Use id of user to find that user in "getAllUsers" list and call "deleteUser"
        // rethink this approach it feels longwinded

    }
})


const obj = {
    firstName: "Craig",
    lastName: "David",
    dateOfBirth: new Date(),
    password: "jump",
    id: 2089745
}

view.addUser(obj)
view.addUser(obj)
view.addUser(obj)
view.addUser(obj)
view.addUser(obj)

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