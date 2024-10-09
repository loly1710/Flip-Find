/*-------------- Constants -------------*/
const images = [
    '../assets/1.jpg',
    '../assets/2.jpg',
    '../assets/3.jpg',
    '../assets/4.jpg',
    '../assets/5.jpg',
    '../assets/6.jpg',
    '../assets/7.jpg',
    '../assets/8.jpg',
    '../assets/9.jpg',
    '../assets/10.jpg',
    '../assets/11.jpg',
    '../assets/12.jpg'
    
]

/*const images2 = [
    '../assets/11.jpg',
    '../assets/12.jpg',
    '../assets/13.jpg',
    '../assets/14.jpg',
    '../assets/15.jpg',
    '../assets/16.jpg',
    '../assets/17.jpg',
    '../assets/18.jpg',
    '../assets/19.jpg',
    '../assets/20.jpg'
    

]*/

/*const numberOfPairs = images.length / 2;
maxScore = numberOfPairs * pointsPerMatch;
const pointsPerMatch = 10;*/
/*---------- Variables (state) ---------*/
let cards = [];
//let cards2 = [];
let levels = 2;
let columns = 2;
let rows = 2;
let matched = 0;
let firstCard, secondCard;
let timer = 0;
let score = 0;
let maxScore = null;
let isPreventClick = true;
let gameOver;

/*----- Cached Element References  -----*/
const gridContainer = document.querySelector(".grid-container");
const landing = document.querySelector("section");
const startGameCont = document.querySelector(".startGame");
const startGameCards = document.querySelectorAll(".startGame .card");
const startGame = document.querySelector(".startGame button");
const playGround = document.querySelector(".playGround");
const faRepeat = document.querySelector(".fa-repeat");

const scoreElement = document.getElementById('score');
const timerText = document.getElementById("countdown");
const timerBlock = document.getElementById("timer");

/*-------------- Functions -------------*/
function game() {
  window.location.href = "game.html";
}

function createCards() {
  const cardArray = [
    '../Flip-Find/assets/1.jpg',
    '../Flip-Find/assets/2.jpg',
    '../Flip-Find/assets/3.jpg',
    '../Flip-Find/assets/4.jpg',
    '../Flip-Find/assets/5.jpg',
    '../Flip-Find/assets/6.jpg',
    '../Flip-Find/assets/7.jpg',
    '../Flip-Find/assets/8.jpg',
    '../Flip-Find/assets/9.jpg',
    '../Flip-Find/assets/10.jpg',
    '../Flip-Find/assets/11.jpg',
    '../Flip-Find/assets/12.jpg'
    
  ];

  
  /*function createCards2() {
    const cardArray = [
      '../Flip-Find/assets/11.jpg',
      '../Flip-Find/assets/12.jpg',
      '../Flip-Find/assets/13.jpg',
      '../Flip-Find/assets/14.jpg',
      '../Flip-Find/assets/15.jpg',
      '../Flip-Find/assets/16.jpg',
      '../Flip-Find/assets/17.jpg',
      '../Flip-Find/assets/18.jpg',
      '../Flip-Find/assets/19.jpg',
      '../Flip-Find/assets/20.jpg'
      
    ];*/


console.log(cardArray);
  //shuffleArray(cardArray);
  
  shuffleCards([...cardArray.slice(0, levels), ...cardArray.slice(0, levels)]);
  
}

const shuffleArray = (array)=> {
    for (let i = array.length - 1 ; i > 0 ; i-- ){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = array[temp];
        
    }
}
//shuffleCards(cardArray);

function shuffleCards(cards) {
  playGround.innerHTML = "";

  //shuffleArray(cards);

  for (let i = 0; i < cards.length; i++) {
    console.log(cards[i]);
    playGround.innerHTML += `
        <div class = "card" onclick = "flipCard(this)">
        <div class="front"><img src="../Flip-Find/assets/logo-transparent.png" /></div>
        <div class="back"><img src=${cards[i]} /></div>
        </div>`;
  }

  faRepeat.style.display = "block";
}

function flipCard(card) {
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
  scoreElement.textContent = `${score}/${maxScore}`;}

  /*function increaseScore() {
    score += pointsPerMatch;  // Add points per match
    scoreElement.textContent = `${score}/${maxScore}`;  // Update the score display
}*/



function matchCards(firstCardValue, secondCardValue) {
  if (firstCardValue === secondCardValue) {
      
    matched++;
    increaseScore(); 
    if (matched === levels){
        setTimeout(() => {
            alert("YOU WIN");
          }, 500);
        
    }
        firstCard.classList.add("match");
      secondCard.classList.add("match");
    
      firstCard.removeAttribute("onclick");
     secondCard.removeAttribute("onclick");

     (firstCard = ""), (secondCard = "");
     isPreventClick = true;
    return;

    
  }

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
//document.getElementById('play').addEventListener('click', game);

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

startGame.addEventListener("click", (e) => {
  if (levels === 2) {
    maxScore = 12;
  } else if (levels === 1){
    maxScore = 8;
  }

  
  startGameCont.style.display = "none";
  playGround.style.display = "grid";

  playGround.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
  playGround.style.gridTemplateRows = `repeat(${rows}, 100px)`;

  createCards();
  setTimer();
  timerBlock.style.display = "block";
  countdown.textContent = "";
  landing.innerHTML="";
});

function setTimer() {
  let timeLeft = 20;
  
  timer = setInterval(() => {
      if (timeLeft === 0){
          alert("Game Over!");
          clearInterval(timer);
          countdown.textContent = "Time's up!"
          timesUp = true;
      }
      else {
          countdown.textContent = timeLeft;
          timeLeft--;
      }
  }, 1000)
}

faRepeat.addEventListener("click", () => {
  startGameCont.style.display = "grid";
  playGround.style.display = "none";
  faRepeat.style.display = "none";
  clearInterval(timer);
  timerBlock.style.display = "none";
  countdown.textContent = "";
  timesUp = false;
  (matched = 0), (cardOne = ""), (cardTwo = ""), (isPreventClick = true);
  
});



document.getElementById('increaseScore').addEventListener('click', () => increaseScore(10));