# minesweeper-project
Game project for _nology Week 3/4 - JS, HTML and CSS

This is a minesweeper game created in JS, HTML and CSS. In its current state, the game generates a 16x16 grid with a randomly generated distribution of bombs laid on top. With this the appropriate value was given to surrounding game cells which corresponds to the number of bombs surrounding it.

Here, the game is to click on all non-bomb tile with the win condition triggered if all that's left are unclicked bombs. If a player does manage to press on a bomb, then it will be instant game over.

Below are pseudocode to aid in the development stage of the project. Future implementations and further notes are also found on notion: https://www.notion.so/Minesweeper-Project-439aea256f484c8898f05e87bf4b221f


## Dev notes
(*FOR LATER*)

Should be a grid
  Make grid 16x16 for now 
    *CAN ADD OTHER DIFFICULTIES I.E. SMALLER AND BIGGER GRIDS*

Grid should have a value of:
  1. 0 - be empty
  2. "bomb" have a bomb
  3. or a number 1-8

User should be able to put a flag on a grid 

If user presses a grid slot with a bomb - game will end
If user presses a grid slot with no bomb - either show blank or empty
  *IF THERES A CONNECTED SERIES OF BLANKS OR NUMBERS AUTOMATICALLY SHOW*

On start button click, randomly generates x amount of bombs to be in grid 
  Then generate where numbers will go 
    blanks will fill the rest - so by default its blank
    
*ADD TIMER AND COUNTER*

16x16 game - 32 bombs

