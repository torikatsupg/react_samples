import { useEffect, useRef, useState } from "react";

export function DragWithMemo() {
  const [isDragging, setDragState] = useState(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  // const memoRef = useMemo(() => draggableRef, [draggableRef])
  const memoRef = draggableRef;

  useEffect(() => {
    const elm = memoRef.current
    if(elm === null) {
      throw new Error("memoRef.current is null");
    }

    elm.addEventListener("dragstart", () => dragStart(setDragState))
    elm.addEventListener("dragend", () => dragEnd(setDragState))

    return () => {
      elm.removeEventListener("dragstart", () => dragStart(setDragState))
      elm.removeEventListener("dragend", () => dragEnd(setDragState))
    }
  });

  return (
    <div ref={draggableRef}>
      <Draggable isDragging={isDragging}/>
    </div>
  );
}

function Draggable({ isDragging }: { isDragging: boolean }) {
  return (
    <div
      draggable="true"
      style={{
        backgroundColor: "green",
        color: "red",
        height: "150px",
        width: "300px",
        opacity: isDragging ? 0.001 : 1,
        cursor: "pointer",
        // visibility: isDragging ? "hidden" : "visible"
      }}
    >
      Drag me!
    </div>
  );
}

function dragStart(setDragState: (s: boolean) => void) {
  setDragState(true);
}

function dragEnd(setDragState: (s: boolean) => void) {
  setDragState(false);
}