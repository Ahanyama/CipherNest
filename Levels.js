let currentLevel = 1;
let currentQuestionIndex = 0;
let totalQuestions = 10;
let playerBadge = false;
let currentAnswer = null;

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
        if (!playerBadge) {
            document.getElementById("badge").style.display = "block";
            document.getElementById("badge").textContent = "🎉 Level Completed! 🎉";
            playerBadge = true;
        }
    }
});

function showQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 + num2;

    document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;
    document.getElementById("question-box").style.display = "block";
}

document.getElementById("submit-answer").addEventListener("click", function() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === currentAnswer) {
        document.getElementById("feedback").textContent = "✅ Correct! Moving to the next question...";
        currentQuestionIndex++;
        if (currentQuestionIndex === totalQuestions) {
            document.getElementById("roll-dice").click(); // Auto-move to badge stage
        }
    } else {
        document.getElementById("feedback").textContent = `❌ Incorrect! The correct answer is ${currentAnswer}.`;
    }
});
