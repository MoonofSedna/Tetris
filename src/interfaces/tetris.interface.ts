export interface GameStats {
  level: number;
  linesCompleted: number;
  linesPerLevel: number;
  points: number;
}

export interface GameStatsProps {
  gameStats: GameStats;
}
