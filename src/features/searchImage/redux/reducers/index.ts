import { combineReducers, Reducer } from 'redux';

import { dataReducer } from './data';
import editReducer from './edit';

import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/app';

const reducer: Reducer<NS.IReduxState> = combineReducers({
  data: dataReducer,
  edit: editReducer,
} as ReducersMap<NS.IReduxState>);

export default reducer;
