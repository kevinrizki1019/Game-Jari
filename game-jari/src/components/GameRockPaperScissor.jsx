import { useState, useEffect } from 'react';
import './game.css';

import rock from "../images/rock.jpg";
import paper from "../images/paper.jpg";
import scissor from "../images/scissor.jpg";

function Jari({ shape }) {
  let displayShape;
  if (shape === "paper") {
    displayShape = paper;
  } else if (shape === "scissor") {
    displayShape = scissor;
  } else {
    displayShape = rock;
  }

  return (
    <>
      <img className="jari" src={displayShape} alt={shape} />
    </>
  );
}

export default function GameRockPaperScissor() {
  const [playerTwoShape, setPlayerTwoShape] = useState("rock");
  const [playerOneShape, setPlayerOneShape] = useState("rock");
  const [description, setDescription] = useState("Go!");

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [winningScore, setWinningScore] = useState(5);
  const [requiredScore, setRequiredScore] = useState("5");
  const [requiredScoreButtonClick, setRequiredScoreClick] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const gameResult = calculateWinner(playerOneShape, playerTwoShape);

    if (gameResult === null) {
      setDescription("Go!");
    } else if (gameResult === 1) {
      setPlayerOneScore(prevScore => prevScore + 1);
      setDescription("You scored!");
    } else if (gameResult === 2) {
      setPlayerTwoScore(prevScore => prevScore + 1);
      setDescription("Computer scored!");
    } else if (gameResult === 0) {
      setDescription("Draw!");
    }
  }, [playerOneShape, playerTwoShape]);

  useEffect(() => {
    if (playerOneScore === winningScore) {
      setIsGameOver(true);
      setDescription("You won!");
    } else if (playerTwoScore === winningScore) {
      setIsGameOver(true);
      setDescription("Computer won!");
    }
  }, [playerOneScore, playerTwoScore, winningScore]);

  function handleClick(value) {
    if (isGameOver) {
      return;
    }

    setPlayerOneShape(value);
    setPlayerTwoShape(["rock", "paper", "scissor"][Math.floor(Math.random() * 3)]);
  }

  function handleRestart() {
    setIsGameOver(false);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setDescription("Go!");
  }

  function handleRequiredScoreChange(e) {
    setRequiredScore(e.target.value);
  }
  
  function handleSetRequiredScore() {
    const parsedScore = parseInt(requiredScore, 10);
    if (!isNaN(parsedScore)) {
      setWinningScore(parsedScore);
      setRequiredScoreClick(true);
    }
  }

  return (
    <div className="container">
      {/* Player 2 Computer */}
      <div className="player">
        <span>Player Two</span>
        <Jari shape={playerTwoShape} />
      </div>

      {/* Player 1 User */}
      <div className="player">
        <span>Player One</span>
        <Jari shape={playerOneShape} />
      </div>

      {/*Button Select */}
      <div className="buttons">
        <button className="animated-button" onClick={() => handleClick("rock")}>Rock</button>
        <button className="animated-button" onClick={() => handleClick("paper")}>Paper</button>
        <button className="animated-button" onClick={() => handleClick("scissor")}>Scissor</button>
      </div>
      <div className="result">{description}</div>

      <div className="score">
        You: {playerOneScore} Computer: {playerTwoScore}
      </div>

      {isGameOver && (
        <div className="game-over">
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}

      {!isGameOver && !requiredScoreButtonClick && (
        <div className="required-score">
          <input
            type="text"
            placeholder="Enter required score"
            value={requiredScore}
            onChange={handleRequiredScoreChange}
          />
          <button onClick={handleSetRequiredScore}>Set Required Score</button>
        </div>
      )}

      <div className="required-score">
        Required score to win: 
          {requiredScore} 
          {}
      </div>
    </div>
  );
}

function calculateWinner(valueOne, valueTwo) {
  if (valueOne === "rock") {
    if (valueTwo === "rock") {
      return 0; // Draw
    } else if (valueTwo === "paper") {
      return 2; // Player Two wins
    } else if (valueTwo === "scissor") {
      return 1; // Player One wins
    }
  } else if (valueOne === "paper") {
    if (valueTwo === "rock") {
      return 1; // Player One wins
    } else if (valueTwo === "paper") {
      return 0; // Draw
    } else if (valueTwo === "scissor") {
      return 2; // Player Two wins
    }
  } else if (valueOne === "scissor") {
    if (valueTwo === "rock") {
      return 2; // Player Two wins
    } else if (valueTwo === "paper") {
      return 1; // Player One wins
    } else if (valueTwo === "scissor") {
      return 0; // Draw
    }
  }

  return null; // Game is still in progress
}