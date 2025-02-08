// Initialize the game state
let currentLevel = 1;
let currentQuestionIndex = 0;
let totalQuestions = 10;
let currentAnswer = null;
let badges = ["Level 1 Badge 🎉", "Level 2 Badge 🏆", "Level 3 Badge 🥇", "Level 4 Badge 🎯", "Level 5 Badge 🏅"];

// Instructions Panel
document.getElementById("instructions-btn").addEventListener("click", function() {
    document.getElementById("instructions-panel").style.display = "block";
});

document.getElementById("close-instructions").addEventListener("click", function() {
    document.getElementById("instructions-panel").style.display = "none";
});

// Dice Roll and Game Progression
document.getElementById("roll-dice").addEventListener("click", function() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-result").textContent = `You rolled a ${diceRoll}`;

    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        // Level completed
        if (currentLevel <= 5) {
            document.getElementById("badge").style.display = "block";
            document.getElementById("badge").textContent = badges[currentLevel - 1];  // Show unique badge for current level
            currentLevel++;  // Move to next level
            currentQuestionIndex = 0;  // Reset question index for the next level
            if (currentLevel <= 5) {
                document.getElementById("level").textContent = currentLevel; // Update level indicator
            } else {
                document.getElementById("badge").textContent = "🎉 Congratulations! You've completed all levels! 🎉"; // End of game
                document.getElementById("roll-dice").disabled = true; // Disable further rolling
            }
        }
    }
});

function showQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 + num2;

    // Display the current question
    document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;
    document.getElementById("question-box").style.display = "block";

    // Clear previous feedback and answer input
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("roll-dice").disabled = true;  // Disable dice until answer is submitted
    document.getElementById("roll-dice").textContent = "Roll Die to Answer Next Question";
}

document.getElementById("submit-answer").addEventListener("click", function() {
    let userAnswer = parseInt(document.getElementById("answer").value);

    if (userAnswer === currentAnswer) {
        document.getElementById("feedback").textContent = "✅ Correct! Now roll the die to continue.";
        currentQuestionIndex++;
    } else {
        document.getElementById("feedback").textContent = `❌ Incorrect! The correct answer is ${currentAnswer}. Now roll the die to continue.`;
    }

    // Enable dice roll button after answering
    document.getElementById("roll-dice").disabled = false;
    document.getElementById("roll-dice").textContent = "Roll Die to Answer Next Question";
});
