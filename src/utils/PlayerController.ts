// interfaces
import {
  PlayerControllerProps,
  PlayerMovement,
  PlayerRotation,
} from "./../interfaces/preview.interface";
// utils
import {
  hasCollision,
  isWithinBoard,
} from "./Board";
import { rotate } from "./Tetrominoes";
import { Action } from "./Input";
import { sound } from "./Sound";
import { sounds } from "./SoundList";
import { soundEffect } from "./SoundEffects";

const attemptRotation = ({
  board,
  player,
  setPlayer,
}: PlayerRotation) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  if (soundEffect().soundEffects) {
    sound(sounds.ROTATE).play();
  }

  const position = player.position;
  const isValidRotation = isWithinBoard(
    {
      board,
      position,
      shape,
    }
  );
  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    if (position.column < 0) {
      setPlayer({
        ...player,
        tetromino: {
          ...player.tetromino,
          shape,
        },
        position: {
          ...position,
          column: 0,
        },
      });
    } else if (position.column >= 7) {
      setPlayer({
        ...player,
        tetromino: {
          ...player.tetromino,
          shape,
        },
        position: {
          ...position,
          column: 6,
        },
      });
    }
  }
};

export const movePlayer = ({
  delta,
  position,
  shape,
  board,
}: PlayerMovement) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column:
      position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove =
    !isOnBoard ||
    (isOnBoard && collided);
  const nextPosition = preventMove
    ? position
    : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit =
    isMovingDown &&
    (collided || !isOnBoard);

  return {
    collided: isHit,
    nextPosition,
  };
};

const attemptMovement = ({
  board,
  action,
  player,
  setPlayer,
  setGameOver,
}: PlayerControllerProps) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
    if (soundEffect().soundEffects) {
      sound(sounds.FAST_DROP).play();
    }
  } else if (
    action === Action.SlowDrop
  ) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } =
    movePlayer({
      delta,
      position: player.position,
      shape: player.tetromino.shape,
      board,
    });

  const isGameOver =
    collided &&
    player.position.row === 0;

  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}: PlayerControllerProps) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({
      board,
      player,
      setPlayer,
    });
  } else {
    attemptMovement({
      board,
      player,
      setPlayer,
      action,
      setGameOver,
    });
  }
};
