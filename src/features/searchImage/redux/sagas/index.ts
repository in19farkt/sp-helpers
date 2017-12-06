// import * as actions from '../actions';

import { IDependencies } from 'shared/types/app';
import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';

export function getSaga(deps: IDependencies) {
  return function* saga() {
    yield call(delay, 400);
  };
}

export default getSaga;
