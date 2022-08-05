const ex = "X"  //change these two lines to change player symbols on board and in title
const oh = "O"


let boxes = document.getElementsByClassName("marker");
let titleDisplay = document.getElementById('turn-sentence');
let start = document.getElementById('play-again');
let player = document.getElementById('turn');



//initial states at game start
const makeAppear = (element) => {
    element.style.visibility = 'visible';
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


// need to write win conditions

//also add instructions, etc. 









//sets starting game conditions
const startGame = () => {
    makeAppear(titleDisplay);
    randomSymbol(player);
    setBoard(boxes);
}


//what happens every turn
const changeTurn = (event) => {
    changeSymbol(player);
    event.target.removeEventListener("click", drawSymbol);
    checkForWin(event);
}


document.getElementById('play-again').addEventListener('click', startGame);



