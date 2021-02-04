import React from "react";
import Knight from "./Knight";
import BoardSquare from "./BoardSquare";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board: React.FC<{ knightPosition: any }> = ({ knightPosition}) => {
  const squares = [];
  for(let i = 0; i < 64; i ++) {
    squares.push(renderSquare(i, knightPosition))
  }

  return(
    <DndProvider backend={HTML5Backend}>
      <div style={{
        width: "400px",
        display: "flex",
        flexWrap: "wrap"
      }}>
        {squares}
      </div>
    </DndProvider>
  );
}

const renderSquare = (i: number, knightPosition: number[]) => {
  const x = i % 8;
  const y = Math.floor(i / 8)

  return(
    <div key={x} style={{ width: "12.5%", height: "12.5%" }} >
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

function renderPiece(x: number, y: number, [knightX, knightY]: number[]) {
  const isKnightHere = knightX === x && knightY === y;
  if(isKnightHere) {
    return <Knight />
  }
}

export default Board;