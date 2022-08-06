const ex = "X"  //change these two lines to change player symbols on board and in title
const oh = "O"


let boxes = document.getElementsByClassName("marker");
let boxArray = [...boxes];
let firstRow = document.getElementsByClassName("first");
let secondRow = document.getElementsByClassName("second");
let thirdRow = document.getElementsByClassName("third");
let titleDisplay = document.getElementById('turn-sentence');
let start = document.getElementById('play-again');
let player = document.getElementById('turn');
let win = document.getElementById('win-display');
let gameName = document.getElementById('start-banner');



//changes title display
const switchDisplay = (changeType) => {
    if (changeType == 'firstGame') {
        gameName.style.visibility = 'hidden';
        titleDisplay.style.visibility = 'visible';
    } else if (changeType == 'nextGame'){
        win.style.visibility = 'hidden';
        titleDisplay.style.visibility = 'visible';
    } else if (changeType == 'win'){
        titleDisplay.style.visibility = 'hidden';
        win.style.visibility = 'visible';
    } else {
        //window.alert('there is a problem');
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
const setBoard = (list) => {
    for (let i = 0; i < list.length; i++){
        let newItem = list[i];
        newItem.addEventListener("click", drawSymbol);
        newItem.addEventListener("click", changeTurn);
        newItem.addEventListener("mouseover", highlight);
        newItem.addEventListener("mouseleave", stopHighlight);
    }
}


//--------------------------------------------------------------------------------begin below here trying to fix. 
const checkRow = (number) => {
    if (number%3 === 0){
        //window.alert('Got to checkRow')
        if (boxArray[number+1].innerHTML == boxArray[number].innerHTML) {
            window.alert('Got to first')
            if (boxArray[number+2].innerHTML == boxArray[number].innerHTML){
                window.alert('Got to switchDisplay')
                switchDisplay('win');
            }
        }
    }
}

const checkForWin = (element) => {
    //window.alert('Got to checkforWin')
    let number = boxArray.indexOf(element);
    checkRow(number);
}



//also add instructions, etc. 








//need to add clear function
//sets starting game conditions
const startGame = () => {
    if (win.style.visibility == 'visible') {
        switchDisplay('nextGame');
    } else {
    switchDisplay('firstGame');
    randomSymbol(player);
    setBoard(boxes);
    }
}


//what happens every turn when  player clicks
const changeTurn = (event) => {
    event.target.removeEventListener("click", drawSymbol);
    checkForWin(event.target);
    changeSymbol(player);
}


document.getElementById('play-again').addEventListener('click', startGame);



