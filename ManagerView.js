import User from "./UserAPI.js"
import FormError from './FormErrorHandling.js'


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
                            <input type="password" name="re-password" id="re-password" required>
                        </div>
                    </form>
                    <span class="error-msg hidden"></span>
                    <button class="submit-btn">Add User</button>
                </article>
                <article class="user-list-area">
                    <ul id="user-list"></ul>
                </article>
            `
        const userList = this.root.querySelector("#user-list");
        const addUserBtn = this.root.querySelector(".submit-btn");
        const form = this.root.querySelector("form");
        const formInputs = {
            firstName: this.root.querySelector("#first-name"),
            lastName: this.root.querySelector("#last-name"),
            dob: this.root.querySelector("#dob"),
            password: this.root.querySelector("#set-password"),
            confirmPassword: this.root.querySelector("#re-password"),
            errorMessage: this.root.querySelector(".error-msg")
        }


        addUserBtn.addEventListener( "click", () => { 
            if ( !formInputs.firstName.value || !formInputs.dob.value ){ this._errorAlertUser( { errorCode: '001', elementObj: formInputs }); return };
            const user = new User( formInputs.firstName.value, formInputs.lastName.value, formInputs.dob.value, formInputs.password.value );
            if ( !user._passwordCheck() ){ this._errorAlertUser( { errorCode: '002', elementObj: formInputs }); return }
            this._processNewUser(user);
            this._resetForm( form, formInputs.errorMessage )
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

    _errorAlertUser( { errorCode, elementObj } ){
        if( elementObj.errorMessage.classList.contains('hidden') ){ elementObj.errorMessage.classList.remove('hidden') };
        elementObj.errorMessage.innerHTML = FormError.constructErrorMessage( { errorCode, elementObj } );
        errorCode == '001' ? FormError.styleErrorFields( FormError.findMissingRequiredFields( elementObj ), this.root ):
        errorCode == '002' ? FormError.styleErrorFields( { elements: [ elementObj.confirmPassword ] }, this.root ):
        console.warn('No error code - Could not find form field...');
    }
    
    _resetForm( form, errorMessage ){
        form.reset();
        errorMessage.innerHTML = '';
        errorMessage.classList.toggle( 'hidden' );
        FormError.setDefaultFieldStyles( this.root );
    }
}
