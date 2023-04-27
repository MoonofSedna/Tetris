// interfaces
import {
  Board,
  BoardPieces,
} from "./board.interface";
import { GameStats } from "./tetris.interface";

export interface PreviewProps {
  tetromino: {
    shape: number[][];
    className: string;
  };
  index: number;
}

export interface PreviewsProps {
  tetrominoes: PreviewProps["tetromino"][];
}

export interface Player {
  collided: boolean;
  isFastDropping: boolean;
  position: {
    row: number;
    column: number;
  };
  tetrominoes: PreviewProps["tetromino"][];
  tetromino: PreviewProps["tetromino"];
}

export interface PlayerRotation {
  board: Board["board"];
  player: Player;
  setPlayer: React.Dispatch<
    React.SetStateAction<Player>
  >;
}

export interface PlayerMovement {
  delta: BoardPieces["position"];
  position: BoardPieces["position"];
  shape: BoardPieces["shape"];
  board: Board["board"];
}

export interface PlayerControllerProps {
  board: Board["board"];
  action: string;
  player: Player;
  setPlayer: React.Dispatch<
    React.SetStateAction<Player>
  >;
  setGameOver: (
    gameOver: boolean
  ) => void;
}
export interface PlayerController {
  paused: boolean;
  attemptedExit: boolean;
  board: Board["board"];
  gameStats: GameStats;
  player: Player;
  setPlayer: React.Dispatch<
    React.SetStateAction<Player>
  >;
  setGameOver: (
    gameOver: boolean
  ) => void;
  setPaused: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setAttemptedExit: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export interface Code {
  [key: string]:
    | "ArrowUp"
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight"
    | "KeyQ"
    | "KeyP"
    | "Space";
}
