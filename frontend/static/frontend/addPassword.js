// adding passwords
document.querySelector("form").onsubmit = () => {return false};
let addButton = document.querySelector("#add-button");
addButton.onclick = () => {
    let email = document.querySelector("#email");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let url = document.querySelector("#url");
    // verify master password
    let MPW = getMasterPassword("Enter master password for encryption");
    if(MPW == null)
        return;
    let res = postData('http://127.0.0.1:8000/api/verify-master-password', data={master_password: MPW});
    res.then(response => response.json()).then(result => {
        if(result == false)
            alert("Wrong Master Password.");
        else {

            postData("http://127.0.0.1:8000/api/passwords", data={
                email: email.value,
                username: username.value,
                encrypted_password: encrypt(password.value, MPW),
                url: url.value
            })
            .then(response => {                 
                if(response.ok) {
                    // clear input tags value
                    email.value = "";
                    username.value = "";
                    password.value = "";
                    url.value = "";
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
    });


}