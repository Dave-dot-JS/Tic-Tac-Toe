// Select elements
const infoBox = document.querySelector('.info-box');
const submitBtn = document.querySelector('.submit-btn');
const markerSelection = document.querySelectorAll('.select-marker');
const selectX = document.getElementById('select-x');
const selectO = document.getElementById('select-o');
const errorMsg = document.getElementById('msg');
const player = document.getElementById('current-player');
const gameSpaces = [...document.querySelectorAll('.box')];

// Set toggled variables
let userMarker;
let opponentMarker;
let goesFirst;
let currentPlayer;
let victory;

// Move tracker
let userMoves = [];
let opponentMoves = [];

// Victory conditions
let victoryConditions = [
['top-r','top-m','top-l'],// Rows
['mid-r','mid-m','mid-l'],
['bot-r','bot-m','bot-l'],
['top-l','mid-l','bot-l'],// Columns
['top-m','mid-m','bot-m'],
['top-r','mid-r','bot-r'],
['top-l','mid-m','bot-r'],// Diagonals
['top-r','mid-m','bot-l']
];

// Set up page defaults
setTimeout(showInfo, 1000);
player.style.opacity = 0;

/**************** GAME SET UP FUNCTIONS ****************/

// First player selects their marker
function selectMarker() {
	if (selectX.checked) {
		userMarker = 'X';
		opponentMarker = 'O';
		hideInfo();
		setTimeout(firstTurn, 500);
	} else {
		userMarker = 'O';
		opponentMarker = 'X';
		hideInfo();
		setTimeout(firstTurn, 500);
	}
	setTimeout(() => player.style.opacity = 1, 2500);
}

// Randomize who goes first and start the game
function firstTurn() {
	let first = Math.random() >= 0.5;
	first ? goesFirst = true : goesFirst = false;
	if (goesFirst) {
		currentPlayer = userMarker;
		infoBox.innerHTML = `<h2>${userMarker} goes first.</h2>`;
		showInfo();
		setTimeout(hideInfo, 2000);
		setCurrentPlayer(currentPlayer);
	} else {
		currentPlayer = opponentMarker;
		infoBox.innerHTML = `<h2>${opponentMarker} goes first.</h2>`;
		showInfo();
		setTimeout(hideInfo, 2000);
		setCurrentPlayer(currentPlayer);
	}
	startGame();
}


/**************** ACTUAL GAMEPLAY FUNCTIONS ****************/

function startGame() {
	gameSpaces.forEach(space => {
		space.addEventListener('click', chooseSpace);
	});
}

function chooseSpace() {
	this.innerHTML = `<span class='hide'>${currentPlayer}</span>`;
	setTimeout(() => this.firstChild.classList.remove('hide'));
	this.removeEventListener('click', chooseSpace);
	if (currentPlayer === userMarker) {
		userMoves.push(this.id);
	} else {
		opponentMoves.push(this.id);
	}
	checkVictory();
}

function checkVictory() {
	// First check if someone has won
	if (currentPlayer === userMarker) {
		for (let i = 0; i < victoryConditions.length; i++) {
			if (userMoves.includes(victoryConditions[i][0]) 
				&& userMoves.includes(victoryConditions[i][1]) 
				&& userMoves.includes(victoryConditions[i][2])) 
			{
				victory = true;
				declareVictory(currentPlayer);
			}
		}
	} else {
		for (let i = 0; i < victoryConditions.length; i++) {
			if (opponentMoves.includes(victoryConditions[i][0]) 
				&& opponentMoves.includes(victoryConditions[i][1]) 
				&& opponentMoves.includes(victoryConditions[i][2])) 
			{
				victory = true;
				declareVictory(currentPlayer);
			}
		}
	}

	// If no victory is triggered, check if game is a draw
	if (!victory) {
		checkDraw();
	}

	// Change players
	changeCurrentPlayer();
}

function checkDraw() {
	// Create an array showing content of every square on the board
	let boardState = gameSpaces.map(space => {
		return space.textContent;
	});
	// If no blank squares are left, declare a draw
	if (!boardState.includes('')) {
		declareDraw();
	}
}

function declareVictory(curr) {
	player.style.opacity = 0;
	infoBox.innerHTML = `
	<h1>${curr} WINS!</h1>
	<div class="submit-btn" id="replay">
		<input type="submit" value="Play Again" />
	</div>
	`
	showInfo();
	gameSpaces.forEach(space => {
		space.removeEventListener('click', chooseSpace);
	});
	setTimeout(() => document.getElementById('replay').addEventListener('click', restartGame), 10);
}

function declareDraw() {
	infoBox.innerHTML = `
	<h1>THE GAME IS A DRAW</h1>
	<div class="submit-btn" id="replay">
		<input type="submit" value="Play Again" />
	</div>
	`
	showInfo();
	gameSpaces.forEach(space => {
		space.removeEventListener('click', chooseSpace);
	});
	setTimeout(() => document.getElementById('replay').addEventListener('click', restartGame), 10);
}


/**************** UTILITY/REUSABLE FUNCTIONS ****************/

function showInfo() {
	infoBox.classList.add('show');
	setTimeout( () => infoBox.classList.add('slide'), 0);
}

function hideInfo() {
	infoBox.classList.remove('slide');
	setTimeout(() => infoBox.classList.remove('show'), 500);
}

function setCurrentPlayer(curr) {
	player.textContent = `Current Player: ${curr}`;
}

function changeCurrentPlayer() {
	currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
	setCurrentPlayer(currentPlayer);
}

function restartGame() {
	console.log('Reloading');
	location.reload();
}


/****************GLOBAL EVENT LISTENERS ****************/
submitBtn.addEventListener('click', selectMarker);



