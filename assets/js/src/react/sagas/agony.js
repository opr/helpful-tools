import {put, takeEvery, all, select} from 'redux-saga/effects';
import {calculateAgonyPrices} from '../AgonyCalculator/core';
import {calculateAgonyPrices as calculateAgonyPrices_action} from '../AgonyCalculator/actions';
import {setCostAndReturn} from '../AgonyCalculator/actions';

const calculateAgony = function* () {
  yield takeEvery('AGONY_CALCULATE', function* (action) {
    const result = yield calculateAgonyPrices(yield select(state => state));
    yield put(setCostAndReturn(result.sourceRequired, result.totalOutlay, result.profit));
  });
};

const recalculateAfterChange = function* () {
  yield takeEvery('AGONY_CHANGE_VALUE', function* () {
    yield put(calculateAgonyPrices_action());
  });
};

export const agonySaga = function* () {
  yield all([
    calculateAgony(),
    recalculateAfterChange()
  ]);
};
