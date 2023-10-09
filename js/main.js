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

        const userList = document.getElementById( "user-list" );
        const IndexInUserList = Array.from(userList.children).indexOf( userListItem );
        userListItem.remove();
        User.deleteUser( IndexInUserList );
    }
});

const updateUserList = () => {
    User.getAllUsers().forEach( (user) => { view.addUser(user) } ) 
}

window.onload = updateUserList

console.log(window.scrollY)