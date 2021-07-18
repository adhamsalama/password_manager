// adding passwords
document.querySelector("form").onsubmit = () => {return false};
let addButton = document.querySelector("#add-button");
addButton.onclick = () => {
    let email = document.querySelector("#email");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let url = document.querySelector("#url");
    const request = new Request(
                        "http://127.0.0.1:8000/api/passwords",
                        {headers: {'X-CSRFToken': csrftoken, 'content-type': 'application/json'}}
                    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',  // Do not send CSRF token to another domain.
        body: JSON.stringify({
            email: email.value,
            username: username.value,
            encrypted_password: password.value,
            url: url.value
        })
    }).then(response => {                 
        if(response.ok) {
            // clear input tags value
            email.value = "";
            username.value = "";
            password.value = "";
            url.value = "";
            // reload passwords
            loadPasswords();
        }
        else
            response.json().then(result => {alert(JSON.stringify(result))})
    })
}