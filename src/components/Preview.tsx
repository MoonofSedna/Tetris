import { memo } from "react";
import { buildBoard } from "../utils/Board";
import { transferToBoard } from "../utils/Tetrominoes";
import { PreviewProps } from "../interfaces/preview.interface";
import BoardCell from "./BoardCell";
import "../styles/Preview.css";

const Preview = memo(function Preview({
  tetromino,
  index,
}: PreviewProps) {
  const { shape, className } =
    tetromino;

  const board = buildBoard({
    rows: 4,
    columns: 4,
  });

  const style = {
    top: 4 * index * 2 + "rem",
  };

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  return (
    <div
      className="preview"
      style={style}
    >
      <div className="preview-board">
        {board.rows.map((row) =>
          row.map((cell, x) => (
            <BoardCell
              key={
                x * board.size.columns +
                x
              }
              cell={cell}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default Preview;
