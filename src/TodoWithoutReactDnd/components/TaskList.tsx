import { useContext } from "react";
import { TaskListItem } from "./TaskListItem";
import todoContext, { TaskContextType } from "./TodoContext";

export function TaskList() {
  const context = useContext(todoContext);

  return (
    {
      context.hoverTaskState
    }
    <div>
      <TaskListItem
      />
    </div>
  );
}

function swap(context: TaskContextType, to: number, from: number) {
  const newTodos = context.hoverTaskState.todos.slice();
  const toItem = newTodos[to];
  newTodos[to] = newTodos[from];
  newTodos[from] = toItem;
  context.changeSolidTaskState({
    todos: newTodos,
    dones: context.hoverTaskState.dones
  });
}