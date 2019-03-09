import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../redux-config/root-reducer';
import {Map} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {modalSaga} from '../sagas/modals';
import {agonySaga} from '../sagas/agony';
import {gameOfLifeSaga} from '../sagas/gameOfLife';

const makeStore = () => {
  const sagas = [agonySaga, gameOfLifeSaga, modalSaga];
  const INITIAL_STATE = Map({});
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  if(process.env.NODE_ENV !== 'production') {
    const composeEnhancers = composeWithDevTools({
      name: 'DarwinTools redux store'
    });
    const store = createStore(rootReducer, INITIAL_STATE, composeEnhancers(
      applyMiddleware(...middleware)
    ));
    sagas.forEach(saga => sagaMiddleware.run(saga));
    return store;
  }
  const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(sagaMiddleware));
  sagas.forEach(saga => sagaMiddleware.run(saga));
  return store;

};

export default makeStore();
