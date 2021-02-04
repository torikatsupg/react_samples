import React from "react";
import { useDrop } from "react-dnd";
import ItemType from "../DraggableTest/Constants";

export default function DraggableArea({ handleDrop, children }: { handleDrop: () => void, children: any }) {
  const [isOver, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => handleDrop(),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <>
      <h1
        style={{
          height: "100px",
          backgroundColor: isOver ? "gray" : "white"
        }}
        ref={drop}
      >Draggable area</h1>
      <span>---------------------------</span>
      {children}
      <span>---------------------------</span>
    </>
  );
}