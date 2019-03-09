import {Map} from 'immutable';
import {INITIAL_STATE} from './_initialState';
import {calculateNextState, changeRowOrColumnCount, togglePlay, toggleSelected} from './core';

export const gameOfLifeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GOL_CHANGE_ROW_OR_COLUMN_COUNT':
      return changeRowOrColumnCount(state, action.payload.key, action.payload.value);
    case 'GOL_TOGGLE_SELECTED':
      return toggleSelected(state, action.payload.coordinates);
    case 'GOL_TOGGLE_PLAY':
      return togglePlay(state, action.payload.override);
    case 'GOL_CALCULATE_NEXT_STATE':
      return calculateNextState(state);
    default: return state;
  }
};

export default gameOfLifeReducer;
