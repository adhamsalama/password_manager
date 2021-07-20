async function verifyMasterPassword(MPW) {
    return postData(`https://${document.location.hostname}/api/verify-master-password`, data={master_password: MPW})
    .then(response => response.json())
}
