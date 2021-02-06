import { useDrag } from "react-dnd";

const DragSource: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "dragobject" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        width: "100px",
        height: "100px",
        margin: "1em",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      ref={drag}
    >
      ドラッグできます
    </div>
  );
};

export default DragSource;