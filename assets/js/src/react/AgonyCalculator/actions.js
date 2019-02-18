export const changeValue = (key, value) => ({type: 'AGONY_CHANGE_VALUE', payload: {key, value}});
export const calculateAgonyPrices = () => ({type: 'AGONY_CALCULATE'});
export const setCostAndReturn = (sourceRequired, totalOutlay, profit) => ({type: 'AGONY_SET_COST_AND_RETURN', payload: {sourceRequired, profit, totalOutlay}});
