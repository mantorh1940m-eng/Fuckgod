
let count = 0;
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const rankElement = document.getElementById('rank');
const clickSound = document.getElementById('click-sound');
const levelSound = document.getElementById('level-sound');

// تحميل النقاط عند فتح الموقع
window.onload = function() {
    const savedPoints = localStorage.getItem('myPoints');
    if(savedPoints) {
        count = parseInt(savedPoints);
        scoreElement.innerText = count;
        updateUI();
    }
};

function addPoint(name) {
    count++;
    
    // تشغيل صوت الضغطة
    clickSound.currentTime = 0;
    clickSound.play();

    updateUI();
    
    // كود المكتبة الخارجية: انفجار عند كل 10 نقاط
    if (count % 10 === 0) {
        levelSound.play(); // صوت احتفال بسيط
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d4d', '#ffcc00', '#2de000']
        });
    }
}

function updateUI() {
    scoreElement.innerText = count;
    localStorage.setItem('myPoints', count);
    
    // تحديث شريط التقدم (كل 50 نقطة يكتمل)
    let progress = (count % 50) * 2; 
    progressBar.style.width = progress + "%";

    // تحديث الرتبة
    if(count >= 50) rankElement.innerText = "الرتبة: ذاكر مداوم ✨";
    if(count >= 200) rankElement.innerText = "الرتبة: ذاكر مخلص 🌟";
    if(count >= 500) rankElement.innerText = "الرتبة: وليّ صالح 👑";

    // أنيميشن للرقم
    scoreElement.parentElement.classList.remove('pop-up');
    void scoreElement.offsetWidth; 
    scoreElement.parentElement.classList.add('pop-up');
}

function resetPoints() {
    if(confirm("هل تريد تصفير جميع النقاط؟")) {
        count = 0;
        updateUI();
    }
}
