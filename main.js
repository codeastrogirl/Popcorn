let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

// --- Rocket and Animation State Variables ---
const rocketX = canvas.width / 2 - 30;
let rocketY = 350;
const rocketWidth = 60;
const rocketHeight = 150;

let isLaunching = false;
let isFinished = false;

let countdownNumber = 3;
let countdownText = "3";

// --- The Drawing Function ---
function drawScene() {
    // Sky and Grass
    context.fillStyle = '#14C2F1';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#10C83E';
    context.fillRect(0, 500, canvas.width, 100);

    // Clouds
    context.fillStyle = '#FFFFFF';
    context.beginPath();
    context.arc(100, 150, 20, 0, Math.PI * 2);
    context.arc(130, 150, 25, 0, Math.PI * 2);
    context.arc(160, 150, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    context.beginPath();
    context.arc(300, 70, 20, 0, Math.PI * 2);
    context.arc(330, 70, 25, 0, Math.PI * 2);
    context.arc(360, 70, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Sun
    context.fillStyle = '#F7F76E';
    context.beginPath();
    context.arc(50, 70, 35, 0, Math.PI * 2);
    context.fill();

    // Rocket Body
    context.fillStyle = '#FFFFFF';
    context.fillRect(rocketX, rocketY, rocketWidth, rocketHeight);

    // Nose Cone
    context.fillStyle = '#d90429';
    context.beginPath();
    context.moveTo(rocketX, rocketY);
    context.lineTo(rocketX + rocketWidth, rocketY);
    context.lineTo(rocketX + rocketWidth / 2, rocketY - 70);
    context.closePath();
    context.fill();

    // Fins
    context.beginPath();
    context.moveTo(rocketX + rocketWidth, rocketY + rocketHeight);
    context.lineTo(rocketX + rocketWidth + 30, rocketY + rocketHeight);
    context.lineTo(rocketX + rocketWidth, rocketY + 100);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(rocketX, rocketY + rocketHeight);
    context.lineTo(rocketX - 30, rocketY + rocketHeight);
    context.lineTo(rocketX, rocketY + 100);
    context.closePath();
    context.fill();

    // Fire
    if (isLaunching) {
        let fireY = rocketY + rocketHeight;
        let fireX = rocketX + rocketWidth / 2;
        context.fillStyle = '#d90429';
        context.beginPath();
        context.arc(fireX, fireY, 20 + Math.random() * 10, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = '#F06A27';
        context.beginPath();
        context.arc(fireX, fireY, 10 + Math.random() * 8, 0, Math.PI * 2);
        context.fill();
    }

    // Countdown Circle
    context.fillStyle = '#F06A27';
    context.beginPath();
    context.arc(80, 550, 42, 0, Math.PI * 2);
    context.fill();

    // Countdown Text
    context.fillStyle = 'white';
    context.font = 'bold 50px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(countdownText, 80, 550);

    // Final Text
    if (isFinished) {
        context.fillStyle = 'white';
        context.font = 'bold 70px Arial';
        context.textAlign = 'center';
        context.fillText("To the stars!", canvas.width / 2, canvas.height / 2);
    }
}

// --- Update Logic ---
function update() {
    if (isLaunching) {
        rocketY -= 2;
        if (rocketY + rocketHeight < 0) {
            isLaunching = false;
            isFinished = true;
        }
    }
}

// --- Main Loop ---
function loop() {
    update();
    drawScene();
    requestAnimationFrame(loop);
}

// --- Countdown Logic ---
function advanceCountdown() {
    countdownNumber -= 1;
    if (countdownNumber > 0) {
        countdownText = countdownNumber.toString();
    } else {
        countdownText = "GO!";
        isLaunching = true;
        clearInterval(countdownInterval);
    }
}

// --- Start Everything ---
const countdownInterval = setInterval(advanceCountdown, 1000);
loop();
