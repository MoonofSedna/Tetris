// components
import Menu from "./Menu";
import Tetris from "./Tetris";
// hooks
import { useGameOver } from "../custom-hooks/useGameOver";

interface GameProps {
  rows: number;
  columns: number;
}

export default function Game({
  rows,
  columns,
}: GameProps) {
  const [
    gameOver,
    setGameOver,
    resetGameOver,
  ] = useGameOver();

  const startGame = () =>
    resetGameOver();

  return (
    <div className="game">
      {gameOver ? (
        <Menu onClick={startGame}>
          Press Start
        </Menu>
      ) : (
        <Tetris
          rows={rows}
          columns={columns}
          setGameOver={setGameOver}
        />
      )}
    </div>
  );
}
