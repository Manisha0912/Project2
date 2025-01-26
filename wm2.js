// DOM element references
let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let flex = document.getElementsByClassName('flex')[0];
let squares = document.querySelectorAll('.square');
let gameMusic = new Audio('./gameMusic.mp3');
let hitMusic = new Audio('./hitMusic.mp3');
let highScoreH2 = document.getElementById('highScore');


// Game state variables
let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

let gameActive = false;


// Initializing High Score from localStorage
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreH2.innerHTML = `High Score: ${highScore}`; // Displaying the high score


// randomly place mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');

        square.classList.remove('whacked');

    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}
// Countdown timer function to handle time limit
function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        flex.style.display = 'none';


       // Checking if the current score is higher than the high score
       if (score > highScore) {
        highScore = score; // Update high score
        localStorage.setItem('highScore', highScore); // Storing new high score in localStorage
        highScoreH2.innerHTML = `High Score: ${highScore}`; // Updating the high score display
    }



        // Hide  pause button
        pauseGameButton.style.display = 'none';
        scoreH2.innerHTML = `Congratulations! Your Final Score: ${score}`;
        scoreH2.style.color = '#000'; 
        scoreH2.style.backgroundColor = '##D2FF72'; 
        scoreH2.style.padding = '20px'; 
        scoreH2.style.borderRadius = '20px'; 
        scoreH2.style.textAlign = 'center'; 
        scoreH2.style.display = 'inline-block'; 
        scoreH2.style.marginLeft = '18%';
        scoreH2.style.fontSize = '3.5rem';
      
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) { // Small screens
            scoreH2.style.fontSize = '2rem';
            scoreH2.style.marginLeft = '5%';
            scoreH2.style.padding = '10px';
        } else  if (screenWidth <= 768) {// Medium screens
            scoreH2.style.fontSize = '3rem';
            scoreH2.style.marginLeft = '10%';
            scoreH2.style.padding = '15px';
        } 
        else { // Large screens
            scoreH2.style.fontSize = '4rem';
            scoreH2.style.marginLeft = '18%';
            scoreH2.style.padding = '22px';
        }

        cursor.style.display = 'none'; // Hide hammer cursor
        gameActive = false;// Set game to inactive
        
    }
}
randomMole();


// Start a new game by resetting all game variables and starting the timers
function startGame(){
    score = 0;
    timeLeft = 60;

    gameActive = true;
    scoreH2.style.color = ''; 
    scoreH2.style.backgroundColor = '';
    scoreH2.style.padding = '15px';
    scoreH2.style.borderRadius = '';
    scoreH2.style.textAlign = '';
    scoreH2.style.display = '';
    scoreH2.style.marginLeft = '';
    scoreH2.style.fontSize = '';
    scoreH2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    flex.style.display = 'flex';
    pauseGameButton.style.display = 'inline-block'
    pauseGameButton.innerHTML = 'Pause';
    cursor.style.display = 'block'; 
    gameMusic.play();

    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
}

// Pause or resume the game
function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;

        gameActive = false;


        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);

        gameActive = true;
        cursor.style.display = 'block'; 

        pauseGameButton.textContent = 'Pause';
    }
}

// Hiding hammer when pausing the game
pauseGameButton.addEventListener('click', () => {
    cursor.style.display = gameActive ? 'block' : 'none';
});

// Event listener for squares to handle mole hit detection
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(gameActive &&  square.id === hitPosition){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                scoreH2.innerHTML = `Your Score ${score}`;
                hitPosition = null;



                square.classList.remove('mole');
                square.classList.add('whacked');
                setTimeout(() => square.classList.remove('whacked'), 500);



            }
        }
    })
})


// Event listeners for start and pause/resume buttons
startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);

// Event listeners for cursor movement and interaction
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
    if (gameActive) {
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';
    }
});
window.addEventListener('mousedown', () => {
    if (gameActive) cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    if (gameActive) cursor.classList.remove('active');
});