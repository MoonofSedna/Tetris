// components
import Game from "./components/Game";
import Popover from "./components/Popover";
import { Icon } from "./components/Icons";
import GameOptions from "./components/GameOptions";
// styles
import "./styles/App.css";
// utils
import GameOptionsProvider from "./utils/GameOptionsContext";

function App() {
  return (
    <GameOptionsProvider>
      <div className="app">
        <Game rows={20} columns={10} />
        <Popover
          className="game-options"
          icon={
            <Icon name="settings" />
          }
        >
          <GameOptions />
        </Popover>
      </div>
    </GameOptionsProvider>
  );
}

export default App;
