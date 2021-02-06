import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./Constants";
import Kanban from "./Kanban";

export default function ListItem (
    { kanban, onDrop, onHover }:
     { kanban: Kanban, onDrop: Function, onHover: (toId: number | null, fromId: number) => void }
) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TODO_ITEM, id: kanban.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    drop: (item, monitor) => onDrop(),
    hover: (item, monitor) => onHover(kanban.id, monitor.getItem().id),
  });

  return (
    <div ref={drop}>
      <div
        ref={drag}
        style={{
          height: "50px",
          width: "100%",
          backgroundColor: "#C2C2C2",
          opacity: isDragging ? 0 : 1,
          border: "solid",
          borderColor: "#222222",
          borderWidth: "1px"
        }}
      >
        <span>{kanban.title}</span>
      </div>
    </div>
  );
}