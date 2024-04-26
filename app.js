// prevent animation from load
setTimeout(() => {
    document.body.classList.remove("preload");
} , 500)

/* Show modal */
const btnRules   = document.querySelector(".rules-btn");
const btnClose   = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal")

// show and hide rules
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener('click', () => {
    modalRules.classList.toggle("show-modal");
});

// build the logic of the game
const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    }
];

const choiceButton = document.querySelectorAll(".choice-btn");
const gameDiv      = document.querySelector(".game");
const resultDiv    = document.querySelector(".results");
const resultDivs   = document.querySelectorAll(".results .result");
const resultWinner = document.querySelector('.result-winner');
const resutlText   = document.querySelector(".results-text");
const btnPlayAgain = document.querySelector(".play-again");
const scoreNumber  = document.querySelector(".score-number");

let score = 0;

function keepScore(point) {
    if (!(score == 0 && point < 0)) {
        score += point;
        scoreNumber.innerText = score;
    }
}

choiceButton.forEach((e) => {
    e.addEventListener('click', () => {
        const choiceName = e.dataset.choice;
        const choice = CHOICES.find(choice => choice.name == choiceName);
        choose(choice);
    })
});

function choose(choice) {
    const aiChoice = aiChoose();
    displayResult([choice, aiChoice]);
    displayWinner([choice, aiChoice]);
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());
        
        if (userWins) {
            resutlText.innerText = "you win";
            resultDivs[0].classList.toggle("winner");
            keepScore(1);
        } else if(aiWins){
            resutlText.innerText = "you lose";
            resultDivs[1].classList.toggle("winner");
            keepScore(-1);
        } else {
            resutlText.innerText = "draw";
        }
    }, 1000);

    resultWinner.classList.toggle("hidden");
    resultDiv.classList.toggle("show-winner");
}
function displayResult(results) {
    resultDivs.forEach((e, idx) => {
        setTimeout(() => {
            e.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="./images/icon-${results[idx].name}.svg" alt="${results[idx].name}">
                </div>
            `
        }, idx * 1000);
    });
    gameDiv.classList.toggle("hidden");
    resultDiv.classList.toggle("hidden");
}
function isWinner(results) {
    return results[0].beats == results[1].name;
}
function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

// reset the game
btnPlayAgain.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultDiv.classList.toggle('hidden');

    resultDivs.forEach((e) => {
        e.innerHTML = '';
        e.classList.remove("winner");
    })
    resutlText.innerText = '';
    resultWinner.classList.toggle("hidden");
    resultDiv.classList.toggle('show-winner');
})