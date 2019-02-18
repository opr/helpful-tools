import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {agonyIds} from './data';
import {GoldRenderer} from '../GoldRenderer/GoldRenderer';

class AgonyCalculator extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  componentDidMount() {
    this.props.calculateAgonyPrices();
  }

  render() {
    return (
      <div>
        I want to make <input value={this.props.count} onChange={e => this.props.changeValue('count', e.target.value)}
                              type={'number'}/> of
        <select value={this.props.result} onChange={e => this.props.changeValue('result', e.target.value)}>
          {agonyIds.skip(1).entrySeq().map(([key, value], index) => <option key={index}
                                                                            value={key}>{value.get('name', '')}</option>)}
        </select>
        using
        <select value={this.props.source} onChange={e => this.props.changeValue('source', e.target.value)}>
          {agonyIds.take(agonyIds.count() - 1).entrySeq().map(([key, value], index) => <option key={index}
                                                                                               value={key}>{value.get('name', '')}</option>)}
        </select>

        <div>
          Source required: {this.props.sourceRequired}
        </div>
        <div>
          Total outlay: <GoldRenderer total={this.props.totalOutlay}/>
        </div>
        <div>
          Profit: <GoldRenderer total={this.props.profit}/>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const agonyState = state.get('agony', Map({}));
  const count = agonyState.get('count', 1);
  const source = agonyState.get('source', 1);
  const sourceRequired = agonyState.get('sourceRequired', 0);
  const profit = agonyState.get('profit', 0);
  const totalOutlay = agonyState.get('totalOutlay', 0);
  const result = agonyState.get('result', 2);
  return {
    count, source, result, sourceRequired, profit, totalOutlay
  };
}, actionCreators)(AgonyCalculator);
