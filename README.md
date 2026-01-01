# React Tic-Tac-Toe Tutorial

A classic tic-tac-toe game built following the official React tutorial. This project demonstrates fundamental React concepts and serves as a practical introduction to building interactive user interfaces.

## About This Project

This implementation follows the [React Official Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) and showcases core React concepts through a simple, interactive game.

## Features

- **Interactive Gameplay**: Play tic-tac-toe with alternating turns between X and O
- **Winner Detection**: Automatically detects and displays the winner
- **Game History**: Keeps track of all moves made during the game
- **Time Travel**: Jump back to any previous move to review or replay from that point
- **Move List**: Displays a list of all moves with the ability to jump to any specific move

## Concepts Learned

Through building this project, I practiced and learned:

- **React Components**: Creating and composing reusable UI components
- **Props**: Passing data between components
- **State Management**: Using `useState` hook to manage component state
- **Event Handling**: Responding to user interactions like clicks
- **Lifting State Up**: Managing shared state in parent components
- **Immutability**: Creating copies of state rather than mutating directly
- **Conditional Rendering**: Displaying different UI based on game state
- **Lists and Keys**: Rendering lists of components with proper key attributes

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm or yarn package manager

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## How to Play

1. Players take turns clicking on empty squares
2. X always goes first
3. The first player to get three marks in a row (horizontally, vertically, or diagonally) wins
4. Use the move history on the right to jump back to any previous state of the game

## Project Structure

The game consists of three main components:
- **Square**: Individual clickable square in the game board
- **Board**: The 3x3 grid of squares
- **Game**: Top-level component managing game state and history

## Resources

- [React Documentation](https://react.dev)
- [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
