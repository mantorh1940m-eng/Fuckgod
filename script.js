let count = 0;
let isHorrorMode = false;

const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const rankElement = document.getElementById('rank');
const clickSound = document.getElementById('click-sound');
const levelSound = document.getElementById('level-sound');
const horrorBG = document.getElementById('horror-bg');
const scaryClick = document.getElementById('scary-click');

window.onload = function() {
    const saved = localStorage.getItem('myPoints');
    if(saved) {
        count = parseInt(saved);
        updateUI();
    }
};

function addPoint(name) {
    count++;
    
    if (isHorrorMode) {
        scaryClick.currentTime = 0;
        scaryClick.play();
    } else {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    if (count % 10 === 0) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        if(!isHorrorMode) levelSound.play();
    }

    updateUI();
}

function updateUI() {
    scoreElement.innerText = count;
    localStorage.setItem('myPoints', count);
    
    let progress = (count % 50) * 2;
    progressBar.style.width = progress + "%";

    if(count >= 50) rankElement.innerText = "الرتبة: ذاكر مداوم ✨";
    if(count >= 200) rankElement.innerText = "الرتبة: ذاكر مخلص 🌟";

    scoreElement.parentElement.classList.remove('pop-up');
    void scoreElement.offsetWidth;
    scoreElement.parentElement.classList.add('pop-up');
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
        btn.innerText = "تفعيل الوضع الغريب 💀";
    }
}

function resetPoints() {
    if(confirm("تصفير النقاط؟")) {
        count = 0;
        updateUI();
    }
}

