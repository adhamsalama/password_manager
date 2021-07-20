// adding passwords
document.querySelector("#add-password-form").onsubmit = () => {return false};
let addButton = document.querySelector("#add-button");
let modal = new bootstrap.Modal(document.querySelector("#modal"));
addButton.onclick = () => modalClose("Enter master password", modalAddPassword);
function modalAddPassword(MPW){
    let email = document.querySelector("#email");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let url = document.querySelector("#url");
    let tags = document.querySelector("#tags");
    let tagsList = JSON.stringify(tags.value.trim().split(","));
    let tagsJSON;
    // check if empty then set tags to null
    if(tagsList.length == 1 && tagsList[0] == "")
        tagsJSON = null;
    tagsJSON = {"tags": tagsList};
    postData("http://127.0.0.1:8000/api/passwords", data={
                email: email.value,
                username: username.value,
                encrypted_password: encrypt(password.value, MPW),
                url: url.value,
                tags: tagsJSON
            })
            .then(response => {                 
                if(response.ok) {
                    // clear input tags value
                    email.value = "";
                    username.value = "";
                    password.value = "";
                    url.value = "";
                    tags.value = "";
                    // reload passwords
                    getPasswords().then(results => displayPasswords(results));
                }
                else {
                    response.json().then(result => {
                        let obj = JSON.stringify(result);
                        alert(obj);
                    });
                }
            })

}