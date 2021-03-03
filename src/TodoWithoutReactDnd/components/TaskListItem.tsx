import { Task } from "./TodoContext";

export function TaskListItem({ task }: { task: Task }) {
  return (
    <div>
      <h3>
        {task.id}: {task.name}
      </h3>
    </div>
  );
}