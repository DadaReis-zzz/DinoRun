const dino = document.getElementById("dino");
const obstaculo = document.getElementById("obstaculo");
let isJumping = false;
let speed = 10;
const acceleration = 10;
const interval = 30;
const gameAreaWidth = document.getElementById("gameArea").offsetWidth;

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
    if (event.code === "Space") { 
        jump();
    }
});

 function moveObstaculo(){
    let obstaculoPos = obstaculo.offsetLeft;
    obstaculo.style.left = obstaculoPos - speed + "px";
    if (obstaculoPos <= -20) {
        obstaculo.style.left = gameAreaWidth + "px";
        checkCollision();
    }
 }

 function checkCollision() {
 const dinoRect = dino.getBoundingClientRect();
 const obstaculoRect = obstaculo.getBoundingClientRect();

    if(
        dinoRect.right > obstaculoRect.left &&
        dinoRect.left  < obstaculoRect.right&&
        dinoRect.bottom > obstaculoRect.top &&
        dinoRect.top < obstaculoRect.bottom
    ){
        alert("parabens!, voce perdeu para um cacto...tente novamente e brilhe!")
        clearInterval(gameInterval);
        clearInterval(speedInterval);
         }
    }

    function increaseSpeed(){
        speed += acceleration;
    }

    const speedInterval = setInterval(increaseSpeed,30000);
    const gameInterval = setInterval (moveObstaculo, interval);