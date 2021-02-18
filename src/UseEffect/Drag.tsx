/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react"
import React from "react";

export function Drag() {
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setDragState] = useState(false);

  return (
    <div
      ref={dragRef}
    >
      {
          <div
            style={{
              opacity: isDragging ? 0 : 1
            }}
          >
            <RenderItem
              inputRef={dragRef}
              setDragging={setDragState}
            />
          </div>
      }
    </div>
  );
}

function RenderItem({ inputRef, setDragging }: { inputRef: React.RefObject<HTMLDivElement>, setDragging: (v: boolean) => void }) {
  console.log('render item')
  const dragRef = useMemo(() => inputRef, []);

  useEffect((): any => {
    const current = dragRef.current
    // refがnullだとそもそもおかしいのでエラーを吐く
    if (current === null) {
      throw new Error("ref is not nullable");
    }
    const node = current.cloneNode(true);
    const onDragStart = (ev: DragEvent): void => {
      /**
       * div.current: 現在対象としているDOM(ドラッグ対象)
       * ev.clientX, ev.clientY: ドラッグした時のマウスの座標
       */
      const can = document.createElement("canvas");
      can.appendChild(node);
      ev.dataTransfer?.setDragImage(can, ev.clientX, ev.clientY);
      // イベントの伝播を止める
      ev.stopPropagation();
      setDragging(true);
    }

    const onDragEnd = (_: DragEvent): void => {
      setDragging(false);
      // document.getElementById("hogehgoe")!.textContent = "";
    }

    // ドラッグした時のコールバックを登録
    current.addEventListener("dragstart", onDragStart);
    current.addEventListener("dragend", onDragEnd);

    // コンポーネントのライフサイクルに合わせてリスナを解除
    return function () {
      current.removeEventListener("dragstart", onDragStart);
      current.removeEventListener("dragend", onDragEnd);
    }
  })
  return useMemo(() => (
    <div
      ref={inputRef}
      draggable="true"
      /**
       * draggable = true を設定しないとうまくドラッグできない
       */
      style={{
        backgroundColor: "red",
        cursor: "pointer",
        height: "100px",
        width: "100px",
        position: "relative",
      }}
    >
      Drag me!
    </div>
  ), []);
}