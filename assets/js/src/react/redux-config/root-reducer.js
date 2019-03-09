import {combineReducers} from 'redux-immutable';
import modal from '../ModalContainer/reducer';
import agony from '../AgonyCalculator/reducer';
import gameOfLife from '../GameOfLife/reducer';



const rootReducer = combineReducers({
  agony,
  gameOfLife,
  modal
});

export default rootReducer;
