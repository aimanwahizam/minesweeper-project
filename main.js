/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body")
const game = document.querySelector(".game");
const gameBox = [] // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");

const randomNumberArray = [];

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const addGameBoxEventListeners = (array) => {
  array.forEach((box) => {
    box.addEventListener("click", onClickGameBox);
  });
}

const onGameStart = () => {
  for (let index = 1; index < (16 ** 2) + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
  addGameBoxEventListeners(document.querySelectorAll(".game__box"));

  document.querySelectorAll(".game__box").forEach(box => {
    gameBox.push(box);
  })
  console.log(gameBox)
}

const generateRandomNumbersArray = (numberOfBombs, numberOfRows, array) => {
  // generate an array of numberOfBombs random numbers from 1 - numberofRows**2
  // make sure no two same random numbers  
  while (array.length < numberOfBombs) {
    const randomNumber = Math.floor(Math.random() * (numberOfRows ** 2))

    // Check if unique
    array.indexOf(randomNumber) === -1 ? array.push(randomNumber) : null;
  }
  console.log(array);
  return array;
}

// const assignBombs = () => {
  // foreach gamebox if id matches random number ADD class of bomb
  // call randomnumberarray function

// }

const onClickGameBox = (event) => {
  event.target.setAttribute("class", "game__box--click");
  console.log(event.target);
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);
startButton.addEventListener("click", generateRandomNumbersArray(32, 16, randomNumberArray))


