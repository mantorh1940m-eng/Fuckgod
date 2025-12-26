let count = 0;
const scoreElement = document.getElementById('score');
const sound = document.getElementById('click-sound');

function addPoint(name) {
    // زيادة العداد
    count++;
    scoreElement.innerText = count;

    // تشغيل الصوت
    sound.currentTime = 0;
    sound.play();

    // إضافة أنيميشن لعداد النقاط
    scoreElement.parentElement.classList.remove('pop-up');
    void scoreElement.offsetWidth; // Trigger reflow
    scoreElement.parentElement.classList.add('pop-up');

    console.log("تم الضغط على: " + name);
}
