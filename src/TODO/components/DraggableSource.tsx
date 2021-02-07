import { useContext } from "react";
import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { DONE_ITEM, TODO_ITEM } from "../constants/Constants";
import Task, { TaskStatus } from "../models/Task";
import TaskContext, { TaskContextType } from "./TaskContext";

export default function DraggableSource({ type, id, children }:
  { type: TaskStatus, id: number | null, children: JSX.Element }): JSX.Element {
  const context = useContext(TaskContext)

  // ドラッグ定義
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: type, id: id },
    canDrag: monitor => id === 0 || !!id,
    collect: collectDrag
  });

  // ドロップ定義
  const [, dropRef] = useDrop({
    accept: [TODO_ITEM, DONE_ITEM],
    hover: (from, monitor) => onHover(from as any as { id: number, type: TaskStatus }, type, id, context),
    drop: (type, monitor) => onDrop(context),
  });

  return (
    <div style={{
      opacity: isDragging ? 0.2 : 1,
      backgroundColor: "white"
    }}>
    <div ref={dropRef}>
      <div ref={dragRef}>
          {children}
      </div>
    </div>
    </div>
  );
}

// useDragに渡すcollectコールバック
function collectDrag(monitor: DragSourceMonitor): { isDragging: boolean } {
  return {
    isDragging: !!monitor.isDragging()
  }
}

// dropされた時の処理
function onDrop(context: TaskContextType) {
  context.changeSolidTaskState(context.hoverTaskState);
}

// hover時の処理
function onHover(
    from: { id: number, type: TaskStatus },
    toType: TaskStatus,
    toId: number | null,
    context: TaskContextType
) {
  if (from === null || from === undefined || from.id === undefined) {
    throw new Error(`from is invalid ${from}`)
  }
  const todos = context.hoverTaskState.todos;
  const dones = context.hoverTaskState.dones;
  const setTaskState = (todos: Task[], dones: Task[]) => context.changeHoverTaskState({
    todos: todos,
    dones: dones
  });

  const fromId = from?.id;
  const fromType = from.type;
  // 移動元と移動先のIDが同じ時早期リターン
  if (fromId === toId) {
    return
  }

  // 移動元のステータスとIDを取得
  const fromIndex = findIndex(fromType, fromId, todos, dones);
  if (fromIndex === null) {
    // fromは絶対nullにならない
    throw new Error("from index is not nullable");
  }

  // 移動先のステータスとIDを取得
  const toIndex = findIndex(toType, toId, todos, dones);

  // 移動元と移動先が同じ時
  if (fromType === toType) {
    if (toType === TODO_ITEM) {
      setTaskState(moveItemWithinSameList(fromIndex, toIndex, todos), dones.slice());
    } else {
      setTaskState(todos.slice(), moveItemWithinSameList(fromIndex, toIndex, dones));
    }
  // 移動元と移動先が違う時
  } else {
    if (toType === TODO_ITEM) {
      setTaskState(insertItem(fromIndex, toIndex, dones, todos), dropItem(fromIndex, dones));
    } else {
      setTaskState(dropItem(fromIndex, todos), insertItem(fromIndex, toIndex, todos, dones));
    }
  }
}

// 二つの配列からIndexを検索
function findIndex(type: TaskStatus, id: number | null, todos: Task[], dones: Task[]): number | null {
  // idがnullのときnullを返す
  if (id === null) return null;

  // indexの検索
  if(type === TODO_ITEM) {
    return todos.findIndex(item => item.id === id);
  } else {
    return dones.findIndex(item => item.id === id);
  }
}

// 同一配列内で要素を移動
function moveItemWithinSameList(fromIndex: number, toIndex: number | null, tasks: Task[]) {
  // 移動先が最後の時
  if (toIndex === null) {
    return [...tasks.slice(0, fromIndex), ...tasks.slice(fromIndex + 1), tasks[fromIndex]]

  // 後ろへ移動する時
  } else if (fromIndex < toIndex) {
    return [...tasks.slice(0, fromIndex), ...tasks.slice(fromIndex + 1, toIndex), tasks[fromIndex], ...tasks.slice(toIndex)];

  // 前へ移動する時
  } else {
    return [...tasks.slice(0, toIndex), tasks[fromIndex], ...tasks.slice(toIndex, fromIndex), ...tasks.slice(fromIndex + 1)];
  }
}

// 配列から要素を削除
function dropItem(index: number, tasks: Task[]) {
  // idがtasks内になければ何もしない
  if (index === -1) {
    return tasks.slice();
  } else {
    return [...tasks.slice(0, index), ...tasks.slice(index + 1)]
  }
}

// 配列に要素を追加
function insertItem(fromIndex: number, toIndex: number | null, fromTasks: Task[], toTasks: Task[]): Task[] {
  // fromIdの要素がなければ何もしない
  if (fromIndex === -1 || !fromTasks[fromIndex]) {
    return toTasks.slice();

  // fromの要素がすでにtoTasksに存在しているなら何もしない
  } else if (toTasks.findIndex(item => item.id === fromTasks[fromIndex].id) !== -1) {
    return toTasks.slice();

  // それ以外の時
  } else {
    // IDが番兵の時は最後に追加
    if (toIndex === null) {
      return [...toTasks.slice(), fromTasks[fromIndex]];

      // 要素を挿入
    } else {
      return [...toTasks.slice(0, toIndex), fromTasks[fromIndex], ...toTasks.slice(toIndex)]
    }
  }
}