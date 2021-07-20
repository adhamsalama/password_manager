// add onclick event for edit buttons
function editPasswordEvent() {
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
            if (tags !== null) {
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
                        if (result == false) {
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
                        if (modalPassword.value !== "")
                            data.encrypted_password = encrypt(modalPassword.value, modalMPW.value);
                        // check if tags were updated
                        let modalTagsList = modalTags.value.trim().split(",");
                        // same length, check for elements
                        let flag = true;
                        if (tagsList.length == modalTagsList.length) {
                            for (let i = 0; i < tagsList.length; i++) {
                                if (tagsList[i] !== modalTagsList[i]) {
                                    flag = false;
                                    break
                                }
                            }
                        }
                        else
                            flag = false;

                        if (!flag) {
                            // check if empty tags
                            if (modalTagsList.length == 1 && modalTagsList[0] == "")
                                data.tags = null;
                            // add tags to data for patching
                            else
                                data.tags = { "tags": JSON.stringify(modalTagsList) }
                        }

                        // update password
                        patchData('http://127.0.0.1:8000/api/passwords/' + id, data = data)
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