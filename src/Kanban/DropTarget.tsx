import React from "react";
import { useDrop } from "react-dnd";

interface Props {
  onDrop: any;
}

const DropTarget: React.FC<Props> = ({ onDrop, children }) => {
  const [isOver, drop] = useDrop({
    accept: "dragobject",
    drop: () => onDrop(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: "150px",
        height: "150px",
        border: "4px solid",
        margin: "1em",
      }}
    >
      {children}
    </div>
  );
};

export default DropTarget;
