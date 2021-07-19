
let form = document.querySelector("#search-form");
form.onsubmit = () => false;

let searchField = document.querySelector("#q");
searchField.onkeyup = () => {
    getPasswords(searchField.value).then(results => displayPasswords(results));
}