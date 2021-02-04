import React from "react";
import { ItemType } from "./Constants";
import { useDrag } from "react-dnd";

export default function Knight () {
  // define useDrag
  const [{ isDrugging }, drag] = useDrag({
    item: { type: ItemType.KNIGHT },
    collect: monitor => ({
      isDrugging: !!monitor.isDragging()
    })
  });

  return <div
    ref={drag}
    style={{
      opacity: isDrugging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: "bold",
      cursor: "move"
    }}
  >
    ♘
  </div>;
}