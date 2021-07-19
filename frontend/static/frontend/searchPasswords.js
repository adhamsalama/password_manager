
let form = document.querySelector("#search-form");
form.onsubmit = () => false;

let searchField = document.querySelector("#q");
searchField.onkeyup = (key) => {
    // Search passwords only when entering characters, numbers, symbols
    // or deleting a character by pressing backspace
    if (key.key.length == 1 || key.code == "Backspace")
        getPasswords(searchField.value).then(results => displayPasswords(results));
}