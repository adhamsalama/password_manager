async function addPassword(data) {
    return postData("http://vault-guard.herokuapp.com/api/passwords", data=data)
}