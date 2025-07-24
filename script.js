const dino = document.getElementById("dino");
const obstaculo = document.getElementById("obstaculo");
let isJumping = false;
let speed = 10;
const acceleration = 10;
const interval = 30;
const gameAreaWidth = document.getElementById("gameArea").offsetWidth;

let dinoLeft = 100; 

function jump() {
    if (isJumping) return; 
    isJumping = true;
    dino.style.animation = "jump 0.5s ease-out";

    setTimeout(() => {
        dino.style.animation = "";
        isJumping = false;
    }, 500);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.key === " ") { 
        jump();
    }
});

function moveObstaculo() {
    let obstaculoPos = obstaculo.offsetLeft;
    obstaculo.style.left = obstaculoPos - speed + "px";

    checkCollision();

    if (obstaculoPos <= -20) {
        obstaculo.style.left = gameAreaWidth + "px";
    }
}

function moveDino() {
    dinoLeft += 2; 
    if (dinoLeft > gameAreaWidth - 60) {
        dinoLeft = 0;
    }
    dino.style.left = dinoLeft + "px";
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    if (
        dinoRect.right > obstaculoRect.left &&
        dinoRect.left < obstaculoRect.right &&
        dinoRect.bottom > obstaculoRect.top &&
        dinoRect.top < obstaculoRect.bottom
    ) {
        alert("parabéns!, você perdeu para um cacto... tente novamente e brilhe!");
        clearInterval(gameInterval);
        clearInterval(speedInterval);
        clearInterval(dinoInterval); 
    }
}

function increaseSpeed() {
    speed += acceleration;
}

const speedInterval = setInterval(increaseSpeed, 30000);
const gameInterval = setInterval(moveObstaculo, interval);
const dinoInterval = setInterval(moveDino, 30); 
