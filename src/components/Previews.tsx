import { memo } from "react";
// components
import Preview from "./Preview";
// interfaces
import { PreviewsProps } from "../interfaces/preview.interface";

const Previews = memo(
  function Previews({
    tetrominoes,
  }: PreviewsProps) {
    const previewTetrominoes =
      tetrominoes
        .slice(1 - tetrominoes.length)
        .reverse();

    return (
      <>
        {previewTetrominoes.map(
          (tetromino, index) => (
            <Preview
              tetromino={tetromino}
              index={index}
              key={index}
            />
          )
        )}
      </>
    );
  }
);

export default Previews;
