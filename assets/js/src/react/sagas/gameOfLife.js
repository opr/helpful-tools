import {put, take, takeEvery, all, select, call, cancel, fork, cancelled, delay} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {calculateAgonyPrices} from '../AgonyCalculator/core';
import {calculateAgonyPrices as calculateAgonyPrices_action} from '../AgonyCalculator/actions';
import {setCostAndReturn} from '../AgonyCalculator/actions';
import {calculateNextState, togglePlayStateChanged} from '../GameOfLife/actions';

const gameTickHandler = function* () {
  yield takeEvery('GOL_GAME_TICK', function* (action) {
    put(calculateNextState());
  });
};

const playChange = function* () {
  yield takeEvery('GOL_TOGGLE_PLAY', function* () {
    yield put(togglePlayStateChanged());
  });
};

const playStateChanged = function* () {
  while(yield take('GOL_TOGGLE_PLAY_STATE_CHANGED')) {
    const playing = yield select(x => x.getIn(['gameOfLife', 'playing'], false));
    let emitter = null;
    if(playing) {
      emitter = yield fork(emitGameTicks);
      yield take('GOL_TOGGLE_PLAY_STATE_CHANGED');
      yield cancel(emitter);
    }
  }
};

const emitGameTicks = function * ()  {
  try {
    while(true) {
      yield(put(calculateNextState()));
      yield delay(300);
    }
  }
  finally {
    if(yield cancelled()) {
      console.log('game stopped');
    }
  }
};

export const gameOfLifeSaga = function* () {
  yield all([
    gameTickHandler(),
    playChange(),
    playStateChanged()
  ]);
};
