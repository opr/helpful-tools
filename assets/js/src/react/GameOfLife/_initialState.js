import {List, Map} from 'immutable';

const rows = 50;
const columns = 50;
const grid = List([...Array(rows)].map((row, rowIndex) => List([...Array(columns)].map((column, columnIndex) => Map({checked: false})))));
console.log(grid);

export const INITIAL_STATE = Map({
  rows,
  columns,
  grid,
  playing: false
});
