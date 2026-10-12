/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

/* 
0   1   2
3   4   5
6   7   8
*/

/*---------------------------- Variables (state) ----------------------------*/

let board
let turn
let winner
let tie
let comIndex 
let boardUpdated

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
function init(){
    board = ['', '','','','','','','','']
    turn = 'X'
    winner = false
    tie = false
    messageEl.textContent = ''
    comIndex = null

    render()
}

function render(){
    updateBoard()
    updateMessage()
}

function handleClick (event){
    const squareIndex = event.target.id
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    if (boardUpdated){
        computerTurn()
    }
}

function computerTurn(){
    computerChoise()
    placePiece(comIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function updateBoard(){
    for(let i=0; i< board.length; i++){
        if(board[i] === 'X'){
            squareEls[i].textContent = 'X'
            squareEls[i].style.color = 'blue'
        }
        else if(board[i] === 'O'){
            squareEls[i].textContent = 'O'
            squareEls[i].style.color = 'red'
        }
        else{
            squareEls[i].textContent = ''
        }
    }
}

function updateMessage(){
    if(!winner && !tie){
        return
    }
    else if(winner && !tie){
        messageEl.textContent = `The winner is: ${turn}`
    }
    else{
        messageEl.textContent =  `Tie!`
    }
}

function placePiece(index){
    if(!winner && !tie){
        if(board[index] === ''){
            board.splice(index,1,turn)
            boardUpdated = true
        }
        else{
            boardUpdated = false
        }
    }
}


function computerChoise(){
    let choise = Math.floor(Math.random()*9)
    if(!winner && !tie){
        if(board[choise] === ''){
            comIndex = choise
        }
        else{
            computerChoise()
        }
    }
}

function checkForWinner(){
    for(combo of winningCombos){
        if(board[combo[0]] !== ''){
            if(board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]){
                winner = true
            }
        }
    }
}

function checkForTie(){
    if(winner){
        return
    }
    if(board.includes('')){
        return
    }
    else{
        tie = true
    }
}

function switchPlayerTurn(){
    if(!winner && !tie){
        if(turn === 'X'){
            turn = 'O'
        }
        else{
            turn = 'X'
        }
    }
}

/*----------------------------- Event Listeners -----------------------------*/
init()

for (square of squareEls){
    square.addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)
