// interfaces
import { BoardCell } from "../interfaces/board.interface";

export default function BoardCellComponent({
  cell,
}: {
  cell: BoardCell;
}) {
  return (
    <div
      className={`board-cell ${cell.className}`}
    >
      <div className="sparkle"></div>
    </div>
  );
}
