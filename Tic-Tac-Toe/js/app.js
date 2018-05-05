// Select elements
const infoBox = document.querySelector('.info-box');
const submitBtn = document.querySelector('.submit-btn');
const markerSelection = document.querySelectorAll('.select-marker');
const selectX = document.getElementById('select-x');
const selectO = document.getElementById('select-o');
const errorMsg = document.getElementById('msg');
const player = document.getElementById('current-player');

// Set toggled variables
let userMarker;
let opponentMarker;
let goesFirst;
let currentPlayer;


// Set up page defaults
setTimeout(showInfo, 1000);

/**************** Set up functions ****************/
function selectMarker() {
	// Set marker to selection
	if (selectX.checked) {
		userMarker = 'X';
		opponentMarker = 'O';
		hideInfo();
		setTimeout(firstTurn, 500);
	} else if (selectO.checked) {
		userMarker = 'O';
		opponentMarker = 'X';
		hideInfo();
		setTimeout(firstTurn, 500);
	} else {
		throwError('Please select a marker');
	}
}

function firstTurn() {
	let randomize = Math.random();
	randomize >= 0.5 ? goesFirst = true : goesFirst = false;
	if (goesFirst = true) {
		currentPlayer = userMarker;
		infoBox.innerHTML = `<h2>${userMarker} goes first.</h2>`;
		showInfo();
		setTimeout(hideInfo, 2000);
		player.textContent = `Current player: ${currentPlayer}`;
	} else {
		currentPlayer = opponentMarker;
		infoBox.innerHTML = `<h2>${opponentMarker} goes first.</h2>`;
		showInfo();
		setTimeout(hideInfo, 2000);
		player.textContent = `Current player: ${currentPlayer}`;
	}
}

function throwError(error) {
	infoBox.classList.add('danger');
	msg.textContent = error;
	markerSelection.forEach(marker => {
		marker.addEventListener('focus', () => {
			infoBox.classList.remove('danger');
			msg.textContent = '';
		});
	});
};

function showInfo() {
	infoBox.classList.add('show');
	setTimeout( () => infoBox.classList.add('slide'), 0);
}

function hideInfo() {
	infoBox.classList.remove('slide');
	setTimeout(() => infoBox.classList.remove('show'), 500);
}

// Hook up event listeners
submitBtn.addEventListener('click', selectMarker);



