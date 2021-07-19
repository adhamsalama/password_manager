async function getPasswords(q=''){
    return fetch('http://127.0.0.1:8000/api/passwords?q=' + q)
    .then(response => response.json())
};