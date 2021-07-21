function displayPasswords(passwords) {
    if (passwords == null)
        return;
    let div = document.querySelector("#passwords");
    let content = "";
    for (let i = 0; i < passwords.length; i++) {
        let passwordTags = passwords[i].tags;
        tagsHTML = "";
        if (passwordTags !== null) {
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
                            Link: <a href="${passwords[i].url}" target="_blank" rel="noopener noreferrer">
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
    if (content == "")
        content = "<h2 class='mx-auto w-75'>You don't have any passwords.</h2>";
    div.innerHTML = content;


    // add onclick event for copy buttons
    let copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.onclick = () => {
            let encrypted_password = button.parentElement.querySelector(".encrypted-password").innerHTML.trim();
            modalClose("Enter master password to decrypt.", decryptAndCopyPassword, encrypted_password);
        }
    })
    editPasswordEvent();
    deletePasswordEvent();
}