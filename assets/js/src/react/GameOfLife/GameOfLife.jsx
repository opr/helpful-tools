import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import GameOfLifeTable from './GameOfLifeTable';

class GameOfLife extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  render() {
    return (
      <div>
        <div>rows <input type={'number'} value={this.props.rows} onChange={e => this.props.changeRowOrColumnCount('rows', e.target.value)}/></div>
        <div>columns <input type={'number'} value={this.props.columns} onChange={e => this.props.changeRowOrColumnCount('columns', e.target.value)}/></div>
        <div><button onClick={() => this.props.togglePlay()}>{this.props.playing ? 'Pause' : 'Play'}</button></div>
        <div>
          <GameOfLifeTable />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const gameOfLifeState = state.get('gameOfLife');
  const rows = gameOfLifeState.get('rows', 0);
  const columns = gameOfLifeState.get('columns', 0);
  const playing = gameOfLifeState.get('playing', false);
  return {
    rows,
    columns,
    playing
  };
}, actionCreators)(GameOfLife);
