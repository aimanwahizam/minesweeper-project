/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body");
const game = document.querySelector(".game");
const gameBox = []; // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");

const randomNumberArray = [];

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const onClickGameBox = (event) => {
  event.target.className += " game__box--click";
  console.log(event.target);
};

const addGameBoxEventListeners = (array) => {
  array.forEach((box) => {
    box.addEventListener("click", onClickGameBox);
  });
};

const generateRandomNumbersArray = (numberOfBombs, numberOfRows, array) => {
  // generate an array of numberOfBombs random numbers from 1 - numberofRows ** 2
  // make sure no two same random numbers
  while (array.length < numberOfBombs) {
    const randomNumber = Math.floor(Math.random() * numberOfRows ** 2);

    // Check if unique
    array.indexOf(randomNumber) === -1 ? array.push(randomNumber) : null;
  }
};

const assignBombs = (gameBoxArray) => {
  const gameBoxCopy = [...gameBoxArray];
  const randomArray = [];
  generateRandomNumbersArray(32, 16, randomArray);
  console.log(`randomArray: ${randomArray}`);

  // foreach gamebox if id matches random number ADD class of bomb
  // call randomnumberarray function
  const bombArray = [];

  randomArray.forEach((randomNumber) => {
    const bomb = (document.getElementById(randomNumber).className += " bomb");
    bombArray.push(bomb);
  });
};

const onGameStart = () => {
  for (let index = 1; index < 16 ** 2 + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
  addGameBoxEventListeners(document.querySelectorAll(".game__box"));

  document.querySelectorAll(".game__box").forEach((box) => {
    gameBox.push(box);
  });

  console.log(gameBox);

  assignBombs(gameBox);
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);
// startButton.addEventListener(
//   "click",
//   generateRandomNumbersArray(32, 16, randomNumberArray)
// );
// startButton.addEventListener("click", assignBombs(randomNumberArray, gameBox));