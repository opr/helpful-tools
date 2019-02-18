import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import {InlineMath} from 'react-katex';
import FrequencyTableCalculatorResults from './FrequencyTableCalculatorResults';


class FrequencyTableCalculator extends React.Component {

  constructor(props) {
    super();

    //test rows

    const rows = List([
      Map({
        low: 0,
        high: 19999,
        frequency:344
      }),
      Map({
        low: 20000,
        high: 39999,
        frequency:98
      }),
      Map({
        low: 40000,
        high: 59999,
        frequency:52
      }),
      Map({
        low: 50000,
        high: 79999,
        frequency:19
      }),
      Map({
        low: 80000,
        high: 99999,
        frequency:13
      }),
      Map({
        low: 100000,
        high: 119999,
        frequency:6
      }),
      Map({
        low: 120000,
        high: 139999,
        frequency:2
      })
    ]);

    //: List([Map({low: 0, high: 1, frequency: 0})])

    this.state = {rows, ...props};
  }

  addRow() {
    const lastIndex = this.state.rows.count() - 1;
    const lastInterval = this.state.rows.getIn([lastIndex, 'high'], 1) - this.state.rows.getIn([lastIndex, 'low'], 0);
    const rows = this.state.rows.push(Map({
      low: this.state.rows.getIn([lastIndex, 'high']) + 1,
      high: this.state.rows.getIn([this.state.rows.count() - 1, 'high']) + 1,
      frequency: 0
    }));
    this.setState({
      rows
    });
  }

  removeRow(index) {
    const rows = this.state.rows.delete(index);
    this.setState({rows});
  }

  updateRow(index, field, value) {
    if (field === 'high' && index !== this.state.rows.count() - 1) {
      //calculate lo of next row, if it exists
      const rows = this.state.rows.setIn([index, field], parseInt(value)).setIn([index + 1, 'low'], parseInt(value) + 1);
      this.setState({
        rows
      });
      return;
    }

    const rows = this.state.rows.setIn([index, field], parseInt(value));
    this.setState({
      rows
    });
  }

  render() {

    const fi = this.state.rows.reduce((acca, current) => acca + current.get('frequency', 0), 0);

    return (
        <div className={'frequency-table-calculator'}>
          <table>
            <thead>
            <tr>
              <th>Class</th>
              <th>Frequency</th>
              <th><InlineMath math={'x_i'}/></th>
              <th><InlineMath math={'x_if_i'}/></th>
              <th><InlineMath math={'x_i - \\bar{x}'}/></th>
              <th><InlineMath math={'(x_i - \\bar{x})^2f_i'}/></th>
              <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {this.state.rows.map((row, index) => {

              const sigmafi = this.state.rows.reduce((acca, current) => acca+current.get('frequency', 0), 0) || 0;
              const sigmaxifi = this.state.rows.reduce((acca, current) => acca+((current.get('low', 0) + current.get('high', 1))/2) * current.get('frequency', 0), 0) || 0 ;
              const barx =  sigmaxifi/sigmafi || 0;

              const midpoint = (row.get('low', 0) + row.get('high', 0))/2;
              return <tr key={index}>
              <td>low: <input step={0.01} type={'number'} onChange={e => this.updateRow(index, 'low', e.target.value)}
                         value={row.get('low')} readOnly={index > 0}/> - high: <input step={0.01}  type={'number'}
                                                                                onChange={e => this.updateRow(index, 'high', e.target.value)}
                                                                                value={row.get('high')}/></td>
              <td><input type={'number'} onChange={e => this.updateRow(index, 'frequency', e.target.value)}
                         value={row.get('frequency')}/></td>
              <td>{midpoint}</td>
              <td>{midpoint * row.get('frequency')}</td>
              <td>
                {midpoint - barx}
              </td>
              <td>
                {Math.pow(midpoint - barx, 2) * row.get('frequency', 0)}
              </td>
              <td>
                {index === 0 ? null : <button onClick={() => this.removeRow(index)}>Remove</button>}
              </td>
            </tr>;})}
            </tbody>
          </table>

          <div className={'frequency-table-calculator__controls'}>
            <button onClick={this.addRow.bind(this)}>Add row</button>
          </div>

          <div className={'frequency-table-calculator__results-container'}>
            <FrequencyTableCalculatorResults rows={this.state.rows} />
          </div>
        </div>
    );
  }
}

export default connect(state => {
  return {};
}, actionCreators)(FrequencyTableCalculator);
