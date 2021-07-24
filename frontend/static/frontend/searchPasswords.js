
let form = document.querySelector("#search-form");
form.onsubmit = () => false;

let searchField = document.querySelector("#q");
searchField.oninput = (input) => {
    // Search passwords only when entering characters, numbers, symbols
    // or deleting a character by pressing backspace
    if (input.data !== " ")
        getPasswords(searchField.value).then(results => displayPasswords(results));
}