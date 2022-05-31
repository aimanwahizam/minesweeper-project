/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body");
const game = document.querySelector(".game");
const gameBox = []; // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");

const randomArray = [];

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// Clicking on boxes
const onClickGameBox = (event) => {
  const classNames = event.target.className.split(" ");
  let number = 0;

  if (classNames.length === 3) {
    switch (true) {
      case classNames[2] === "one":
        number = 1;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "two":
        number = 2;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "three":
        number = 3;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "four":
        number = 4;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "five":
        number = 5;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "six":
        number = 6;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "seven":
        number = 7;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      case classNames[2] === "eight":
        number = 8;
        event.target.className = `game__box number--${classNames[2]} click`
        event.target.innerHTML += `${number}`;
        break;
      default:
        break;
    }
    
  }
  // event.target.className += " click";
  // console.log(event.target);
};

const addGameBoxEventListeners = (array) => {
  array.forEach((box) => {
    box.addEventListener("click", onClickGameBox);
  });
};

// Generate content of boxes
const generateRandomNumbersArray = (numberOfBombs, numberOfRows, array) => {
  // generate an array of numberOfBombs random numbers from 1 - numberofRows ** 2
  // make sure no two same random numbers
  while (array.length < numberOfBombs) {
    const randomNumber = Math.floor(Math.random() * numberOfRows ** 2);

    // Check if unique
    array.indexOf(randomNumber) === -1 ? array.push(randomNumber) : null;
  }
};

const assignBombs = () => {
  generateRandomNumbersArray(32, 16, randomArray);
  // console.log(`randomArray: ${randomArray}`);

  // foreach gamebox if id matches random number ADD class of bomb
  const bombArray = [];

  randomArray.forEach((randomNumber) => {
    const bomb = document.getElementById(randomNumber);
    bomb.className += " game__box__bomb";
    bomb.innerHTML +=
      " <img src='./images/bomb-icon.png' alt='Bomb' class='game__box__icon'>";

    bombArray.push(bomb);
  });
  // console.log(bombArray);
  return randomArray;
};

const findRelativePositionByID = (id) => {
  let relativePosition = [];

  switch (true) {
    case id === 1:
      relativePosition = [id + 1, id + 16, id + 17];
      break;
    case id === 16:
      relativePosition = [id - 1, id + 15, id + 16];
      break;
    case id === 241:
      relativePosition = [id - 16, id - 15, id + 1];
      break;
    case id === 256:
      relativePosition = [id - 17, id - 16, id - 1];
      break;

    // Top Row
    case id > 1 && id < 16:
      relativePosition = [id - 1, id + 1, id + 15, id + 16, id + 17];
      break;

    // Left Column
    case id % 16 === 1 && id != 1 && id != 241:
      relativePosition = [id - 16, id - 15, id + 1, id + 16, id + 17];
      break;

    // Right Column
    case id % 16 === 0 && id != 16 && id != 256:
      relativePosition = [id - 17, id - 16, id - 1, id + 15, id + 16];
      break;

    // Bottom Row
    case id > 241 && id < 256:
      relativePosition = [id - 17, id - 16, id - 15, id - 1, id + 1];
      break;

    // Rest of boxes
    default:
      relativePosition = [
        id - 17,
        id - 16,
        id - 15,
        id - 1,
        id + 1,
        id + 15,
        id + 16,
        id + 17,
      ];
      break;
  }

  return relativePosition;
};

const assignNumbersAndSpaces = (array, randomArr) => {
  const notBombsArray = array.filter(
    (box) => box.className != "game__box game__box__bomb"
  );
  console.log(notBombsArray);

  notBombsArray.forEach((notBomb) => {
    // console.log(notBomb.id);
    const relativePositionArray = findRelativePositionByID(
      parseInt(notBomb.id)
    );
    // console.log(relativePositionArray);
    // console.log(randomArr);

    const relativeBombArray = [];

    randomArr.forEach((randomNumber) => {
      relativePositionArray.forEach((relativePosition) => {
        randomNumber === relativePosition
          ? relativeBombArray.push(randomNumber)
          : null;
      });
    });
    // console.log(relativeBombArray);

    const counter = relativeBombArray.length;

    switch (true) {
      case counter === 1:
        notBomb.className += " number one";
        break;
      case counter === 2:
        notBomb.className += " number two";
        break;
      case counter === 3:
        notBomb.className += " number three";
        break;
      case counter === 4:
        notBomb.className += " number four";
        break;
      case counter === 5:
        notBomb.className += " number five";
        break;
      case counter === 6:
        notBomb.className += " number six";
        break;
      case counter === 7:
        notBomb.className += " number seven";
        break;
      case counter === 8:
        notBomb.className += " number eight";
        break;
    }
  });
};

// Game
const onGameStart = () => {
  // Creating 16x16 grid
  for (let index = 1; index < 16 ** 2 + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
  console.log(document.querySelectorAll(".game__box"));
  addGameBoxEventListeners(document.querySelectorAll(".game__box"));

  // Storing memory
  document.querySelectorAll(".game__box").forEach((box) => {
    gameBox.push(box);
  });

  assignBombs();
  assignNumbersAndSpaces(gameBox, randomArray);
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);
