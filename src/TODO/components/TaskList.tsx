import DraggableSource from "./DraggableSource";
import Task, { TaskStatus } from "../models/Task";
import TaskListItem from "./TaskListItem";

export default function TaskList({ type, tasks }: { type: TaskStatus, tasks: Task[] }) {
  return (
    <div style={{
      width: "100%",
      backgroundColor: "whitesmoke",
      border: "solid"
    }}>
      {tasks.map(task => {
        return <DraggableSource key={task.id} type={type} id={task.id}>
          <TaskListItem task={task} />
        </DraggableSource>
      })}
      <DraggableSource key={type} type={type} id={null}>
        <div
          style={{
            width: "100%",
            height: "50%",
            minHeight: "50px",
            backgroundColor: "black",
          }}
        />
      </DraggableSource>
    </div>
  );
}