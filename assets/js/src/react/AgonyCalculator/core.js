import request from 'superagent';

export const changeValue = (state, key, value) => state.setIn([key], value);

export const calculateAgonyPrices = async state => {
  const source = state.getIn(['agony', 'source'], 1);
  const result = state.getIn(['agony', 'result'], 2);
  const count = state.getIn(['agony', 'count'], 1);

  let sourceRequired = 0;
  let totalOutlay = 0;
  let profit = 0;

  await request.get('/api/agonyPrices')
    .query({source, result, count})
    .then((res) => {
      const parsedResult = JSON.parse(res.text);
      profit = parsedResult.profit;
      totalOutlay = parsedResult.totalOutlay;
      sourceRequired = parsedResult.sourceRequired;
    })
    .catch(err => console.log(err));
  return {sourceRequired, totalOutlay, profit};
};


export const setCostAndReturn = (state, sourceRequired, totalOutlay, profit) => state.set('sourceRequired', sourceRequired).set('totalOutlay', totalOutlay).set('profit', profit);
