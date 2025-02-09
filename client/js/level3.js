// Game Variables
let level = 1;
let questionCount = 0;
let correctAnswers = 0;
let currentQuestion = {};
let questions = [];

// Elements
const rollDiceButton = document.getElementById('roll-dice');
const instructionsButton = document.getElementById('instructions-btn');
const exitButton = document.getElementById('exit-btn');
const levelDisplay = document.getElementById('level');
const levelHeading = document.getElementById('level-heading');
const diceResult = document.getElementById('dice-result');
const questionBox = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitAnswerButton = document.getElementById('submit-answer');
const feedbackElement = document.getElementById('feedback');
const badgeElement = document.getElementById('badge');
const instructionsPanel = document.getElementById('instructions-panel');
const closeInstructionsButton = document.getElementById('close-instructions');

// Question types
const questionTypes = ['ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION'];

// Event listeners
rollDiceButton.addEventListener('click', rollDice);
instructionsButton.addEventListener('click', openInstructions);
exitButton.addEventListener('click', exitGame);
submitAnswerButton.addEventListener('click', submitAnswer);
closeInstructionsButton.addEventListener('click', closeInstructions);

// Function to open instructions modal
function openInstructions() {
    instructionsPanel.style.display = 'flex';
}

// Function to close instructions modal
function closeInstructions() {
    instructionsPanel.style.display = 'none';
}

// Function to handle the die roll and show a new question
function rollDice() {
    // Simulate a die roll (1 to 6)
    const dieRoll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `You rolled a ${dieRoll}`;
    // Generate a new question based on the current level
    if (questionCount < questions.length) {
        currentQuestion = questions[questionCount];
        questionElement.textContent = `Question ${questionCount + 1}: ${currentQuestion.question}`;
        questionBox.style.display = 'block';
        questionCount++;
        // Reset answer input and feedback
        answerInput.value = '';
        feedbackElement.textContent = '';
    } else {
        feedbackElement.textContent = 'No more questions in this level.';
    }
}

// Function to submit answer and check it
function submitAnswer() {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === currentQuestion.answer) {
        correctAnswers++;
        feedbackElement.textContent = 'Correct! Moving to the next question.';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Incorrect! The correct answer is ${currentQuestion.answer}.`;
        feedbackElement.style.color = 'red';
    }
    // Move to next question after a small delay
    setTimeout(() => {
        if (questionCount === 10) {
            completeLevel();
        } else {
            rollDice();
        }
    }, 2000);
}

// Function to handle level completion
function completeLevel() {
    // Display unique badge for each level
    let badgeMessage = '';
    switch (level) {
        case 1:
            badgeMessage = '🎉 Congratulations! You have completed Level 1 and earned the Addition Badge!';
            break;
        case 2:
            badgeMessage = '🎉 Congratulations! You have completed Level 2 and earned the Subtraction Badge!';
            break;
        case 3:
            badgeMessage = '🎉 Congratulations! You have completed Level 3 and earned the Multiplication Badge!';
            break;
        case 4:
            badgeMessage = '🎉 Congratulations! You have completed Level 4 and earned the Division Badge!';
            break;
        case 5:
            badgeMessage = '🎉 Congratulations! You have completed Level 5 and earned the Mixed Operations Badge!';
            break;
    }
    badgeElement.textContent = badgeMessage;
    // Move to next level
    level++;
    questionCount = 0;
    correctAnswers = 0;
    if (level > 5) {
        alert('You have completed all levels! Great job!');
        exitGame();
    } else {
        setTimeout(() => {
            levelHeading.textContent = `Level ${level}: ${questionTypes[level - 1]}`;
            fetchQuestions(level);
        }, 3000);
    }
}

// Function to exit the game
function exitGame() {
    window.location.href = 'index.html'; // Redirect to home page or another URL
}

// Function to fetch questions for a given level
function fetchQuestions(level) {
    fetch(`/api/questions/fetch?level=${level}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        questions = data;
        questionCount = 0;
        rollDice();
    })
    .catch(error => console.error('Error fetching questions:', error));
}

// Function to redirect to the game page with a specific level
function redirectToGame(selectedLevel) {
    level = selectedLevel;
    levelHeading.textContent = `Level ${level}: ${questionTypes[level - 1]}`;
    fetchQuestions(level);
    window.location.href = "game.html";
}

// Fetch questions for the current level when the game page loads
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    fetchQuestions(level);
});