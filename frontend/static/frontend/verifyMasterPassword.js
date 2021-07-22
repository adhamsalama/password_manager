async function verifyMasterPassword(MPW) {
    return postData(`${window.location.origin}/api/verify-master-password`, data={master_password: MPW})
    .then(response => response.json())
}
