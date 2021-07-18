function loadPasswords(){
    fetch('http://127.0.0.1:8000/api/passwords')
    .then(response => response.json())
    .then(results => {
        console.log(results);
        let div = document.querySelector("#passwords");
        let passwords = "";
        for(let i = 0; i < results.length; i++)
            {
                let email = results[i].email;
                let username = results[i].username;
                let encrypted_password = results[i].encrypted_password;
                let url = results[i].url;
                passwords += `
                        <div class="accordion-item" id="${results[i].id}">
                          <h2 class="accordion-header" id="heading-${results[i].id}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${results[i].id}" aria-expanded="true" aria-controls="collapse-${results[i].id}">
                              ${results[i].url}
                            </button>
                          </h2>
                          <div id="collapse-${results[i].id}" class="accordion-collapse collapse" aria-labelledby="heading-${results[i].id}" data-bs-parent="#passwords">
                            <div class="accordion-body">
                                Email: ${results[i].email}
                                <br>
                                Username: ${results[i].username}
                                <br>
                                <button class="btn btn-primary copy-button">Copy Password</button>
                                <span style="display: none" class="encrypted-password">
                                    ${results[i].encrypted_password}
                                </span>
                                <br>
                                Link: ${results[i].url}
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary edit-button" type="button">Edit</button>
                                <button class="btn btn-danger delete-button" type="button">Delete</button>
                            </div>
                          </div>
                          </div>
                        </div>`;
            
            
            }
        if(passwords == "")
            passwords = "<h2 class='mx-auto w-75'>You don't have any passwords.</h2>";
        div.innerHTML = passwords;
    
        // add onclick event for delete buttons
        let deleteButtons = document.querySelectorAll(".delete-button");
        for(let i = 0; i < deleteButtons.length; i++)
        {
            deleteButtons[i].onclick = () => {
                let id = deleteButtons[i].parentElement.parentElement.parentElement.id;
                const request = new Request(
                        `http://127.0.0.1:8000/api/passwords/${id}`,
                        {headers: {'X-CSRFToken': csrftoken, 'content-type': 'application/json'}}
                    );
                fetch(request, {
                    method: 'DELETE',
                    mode: 'same-origin'  // Do not send CSRF token to another domain.
                }).then(() => loadPasswords())
            }
        }
        decryptAndCopyPassword();
})};