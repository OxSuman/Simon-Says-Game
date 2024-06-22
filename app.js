let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Sound files
let buttonSound = new Audio('sound.mp3');
let gameStartSound = new Audio('game.mp3');
let gameOverSound = new Audio('game over.mp3');

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        gameStartSound.play(); // start sound
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    buttonSound.play(); // Play sound
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    buttonSound.play(); // Play sound
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function check(idx){
   if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000)
        }
   } else{
    gameOverSound.play();
    h2.innerHTML=`Game Over! Your scor was <b>${level}<br></br> Press any key to start.`
    reset();
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="black";
    },400);
};
}

function btnPress() {
    if (started) {
        let btn = this;
        userFlash(btn);
        userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        check(userSeq.length - 1);
    };
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}