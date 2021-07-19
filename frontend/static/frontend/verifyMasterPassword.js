async function verifyMasterPassword(MPW) {
    return postData('http://127.0.0.1:8000/api/verify-master-password', data={master_password: MPW})
    .then(response => response.json())
}
