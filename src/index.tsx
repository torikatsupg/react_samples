import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Chess/Board";
import { observe } from "./Chess/Game";

const root = document.getElementById('root');

observe((knightPosition: number[]) => {
  ReactDOM.render(<Board knightPosition={knightPosition}/>, root);
});
