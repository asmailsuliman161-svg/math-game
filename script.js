// الأصوات
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const levelupSound = new Audio("levelup.mp3");

// لوحة الشرف
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// أسئلة اللعبة (مثال: 10 لكل مستوى هنا لتوضيح، يمكن التوسع لاحقًا لـ 100+)
const questionBank = {
  easy: [
    {q:"ص = جاس(س)", a:"جتاس(س)"},
    {q:"ص = جتا(س)", a:"-جتاس(س)"},
    {q:"ص = ظا(س)", a:"قا²(س)"},
    {q:"ص = جاس²(س)", a:"2 × جاس(س) × جتاس(س)"},
    {q:"ص = جتا²(س)", a:"-2 × جتا(س) × جتاس(س)"},
    {q:"ص = جاس(س) × جتا(س)", a:"جتاس(س) × جتا(س) - جاس(س) × جتاس(س)"},
    {q:"ص = جاس³(س)", a:"3 × جاس²(س) × جتاس(س)"},
    {q:"ص = جتا³(س)", a:"-3 × جتا²(س) × جتاس(س)"},
    {q:"ص = ظا²(س)", a:"2 × ظا(س) × قا²(س)"},
    {q:"ص = جاس²(س) × جتا(س)", a:"2 × جاس(س) × جتاس(س) × جتا(س) - جاس²(س) × جتاس(س)"}
  ],
  medium: [
    {q:"ص = جاس³(2س)", a:"6 × جاس²(2س) × جتاس(2س)"},
    {q:"ص = ظا²(س+١)", a:"2 × ظا(س+١) × قا²(س+١)"},
    {q:"ص = جاس(3س) × جتا(2س)", a:"3 × جتاس(3س) × جتا(2س) - 2 × جاس(3س) × جتاس(2س)"},
    {q:"ص = (جاس(س) + جتا(س))²", a:"2 × (جاس(س) + جتا(س)) × (جتاس(س) - جتاس(س))"},
    {q:"ص = جاس²(س) × ظا(س)", a:"2 × جاس(س) × جتاس(س) × ظا(س) + جاس²(س) × قا²(س)"},
    {q:"ص = جتا²(س) × ظا²(س)", a:"-2 × جتا(س) × جتاس(س) × ظا²(س) + جتا²(س) × 2 × ظا(س) × قا²(س)"},
    {q:"ص = جاس³(س) + جتا³(س)", a:"3 × جاس²(س) × جتاس(س) - 3 × جتا²(س) × جتاس(س)"},
    {q:"ص = ظا(س) × جاس(س)", a:"قا²(س) × جاس(س) + ظا(س) × جتاس(س)"},
    {q:"ص = جتا(س) × ظا²(س)", a:"-جتاس(س) × ظا²(س) + 2 × جتا(س) × ظا(س) × قا²(س)"},
    {q:"ص = جاس²(س) + جتا²(س)", a:"2 × جاس(س) × جتاس(س) - 2 × جتا(س) × جتاس(س)"}
  ],
  hard: [
    {q:"ص = جاس²(س) × جتا³(س)", a:"2 × جاس(س) × جتاس(س) × جتا³(س) - 3 × جاس²(س) × جتا²(س) × جتاس(س)"},
    {q:"ص = (جاس(س) + ظا(س))³", a:"3 × (جاس(س) + ظا(س))² × (جتاس(س) + قا²(س))"},
    {q:"ص = جاس²(2س) × جتا²(3س)", a:"4 × جاس(2س) × جتاس(2س) × جتا²(3س) - 6 × جاس²(2س) × جتا(3س) × جتاس(3س)"},
    {q:"ص = (جتا(س) × ظا(س))²", a:"2 × جتا(س) × ظا(س) × (-جتاس(س) × ظا(س) + جتا(س) × قا²(س))"},
    {q:"ص = جاس³(س) × ظا²(س)", a:"3 × جاس²(س) × جتاس(س) × ظا²(س) + 2 × جاس³(س) × ظا(س) × قا²(س)"}
  ]
};

// المتغيرات الحالية
let currentQuestions = [];
let currentIndex = 0;

// البدء
function startGame(){
  const level = document.getElementById("level").value;
  currentQuestions = questionBank[level];
  currentIndex = 0;
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  showQuestion();
  updateLeaderboardUI();
}

// عرض السؤال الحالي
function showQuestion(){
  document.getElementById("question").innerText = currentQuestions[currentIndex].q;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
}

// تحقق من الإجابة وانتقل تلقائيًا
function submitAnswer(){
  const userAnswer = document.getElementById("answer").value;
  const correctAnswer = currentQuestions[currentIndex].a;

  if(userAnswer.trim() === correctAnswer.trim()){
    correctSound.play();
    document.getElementById("feedback").innerText = "✅ إجابة صحيحة!";
  } else {
    wrongSound.play();
    document.getElementById("feedback").innerText = "❌ إجابة خاطئة. التصحيح: " + correctAnswer;
  }

  setTimeout(()=>{
    currentIndex++;
    if(currentIndex >= currentQuestions.length){
      levelupSound.play();
      alert("🎉 لقد أنهيت المستوى!");
      currentIndex = 0;
    }
    showQuestion();
  }, 1500);
}

// تحديث لوحة الشرف
function updateLeaderboardUI(){
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.slice(0,5).forEach(item=>{
    const li = document.createElement("li");
    li.innerText = item.name + " - " + item.score;
    list.appendChild(li);
  });
}
