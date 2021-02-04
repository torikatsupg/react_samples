import React from "react";

const Square: React.FC<{ black: boolean, children: any }> = ({ black, children }) =>
    <div style={{
      backgroundColor: black ? "black" : "white",
      color: black ? "white" : "black",
      height: "50px",
      width: "50px"
      }}
    >
      { children }
    </div>

export default Square;