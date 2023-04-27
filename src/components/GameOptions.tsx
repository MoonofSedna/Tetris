import { useContext } from "react";
import { GameOptionsContext } from "../utils/GameOptionsContext";

export default function GameOptions() {
  const {
    globalMusic,
    toggleGlobalMusic,
    soundEffects,
    toggleSoundEffects,
  } = useContext(GameOptionsContext);

  const options = [
    {
      label: "Global Music",
      checked: globalMusic,
      onChange: toggleGlobalMusic,
    },
    {
      label: "Sound Effects",
      checked: soundEffects,
      onChange: toggleSoundEffects,
    },
  ];

  const controls = [
    {
      label: "Move: Arrow Keys",
      className: "arrows",
    },
    {
      label: "Fast Drop: Spacebar",
      className: "spacebar",
    },
    {
      label: "Pause: P",
      className: "pause",
    },
    {
      label: "Exit: Q",
      className: "exit",
    },
  ];

  return (
    <div className="game-options-content">
      <ul>
        {options.map(
          ({
            label,
            checked,
            onChange,
          }) => (
            <li key={label}>
              <label>{label}</label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onChange?.()
                }
              />
            </li>
          )
        )}
      </ul>

      <ul className="controls">
        <li>Controls:</li>
        {controls.map(
          ({ label, className }) => (
            <li
              className={className}
              key={label}
            >
              {label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
