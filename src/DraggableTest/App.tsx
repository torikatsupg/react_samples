import React, { useState } from "react";
import MyContext from "./MyContext";
import DraggableItem from "./DraggableItem";
import DraggableArea from "./DraggableArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [state, changeState] = useState(false);

  const handleDrop = function() {
    changeState(true);
  }

  return (
    <MyContext.Provider value={{ handleDrop: handleDrop }}>
      <DndProvider backend={HTML5Backend}>
        {!state ? <DraggableItem /> : null}
        <DraggableArea handleDrop={handleDrop}>
          {state ? <DraggableItem /> : null}
        </DraggableArea>
      </DndProvider>
    </MyContext.Provider>
  );
}