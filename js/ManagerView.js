import User from "./UserAPI.js"
export default class ManagerView {
    constructor ( root, { addUser, removeUser } = {}){
        this.root = root;
        this.addUser = addUser;
        this.removeUser = removeUser;
        this.page = {
            height: Math.max(document.body.scrollHeight),
            mobileMediaQuery: window.matchMedia("(max-width: 900px)"),
            // snapPointBoundary: Math.max(document.body.scrollHeight) / 2
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


        addUserBtn.addEventListener( "click", () => { 
            if ( !firstNameInp.value || !dobInp.value ) return;
            const user = new User( firstNameInp.value, lastNameInp.value, dobInp.value, passwordInp.value );
            user._passwordCheck() ? this._processNewUser(user) : alert("Passwords don't match");
        });

        userList.addEventListener( "click", (ev) => {
            const deleteUserBtn = ev.target.closest( ".user-li-delete" );
            if (!deleteUserBtn) return;
            this.removeUser(deleteUserBtn.closest(".user"));
        });
        
        if(this.page.mobileMediaQuery.matches){
            document.addEventListener( "scroll", this._enableScrollSnap.bind(this) )
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

    _enableScrollSnap() {
        if( this._isViewingForm() && this._isInSnapBoudnary ){ window.scrollTo(0, this.page.height) }
        else if( this._isViewingRegister() && this._isInSnapBoudnary ){ window.scrollTo(0, 0) }
        this._DelayOnScrollAction

        // const snapBoundary =  ;
        // if( this._isViewingForm() ) {
        //     console.log("is viewing form")
        //     if( window.scrollY > 60 && window.scrollY < 160 ){
        //         window.scrollTo(0, this.page.height);
        //     }
        // }
        // else if( this._isViewingRegister() ) {
        //     const snapHorizonEnd = window.scrollY > this.page.registerSnapPoint - 160;
        //     const snapHorizonStart = window.scrollY < this.page.registerSnapPoint - 60;
        //     console.log("is viewing register")
        //     if( snapHorizonEnd && snapHorizonStart ) {
        //         window.scrollTo(0, 0)
        //     }
        // }
    }
    // while one auto scroll action is being completed, disable the other until completion

    // TODO: CHANGE EVERYTHING! create one large boundary than upon entry determines your entry point, via scrollY proximity to each side of boundary, and scrolls to the opposite side.

    _isViewingForm(){
       return window.scrollY < 70;
    }
    
    _isViewingRegister(){
        return window.scrollY < this.page.height && window.scrollY >= ((Math.max(document.body.scrollHeight) / 2) - 70);
    }

    _isInSnapBoudnary(){
        const snapBoudnaryStart = 60;
        const snapoundaryEnd = (Math.max(document.body.scrollHeight) / 2) - 60;
        return window.scrollY > snapBoudnaryStart && window.scrollY < snapoundaryEnd;
    }

    _delayOnScrollAction(){
        const topScroll = window.scrollY || document.documentElement.scrollTop;
        const leftScroll = window.scrollX || document.documentElement.scrollLeft;
        window.onscroll = () => {}
        setTimeout(() => { window.onscroll = () => { window.scrollTo( leftScroll, topScroll ) } }, 500)
    }
}

