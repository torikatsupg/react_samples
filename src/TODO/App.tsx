import React, { useState } from "react";
import TaskList from "./components/TaskList";
import Task from "./models/Task";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskContext, { TaskState } from "./components/TaskContext";
import { DONE_ITEM, TODO_ITEM } from "./constants/Constants";

export default function App() {
  const tasks = createTasks();
  const [solidTaskState, changeSolidTaskState] = useState<TaskState>({
    todos: tasks.slice(),
    dones: []
  });
  const [hoverTaskState, changeHoverTaskState] = useState<TaskState>({
    todos: solidTaskState.todos.slice(),
    dones: solidTaskState.dones.slice()
  });

  return (
    <TaskContext.Provider value={{
      solidTaskState: solidTaskState,
      hoverTaskState: hoverTaskState,
      changeSolidTaskState: changeSolidTaskState,
      changeHoverTaskState: changeHoverTaskState,
    }}
    >
      <DndProvider backend={HTML5Backend} >
        <div style={{
          display: "flex",
          flex: "row",
          width: "70%",
        }}>
          <TaskList type={TODO_ITEM} tasks={hoverTaskState.todos} />
          <TaskList type={DONE_ITEM} tasks={hoverTaskState.dones} />
        </div>
      </DndProvider>
    </TaskContext.Provider>
  );
}

function createTasks(): Task[] {
  return [
    new Task(0, "item0"),
    new Task(1, "item1"),
    new Task(2, "item2"),
    new Task(3, "item3"),
    new Task(4, "item4"),
    new Task(5, "item5"),
    new Task(6, "item6"),
    new Task(7, "item7"),
  ]
}