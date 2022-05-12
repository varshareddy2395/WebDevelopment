const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
var p1Name = 'Player 1';
var p2Name = 'Player 2';
const scoreboard = {
    player1: 0,
    player2: 0,
    draw: 0
  };
let gameCount = 0

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function addListeners(){
  p1namedisplay.addEventListener('click', function(){
      
    document.getElementById('p1namedisplay').style.display = 'none';
    document.getElementById('p1name').style.display = 'inline';
});

p1name.addEventListener('change', function(){ //used to change the name of player1 on click
if(document.getElementById('p1name').value){
  document.getElementById('p1namedisplay').innerHTML = document.getElementById('p1name').value;
  p1Name = document.getElementById('p1name').value;    
}
document.getElementById('p1namedisplay').style.display = 'inline';    
document.getElementById('p1name').style.display = 'none';

});

p2namedisplay.addEventListener('click', function(){  //this function is for adding the name of player1 on click
    
document.getElementById('p2namedisplay').style.display = 'none';
document.getElementById('p2name').style.display = 'inline';
});

p2name.addEventListener('change', function(){  //used to change the name of player1 on click

if(document.getElementById('p2name').value){
  document.getElementById('p2namedisplay').innerHTML = document.getElementById('p2name').value;
  p2Name = document.getElementById('p2name').value;    
}
document.getElementById('p2namedisplay').style.display = 'inline';    
document.getElementById('p2name').style.display = 'none';

});
}


const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)


function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

if(endGame){
    gameCount = gameCount+1;
    refreshGameCountDisplay();
}

function setScoreContent(){ //to display score of player1 and player2
    score.innerHTML = `
    <p><span id="p1namedisplay">${p1Name}</span><input type="text" id="p1name" style="display:none;">: ${scoreboard.player1}</p>
    <p><span id="p2namedisplay">${p2Name}</span><input type="text" id="p2name" style="display:none;">: ${scoreboard.player2}</p>     
    <p>Draw: ${scoreboard.draw}</p>
    `;
    addListeners();
  }
  
  function refreshGameCountDisplay(){  //to display number of game count
    document.getElementById('noofgames').innerHTML = ` <p id="noofgames" style="background-color: black; color: white; text-align: center; margin: auto; width: 200px;">Number of games played:  ${gameCount} </p>` 
    
  }