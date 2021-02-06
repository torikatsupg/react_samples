import React, { useState } from "react";
import DragSource from "./DragSource";
import DropTarget from "./DropTarget";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board: React.FC = () => {
  const [inObject, SetinObject] = useState(false);

  const handleDrop = () => {
    SetinObject(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {inObject ? null : <DragSource />}
      ↓ここにドロップできます
      <DropTarget onDrop={handleDrop}>
        {inObject ? <DragSource /> : null}
      </DropTarget>
    </DndProvider>
  );
};

export default Board;