
export default class User {
    constructor( firstName, lastName, dateOfBirth, password ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
    
    static getAllUsers() {
        const usersArray = localStorage.getItem('users') ?
        JSON.parse(localStorage.getItem('users')) : [];
        return usersArray
    }
    
    static saveUser(userToSave) {

        const users = this.getAllUsers();
        
        userToSave.id = Math.trunc(Math.random() * 1000000)

        users.push(userToSave);
        localStorage.setItem("users", JSON.stringify(users))

    }
    
    static deleteUser( userIndex ) {
        
        const savedUsers = this.getAllUsers();
        const IndexInSaved = savedUsers.length - (userIndex + 1);
        savedUsers.splice( IndexInSaved, 1 );
        localStorage.setItem("users", JSON.stringify(savedUsers));
        
    }
    
    _calcAge() {
        const dob = this.dateOfBirth;
        const Bday = +new Date((dob));
        if (dob == 0){ console.log("dob is 0") }
        return ~~((Date.now() - Bday) / 31557600000);
    }

    _passwordCheck() {
        const retypePassword = document.getElementById("re-password");
        return this.password === retypePassword.value
    }
}



