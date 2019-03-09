import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import GameOfLifeCell from './GameOfLifeCell';

class GameOfLifeTable extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  render() {
    return (
      <div className={'cf'}>
        {[...Array(this.props.rows)].map((row, rowIndex) => <div style={{float: 'left', clear: 'both'}} key={`row-${rowIndex}`}>{[...Array(this.props.columns)].map((column, columnIndex)=> <GameOfLifeCell key={`${columnIndex},${rowIndex}`} y={rowIndex} x={columnIndex} />)}</div>)}
      </div>
    );
  }
}

export default connect(state => {
  const gameOfLifeState = state.get('gameOfLife');
  const rows = gameOfLifeState.get('rows', 0);
  const columns = gameOfLifeState.get('columns', 0);
  return {
    rows,
    columns
  };
}, actionCreators)(GameOfLifeTable);
