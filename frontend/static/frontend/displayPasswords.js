function displayPasswords(passwords) {
    if(passwords == null)
        return;
    let div = document.querySelector("#passwords");
    let content = "";
    for(let i = 0; i < passwords.length; i++)
        {
            let passwordTags = passwords[i].tags;
            tagsHTML = "";
            if(passwordTags !== null) {
                passwordTags = JSON.parse(passwordTags.tags);
                passwordTags.forEach(tag => tagsHTML += `<span class="badge rounded-pill bg-primary m-1 password-tag">${tag}</span>`)
            }
                content += `
                    <div class="accordion-item" id="${passwords[i].id}">
                      <h2 class="accordion-header" id="heading-${passwords[i].id}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${passwords[i].id}" aria-expanded="true" aria-controls="collapse-${passwords[i].id}">
                          ${passwords[i].url}
                        </button>
                      </h2>
                      <div id="collapse-${passwords[i].id}" class="accordion-collapse collapse" aria-labelledby="heading-${passwords[i].id}" data-bs-parent="#passwords">
                        <div class="accordion-body">
                            Email: <span class="password-email">${passwords[i].email}</span>
                            <br>
                            Username: <span class="password-username">${passwords[i].username}</span>
                            <br>
                            <button class="btn btn-primary copy-button">Copy Password</button>
                            <span style="display: none" class="encrypted-password">
                                ${passwords[i].encrypted_password}
                            </span>
                            <br>
                            Link: <a href="${passwords[i].url}">
                                    <span class="password-url">${passwords[i].url}</span></a>
                            <div class="password-tags">${tagsHTML}</div>
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
    // add onclick event for edit buttons
    let editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach(button => {
        button.onclick = () => {
            // get password details
            let parentDiv = button.parentElement.parentElement.parentElement;
            let id = parentDiv.id;
            let email = parentDiv.querySelector(".password-email").innerHTML.trim();
            let username = parentDiv.querySelector(".password-username").innerHTML.trim();
            let url = parentDiv.querySelector(".password-url").innerHTML.trim();
            let tags = parentDiv.querySelectorAll('.password-tag');
            let tagsList = [];
            if(tags !== null) {
                tags.forEach(tag => {
                    tagsList.push(tag.innerHTML)
                })
            }  
            let modal = document.querySelector("#edit-modal");
            // get modal input tags
            let modalEmail = modal.querySelector(".edit-email");
            let modalUsername = modal.querySelector(".edit-username");
            let modalPassword = modal.querySelector(".edit-password");
            let modalUrl = modal.querySelector(".edit-url");
            let modalMPW = modal.querySelector(".edit-master-password");
            let modalTags = modal.querySelector(".edit-tags");
            // fill modal input tags with password details
            modalEmail.value = email;
            modalUsername.value = username;
            modalUrl.value = url;
            modalTags.value = tagsList;
            let bsModal = new bootstrap.Modal(modal);
            bsModal.show();
            document.querySelector("#edit-modal-save").onclick = () => {
                verifyMasterPassword(modalMPW.value)
                .then(result => {
                    if(result == false) {
                        alert("Wrong master password.");
                        return false;
                    }
                        
                    // encrypt new password
                    data = {
                            email: modalEmail.value,
                            username: modalUsername.value,
                            url: modalUrl.value
                        }
                    // check if password was updated
                    if(modalPassword.value !== "")
                        data.encrypted_password = encrypt(modalPassword.value, modalMPW.value);
                    // check if tags were updated
                    let modalTagsList = modalTags.value.trim().split(",");
                    // same length, check for elements
                    let flag = true;
                    if(tagsList.length == modalTagsList.length) {
                        for(let i = 0; i < tagsList.length; i++) {
                            if(tagsList[i] !== modalTagsList[i]) {
                                flag = false;
                                break
                            }
                        }
                    }
                    else
                        flag = false;
                    
                    if(!flag) {
                        // check if empty tags
                        if(modalTagsList.length == 1 && modalTagsList[0] == "")
                            data.tags = null;
                        // add tags to data for patching
                        else
                            data.tags = {"tags": JSON.stringify(modalTagsList)}
                    }

                    console.log(tagsList);
                    // update password
                    patchData('http://127.0.0.1:8000/api/passwords/' + id, data=data)
                    .then(response => response.json())
                    .then(() => {
                        // display passwords
                        getPasswords().then(results => displayPasswords(results))
                        // clear master password from modal
                        //modal.querySelectorAll("input").forEach(input => input.value = "")
                        modalTags.value = "";
                    });
                });
            }
        }
    })
}