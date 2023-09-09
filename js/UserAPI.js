
export default class User {
    constructor( firstName, lastName, dateOfBirth, password ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }

    _calcAge() {
        const dob = this.dateOfBirth;
        const Bday = +new Date((dob));
        if (dob == 0){ console.log("dob is 0") }
        return ~~((Date.now() - Bday) / 31557600000);
    }

    _passwordCheck() {
        const retypePassword = document.getElementById("re-password");
        this.password === retypePassword.value ?
         true : alert("Passwords don't match");
    }

    static getAllUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static saveUser(userToSave) {
        const users = this.getAllUsers();

        userToSave.id = Math.abs(Math.random() * 1000000)

        users.push(userToSave);
        localStorage.setItem("users", JSON.stringify(users))
    }
    
    static deleteUser() {

    }
}



