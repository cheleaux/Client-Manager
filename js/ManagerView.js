import User from "./UserAPI.js"
export default class ManagerView {
    constructor ( root, { addUser, removeUser } = {}){
        this.root = root;
        this.addUser = addUser;
        this.removeUser = removeUser;
        this.page = {
            height: Math.max(document.body.scrollHeight),
            mobileMediaQuery: window.matchMedia("(max-width: 900px)"),
            scrollPosition: window.scrollY
        };
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
                            <input class="error-field" type="password" name="re-password" id="re-password" required>
                        </div>
                    </form>
                    <span class="error-msg">Password does not match</span>
                    <button class="submit-btn">Add User</button>
                </article>
                <article class="user-list-area">
                    <ul id="user-list"></ul>
                </article>
            `
        const userList = this.root.querySelector("#user-list");
        const addUserBtn = this.root.querySelector(".submit-btn");
        const form = {
            formElement: this.root.querySelector("form"),
            firstNameInp: this.root.querySelector("#first-name"),
            lastNameInp: this.root.querySelector("#last-name"),
            dobInp: this.root.querySelector("#dob"),
            passwordInp: this.root.querySelector("#set-password"),
        }


        addUserBtn.addEventListener( "click", () => { 
            if ( !form.firstNameInp.value || !form.dobInp.value ){ this._errorAlertUser( { errorCode: '001' } ); return };
            if ( !user._passwordCheck() ){ this._errorAlertUser( { errorCode: '002' } ); return }
            const user = new User( form.firstNameInp.value, form.lastNameInp.value, form.dobInp.value, form.passwordInp.value );
            this._processNewUser(user); form.formElement.reset() 
        });

        userList.addEventListener( "click", (ev) => {
            const deleteUserBtn = ev.target.closest( ".user-li-delete" );
            if (!deleteUserBtn) return;
            this.removeUser(deleteUserBtn.closest(".user"));
        });
    
        if( this.page.mobileMediaQuery.matches ){ 
            document.addEventListener( "scroll", () => { this._enableScrollSnap() } )
        };
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

    _processNewUser(user) {
        this.addUser(user);
        User.saveUser(user);
    }

    _enableScrollSnap(){
        const newPosition = window.scrollY;
        newPosition > this.page.scrollPosition ? window.scrollTo( 0, this.page.height ) :  window.scrollTo( 0, 0 ) ;
        this.page.scrollPosition = newPosition;
    }

    _errorAlertUser( { errorCode } ){
        // (Code 001) // Missing essential fields
        // (Code 002) // Passwords do not match
        // let errorMessage;
        // errorCode === '001' ? errorMessage = findMissingField
        console.log(form)
    }
    findMissingField(){

    }
}

