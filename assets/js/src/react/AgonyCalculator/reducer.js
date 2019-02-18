import {Map} from 'immutable';
import {INITIAL_STATE} from './_initialState';
import {changeValue, setCostAndReturn,} from './core';

export const agonyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'AGONY_CHANGE_VALUE':
      return changeValue(state, action.payload.key, action.payload.value);
    case 'AGONY_SET_COST_AND_RETURN':
      return setCostAndReturn(state, action.payload.sourceRequired, action.payload.totalOutlay, action.payload.profit);
    default: return state;
  }
};

export default agonyReducer;
