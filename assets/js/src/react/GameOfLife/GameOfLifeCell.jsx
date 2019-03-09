import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';

class GameOfLifeCell extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  render() {
    const {x,y, checked} = this.props;
    return (
      <span className={`game-of-life-cell${checked ? ' --active' : ''}`} onClick={() => this.props.toggleSelected({x,y})}/>
    );
  }
}

export default connect((state, ownProps) => {
  const x = ownProps.x;
  const y = ownProps.y;
  const checked = state.getIn(['gameOfLife', 'grid', x, y, 'checked'], false);

  return {
    x,
    y,
    checked
  };
}, actionCreators)(GameOfLifeCell);
