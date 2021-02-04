import React from "react";
import { useDrag } from "react-dnd";
import ItemType from "./Constants";
import MyContext from "./MyContext";

export default function DraggableItem() {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <MyContext.Consumer>
      {() => {
        return (
          <>
            <h1
              style={{
                opacity: isDragging ? 0.5 : 1
              }}
              ref={drag}
            >
              Draggable item
            </h1>
          </>
        );
      }}
    </MyContext.Consumer>
  );
}