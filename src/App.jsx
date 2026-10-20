import { useState } from 'react';
import styles from './App.module.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'Draw', line: [] };
  }
  return null;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const gameResult = checkWinner(board);
  const winner = gameResult ? gameResult.winner : null;
  const winningLine = gameResult ? gameResult.line : [];

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const currentPlayer = isXNext ? 'X' : 'O';
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      if (result.winner === 'X') {
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (result.winner === 'O') {
        setScores((prev) => ({ ...prev, o: prev.o + 1 }));
      } else if (result.winner === 'Draw') {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  };

  const handleRestartRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleResetAll = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ x: 0, o: 0, draws: 0 });
  };

  let statusText = `Turn: ${isXNext ? 'X' : 'O'}`;
  if (winner) {
    if (winner === 'Draw') {
      statusText = 'Game Draw!';
    } else {
      statusText = `Winner: ${winner}`;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Tic-Tac-Toe</h1>

        <div className={styles.scoreboard}>
          <span className={styles.scoreItem}>X: {scores.x}</span>
          <span className={styles.scoreItem}>Draws: {scores.draws}</span>
          <span className={styles.scoreItem}>O: {scores.o}</span>
        </div>

        <div className={styles.status}>{statusText}</div>

        <div className={styles.grid}>
          {board.map((value, idx) => {
            const isWinningCell = winningLine.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                className={`${styles.cell} ${isWinningCell ? styles.winningCell : ''}`}
                onClick={() => handleCellClick(idx)}
                disabled={Boolean(value || winner)}
              >
                {value}
              </button>
            );
          })}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={handleRestartRound}
          >
            {winner ? 'Play Again' : 'Restart Round'}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleResetAll}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

