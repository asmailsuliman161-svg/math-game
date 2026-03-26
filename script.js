// بيانات المكتبة (روابط Google Drive)
const schoolLibrary = [
    { title: "رياضيات 4ب", grade: "ابتدائي", fileId: "1A2B...", cover: "math.jpg" },
    { title: "تفاضل 3ث", grade: "ثانوي", fileId: "4X5Y...", cover: "calc.jpg" }
];

// بنك أسئلة اللعبة
const questionBank = {
    easy: [
        { q: "مشتقة جا(س)", options: ["جتا(س)", "-جا(س)", "ظا(س)", "١"], correct: 0 },
        { q: "مشتقة ٥س", options: ["٥", "س", "٠", "٥س²"], correct: 0 }
    ],
    medium: [
        { q: "مشتقة جا(٢س)", options: ["جتا(٢س)", "٢جتا(٢س)", "-٢جا(٢س)", "٢"], correct: 1 }
    ]
};

let currentLevel = 'easy';
let currentIndex = 0;
let timer;

// وظائف التنقل
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
    if(screenId === 'library-screen') displayBooks();
}

// تسجيل الدخول
function saveUser() {
    const name = document.getElementById("username-input").value;
    if(name) {
        localStorage.setItem("userName", name);
        initApp();
    }
}

function initApp() {
    const name = localStorage.getItem("userName");
    if(name) {
        document.getElementById("welcome-msg").innerText = `مرحباً ${name}`;
        showScreen('home-screen');
        checkUnlocks();
    }
}

// منطق اللعبة
function startGame(level) {
    currentLevel = level;
    currentIndex = 0;
    showScreen('game-play');
    loadQuestion();
}

function loadQuestion() {
    const qData = questionBank[currentLevel][currentIndex];
    document.getElementById("question-text").innerText = qData.q;
    const container = document.getElementById("options-container");
    container.innerHTML = "";
    
    qData.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        container.appendChild(btn);
    });
    startTimer();
}

function checkAnswer(idx) {
    clearInterval(timer);
    const correct = questionBank[currentLevel][currentIndex].correct;
    const btns = document.querySelectorAll(".option-btn");
    
    if(idx === correct) {
        btns[idx].classList.add("correct-flash");
    } else {
        btns[idx].classList.add("wrong-flash");
        btns[correct].classList.add("correct-flash");
    }

    setTimeout(() => {
        currentIndex++;
        if(currentIndex < questionBank[currentLevel].length) loadQuestion();
        else finishGame();
    }, 1500);
}

function startTimer() {
    let time = 15;
    document.getElementById("progress-fill").style.width = "100%";
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById("seconds").innerText = time;
        document.getElementById("progress-fill").style.width = (time/15)*100 + "%";
        if(time <= 0) { clearInterval(timer); checkAnswer(-1); }
    }, 1000);
}

function finishGame() {
    alert("انتهى المستوى!");
    if(currentLevel === 'easy') {
        localStorage.setItem("unlockedMedium", "true");
    }
    showScreen('home-screen');
    checkUnlocks();
}

function checkUnlocks() {
    if(localStorage.getItem("unlockedMedium")) {
        document.getElementById("btn-medium").disabled = false;
        document.getElementById("btn-medium").innerText = "متوسط 🔓";
    }
}

// منطق المكتبة
function displayBooks(filter = 'all') {
    const grid = document.getElementById("books-grid");
    grid.innerHTML = "";
    schoolLibrary.forEach(book => {
        if(filter === 'all' || book.grade.includes(filter)) {
            grid.innerHTML += `
                <div class="book-card">
                    <img src="${book.cover}">
                    <h4>${book.title}</h4>
                    <button onclick="window.open('https://drive.google.com/uc?id=${book.fileId}')">تحميل</button>
                </div>`;
        }
    });
}

function openNav() { document.getElementById("mySidebar").style.width = "250px"; }
function closeNav() { document.getElementById("mySidebar").style.width = "0"; }
function filterByGrade(g) { closeNav(); displayBooks(g); }

// تشغيل عند البدء
initApp();
      
