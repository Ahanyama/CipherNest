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
    document.getElementById("level-heading").innerText = `Level ${level}: ${getLevelName(level)}`;
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

// Get level name
function getLevelName(level) {
    if (level === 1) return 'Addition';
    if (level === 2) return 'Subtraction';
    if (level === 3) return 'Multiplication';
    if (level === 4) return 'Division';
    return 'Challenge';
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
        alert(`Wrong answer! The correct answer was ${questions[currentQuestionIndex].answer}`);
    }
}

// Function to complete the level and display the badge popup
function completeLevel() {
    badgeEarned = true;
    badgeSound.play();
    document.getElementById("badge-popup").style.display = 'block';
    document.getElementById("level-badge-number").innerText = currentLevel;
}

// Function to open the instructions modal
function openModal() {
    document.getElementById("instructions-modal").style.display = 'block';
}

// Function to close the instructions modal
function closeModal() {
    document.getElementById("instructions-modal").style.display = 'none';
}

// Function to exit the game
function exitGame() {
    window.location.href = '/'; // Redirect to home page
}
