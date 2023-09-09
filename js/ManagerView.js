
export default class ManagerView {
    constructor ( root, { addUser, removeUser } = {}){
        this.root = root;
        this.addUser = addUser;
        this.removeUser = removeUser;


        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.addEventListener( "click", () => { this.addUser() } );
    }


    static constructUserListHTML(user) {
        const li = document.createElement("li");
        li.classList.add("user");
        li.innerHTML = `
            <h1 id="full-name">${ user.firstName + " " + user.lastName }</h1>
            <div class="age-container">
                <h2 class="age">${ user._calcAge() }</h2>
            </div>
            `
        return li
    }



}

