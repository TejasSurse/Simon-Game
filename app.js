/*  
understanding the logic of the game
    game is that initially we have to press any key to start game 
    if game starts then we are on level one and button flashes random 
    we have to create two arrays   gameseq[] to track game sequecnce and user sequence to track userseq[]
    btn presss chek userseq <-> gameseq if same level up */

let btns = ["c1", "c2", "c3", "c4"];
let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let h2 = document.querySelector("h2");

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;// adding value in level 
    let randomINDX = Math.floor(Math.random() * 3);// index 0 to 3 any randome value generate 
    let randColor = btns[randomINDX]; // storing color in random color
    let randBTN = document.querySelector(`.${randColor}`);
    // console.log(randomINDX);

    //console.log(randBTN);
    gameseq.push(randColor);// to push in game sequence 
    console.log(gameseq);
    btnFlash(randBTN);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
document.addEventListener("keypress", function () {
    let a = event.code;
    //console.log(a);
    if (started == false && a == "Space") {
        started = true;
        levelup();
    }
});

function userFlash(btn) {
    btn.classList.add("uflash"); // for change color of the button while user pressing 
    setTimeout(function () {
        btn.classList.remove("uflash");
    }, 500);
}
function btnPress() {
    console.log(this);
    let btn = this;    // this is for wich button is pressed 
    userFlash(this);
    let usercolor = btn.getAttribute("id"); // gettring values by id attribute ;
    // console.log(usercolor);
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}
let allBTNS = document.querySelectorAll(".div");
for (btn of allBTNS) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    console.log("Current level :", level);
    //let idx = level-1;
    if (gameseq[idx] === userseq[idx]) {
        if (gameseq.length == userseq.length) {
            setTimeout(levelup(), 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over ! Your Score Was <b>${level} </b> <br> Press any Key to Start `;
        let a = document.querySelector("body");
        a.style.backgroundColor = "red";
        setTimeout( function (){
            a.style.backgroundColor = "white";
        }, 250);
        resetGame();
    }

}
function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


