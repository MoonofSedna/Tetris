import {
  createContext,
  useEffect,
  useState,
} from "react";
import { sound } from "./Sound";
import { sounds } from "./SoundList";

interface GameOptions {
  globalMusic: boolean;
  toggleGlobalMusic:
    | (() => void)
    | null;
  soundEffects: boolean;
  toggleSoundEffects:
    | (() => void)
    | null;
}

const playSound = sound(
  sounds.GAME_SOUND,
  true,
  0.02
);

const initialGameOptions: GameOptions =
  {
    globalMusic: true,
    toggleGlobalMusic: null,
    soundEffects: true,
    toggleSoundEffects: null,
  };
export const GameOptionsContext =
  createContext(initialGameOptions);

export default function GameOptionsProvider(props: {
  children: JSX.Element;
}) {
  const [globalMusic, setGlobalMusic] =
    useState(true);
  const [
    soundEffects,
    setSoundEffects,
  ] = useState(true);

  useEffect(() => {
    if (globalMusic) {
      playSound.play();
    } else {
      playSound.stop();
    }
  }, [globalMusic]);

  useEffect(() => {
    const gameOptions =
      window.localStorage.getItem(
        "gameOptions"
      );

    if (gameOptions) {
      const parsedGameOptions =
        JSON.parse(gameOptions);
      setGlobalMusic(
        parsedGameOptions.globalMusic
      );
      setSoundEffects(
        parsedGameOptions.soundEffects
      );
    } else {
      window.localStorage.setItem(
        "gameOptions",
        JSON.stringify({
          globalMusic: true,
          soundEffects: true,
        })
      );
    }
  }, []);

  const saveSettings = (newConfig: {
    globalMusic: boolean;
    soundEffects: boolean;
  }) =>
    window.localStorage.setItem(
      "gameOptions",
      JSON.stringify(newConfig)
    );

  const toggleGlobalMusic = () => {
    setGlobalMusic(!globalMusic);
    saveSettings({
      globalMusic: !globalMusic,
      soundEffects,
    });
  };

  const toggleSoundEffects = () => {
    setSoundEffects(!soundEffects);
    saveSettings({
      globalMusic,
      soundEffects: !soundEffects,
    });
  };

  return (
    <GameOptionsContext.Provider
      value={{
        globalMusic,
        toggleGlobalMusic,
        soundEffects,
        toggleSoundEffects,
      }}
    >
      {props.children}
    </GameOptionsContext.Provider>
  );
}
