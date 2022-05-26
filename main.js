/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body")
const game = document.querySelector(".game");
const gameBox = [] // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const gameBoxMemory = (array) => {
  array.forEach((box) => {
    box.addEventListener("click", onClickGameBox);
  });
}

const onGameStart = () => {
  for (let index = 1; index < (16 ** 2) + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
  gameBoxMemory(document.querySelectorAll(".game__box"));

  document.querySelectorAll(".game__box").forEach(box => {
    gameBox.push(box);
  })
}

const onClickGameBox = (event) => {
  event.target.setAttribute("class", "game__box--click");
  console.log(event.target);
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);


