import "../styles/Menu.css";

interface MenuProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Menu({
  onClick,
  children,
}: MenuProps) {
  const bestScore =
    localStorage.getItem("bestScore");

  return (
    <div className="menu">
      <h2
        className="hero glitch layers"
        data-text="Play Tetris"
      >
        Play Tetris
      </h2>
      <button onClick={onClick}>
        {children}
      </button>
      {bestScore && (
        <div className="best-score">
          <span>
            Best Score: {bestScore}
          </span>
        </div>
      )}
    </div>
  );
}
