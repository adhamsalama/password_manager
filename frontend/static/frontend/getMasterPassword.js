function getMasterPassword(msg) {
    //return prompt(msg);
    let modal = document.querySelector("#modal");
    modal.querySelector(".modal-title").innerHTML = msg;
    let bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    let masterPasswordInput = document.querySelector("#master-password-input");
    masterPasswordInput.focus();
    let mpw = "yyy";
    modal.addEventListener('hide.bs.modal', () => {
        mpw = masterPasswordInput.value;
        masterPasswordInput.value = "";
    })
    return mpw;
}