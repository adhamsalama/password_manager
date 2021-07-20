async function verifyMasterPassword(MPW) {
    return postData(`${document.location.href}api/verify-master-password`, data={master_password: MPW})
    .then(response => response.json())
}
