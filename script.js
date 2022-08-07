const ex = "X"  //change these two lines to change player symbols on board and in title
const oh = "O"

const boxes = document.getElementsByClassName("marker");
const boxArray = [...boxes];
const titleDisplay = document.getElementById('turn-sentence');
const start = document.getElementById('play-again');
const player = document.getElementById('turn');
const win = document.getElementById('win-display');
const gameName = document.getElementById('start-banner');
const score = document.getElementById('status');
const tie = document.getElementById('tie');
let currentTurn = 1;
const winStatus = {
    xWins: 0,
    oWins: 0
}


//changes title display
const switchDisplay = (changeType) => {
    if (changeType == 'newGame') {
        tie.style.display = 'none';
        gameName.style.display = 'none';
        win.style.display = 'none';
        titleDisplay.style.display = 'block';
    } else if (changeType == 'win'){
        wins++;
        tie.style.display = 'none';
        titleDisplay.style.display = 'none';
        win.style.display = 'block';
        clear();
    } else {
        win.style.display = 'none';
        titleDisplay.style.display = 'none';
        tie.style.display = 'block';
    }
}

const highlight = (event) => {
    event.target.style.backgroundColor = "DarkSeaGreen";//change here to change highlight color
}
    
const stopHighlight = (event) => {
    event.target.style.backgroundColor = "white";
}


//calls random element
const randomSymbol = (myElement) => {
    (Math.floor(Math.random()*2) == 1) ? myElement.innerHTML = ex : myElement.innerHTML = oh;
} 

//calls player's symbol as long as it is someone's turn
const drawSymbol = (event) => {
    player.innerHTML == ex ? event.target.innerHTML = ex : event.target.innerHTML = oh;
    };


//changes current turn
const changeSymbol = (element) => {
    element.innerHTML == ex ? element.innerHTML = oh : element.innerHTML = ex;
};


//initializes board
const setBoard = () => {
    for (let i = 0; i < boxArray.length; i++){
        let newItem = boxArray[i];
        newItem.addEventListener("click", drawSymbol);
        newItem.addEventListener("click", changeTurn);
        newItem.addEventListener("mouseover", highlight);
        newItem.addEventListener("mouseleave", stopHighlight);
    }
}

const clear = () => {
    for (let i = 0; i < boxArray.length; i++){
        let newItem = boxArray[i];
        newItem.removeEventListener("click", drawSymbol);
        newItem.removeEventListener("click", changeTurn);
        newItem.removeEventListener("mouseover", highlight);
        newItem.removeEventListener("mouseleave", stopHighlight);
    }
}

const empty = () => {
    for (let i = 0; i < boxArray.length; i++){
        let newItem = boxArray[i];
        newItem.innerHTML = "";
        currentTurn = 1;
    }
}

//checks if all row elements are equal to player symbol, displays win if so
const checkRow = (element) => {
    let answer = false;
    let number = boxArray.indexOf(element);
    let newNumber = Math.floor(number/3)*3;
    if (boxArray[newNumber].innerHTML == player.innerHTML) {
        newNumber++;
        if (boxArray[newNumber].innerHTML == player.innerHTML) {
            newNumber++;
            if (boxArray[newNumber].innerHTML == player.innerHTML) {
                answer = true;
             }
        }
    }
    return answer;
}

//checks if all elements in column are equal to player symbol
const checkCols = (element) => {
    let answer = false;
    let number = boxArray.indexOf(element);
    let newNumber = number%3;
    if (boxArray[newNumber].innerHTML == player.innerHTML) {
        newNumber += 3;
        if (boxArray[newNumber].innerHTML == player.innerHTML) {
            newNumber += 3;
            if (boxArray[newNumber].innerHTML == player.innerHTML) {
                answer = true;
             }
        }
    }
    return answer;
}

//checks if either diagonal are all equal to player symbol
const checkDiag = (element) => {
    let answer = false;
    let number = boxArray.indexOf(element);
    if(number%4 == 0){
        if (boxArray[0].innerHTML == player.innerHTML && boxArray[8].innerHTML == player.innerHTML){
            answer = true;
        }
    } else {
        if (boxArray[2].innerHTML == player.innerHTML && boxArray[6].innerHTML){
            answer = true;
        }
    }
    return answer;
}


const winTasks = () => {
        if (player.innerHTML == ex) {
            winStatus.xWins = winStatus.xWins+1;
        } else {
            winStatus.oWins = winStatus.oWins+1;
        }
        switchDisplay('win');
        score.innerHTML = `${ex}: ${winStatus.xWins} ${oh}: ${winStatus.oWins}`;
}

//sets conditions when player clicks new game
const startGame = () => {
    if (titleDisplay.style.display == "block"){
        clear();
        empty();
    }
    if (win.style.display == "block" || tie.style.display == "block"){
        empty();
    }
    switchDisplay('newGame');
    randomSymbol(player);
    setBoard();
}

//what happens every turn when  player clicks
const changeTurn = (event) => {
    currentTurn +=1;
    let newWin = 0;
    if (boxArray.indexOf(event.target)%2 == 0){
        if (boxArray[4].innerHTML == player.innerHTML){
            if (checkDiag(event.target)){
                winTasks();
                newWin++;
            };        
        }
    }
    if (checkRow(event.target)){
        winTasks();
        newWin++;
    } else if (checkCols(event.target)) {
        winTasks();
        newWin++;
    } else {
    changeSymbol(player);
    }
    if (currentTurn == 10){
        if (newWin == 0){ 
        switchDisplay('tie');
        clear();
        }    
    }

    event.target.removeEventListener("click", drawSymbol);
    event.target.removeEventListener("click", changeTurn);
}

document.getElementById('play-again').addEventListener('click', startGame);