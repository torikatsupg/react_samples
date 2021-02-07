import Task from "../models/Task";

export default function TaskListItem({ task }: { task: Task }) {
  return (
    <p style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
      width: "100%",
      height: "50px"
    }}>
      <span>{task.id} : {task.title}</span>
    </p>
  );
}