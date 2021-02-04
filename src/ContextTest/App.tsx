import React, { useState } from "react";
import Counter from "./Counter";
import MyContext from "./MyContext";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count: count, setState: setCount }}>
      <h1>
        {count}
      </h1>
      <Counter/>
    </MyContext.Provider>
  );
}