// Import the useState hook from React
// useState allows us to add state variables to function components
import { useState } from 'react';

/**
 * Square Component
 * 
 * This is the smallest unit of our game - a single clickable square.
 * It's a "presentational" or "dumb" component because it doesn't manage
 * its own state - it receives everything it needs via props.
 * 
 * @param {string|null} value - The content to display ('X', 'O', or null)
 * @param {function} onSquareClick - Callback function to execute when clicked
 */
function Square({ value, onSquareClick }) {
  return (
    // Render a button element with the 'square' CSS class
    // onClick prop connects the button's click event to the onSquareClick function
    // The {value} inside displays either 'X', 'O', or nothing (if null)
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 * Board Component
 * 
 * This component manages the 3x3 grid of squares and handles the game logic
 * for a single state of the board. It doesn't manage history - that's done
 * by the parent Game component.
 * 
 * @param {boolean} xIsNext - Determines which player's turn it is (true = X, false = O)
 * @param {Array} squares - Array of 9 elements representing the board state
 * @param {function} onPlay - Callback to notify parent component when a move is made
 */
function Board({ xIsNext, squares, onPlay }) {
  /**
   * handleClick function
   * 
   * This function is called whenever a square is clicked.
   * It contains the core game logic for making a move.
   * 
   * @param {number} i - The index (0-8) of the square that was clicked
   */
  function handleClick(i) {
    // GUARD CLAUSE 1: Check if there's already a winner
    // calculateWinner returns 'X', 'O', or null
    // If there's a winner, we don't allow any more moves
    
    // GUARD CLAUSE 2: Check if the clicked square is already filled
    // squares[i] will be 'X', 'O', or null
    // If it's already filled, we don't allow overwriting
    if (calculateWinner(squares) || squares[i]) {
      return; // Exit early - do nothing
    }
    
    // Create a copy of the squares array using slice()
    // We NEVER mutate state directly in React - we always create a new copy
    // This is called "immutability" and it helps React detect changes efficiently
    const nextSquares = squares.slice();
    
    // Determine which symbol to place based on whose turn it is
    // If xIsNext is true, place an 'X', otherwise place an 'O'
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    // Call the onPlay callback function passed from the parent (Game component)
    // This passes the new board state up to the parent so it can:
    // 1. Update the history array
    // 2. Update the current move number
    // This is an example of "lifting state up" - the Board doesn't manage
    // its own state, it reports changes to its parent
    onPlay(nextSquares);
  }

  // Calculate if there's a winner based on the current board state
  // This will be 'X', 'O', or null (no winner yet)
  const winner = calculateWinner(squares);
  
  // Declare a variable to hold the status message
  let status;
  
  // Determine what status message to display
  if (winner) {
    // If there's a winner, announce who won
    status = 'Winner: ' + winner;
  } else {
    // If no winner yet, show whose turn it is
    // Use a ternary operator: condition ? valueIfTrue : valueIfFalse
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the board UI
  return (
    // React Fragment (<></>) allows us to return multiple elements without
    // adding an extra DOM node (like a <div>)
    <>
      {/* Display the status message (winner or next player) */}
      <div className="status">{status}</div>
      
      {/* First row of the tic-tac-toe board (squares 0, 1, 2) */}
      <div className="board-row">
        {/* Each Square receives:
            1. value: the current value at that position ('X', 'O', or null)
            2. onSquareClick: an arrow function that calls handleClick with the square's index
            
            We use arrow functions (() => handleClick(0)) instead of just handleClick(0)
            because we need to pass the index. If we wrote handleClick(0) directly,
            it would be called immediately during render, not on click. */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      
      {/* Second row of the board (squares 3, 4, 5) */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      
      {/* Third row of the board (squares 6, 7, 8) */}
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * Game Component (DEFAULT EXPORT)
 * 
 * This is the top-level component that manages the entire game state.
 * It's responsible for:
 * 1. Maintaining the history of all board states
 * 2. Tracking which move we're currently viewing
 * 3. Allowing "time travel" to previous moves
 * 
 * This component demonstrates "lifting state up" - it holds the state
 * that multiple components need to share (the Board and the move list).
 */
export default function Game() {
  /**
   * STATE 1: history
   * 
   * This is an array of board states. Each element is an array of 9 squares.
   * We initialize it with one empty board: [Array(9).fill(null)]
   * 
   * Example after a few moves:
   * [
   *   [null, null, null, null, null, null, null, null, null],  // Initial state
   *   ['X', null, null, null, null, null, null, null, null],   // After move 1
   *   ['X', 'O', null, null, null, null, null, null, null],    // After move 2
   *   ...
   * ]
   * 
   * Array(9) creates an array with 9 empty slots
   * .fill(null) fills all slots with null
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  /**
   * STATE 2: currentMove
   * 
   * This tracks which move in the history we're currently viewing.
   * 0 means we're at the start (no moves made)
   * 1 means we're viewing the state after the first move
   * And so on...
   * 
   * This enables the "time travel" feature - we can jump back to any move
   */
  const [currentMove, setCurrentMove] = useState(0);
  
  /**
   * DERIVED STATE: xIsNext
   * 
   * This is NOT stored in state - it's calculated from currentMove
   * Even moves (0, 2, 4, ...) mean it's X's turn
   * Odd moves (1, 3, 5, ...) mean it's O's turn
   * 
   * We use modulo operator (%) which returns the remainder after division
   * - 0 % 2 = 0 (even, so true - X's turn)
   * - 1 % 2 = 1 (odd, so false - O's turn)
   * - 2 % 2 = 0 (even, so true - X's turn)
   */
  const xIsNext = currentMove % 2 === 0;
  
  /**
   * DERIVED STATE: currentSquares
   * 
   * This gets the board state for the move we're currently viewing
   * If currentMove is 0, we get history[0] (the initial empty board)
   * If currentMove is 3, we get history[3] (the board after 3 moves)
   */
  const currentSquares = history[currentMove];

  /**
   * handlePlay function
   * 
   * This function is called when a player makes a move (clicks a square).
   * It updates the history and advances to the next move.
   * 
   * @param {Array} nextSquares - The new board state after the move
   */
  function handlePlay(nextSquares) {
    // Create a new history array
    // 
    // If we're viewing an old move and make a new move, we need to:
    // 1. Keep all history up to the current move
    // 2. Discard any "future" moves after the current move
    // 3. Add the new move
    // 
    // Example: If history has 5 moves and we jump back to move 2 and make a move:
    // - history.slice(0, currentMove + 1) keeps moves 0, 1, 2
    // - We append the new board state
    // - The old moves 3 and 4 are discarded (alternate timeline!)
    // 
    // The spread operator (...) creates a new array by copying elements
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    // Update the history state with our new history array
    setHistory(nextHistory);
    
    // Set currentMove to the index of the move we just added
    // nextHistory.length - 1 gives us the index of the last element
    // (arrays are 0-indexed, so length - 1 is the last index)
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * jumpTo function
   * 
   * This function allows us to "time travel" to any previous move.
   * When called, it updates currentMove to the specified move number,
   * which causes the board to re-render showing that historical state.
   * 
   * @param {number} nextMove - The move number to jump to (0 = start)
   */
  function jumpTo(nextMove) {
    // Simply update the currentMove state
    // This will cause:
    // 1. currentSquares to update (showing the board at that move)
    // 2. xIsNext to update (showing whose turn it would be)
    // 3. The Board component to re-render with the historical state
    setCurrentMove(nextMove);
  }

  /**
   * Generate the list of move buttons
   * 
   * We use .map() to transform the history array into an array of <li> elements
   * Each element in the history represents one board state
   * 
   * @param {Array} squares - The board state at this move (not used, but provided by .map())
   * @param {number} move - The index/move number in the history array
   */
  const moves = history.map((squares, move) => {
    // Declare a variable for the button text
    let description;
    
    // Determine what text to show on the button
    if (move > 0) {
      // For moves 1 and later, show "Go to move #1", "Go to move #2", etc.
      description = 'Go to move #' + move;
    } else {
      // For move 0 (the initial state), show "Go to game start"
      description = 'Go to game start';
    }
    
    // Return a list item (<li>) containing a button
    return (
      // The 'key' prop is required by React when rendering lists
      // It helps React identify which items have changed, been added, or removed
      // Using the move number as the key is safe here because moves are never
      // reordered, inserted in the middle, or deleted from the middle
      <li key={move}>
        {/* When clicked, this button calls jumpTo with the move number
            We use an arrow function to avoid calling jumpTo immediately during render */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the complete game UI
  return (
    // Main container for the game
    <div className="game">
      {/* Left side: The game board */}
      <div className="game-board">
        {/* Render the Board component with:
            - xIsNext: whose turn it is
            - currentSquares: the current board state to display
            - onPlay: callback function for when a move is made */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      
      {/* Right side: The list of moves (game history) */}
      <div className="game-info">
        {/* Ordered list containing all the move buttons
            The {moves} variable contains an array of <li> elements */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * calculateWinner function
 * 
 * This is a pure helper function (not a React component).
 * It checks if there's a winner based on the current board state.
 * 
 * A winner exists when three of the same symbol ('X' or 'O') are in a line:
 * - Horizontally (rows)
 * - Vertically (columns)
 * - Diagonally
 * 
 * @param {Array} squares - Array of 9 elements representing the board
 * @returns {string|null} - Returns 'X', 'O', or null (no winner)
 */
function calculateWinner(squares) {
  /**
   * Define all possible winning combinations
   * 
   * The board is indexed like this:
   * 0 | 1 | 2
   * ---------
   * 3 | 4 | 5
   * ---------
   * 6 | 7 | 8
   * 
   * Each array represents one possible winning line:
   * [0, 1, 2] - Top row
   * [3, 4, 5] - Middle row
   * [6, 7, 8] - Bottom row
   * [0, 3, 6] - Left column
   * [1, 4, 7] - Middle column
   * [2, 5, 8] - Right column
   * [0, 4, 8] - Diagonal from top-left to bottom-right
   * [2, 4, 6] - Diagonal from top-right to bottom-left
   */
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
  ];
  
  // Loop through each possible winning combination
  for (let i = 0; i < lines.length; i++) {
    // Destructure the three indices for this winning combination
    // For example, if lines[i] is [0, 1, 2], then a=0, b=1, c=2
    const [a, b, c] = lines[i];
    
    // Check if this line has three matching symbols
    // We need to verify:
    // 1. squares[a] exists (is not null/undefined) - someone has played there
    // 2. squares[a] === squares[b] - first two squares match
    // 3. squares[a] === squares[c] - first and third squares match
    // 
    // If all three conditions are true, all three squares have the same value
    // and we have a winner!
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the winning symbol ('X' or 'O')
      return squares[a];
    }
  }
  
  // If we've checked all winning combinations and found no winner,
  // return null (game is still in progress or it's a draw)
  return null;
}