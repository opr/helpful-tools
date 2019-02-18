import React from 'react';
import PropTypes from 'prop-types';
export const GoldRenderer = props => {
  const A1 = props.total;
  const gold = parseInt(A1/(100*100));
  const silver = parseInt((A1 - (gold*100*100))/100);
  const copper = parseInt((A1 - (gold*100*100) - silver*100));
  return <div>{`${gold}g ${silver}s ${copper}c`}</div>;
};

GoldRenderer.propTypes = {
  total: PropTypes.number.isRequired
};
