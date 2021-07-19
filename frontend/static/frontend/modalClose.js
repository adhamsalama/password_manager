function modalClose(msg, func, params) {
    //return prompt(msg);
    let modal = document.querySelector("#modal");
    modal.querySelector(".modal-title").innerHTML = msg;
    let bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    let masterPasswordInput = document.querySelector("#master-password-input");
    masterPasswordInput.focus();
    document.querySelector("#encrypt-decrypt-button").onclick = () => {
        let mpw = masterPasswordInput.value;
        if(mpw == null || mpw == "")
            return;
        verifyMasterPassword(mpw)
        .then(result => {
            if(result == false)
                alert("Wrong master password.");
            else {
                if(params == undefined) // passing add password
                    func(mpw);
                else                    // passing decryptAndCopyPassword and encrypted_password
                    func(mpw, params)
            }
        })
        
    }
}