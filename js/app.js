/*---------- Variables (state) ---------*/
let cards = [];
let levels = 6;
let columns = 3;
let rows = 4;
let matched = 0;
let firstCard, secondCard;
let timer = 0;
let score = 0;
let isPreventClick = true;
let timesUp = false;
let gameOver;

/*----- Cached Element References  -----*/
// Get references to DOM elements for interaction and display
const gridContainer = document.querySelector(".grid-container");
const landing = document.getElementById("landing");
const header = document.querySelector(".header");
const startGameCont = document.querySelector(".startGame");
const startGameCards = document.querySelectorAll(".startGame .card");
const startGame = document.querySelector(".startGame button");
const playGround = document.querySelector(".playGround");
const faRepeat = document.querySelector(".fa-repeat");

const scoreElement = document.getElementById("score");
const timerText = document.getElementById("countdown");
const timerBlock = document.getElementById("timer");

/*-------------- Functions -------------*/
function createCards() {
  const cardArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  shuffleArray(cardArray); // Shuffle the card options
  // Create a deck of cards based on the level (duplicates of each card for matching)
  shuffleCards([...cardArray.slice(0, levels), ...cardArray.slice(0, levels)]);
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Function to shuffle and display the cards on the grid
function shuffleCards(cards) {
  playGround.innerHTML = "";
  shuffleArray(cards);
  for (let i = 0; i < cards.length; i++) {
    // Create and display each card in the playground
    playGround.innerHTML += `
        <div class="card" onclick='flipCard(this)'>
            <div class="front"><img class="card-img" src="assets/logo-transparent.png"></img></div>
            <div class="back"><img class="card-img" src="assets/${cards[i]}.jpg"></img></div>
        </div>
        `;
  }
  faRepeat.style.display = "block";
}

// Function to handle card flip action
function flipCard(card) {
  if (timesUp) {
    return; // Don't allow card flips if time is up
  }
  if (firstCard != card && isPreventClick) {
    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
      return;
    }
    secondCard = card;
    isPreventClick = false;

    let firstCardValue = firstCard.querySelector(".back").innerHTML,
      secondCardValue = secondCard.querySelector(".back").innerHTML;
    matchCards(firstCardValue, secondCardValue);
  }
}

function increaseScore() {
  score += 1;
  scoreElement.textContent = `${score}/${levels}`;
}

function matchCards(firstCardValue, secondCardValue) {
  if (firstCardValue === secondCardValue) {
    matched++;
    increaseScore();

    if (matched == levels) {
      setTimeout(() => {
        alert("YOU WIN");
      }, 500);
    }

    // Mark the matched cards and disable their click functionality
    firstCard.classList.add("match");
    secondCard.classList.add("match");

    firstCard.removeAttribute("onclick");
    secondCard.removeAttribute("onclick");

    // Reset card variables and allow clicks again
    (firstCard = ""), (secondCard = "");
    isPreventClick = true;
    return;
  }

  // If cards don't match, shake and flip them back after a delay
  setTimeout(() => {
    firstCard.classList.add("shake");
    secondCard.classList.add("shake");
  }, 500);

  setTimeout(() => {
    firstCard.classList.remove("shake", "flip");
    secondCard.classList.remove("shake", "flip");
    (firstCard = ""), (secondCard = "");
    isPreventClick = true;
  }, 1200);
}

/*----------- Event Listeners ----------*/
// Handle card level selection on start screen
startGameCards.forEach((element) => {
  element.addEventListener("click", (e) => {
    startGameCards.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
    levels = e.target.parentElement.getAttribute("level");
    columns = e.target.parentElement.getAttribute("column");
    rows = e.target.parentElement.getAttribute("row");
  });
});

// Start game button listener
startGame.addEventListener("click", (e) => {
  startGameCont.style.display = "none";
  playGround.style.display = "grid";
  header.style.display = "flex";
  playGround.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
  playGround.style.gridTemplateRows = `repeat(${rows}, 100px)`;

  createCards();
  setTimer();
  timerBlock.style.display = "block";
  countdown.textContent = "";
  landing.style.display = "none";
});

function setTimer() {
  let timeLeft = 60;

  timer = setInterval(() => {
    if (timeLeft === 0) {
      countdown.textContent = "Time's up!";
      clearInterval(timer);
      timesUp = true;
      alert("Game Over!");
    } else {
      countdown.textContent = formatTimer(timeLeft); // Update timer display
      timeLeft--;
    }
  }, 1000);
}

// Function to format time into minutes and seconds
function formatTimer(seconds) {
  let mins = Math.floor(seconds / 60);
  let remainSeconds = seconds % 60;

  let formattedMins = mins < 10 ? `0${mins}` : mins;
  let formattedSeconds =
    remainSeconds < 10 ? `0${remainSeconds}` : remainSeconds;

  return `${formattedMins}:${formattedSeconds}`;
}

// Event listener for resetting the game
faRepeat.addEventListener("click", () => {
  // Reset the game to the initial state
  startGameCont.style.display = "grid";
  landing.style.display = "block";
  playGround.style.display = "none";
  faRepeat.style.display = "none";
  header.style.display = "none";
  clearInterval(timer);
  timerBlock.style.display = "none";
  countdown.textContent = "";
  scoreElement.textContent = "0";
  score = 0;
  timesUp = false;
  (matched = 0), (cardOne = ""), (cardTwo = ""), (isPreventClick = true);
});
