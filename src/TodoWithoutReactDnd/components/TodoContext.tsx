import React from "react";

export type Task = {
  id: string,
  name: string
};

export type TaskState = {
  todos: Task[],
  dones: Task[],
};


export type TaskContextType = {
  solidTaskState: TaskState,
  hoverTaskState: TaskState,
  changeSolidTaskState: (state: TaskState) => void,
  changeHoverTaskState: (tasks: TaskState) => void,
}

const defaultValue: TaskContextType = {
  solidTaskState: { todos: [], dones: [] },
  hoverTaskState: { todos: [], dones: [] },
  changeSolidTaskState: (TaskState: TaskState) => {},
  changeHoverTaskState: (taskState: TaskState) => {},
};

const context = React.createContext<TaskContextType>(defaultValue);
export default context;