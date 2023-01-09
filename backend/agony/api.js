import request from 'superagent';
import {fromJS} from 'immutable';
import {agonyIds, thermocatalyticPrice} from '../../assets/js/src/react/AgonyCalculator/data';

export const calculateAgony = async (source, result, count) => {
  let profit = 0;
  let totalOutlay = 0;
  let sourceRequired = 0;

  await request.get(`https://api.guildwars2.com/v2/commerce/prices`)
    .query({ids: `${source},${result}`})
    .then(res => {

      const sourceValue = agonyIds.getIn([source, 'value'], 0);

      const resultValue = agonyIds.getIn([result, 'value'], 0);


      const _sourceRequired = Math.pow(2, resultValue-(sourceValue)) * parseInt(count);

      const catalystRequired = _sourceRequired-1;
      const catalystPrice = catalystRequired * thermocatalyticPrice;
      const parsedResult = fromJS(JSON.parse(res.text));
      const sourcePrice = parsedResult.find(x => x.get('id', 0) === parseInt(source)).getIn(['buys', 'unit_price'], 0) * _sourceRequired;
      const resultPrice = parsedResult.find(x => x.get('id', 0) === parseInt(result)).getIn(['sells', 'unit_price'], 0) * parseInt(count);
      const sellPrice = resultPrice*0.85;
      const _totalOutlay = Math.ceil(sourcePrice + catalystPrice);
      const _profit = sellPrice - _totalOutlay;

      sourceRequired = _sourceRequired;
      totalOutlay = _totalOutlay;
      profit = _profit;

    })
    .catch(err => console.log(err));

  return JSON.stringify({name: 'abc', profit, totalOutlay, sourceRequired});
};
