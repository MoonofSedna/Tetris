// hooks
import { useDropTime } from "../custom-hooks/useDropTime";
import { useInterval } from "../custom-hooks/useInterval";
// interfaces
import { PlayerController } from "../interfaces/preview.interface";
// utils
import {
  Action,
  actionForKey,
  actionIsDrop,
} from "../utils/Input";
import { playerController } from "../utils/PlayerController";
// styles
import "../styles/GameController.css";
import { useEffect } from "react";
import { sound } from "../utils/Sound";
import { sounds } from "../utils/SoundList";

const GameController = ({
  paused,
  attemptedExit,
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  setPaused,
  setAttemptedExit,
}: PlayerController) => {
  const [
    dropTime,
    pauseDropTime,
    resumeDropTime,
  ] = useDropTime(gameStats);

  useInterval(() => {
    handleInput({
      action: Action.SlowDrop,
    });
  }, dropTime);

  const onKeyUp = ({
    code,
  }: {
    code: string;
  }) => {
    const action = actionForKey(code);

    if (
      paused ||
      !Object.values(Action).includes(
        action
      )
    ) {
      return;
    }

    if (actionIsDrop(action)) {
      resumeDropTime();
    }
  };

  const onKeyDown = ({
    code,
  }: {
    code: string;
  }) => {
    const action = actionForKey(code);

    const pausedSound = () =>
      sound(sounds.PAUSE).play();

    const pauseGame = () => {
      if (dropTime) {
        pauseDropTime();
        setPaused(true);
        pausedSound();
      } else {
        resumeDropTime();
        setPaused(false);
        pausedSound();
      }
    };

    if (action === Action.Pause) {
      if (attemptedExit) return;
      pauseGame();
    } else if (action === Action.Quit) {
      if (paused) return;
      setAttemptedExit((p) => !p);
    } else if (
      action === Action.FastDrop
    ) {
      handleInput({
        action,
      });
    } else {
      if (
        paused ||
        attemptedExit ||
        !Object.values(Action).includes(
          action
        )
      ) {
        return;
      }

      if (actionIsDrop(action)) {
        pauseDropTime();
      }

      if (!dropTime) {
        return;
      }

      handleInput({ action });
    }
  };

  const handleInput = ({
    action,
  }: {
    action: string;
  }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      onKeyDown,
      true
    );

    document.addEventListener(
      "keyup",
      onKeyUp,
      true
    );

    return () => {
      document.removeEventListener(
        "keydown",
        onKeyDown,
        true
      );

      document.removeEventListener(
        "keyup",
        onKeyUp,
        true
      );
    };
  });

  return <div tabIndex={0} />;
};

export default GameController;
