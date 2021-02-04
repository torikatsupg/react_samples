import { useState } from "react";
import Button from "./Button";
import Counter from "./Counter";

export default function App () {
  const [count, setCount] = useState(0);
  const onClick = incrementCount(count, setCount);

  return(
    <div>
      <Counter count={count}/>
      <Button onClick={onClick}/>
    </div>
  );
}

function incrementCount(count: number, setCount: (_: number) => void) {
  return function() {
    console.log("onClick");
    setCount(count + 1);
  }
}