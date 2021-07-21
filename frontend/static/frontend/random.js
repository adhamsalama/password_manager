function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomCharacter() {
    let charIndex = getRandomInt(26);
    let upperOrLower = getRandomInt(2) == 1 ? 97 : 65;
    let char = String.fromCharCode(upperOrLower + charIndex);
    return char;
}

function getRandomSymbol() {
    let symbols = '~!@#$%^&*()_+{}|:<>?-=[];,./';
    let index = getRandomInt(symbols.length);
    return symbols[index];
}

function getRandomNumber() {
    return getRandomInt(10);
}

function generateRandomPassword(n) {
    let funcs = [getRandomCharacter, getRandomNumber, getRandomSymbol];
    let generatedPassword = '';
    for(let i = 0; i < n; i++) {
        let func = funcs[getRandomInt(3)];
        generatedPassword += func();
    };
    return generatedPassword;
}