function displayPasswords(passwords) {
    if(passwords == null)
        return;
    let div = document.querySelector("#passwords");
    let content = "";
    for(let i = 0; i < passwords.length; i++)
        {
            content += `
                    <div class="accordion-item" id="${passwords[i].id}">
                      <h2 class="accordion-header" id="heading-${passwords[i].id}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${passwords[i].id}" aria-expanded="true" aria-controls="collapse-${passwords[i].id}">
                          ${passwords[i].url}
                        </button>
                      </h2>
                      <div id="collapse-${passwords[i].id}" class="accordion-collapse collapse" aria-labelledby="heading-${passwords[i].id}" data-bs-parent="#passwords">
                        <div class="accordion-body">
                            Email: ${passwords[i].email}
                            <br>
                            Username: ${passwords[i].username}
                            <br>
                            <button class="btn btn-primary copy-button">Copy Password</button>
                            <span style="display: none" class="encrypted-password">
                                ${passwords[i].encrypted_password}
                            </span>
                            <br>
                            Link: <a href="${passwords[i].url}">${passwords[i].url}</a>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary edit-button" type="button">Edit</button>
                            <button class="btn btn-danger delete-button" type="button">Delete</button>
                        </div>
                      </div>
                      </div>
                    </div>`;
        
        
        }
    if(content == "")
        content = "<h2 class='mx-auto w-75'>You don't have any passwords.</h2>";
    div.innerHTML = content;

    // add onclick event for delete buttons
    let deleteButtons = document.querySelectorAll(".delete-button");
    for(let i = 0; i < deleteButtons.length; i++)
    {
        deleteButtons[i].onclick = () => {
            let id = deleteButtons[i].parentElement.parentElement.parentElement.id;
            const request = new Request(
                    `http://127.0.0.1:8000/api/passwords/${id}`,
                    {headers: {'X-CSRFToken': getCookie('csrftoken'), 'content-type': 'application/json'}}
                );
            fetch(request, {
                method: 'DELETE',
                mode: 'same-origin'  // Do not send CSRF token to another domain.
            }).then(() => getPasswords(document.querySelector("#q").value).then(results => displayPasswords(results)))
        }
    }
    // add onclick event for copy buttons
    let copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
        button.onclick = () => {
            let encrypted_password = button.parentElement.querySelector(".encrypted-password").innerHTML.trim();
            modalClose("Enter master password to decrypt.", decryptAndCopyPassword, encrypted_password);
        }
    })
}