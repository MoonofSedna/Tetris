import {
  useCallback,
  useState,
} from "react";

export const useGameOver = (): [
  boolean,
  (gameOver: boolean) => void,
  () => void
] => {
  const [gameOver, setGameOver] =
    useState(true);

  const resetGameOver =
    useCallback(() => {
      setGameOver(false);
    }, []);

  return [
    gameOver,
    setGameOver,
    resetGameOver,
  ];
};
