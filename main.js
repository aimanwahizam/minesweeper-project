/* -------------------------------------------------------------------------- */
/*                                HTML Elements                               */
/* -------------------------------------------------------------------------- */

const body = document.querySelector("body");
const game = document.querySelector(".game");
let gameBox = []; // ARRAY OF BOXES TO BE STORED
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");

const randomArray = [];

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

// Clicking on boxes
const onClickGameBox = (event) => {
  const gameBoxCopy = [...gameBox];
  const classNames = event.target.className.split(" ");

  // Check to see how many classes the boxes have
  // Number
  if (classNames.length === 3) {
    onNumberClick(classNames, event.target);
  }
  // Bomb
  else if (classNames.length === 2) {
    event.target.className += " click";
    event.target.innerHTML +=
      " <img src='./images/bomb-icon.png' alt='Bomb' class='game__box__icon'>";
    // END GAME CONDITION LOSE
    alert("BOOOM");
  }
  // Blank
  else if (classNames.length === 1) {
    // TRYING TO GET SPREAD OF BLANKS TILL HIT NUMBERS WORKING

    const uniqueSurroundingIDArray = onBlankClick(event.target, gameBoxCopy);

    let counter = 0;

    while (counter < uniqueSurroundingIDArray.length) {
      // Click on all of surrounding boxes
      // If number, click and show and DONT ADD surrounding numbers to array
      // if blank, click and show and DO ADD surrounding numbers to array
      // keep doing this till all surrounding tiles has been clicked i.e. counter > unique.length

      uniqueSurroundingIDArray.forEach((id) => {
        if (!gameBoxCopy[id - 1].className.includes("click")) {
          const surroundingBoxClassNames =
            gameBoxCopy[id - 1].className.split(" ");
          if (surroundingBoxClassNames.length === 3) {
            onNumberClick(surroundingBoxClassNames, gameBoxCopy[id - 1]);
          } else {
            let blankBox = gameBoxCopy[id - 1];

            onBlankClick(blankBox, gameBoxCopy);
          }
        }
        counter++;
      });
    }
  }
};

const onBlankClick = (box, gameBoxArray) => {
  let surroundingArr = [];

  box.className += " click click--blank";

  const relativePosition = findRelativePositionByID(parseInt(box.id));

  relativePosition.forEach((position) => {
    const surroundingGameBox = gameBoxArray[position - 1];
    const classNamesAroundBlanks = surroundingGameBox.className.split(" ");

    // Check to see what surrounding boxes are by number of classes
    // Blank
    if (classNamesAroundBlanks.length === 1) {
      surroundingGameBox.className += " click click--blank";

      if (surroundingGameBox.className === "game__box click click--blank") {
        const relativePositionAroundReveal = findRelativePositionByID(
          parseInt(surroundingGameBox.id)
        );
        surroundingArr.push(relativePositionAroundReveal);
      }
    } 
    // Number
    else if (classNamesAroundBlanks.length === 3) {
      onNumberClick(classNamesAroundBlanks, surroundingGameBox);
    }
  });

  // Array of all surrounding box IDs
  const surroundingArrFlat = surroundingArr.flat();
  // Make sure numbers are unique
  const uniqueSurroundingArrFlat = [...new Set(surroundingArrFlat)];
  return uniqueSurroundingArrFlat;
};

const onNumberClick = (classNameArray, box) => {
  let value = 0;

  switch (true) {
    case classNameArray[2] === "one":
      value = 1;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "two":
      value = 2;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "three":
      value = 3;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "four":
      value = 4;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "five":
      value = 5;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "six":
      value = 6;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "seven":
      value = 7;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    case classNameArray[2] === "eight":
      value = 8;
      box.className = `game__box number--${classNameArray[2]} click`;
      box.innerHTML += `${value}`;
      break;
    default:
      break;
  }
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

  // foreach gamebox if id matches random number ADD class of bomb
  const bombArray = [];

  randomArray.forEach((randomNumber) => {
    const bomb = document.getElementById(randomNumber);
    bomb.className += " game__box__bomb";
    bombArray.push(bomb);
  });

  return randomArray;
};

const findRelativePositionByID = (id) => {
  let relativePosition = [];

  switch (true) {
    //Corners
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

  notBombsArray.forEach((notBomb) => {
    const relativePositionArray = findRelativePositionByID(
      parseInt(notBomb.id)
    );

    const relativeBombArray = [];

    randomArr.forEach((randomNumber) => {
      relativePositionArray.forEach((relativePosition) => {
        randomNumber === relativePosition
          ? relativeBombArray.push(randomNumber)
          : null;
      });
    });

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
      // default:
    }
  });
};

// Game
const onGameStart = () => {
  // Creating 16x16 grid
  for (let index = 1; index < 16 ** 2 + 1; index++) {
    game.innerHTML += `<div class="game__box" id="${index}"></div>`;
  }
  addGameBoxEventListeners(document.querySelectorAll(".game__box"));

  // Storing memory
  document.querySelectorAll(".game__box").forEach((box) => {
    gameBox.push(box);
  });

  assignBombs();
  assignNumbersAndSpaces(gameBox, randomArray);
};

const onResetPush = () => {
  gameBox = [];
  onGameStart();
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

startButton.addEventListener("click", onGameStart);
resetButton.addEventListener("click", onResetPush);
