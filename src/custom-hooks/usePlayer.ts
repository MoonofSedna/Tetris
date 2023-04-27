import {
  useState,
  useCallback,
} from "react";
import { randomTetromino } from "../utils/Tetrominoes";
import { Player } from "../interfaces/preview.interface";

const buildPlayer = (
  previous?: Player
): Player => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [
      ...previous.tetrominoes,
    ];
    tetrominoes.unshift(
      randomTetromino()
    );
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map(() => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino:
      tetrominoes.pop() as Player["tetromino"],
  };
};

export const usePlayer = (): [
  Player,
  React.Dispatch<
    React.SetStateAction<Player>
  >,
  () => void
] => {
  const [player, setPlayer] = useState(
    buildPlayer()
  );

  const resetPlayer =
    useCallback(() => {
      setPlayer((prev) =>
        buildPlayer(prev)
      );
    }, []);

  return [
    player,
    setPlayer,
    resetPlayer,
  ];
};
