async function getPasswords(q){
    if(q == undefined)
        return fetch(`${window.location.origin}/api/passwords`)
                    .then(response => response.json())
    return fetch(`${window.location.origin}/api/passwords?q=` + q)
    .then(response => response.json())
};