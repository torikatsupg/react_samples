import React from "react";

const defaultValue = {
  count: 0,
  setState: (_: number) => {}
}

const context = React.createContext(defaultValue);

export default context;