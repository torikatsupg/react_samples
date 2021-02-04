import React from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "./Constants";
import { moveKnight, canMoveKnight } from "./Game";
import Square from "./Square";

export default function BoardSquare({ x, y, children }: { x: number, y: number, children: any }) {
  const black = (x + y) % 2 === 1;

  // define useDrop
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemType.KNIGHT,
    canDrop: () => canMoveKnight(x, y),
    drop: () => moveKnight(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    })
  });

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red"/>}
      {!isOver && canDrop && <Overlay color="yellow"/>}
      {isOver && canDrop && <Overlay color="green"/>}
    </div>
  );
}

function Overlay({ color }: { color: string }) {
  return(
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
}