let count = 0;
let messiGoals = 0;
let isHorrorMode = false;

// العناصر من الصفحة
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const goalDisplay = document.getElementById('messi-goals');
const clickSound = document.getElementById('click-sound');
const goalSound = document.getElementById('goal-sound');
const horrorBG = document.getElementById('horror-bg');
const scaryClick = document.getElementById('scary-click');

// تحميل البيانات عند فتح الموقع
window.onload = function() {
    const saved = localStorage.getItem('myPoints');
    if(saved) {
        count = parseInt(saved);
        updateUI();
    }
};

function addPoint(name) {
    count++;
    
    // تشغيل الصوت حسب الوضع (مرعب أو عادي)
    if (isHorrorMode) {
        scaryClick.currentTime = 0;
        scaryClick.play();
    } else {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    // ميزة ميسي: كل 10 نقاط يسجل هدفاً
    if (count % 10 === 0) {
        scoreAGoal();
    }

    updateUI();
}

function scoreAGoal() {
    messiGoals++;
    goalDisplay.innerText = messiGoals;
    
    // تشغيل صوت الهدف (جوووول)
    goalSound.currentTime = 0;
    goalSound.play();

    // إظهار ميسي واهتزاز الشاشة
    const messi = document.getElementById('messi-container');
    messi.classList.add('show');
    document.body.classList.add('goal-shake');

    // إطلاق احتفالات الألوان
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#61dafb', '#ffffff', '#4facfe']
    });

    // إخفاء ميسي بعد 4 ثواني
    setTimeout(() => {
        messi.classList.remove('show');
        document.body.classList.remove('goal-shake');
    }, 4000);
}

function updateUI() {
    scoreElement.innerText = count;
    localStorage.setItem('myPoints', count);
    
    // تحديث شريط التقدم ليكون متوافق مع هدف ميسي (كل 10)
    let progress = (count % 10) * 10;
    progressBar.style.width = progress + "%";
}

function toggleHorrorMode() {
    isHorrorMode = !isHorrorMode;
    document.body.classList.toggle('horror-theme');
    const btn = document.getElementById('horror-mode-btn');

    if (isHorrorMode) {
        horrorBG.play();
        btn.innerText = "إيقاف الرعب 🕯️";
    } else {
        horrorBG.pause();
        btn.innerText = "الوضع الغريب 💀";
    }
}

function resetPoints() {
    if(confirm("هل تريد تصفير النقاط؟ ميسي سيحزن!")) {
        count = 0;
        messiGoals = 0;
        goalDisplay.innerText = "0";
        updateUI();
    }
}

