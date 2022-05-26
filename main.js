/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body")
const game = document.querySelector(".game");
const gameBox = document.querySelectorAll(".game__box") // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const onGameStart = () => {
  for (let index = 1; index < (16 ** 2) + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
};

// const updateGameBox = () => {
//   gameBox = document.querySelectorAll(".game__box"); 
//   console.log(gameBox);
// }

const onClickGameBox = (event) => {
  event.target.setAttribute("class", "game__box--click");
  console.log(event.target);
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);

gameBox.forEach((box) => {
  box.addEventListener("click", onClickGameBox);
});

// body.addEventListener("change", updateGameBox)

