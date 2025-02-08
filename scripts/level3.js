let currentLevel = 0;
let currentQuestionIndex = 0;
let questions = [];
let badgeEarned = false;

// Sounds
const rollSound = new Audio('path/to/roll-sound.mp3');
const badgeSound = new Audio('path/to/badge-sound.mp3');

// Function to start the game and load questions for each level
function startGame(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    badgeEarned = false;
    questions = generateQuestions(level); // Generate level-specific questions
    showNextQuestion();
    document.getElementById("badge-popup").style.display = 'none';
    document.getElementById("dice-roll").style.display = 'block';
}

// Generate questions for each level
function generateQuestions(level) {
    let questions = [];
    for (let i = 0; i < 10; i++) {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let questionText = '';
        let answer = 0;

        if (level === 1) { // Addition
            questionText = `What is ${num1} + ${num2}?`;
            answer = num1 + num2;
        } else if (level === 2) { // Subtraction
            questionText = `What is ${num1} - ${num2}?`;
            answer = num1 - num2;
        } else if (level === 3) { // Multiplication
            questionText = `What is ${num1} * ${num2}?`;
            answer = num1 * num2;
        } else if (level === 4) { // Division
            questionText = `What is ${num1} ÷ ${num2}?`;
            answer = num1 / num2;
        } else if (level === 5) { // Challenge level
            let operation = Math.random() > 0.5 ? '+' : '-';
            questionText = `What is ${num1} ${operation} ${num2}?`;
            answer = operation === '+' ? num1 + num2 : num1 - num2;
        }

        questions.push({ question: questionText, answer });
    }
    return questions;
}

// Display the next question
function showNextQuestion() {
    if (currentQuestionIndex < 10) {
        document.getElementById("question-box").innerText = `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`;
        document.getElementById("answer-section").classList.remove("hidden");
        document.getElementById("submit-btn").disabled = false;
        document.getElementById("answer").value = "";
    } else {
        completeLevel();
    }
}

// Function to check the player's answer
function checkAnswer() {
    let answer = parseInt(document.getElementById("answer").value);
    if (answer === questions[currentQuestionIndex].answer) {
        currentQuestionIndex++;
        showNextQuestion();
    } else {
        alert(`Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`);
        document.getElementById("submit-btn").disabled = true;
    }
}

// Function to roll the dice and start the next question
function rollDice() {
    rollSound.play();
    document.getElementById("roll-btn").disabled = true;
    setTimeout(() => {
        document.getElementById("roll-btn").disabled = false;
        showNextQuestion();
    }, 1000);
}

// Function to complete a level
function completeLevel() {
    if (!badgeEarned) {
        badgeEarned = true;
        displayBadgePopup();
    }
}

// Display the badge popup
function displayBadgePopup() {
    badgeSound.play();
    document.getElementById("badge-popup").style.display = 'block';
    document.getElementById("level-badge-number").innerText = currentLevel;
}

// Instructions Modal Functions
function openModal() {
    document.getElementById("instructions-modal").style.display = 'flex';
}

function closeModal() {
    document.getElementById("instructions-modal").style.display = 'none';
}

// Exit Game Function
function exitGame() {
    alert("Thank you for playing!");
    window.location.reload();
}
