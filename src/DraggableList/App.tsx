import { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "./Constants";
import Kanban from "./Kanban";
import ListItem from "./ListItem";


export default function App () {
  const [state, changeState] =  useState([
    new Kanban(0, "kanban0"),
    new Kanban(1, "kanban1"),
    new Kanban(2, "kanban2"),
    new Kanban(3, "kanban3"),
    new Kanban(4, "kanban4"),
    new Kanban(5, "kanban5"),
    new Kanban(6, "kanban6"),
    new Kanban(7, "kanban7"),
  ]);

  const [hoverState, changeHoverState] = useState(state.slice());

  const onDrop = () => drop(hoverState, changeState);
  const onHover = hover(state, hoverState, changeHoverState);

  return (
    <div style={{ width: "400px" }} >
      <DndProvider backend={HTML5Backend}>
        {renderList(hoverState, onDrop, onHover)}
      </DndProvider>
    </div>
  );
}

function renderList(kanbans: Kanban[], onDrop: Function, onHover: (toId: number | null, fromId: number) => void) {
  return (
    <div>
      {kanbans.map(kanban => <ListItem key={kanban.id} kanban={kanban} onDrop={onDrop} onHover={onHover}/>)}
      <ListLastElement key={9999} onDrop={onDrop} onHover={onHover} />
    </div>
  );
}

function ListLastElement({ onDrop, onHover }: { onDrop: Function, onHover: (to: number | null, from: number) => void}) {
  const [, ref] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    drop: (_, __) => onDrop(),
    hover: (_, monitor) => onHover(-1, monitor.getItem().id),
  });

  return (
    <div ref={ref} style={{
        height: "50px",
        width: "100%",
    }}/>
  );
}

function drop(hoverState: Kanban[], changeState: changeStateFunction): void {
  changeState(hoverState);
}

/**
 * ホバーで移動
 */
function hover(state: Kanban[], hoverState: Kanban[], changeHoverState: changeStateFunction): (toId: number | null, fromId: number) => void {
  return function(toId: number | null, fromId: number | null) {
    if(toId === fromId) return;  // IDが同じ時入れ替える必要がない
    if (toId === null) {
      changeHoverState(state);
      return;
    }

    if(toId === -1) {
      const fromIndex = hoverState.findIndex(item => item.id === fromId);
      changeHoverState([...hoverState.slice(0, fromIndex), ...hoverState.slice(fromIndex + 1), hoverState[fromIndex]]); // 配列の並び替え
    } else {
      const toIndex = hoverState.findIndex(item => item.id === toId); // indexを取得
      const fromIndex = hoverState.findIndex(item => item.id === fromId); // indexを取得

      if (toIndex < fromIndex) { // 配列の並び替え
        changeHoverState([...hoverState.slice(0, toIndex), hoverState[fromIndex], ...hoverState.slice(toIndex, fromIndex), ...hoverState.slice(fromIndex + 1)]);
      } else {
        changeHoverState([...hoverState.slice(0, fromIndex), ...hoverState.slice(1 + fromIndex, toIndex), hoverState[fromIndex], ...hoverState.slice(toIndex)]);
      }
    }
  }
}

type changeStateFunction = (items: Kanban[]) => void;