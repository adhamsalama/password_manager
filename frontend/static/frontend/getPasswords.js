async function getPasswords(q){
    if(q == undefined)
        return fetch('http://127.0.0.1:8000/api/passwords')
                    .then(response => response.json())
    return fetch('http://127.0.0.1:8000/api/passwords?q=' + q)
    .then(response => response.json())
};