/*

GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a die as many times as he whishes. Each result is added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his TOTAL score. After that, 
- it's the next player's turn
- The first player to reach 50 points on TOTAL score wins the game

*/


var scores, roundScore, activePlayer, newGame;

initGame();

function initGame() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	newGame = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
};


function changePlayer() {
	document.querySelector('#current-' + activePlayer).textContent = '0';
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	roundScore = 0;
};


document.querySelector('.btn-roll').addEventListener('click', function() {
	if(newGame === 0){
		// generate a random dice roll
		var roll = Math.floor(Math.random() * 6) + 1;

		// display result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + roll + '.png';

		// update game status based on dice roll
		if(roll !== 1) {
			// track current score
			roundScore += roll;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			changePlayer();
		}
	}
});


// Track game status - tally round points and check for winner
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(newGame === 0) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// check if player won the game
		if(scores[activePlayer] >= 50){
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.dice').style.display = 'none';
			newGame = 1;
		} else {
			changePlayer();
		}
	}
});


// Start a new game
document.querySelector('.btn-new').addEventListener('click', function() { 
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
	if(activePlayer === 0){
		document.querySelector('#name-' + activePlayer).textContent = 'Player 1';
	} else {
		document.querySelector('#name-' + activePlayer).textContent = 'Player 2';
	}
	initGame();
});