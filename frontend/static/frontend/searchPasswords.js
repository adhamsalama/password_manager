
let form = document.querySelector("#search-form");
form.onsubmit = () => false;

let searchField = document.querySelector("#q");
searchField.onkeyup = () => {
    console.log(searchField.value);
    getPasswords(searchField.value).then(results => displayPasswords(results));
}