import User from "./UserAPI.js"
export default class ManagerView {
    constructor ( root, { addUser, removeUser } = {}){
        this.root = root;
        this.addUser = addUser;
        this.removeUser = removeUser;
        this.root.innerHTML = `
                <article class="form-area">
                    <form>
                        <div class="label-area">
                            <label for="first-name">First Name</label>
                            <label for="last-name">Last Name</label>
                            <label for="dob">Date Of Birth</label>
                            <label for="set-password">Password</label>
                            <label for="re-password">Re-enter Password</label>
                        </div>
                        <div class="input-area">
                            <input type="text" name="fast-name" id="first-name" required>
                            <input type="text" name="last-name" id="last-name" required>
                            <input type="date" class="dob" name="dob" id="dob" required>
                            <input type="password" name="password" id="set-password" required>
                            <input type="password" name="re-password" id="re-password" required>
                        </div>
                    </form>
                    <button class="submit-btn">Add User</button>
                </article>
                <article class="user-list-area">
                    <ul id="user-list"></ul>
                </article>
            `


        const firstNameInp = this.root.querySelector("#first-name");
        const lastNameInp = this.root.querySelector("#last-name");
        const dobInp = this.root.querySelector("#dob");
        const passwordInp = this.root.querySelector("#set-password");
        const userList = this.root.querySelector("#user-list");
        const addUserBtn = this.root.querySelector(".submit-btn");
        const deleteUserBtn = this.root.querySelector(".user-li-delete");

        addUserBtn.addEventListener( "click", () => { 
            const user = new User( firstNameInp.value, lastNameInp.value, dobInp.value, passwordInp.value );
            user.passwordcheck() ? this.addUser(user) : alert("Passwords don't match");
        });

        userList.addEventListener( "click", (ev) => {
            if ( ev.target.classList.contains( "user-li-delete" ) ){    
                const toDeleteIndex = userList.children.indexOf( ev.target.closest(".user") )
                console.log( ev.target.closest(".user") ) 
            }   
        });
        // ISSUE: if clicks can land on icon (not caught by selector) then event delegation fails
        // TODO: get the id of user user and call "removeUser" 

    }

    static constructUserListHTML(user) {
        const li = document.createElement("li");
        li.classList.add("user");
        li.innerHTML = `
                <div class="user-li">
                    <h1 id="full-name">${ user.firstName + " " + user.lastName }</h1>
                    <div class="age-container">
                        <h2 class="age">${ user._calcAge() }</h2>
                    </div>
                </div>
                <div class="user-li-delete">
                    <i class="bi bi-trash3-fill"></i>
                </div>
                `
        return li
    }
}

