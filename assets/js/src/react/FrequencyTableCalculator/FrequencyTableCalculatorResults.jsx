import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import { InlineMath, BlockMath } from 'react-katex';


class FrequencyTableCalculatorResults extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  render() {
    const sigmafi = this.props.rows.reduce((acca, current) => acca+current.get('frequency', 0), 0) || 0;
    const sigmaxifi = this.props.rows.reduce((acca, current) => acca+((current.get('low', 0) + current.get('high', 1)+1)/2) * current.get('frequency', 0), 0) || 0 ;
    const barx =  sigmaxifi/sigmafi || 0;
    const sigmaxLessBarxSquared = this.props.rows.reduce((acca, current)=> {
      const x = (current.get('low', 0) + current.get('high', 1)+1)/2;
      return acca + (Math.pow(x-barx, 2))*current.get('frequency', 0);
    }, 0);

    return (
      <div className={'frequency-table-calculator-results'}>
        <div><InlineMath math={`\\Sigma f_i = ${sigmafi}`} /></div>
        <div><InlineMath math={`\\Sigma x_if_i = ${sigmaxifi}`} /></div>
        Sample mean: <InlineMath math={`{\\bar{x}} = {{\\Sigma x_if_i}\\over{\\Sigma f_i}} = {${sigmaxifi}\\over${sigmafi}} = {${barx}}`}/>
        <br />

        <InlineMath math={`s = {{{\\sqrt{{\\Sigma (x_i - \\bar{x})^2 f_i}\\over{{\\Sigma f_i} -1}}}} = {\\sqrt{{${sigmaxLessBarxSquared}}\\over{${sigmafi-1}}}}} =  ${Math.sqrt(sigmaxLessBarxSquared/(sigmafi-1))}`}/>
      </div>
    );
  }
}

export default connect(state => {
  return {};
}, actionCreators)(FrequencyTableCalculatorResults);
