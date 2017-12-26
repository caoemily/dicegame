/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var gameover = false;
var currentPlayer=0;
var current = 0;
var total0=0;
var total1=0;
document.getElementById("dices-0").style.display = "none";
document.getElementById("dices-1").style.display = "none";
var winningScore = 100;

function switchPlayer (){
    currentPlayer==0 ? currentPlayer=1:currentPlayer=0;      
    current = 0;
    document.getElementById("current-0").innerHTML =current;
    document.getElementById("current-1").innerHTML =current;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.getElementById("dices-0").style.display = "none";
    document.getElementById("dices-1").style.display = "none";
}

function switchPlayerSix() {
    var scoreid = "score-"+currentPlayer;
    if (currentPlayer==0){
        total0 = 0;
        document.getElementById(scoreid).innerHTML = total0;
    }
    else {
        total1 = 0;
        document.getElementById(scoreid).innerHTML = total1;
    }
    switchPlayer();
}

function rollDice(){
    if(gameover) return;
    var currentid = "current-"+currentPlayer;
    var number0 = Math.floor(Math.random()*6 + 1);
    var number1 = Math.floor(Math.random()*6 + 1);
    var dice0 = document.getElementById("dices-0");
    var dice1 = document.getElementById("dices-1");
    dice0.style.display = "block";
    dice1.style.display = "block";
    dice0.src = "dice-"+number0+".png";
    dice1.src = "dice-"+number1+".png";
    if (number0=== number1){
        switchPlayerSix();
    }

    else if (number0===1||number1===1){
        switchPlayer();
    }
    else{
        current+=(number0+number1);
        document.getElementById(currentid).innerHTML = current;    
    }   
}



function hold() {
    if(gameover) return;
    var scoreid = "score-"+currentPlayer;
    if (currentPlayer==0){
        total0 += current;
        document.getElementById(scoreid).innerHTML = total0;
        if (checkWin(total0)){
            setWin(currentPlayer);
            return;
        }
    }
    else {
        total1 += current;
        document.getElementById(scoreid).innerHTML = total1;
        if (checkWin(total1)){
            setWin(currentPlayer);
            return;
        }
    }
    switchPlayer();
}

function checkWin(score) {
    var input = document.querySelector(".winningScore").value;
    if (input){
        winningScore = input;
    }
    if (score>=winningScore){
        return true;
    }
    return false;
}

function setWin(player) {
    gameover=true;
    document.getElementById("name-"+player).innerHTML = "WINNER";
    document.getElementById("current-"+player).innerHTML = 0; 
    document.querySelector(".dice").style.display = "none";
    document.querySelector('.player-'+player+'-panel').
    classList.add('winner');
    document.querySelector(".player-"+player+"-panel").classList.remove("active");
}

