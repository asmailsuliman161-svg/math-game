const questions = [
  {q:"ص = جاس³(2س)", a:"6 جاس²(2س) × جتاس(2س)"},
  {q:"ص = ظا²(س+١)", a:"2 × ظا(س+١) × قا²(س+١)"},
  {q:"ص = جاس(3س) × جتا(2س)", a:"3 × جتاس(3س) × جتا(2س) - 2 × جاس(2س) × جاس(3س)"},
  {q:"ص = ظا(س+١) × س²", a:"2 × س × ظا(س+١) × قا²(س+١) + 2س × ظا²(س+١)"}
];

let current = 0;
let score = 0;
let playerName = "";

function startGame() {
  playerName = document.getElementById("playerName").value || "طالب";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  document.getElementById("question").innerText = questions[current].q;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("score").innerText = `النقاط: ${score}`;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  if(userAnswer === questions[current].a) {
    document.getElementById("feedback").innerText = "✅ إجابة صحيحة!";
    score++;
    document.getElementById("correctSound").play();
  } else {
    document.getElementById("feedback").innerText = `❌ خطأ! الإجابة الصحيحة: ${questions[current].a}`;
    document.getElementById("wrongSound").play();
  }
  document.getElementById("score").innerText = `النقاط: ${score}`;
}

function nextQuestion() {
  current++;
  if(current >= questions.length) {
    endGame();
  } else {
    showQuestion();
  }
}

function endGame() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("finalScore").innerText = `${playerName} حصلت على ${score} من ${questions.length} نقاط`;
}

function restartGame() {
  current = 0;
  score = 0;
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("playerName").value = "";
}
