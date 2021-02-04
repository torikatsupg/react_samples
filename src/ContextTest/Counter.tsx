import React from "react";
import MyContext from "./MyContext";

export default function Counter() {
  return (
    <MyContext.Consumer>
      {({count, setState}) => {
        return (
          <button onClick={() => setState(count + 1)}>
            increment
          </button>
        );
      }}
    </MyContext.Consumer>
  );
}