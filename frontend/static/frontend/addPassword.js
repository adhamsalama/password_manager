async function addPassword(data) {
    return postData("http://127.0.0.1:8000/api/passwords", data={
                email: email.value,
                username: username.value,
                encrypted_password: encrypt(password.value, MPW),
                url: url.value
            })
}