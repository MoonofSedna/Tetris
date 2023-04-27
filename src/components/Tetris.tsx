import { useState } from "react";
// components
import Board from "./Board";
import GameStats from "./GameStats";
// hooks
import { useBoard } from "../custom-hooks/useBoard";
import { useGameStats } from "../custom-hooks/useGameStats";
// styles
import "../styles/Tetris.css";
import { usePlayer } from "../custom-hooks/usePlayer";
import Previews from "./Previews";
import GameController from "./GameController";
import Pause from "./Pause";

interface TetrisProps {
  columns: number;
  rows: number;
  setGameOver: (
    gameOver: boolean
  ) => void;
}

export default function Tetris({
  columns,
  rows,
  setGameOver,
}: TetrisProps) {
  const [paused, setPaused] =
    useState(false);
  const [
    attemptedExit,
    setAttemptedExit,
  ] = useState(false);

  const [gameStats, addLinesCleared] =
    useGameStats();
  const [
    player,
    setPlayer,
    resetPlayer,
  ] = usePlayer();
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="tetris">
      <Board board={board} />
      <div className="game-bar">
        <Previews
          tetrominoes={
            player.tetrominoes
          }
        />
        <GameStats
          gameStats={gameStats}
        />
        <GameController
          paused={paused}
          attemptedExit={attemptedExit}
          board={board}
          gameStats={gameStats}
          player={player}
          setGameOver={setGameOver}
          setPlayer={setPlayer}
          setPaused={setPaused}
          setAttemptedExit={
            setAttemptedExit
          }
        />
      </div>
      {paused && (
        <Pause title="PAUSE" />
      )}
      {attemptedExit && (
        <Pause
          title="EXIT?"
          action={
            <div className="exit-actions">
              <button
                onClick={() => {
                  setAttemptedExit(
                    false
                  );
                  setPaused(false);
                }}
              >
                NO
              </button>
              <button
                onClick={() => {
                  setAttemptedExit(
                    false
                  );
                  setPaused(false);
                  setGameOver(true);
                }}
              >
                YES
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}
