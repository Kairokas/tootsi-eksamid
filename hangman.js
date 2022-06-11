// 0 väärtus handlitatakse eraldi funktsioonides
const d20DiceMax = 21;
const dpercentDiceMax = 100;

let gameWordsList = ["aktsiaselts", "gallium", "testament", "pakane", "ultraviolett", "infotehnoloogia", "ksenoon"];
let gameWord = "";
let userDisplayWord = "";
let userLives = 7;
d20Button = document.getElementById("d20dice");
dpercentButton = document.getElementById("dpercentdice");
inputTextButton = document.getElementById("inputTextSubmit");

guessWordText = document.getElementById("guess-word");
diceRollText = document.getElementById("dice-roll");
inputLetterText = document.getElementById("input-letter");
noticeText = document.getElementById("notice-text");

d20Button.addEventListener("click", decideGameFate);
dpercentButton.addEventListener("click", percentOfWord);
inputTextButton.addEventListener("click", addLetterToWord);

function decideGameFate() {
    diceRollValue = getRandomInt(d20DiceMax);

    while (diceRollValue == 0) {
        diceRollValue = getRandomInt(d20DiceMax);
    }

    diceRollText.innerHTML = `Veeretasid: <b>${diceRollValue}</b>` + '\n';

    if (diceRollValue == 1) {
        alert("Mäng on läbi GG!");
        window.location.reload();
    } else if (diceRollValue == 20) {
        userLives++;
    }

    console.log("D20 täring veeretas: " + diceRollValue);

    diceRollText.innerHTML += `Elusid järgi: <b>${userLives}</b>`;
}

function percentOfWord() {
    uniqueLetters = Array.from(new Set(gameWord));
    diceRollValue = getRandomInt(dpercentDiceMax);
    uniqueLettersToShow = [];

    while (diceRollValue % 10 != 0) {
        diceRollValue = getRandomInt(dpercentDiceMax + 1);
    }

    if (diceRollValue == 0) {
        diceRollValue = 100;
    }

    console.log("Protsenditäring veeretas: " + diceRollValue);

    diceRollText.innerHTML += `Veeretasid: <b>${diceRollValue/2}%</b>` + '\n';

    uniqueLetterCountToShow = Math.floor((diceRollValue/2)/100 * uniqueLetters.length);
    console.log("Mitu tähte suvaliselt kuvame juurde: " + uniqueLetterCountToShow);

    // siia peaks tegelt while tulema, mis kontrollib, et tähte juba ei oleks olemas userDisplayWord
    for (let i = 0; i < uniqueLetterCountToShow; i++) {
        letterToShowNum = getRandomInt(uniqueLetterCountToShow);

        while (diceRollValue == 0) {
            letterToShowNum = getRandomInt(uniqueLetterCountToShow);
        }

        uniqueLettersToShow.push(uniqueLetters[letterToShowNum]);
    }
    console.log(uniqueLettersToShow);
    for (let i = 0; i < uniqueLettersToShow.length; i++) {
        console.log(uniqueLettersToShow[i]);
        for (let i = 0; i < gameWord.length; i++) {
            if (gameWord[i] == uniqueLettersToShow[i]) {
                userDisplayWord = userDisplayWord.replaceAt(i, uniqueLettersToShow[i]);
                //userDisplayWord[i] = letter;
                console.log(userDisplayWord);
            }
        }
    }

    guessWordText.innerHTML = `Arva tähti sõnal:\n<b>${userDisplayWord}</b>`;

    //return diceRollValue/2;
}

// pre game setup
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

function addLetterToWord(word){
    if (inputLetterText.value.length != 1) {
        alert("Pakutavaid tähti võib korraga olla aind 1!!");
        console.log("Pakutavaid tähti võib korraga olla aind 1, kasutaja pakutud oli: " + inputLetterText.value);
        return;
    } else {
        letter = inputLetterText.value;
    }
    // // kui protsent on antud, siis tegeleme sellega
    // if (typeof percentage !== 'undefined') {

    // }

    if (gameWord.includes(letter)) {
        for (let i = 0; i < gameWord.length; i++) {
            if (gameWord[i] == letter) {
                userDisplayWord = userDisplayWord.replaceAt(i, letter);
                //userDisplayWord[i] = letter;
                console.log(userDisplayWord);
            }
        }
    } else {
        userLives--;
        noticeText.innerHTML = `Täht ei sobinud, elusid järgi: <b>${userLives}</b>`
    }

    if (userLives < 1) {
        alert("Mäng on läbi GG!");
        window.location.reload();
    }

    guessWordText.innerHTML = `Arva tähti sõnal:\n<b>${userDisplayWord}</b>`;

    if (!userDisplayWord.includes("_")) {
        alert("Võitsite mängu!!");
        window.location.reload();
    }
}

// genereerime kuniks sõna on sobiv mängimiseks
while (gameWord.length <= 6) {
    gameWord = gameWordsList[getRandomInt(gameWordsList.length)];
}

let randomLetter = gameWord[getRandomInt(gameWord.length)];

for (let i = 0; i < gameWord.length; i++) {
    if (gameWord[i] == randomLetter) {
        //console.log(gameWord[i]);
        userDisplayWord = userDisplayWord.concat(gameWord[i]);
    } else {
        userDisplayWord = userDisplayWord.concat("_");
    }
}

guessWordText.innerHTML = `Arva tähti sõnal:\n<b>${userDisplayWord}</b>`;

// end of pre game setup

// while (userLives > 7) {
//     decideGameFate();
//     percentageOfWordShown = percentOfWord();

//     uniqueLetters = new Set(gameWord);
//     uniqueLettersToShow = percentageOfWordShown * uniqueLetters.length;
//     console.log(uniqueLettersToShow);

//     addLetterToWord(gameWord, percentageOfWordShown);
// }

console.log("mängusõna " + gameWord);
console.log("suvaline täht " + randomLetter);
console.log("kasutajale kuvtava sõna " + userDisplayWord);
