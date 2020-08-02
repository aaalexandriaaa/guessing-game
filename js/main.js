/*------Constants------*/

/*------Variables------*/
let secretNum, guessList, currentGuess, isWinner;  //isWinner variable will allow you to disable functions/clicks/etc
//current guess variable probably wouldn't need to be globally scoped but that's how Ben wrote the code. 

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessInput = document.getElementById('guessInput')
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const titleEl = document.querySelector('h1');

/*------Event Listeners------*/
resetBtn.addEventListener('click', function(){
    init();
});

guessBtn.addEventListener('click', function() {
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
})

/*------Functions------*/
// initialization function sets all state variables for a new game. 
init();
function init(){
    titleEl.className = '';
    messageEl.className = '';
    //this is a handy trick to remove all appended children from an element.
    guessesEl.innerText = ' '; 
    messageEl.innerText = 'Please enter a number between 1 and 100!';
    guessInput.value = ' ';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
    render()
}

function checkGuess(guess){
    guessInput.value = '';
    if (guess < 1 || guess > 100){
        messageEl.innerText = "Whoops, please try a number between 1 & 100"
    } else if (guess === secretNum){
        //winScenario;
        messageEl.className = 'winner'; //classname refers to the CSS document - this gets weird with multiple class names - you have to use a different method.
        isWinner = true;
        titleEl.className = 'animated bounce';
        confetti.start(1500);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess < secretNum){
        //handle guess if too low
        messageEl.innerText = `Your guess of ${guess} was too low. Try again!`;
        messageEl.className = 'low';
        guessList.push(guess);
        render(guess);
    } else {
        //handle if guess is too high
        messageEl.innerText = `Your guess of ${guess} was too high. Try again!`;
        messageEl.className = 'high';
        guessList.push(guess);
        render(guess);
    }
}

function render(guess){
    //Append a child div to the guessesEl div based on whether our guess is higher or lower than secretNum
    if (guess === secretNum) {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'winner';
        guessesEl.appendChild(div);
    }
    else if (guess > secretNum){
        // Create a new div, then append to the parent div (guessesEl)
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'high';
        guessesEl.appendChild(div);
    } else {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'low';
        guessesEl.appendChild(div);
    }
}
