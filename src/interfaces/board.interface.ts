// interfaces
import { Player } from "./preview.interface";

export interface BoardProps {
  rows: number;
  columns: number;
  player: Player;
  resetPlayer: () => void;
  addLinesCleared: (
    lines: number
  ) => void;
}

export interface BuildBoard {
  rows: number;
  columns: number;
}

export interface BoardCell {
  occupied: boolean;
  className: string;
}

export interface Board {
  board: {
    rows: BoardCell[][];
    size: {
      rows: number;
      columns: number;
    };
  };
}

export interface BoardPieces {
  className: string;
  isOccupied: boolean;
  position: {
    row: number;
    column: number;
  };
  rows: BoardCell[][];
  shape: number[][];
}

export interface PositionProps {
  board: Board["board"];
  position: BoardPieces["position"];
  shape: BoardPieces["shape"];
}
