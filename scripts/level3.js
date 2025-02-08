// Game Variables
let level = 1;
let questionCount = 0;
let correctAnswers = 0;
let currentQuestion = {};
let questionsAnswered = 0;

// Elements
const rollDiceButton = document.getElementById('roll-dice');
const instructionsButton = document.getElementById('instructions-btn');
const exitButton = document.getElementById('exit-btn');
const levelDisplay = document.getElementById('level');
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

// Set initial level display
levelDisplay.innerHTML = `Level ${level}: ${questionTypes[level - 1]}`;

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
    generateQuestion(dieRoll);
}

// Function to generate questions based on level and die roll
function generateQuestion(dieRoll) {
    questionBox.style.display = 'block';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    // Based on the level, generate different question types
    switch (level) {
        case 1: // Level 1: Addition
            currentQuestion = {
                question: `${num1} + ${num2}`,
                answer: num1 + num2
            };
            break;
        case 2: // Level 2: Subtraction
            currentQuestion = {
                question: `${num1} - ${num2}`,
                answer: num1 - num2
            };
            break;
        case 3: // Level 3: Multiplication
            currentQuestion = {
                question: `${num1} * ${num2}`,
                answer: num1 * num2
            };
            break;
        case 4: // Level 4: Division
            currentQuestion = {
                question: `${num1 * num2} ÷ ${num2}`,
                answer: num1
            };
            break;
        default:
            currentQuestion = { question: 'Error', answer: 'N/A' };
    }

    // Display the question
    questionElement.textContent = `Question ${questionCount + 1}: ${currentQuestion.question}`;
    questionCount++;

    // Reset answer input and feedback
    answerInput.value = '';
    feedbackElement.textContent = '';
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
    alert(`Congratulations! You have completed Level ${level}! You've earned a unique badge.`);
    level++;
    questionCount = 0;
    correctAnswers = 0;

    if (level > 5) {
        alert('You have completed all levels! Great job!');
        exitGame();
    } else {
        levelDisplay.innerHTML = `Level ${level}: ${questionTypes[level - 1]}`;
        generateQuestion();
    }
}

// Function to exit the game
function exitGame() {
    window.location.href = 'index.html'; // Redirect to home page or another URL
}

// Function to handle level transitions and progress
function handleLevelProgress() {
    const levels = document.querySelectorAll('.level');
    levels.forEach((levelElement, index) => {
        if (index === level - 1) {
            levelElement.style.backgroundColor = '#d63384'; // Dark pink for current level
        } else {
            levelElement.style.backgroundColor = '#f8b400'; // Light pink for other levels
        }
    });
}

// Function to initialize level progress (optional)
function initializeLevelProgress() {
    const levelProgressContainer = document.getElementById('level-progress');
    for (let i = 0; i < 5; i++) {
        const levelElement = document.createElement('div');
        levelElement.classList.add('level');
        levelElement.innerText = `Level ${i + 1}`;
        levelProgressContainer.appendChild(levelElement);
    }
}

// Initialize level progress (call this function once during the game setup)
initializeLevelProgress();
