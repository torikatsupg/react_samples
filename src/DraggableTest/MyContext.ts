import React from "react";

const defaultValue = {
  handleDrop: () => {}
};

const MyContext = React.createContext(defaultValue);

export default MyContext;