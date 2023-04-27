import Game from "./components/Game";
import Popover from "./components/Popover";
import "./styles/App.css";
import { Icon } from "./components/Icons";
import GameOptionsProvider from "./utils/GameOptionsContext";
import GameOptions from "./components/GameOptions";

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
