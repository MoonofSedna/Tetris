import {
  useEffect,
  useState,
} from "react";
// interfaces
import { BoardProps } from "../interfaces/board.interface";
// utils
import {
  buildBoard,
  nextBoard,
} from "../utils/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}: BoardProps) => {
  const [board, setBoard] = useState(
    buildBoard({ rows, columns })
  );

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      })
    );
  }, [
    player,
    resetPlayer,
    addLinesCleared,
  ]);

  return [board];
};
