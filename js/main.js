import User from "./UserAPI.js"
import ManagerView from "./ManagerView.js"


const app = document.getElementById( "app-container" );
const view = new ManagerView( app, {
    addUser( { firstName, lastName, dateOfBirth, password } ) {

        const userList = document.getElementById( "user-list" );
        const newUser = new User(  firstName, lastName, dateOfBirth, password );
        userList.insertAdjacentElement( "afterbegin", ManagerView.constructUserListHTML(newUser) );

    },
    removeUser( userListItem ) {

        const savedUsers = User.getAllUsers();
        const userList = document.getElementById( "user-list" );
        const IndexInUserList = Array.from(userList.children).indexOf( userListItem ) + 1;
        const IndexInSaved = savedUsers.length - userListItemIdx
        User.removeUser( savedUsers[ IndexInSaved ].id )

    }
})


const obj = {
    firstName: "Craig",
    lastName: "David",
    dateOfBirth: new Date(),
    password: "jump",
    id: 2089745
}

const obj2 = {
    firstName: "bob",
    lastName: "Zak",
    dateOfBirth: new Date(),
    password: "jump",
    id: 8903448
}

const obj3 = {
    firstName: "flynn",
    lastName: "dylan",
    dateOfBirth: new Date(),
    password: "jump",
    id: 1872356
}

const obj4 = {
    firstName: "phabien",
    lastName: "jakob",
    dateOfBirth: new Date(),
    password: "jump",
    id: 7890645
}

view.addUser(obj)
view.addUser(obj2)
view.addUser(obj3)
view.addUser(obj4)


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