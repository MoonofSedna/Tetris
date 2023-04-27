import {
  useState,
  useCallback,
} from "react";
// interfaces
import { GameStats } from "../interfaces/tetris.interface";
// utils
import { sound } from "../utils/Sound";
import { sounds } from "../utils/SoundList";
import { soundEffect } from "../utils/SoundEffects";

const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});

export const useGameStats = (): [
  GameStats,
  () => void
] => {
  const [gameStats, setGameStats] =
    useState(buildGameStats());

  const addLinesCleared = useCallback(
    (lines: number) => {
      setGameStats((previous) => {
        const points =
          previous.points + lines * 100;
        const { linesPerLevel } =
          previous;
        const newLinesCompleted =
          previous.linesCompleted +
          lines;
        const level =
          newLinesCompleted >=
          linesPerLevel
            ? previous.level + 1
            : previous.level;
        const linesCompleted =
          newLinesCompleted %
          linesPerLevel;

        const bestScore =
          localStorage.getItem(
            "bestScore"
          ) || "0";

        if (points > +bestScore) {
          localStorage.setItem(
            "bestScore",
            points.toString()
          );
        }

        if (
          newLinesCompleted >=
          linesPerLevel
        ) {
          soundEffect().soundEffects &&
            sound(
              sounds.LEVEL_UP
            ).play();
        }
        return {
          level,
          linesCompleted,
          linesPerLevel,
          points,
        };
      });
    },
    []
  );

  return [
    gameStats,
    addLinesCleared as () => void,
  ];
};
