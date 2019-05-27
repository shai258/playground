# Memory Game - Part 1

Classes  
1. Board

Create a Memory board using the Board class

### Testing

Create tests using Jest to cover the classes functionalities. Write the tests first and then implement classes systematically (methodically).

## Board

### Attributes

1. `board` - Array - represents the board.

2. `score` - Number - represents the score of the current game.

3. `guesses` - Number - represents the number of guesses

4. `cardsArr` - Array - holds an array of the card ids.

5. `prevCard` - Number - represents the previous card flipped (if any)


### Methods

1. `constructor(size, cardsArr)` - create a new Board Object of size `size` 

2. `fillBoard()` - fills the board with the cards array

3. `calculateScore` - calculates the score after each move.

4. *`_isGameOver` - returns true if the time has ended.

5. *`_isGameWin` - returns true if no cards are left on the board.

6. `_isMatch(card)` - returns true if both cards are the same and marks the cards as matched in the cardsArr
   
7. `flipCard(card)` - flips the cards and checks one of the three internal function options


#### Getters
1. `board` - returns the board  

2. `score` - returns the score of the current game

3. `size` - returns the length of the board

#### Setters - N/A


### Events

`onMatch` - occurs when a pair of cards have been matched.

`onWin` - occurs when all the cards have been matched.

`onGameOver` - occurs when the time has run out.

# Memory Game - Part 2

Write the `index.js` file:
- `newGame()` - invoked when new game button is clicked:
  * fetch cards from server into cards array
  * reset timer, scoreboard, guesses
  * invoke `board.fillBoard()`
  
- `renderBoard(board)` - render the board as a css grid and hook `Board`.
  * set handles for each card on the board.
    * handler flips card 
    * `onMatch()` - sets matched cards to zero and changes display of matched cards to none.
    * `onGameOver` - opens GameOver Modal and resets, timer.
    * `onGameWin` - opens modal and displays current score. if its a new highscore (`calculateScore`), asks for player name to store to local storage
  
- create localStorage to hold high scores `{name: highscore}`.
- *resume game feature
- *save Game

# Memory Game - Part 3

UI / UX:

- Display Hero
- 'top-bar' contains game start controls
- 'left-sidebar' contains current game info
- 'right-sidebar' contains high-scores table
- 'main-section(center)' - empty space filled board after 'gameStart' button is clicked.

- modals for highscore, gamneWin and gameOver.