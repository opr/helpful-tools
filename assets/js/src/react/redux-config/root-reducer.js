import {combineReducers} from 'redux-immutable';
import modal from '../ModalContainer/reducer';
import agony from '../AgonyCalculator/reducer';



const rootReducer = combineReducers({
  agony,
  modal
});

export default rootReducer;
