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
