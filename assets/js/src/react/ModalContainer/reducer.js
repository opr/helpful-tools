import {Map} from 'immutable';
import {INITIAL_STATE} from './_initialState';
import {setModal, setModalMetaData, showModal} from './core';

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return setModal(state, action.payload.name);
    case 'SHOW_MODAL':
      return showModal(state,  action.payload.show);
    case 'SET_MODAL_METADATA':
      return setModalMetaData(state,  action.payload.metaData);
    default: return state;
  }
};

export default modalReducer;
