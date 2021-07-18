function decryptAndCopyPassword() {
    let copyButtons = document.querySelectorAll(".copy-button");
    copyButtons.forEach(button => {
        button.onclick = () => {
        let encrypted_password = button.parentElement.querySelector(".encrypted-password").innerHTML.trim();
        let MPW = getMasterPassword("Enter master password for decryption.");
        let res = postData('http://127.0.0.1:8000/api/verify-master-password', data={master_password: MPW});
        res.then(response => response.json()).then(result => {
            if(result == false)
                alert("Wrong Master Password.")
            
            else {
                let decrypted_password = decrypt(encrypted_password, MPW);
                navigator.clipboard.writeText(decrypted_password);
            }    
            
        });
         

    }
})
}