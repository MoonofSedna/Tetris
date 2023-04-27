// components
import BoardCell from "./BoardCell";
// interfaces
import { Board } from "../interfaces/board.interface";
// styles
import "../styles/Board.css";

export default function BoardComponent({
  board,
}: Board) {
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
  };

  return (
    <div
      className="board"
      style={boardStyles}
    >
      {board.rows.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <BoardCell
            key={`${rowIndex}-${cellIndex}`}
            cell={cell}
          />
        ))
      )}
    </div>
  );
}
