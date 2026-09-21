let score = 0;
let coins = 0;
let lives = 3;
let level = 1;

let questionNumber = 1;

const totalQuestions = 10;

let currentAnswer = 0;


// ELEMENT
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");

const questionEl = document.getElementById("question");

const answersEl = document.getElementById("answers");

const feedbackEl = document.getElementById("feedback");

const nextBtn = document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const gameOver =
    document.getElementById("gameOver");

const finalScore =
    document.getElementById("finalScore");

const finalCoins =
    document.getElementById("finalCoins");

const restartBtn =
    document.getElementById("restartBtn");


// ==============================
// BUAT SOAL
// ==============================

function generateQuestion() {

    feedbackEl.textContent = "";

    nextBtn.style.display = "none";

    answersEl.innerHTML = "";


    const number1 =
        Math.floor(Math.random() * 10) + 1;

    const number2 =
        Math.floor(Math.random() * 10) + 1;


    currentAnswer =
        number1 + number2;


    questionEl.textContent =
        `Berapa hasil dari ${number1} + ${number2}?`;


    createAnswers();

    updateProgress();

}


// ==============================
// PILIHAN JAWABAN
// ==============================

function createAnswers() {

    let choices = [
        currentAnswer,
        currentAnswer + 1,
        currentAnswer - 1,
        currentAnswer + 2
    ];


    choices.sort(() => Math.random() - 0.5);


    choices.forEach(answer => {

        const button =
            document.createElement("button");


        button.className = "answer";

        button.textContent = answer;


        button.addEventListener(
            "click",
            () => checkAnswer(answer, button)
        );


        answersEl.appendChild(button);

    });

}


// ==============================
// CEK JAWABAN
// ==============================

function checkAnswer(answer, button) {

    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (answer === currentAnswer) {

        // BENAR
        button.classList.add("correct");


        score += 10;

        coins += 5;


        feedbackEl.textContent =
            "🎉 BENAR! +10 skor +5 koin!";


        feedbackEl.style.color =
            "#00b894";


        updateLevel();


        // Animasi karakter
        const character =
            document.getElementById("character");


        character.classList.add("celebrate");


        setTimeout(() => {
            character.classList.remove("celebrate");
        }, 700);

    }

    else {

        // SALAH
        button.classList.add("wrong");


        lives--;


        feedbackEl.textContent =
            `😅 Belum tepat! Jawabannya ${currentAnswer}.`;


        feedbackEl.style.color =
            "#d63031";


        if (lives <= 0) {

            setTimeout(gameOverScreen, 800);

            return;

        }

    }


    updateDisplay();


    nextBtn.style.display = "inline-block";

}


// ==============================
// LEVEL
// ==============================

function updateLevel() {

    level =
        Math.floor(score / 50) + 1;

}


// ==============================
// PROGRESS
// ==============================

function updateProgress() {

    const percent =
        (questionNumber / totalQuestions) * 100;


    progressBar.style.width =
        `${percent}%`;


    progressText.textContent =
        `${questionNumber} / ${totalQuestions}`;

}


// ==============================
// DISPLAY
// ==============================

function updateDisplay() {

    scoreEl.textContent = score;

    coinsEl.textContent = coins;

    livesEl.textContent = lives;

    levelEl.textContent = level;

}


// ==============================
// SOAL BERIKUTNYA
// ==============================

nextBtn.addEventListener("click", () => {

    questionNumber++;


    if (questionNumber > totalQuestions) {

        gameOverScreen();

        return;

    }


    generateQuestion();

});


// ==============================
// GAME OVER
// ==============================

function gameOverScreen() {

    finalScore.textContent = score;

    finalCoins.textContent = coins;


    gameOver.classList.remove("hidden");


    document
        .querySelector(".game-world")
        .style.display = "none";


    document
        .querySelector(".tip")
        .style.display = "none";

}


// ==============================
// MAIN LAGI
// ==============================

restartBtn.addEventListener("click", () => {

    score = 0;

    coins = 0;

    lives = 3;

    level = 1;

    questionNumber = 1;


    gameOver.classList.add("hidden");


    document
        .querySelector(".game-world")
        .style.display = "block";


    document
        .querySelector(".tip")
        .style.display = "block";


    updateDisplay();

    generateQuestion();

});


// ==============================
// MULAI
// ==============================

updateDisplay();

generateQuestion();
