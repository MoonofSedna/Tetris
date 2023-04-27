import { memo, Fragment } from "react";
import { GameStatsProps } from "../interfaces/tetris.interface";
// styles
import "../styles/GameStats.css";

const GameStats = memo(
  function GameStats({
    gameStats,
  }: GameStatsProps) {
    const {
      level,
      points,
      linesCompleted,
      linesPerLevel,
    } = gameStats;

    const linesToLevel =
      linesPerLevel - linesCompleted;

    const bestScore =
      localStorage.getItem("bestScore");

    const stats = {
      level: level,
      lines_To_Level: linesToLevel,
      points: points,
      best_Score:
        bestScore && +bestScore > points
          ? bestScore
          : points,
    };

    return (
      <ul className="game-stats game-stats-right">
        {Object.entries(stats).map(
          ([key, value]) => {
            return (
              <Fragment key={key}>
                <li key={key}>
                  {key.replaceAll(
                    "_",
                    " "
                  )}
                </li>
                <li className="value">
                  {value}
                </li>
              </Fragment>
            );
          }
        )}
      </ul>
    );
  }
);

export default GameStats;
