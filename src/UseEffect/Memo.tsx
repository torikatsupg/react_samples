import { memoryUsage } from "process";
import { useMemo, useState } from "react";

export function Memo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p
        style={{
          height: "100px",
          width: "200px",
        }}
      >
        {count}
      </p>
      <MemoUsed count={count} />
      <MyButton count={count} setCount={setCount} />
    </div>
  );
}

function MemoUsed({ count }: { count: number }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCount = useMemo(() => count, []);
  console.log("render");

  return (
    <button
      onClick={e => console.log(memoCount)}
    >
      chat
    </button>
  );
}

function MyButton({ count, setCount }: { count: number, setCount: (newCount: number) => void}) {
  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      increment
    </button>
  );
}