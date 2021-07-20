async function getPasswords(q){
    if(q == undefined)
        return fetch(`${document.location.href}/api/passwords`)
                    .then(response => response.json())
    return fetch(`https://${document.location.hostname}/api/passwords?q=` + q)
    .then(response => response.json())
};