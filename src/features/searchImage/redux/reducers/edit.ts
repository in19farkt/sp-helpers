import { combineReducers } from 'redux';
import { ReducersMap } from 'shared/helpers/redux';
import initial from '../initial';
import * as NS from '../../namespace';
import makeArrayFieldReducer from 'shared/helpers/redux/field/makeEditArrayFieldReducer';

export default combineReducers({
  queries: makeArrayFieldReducer<NS.IAddQuery, NS.IUpdateQuery, NS.IRemoveQuery>(
    'SEARCH_IMAGE:ADD_QUERY', 'SEARCH_IMAGE:UPDATE_QUERY', 'SEARCH_IMAGE:REMOVE_QUERY', initial.edit.queries,
  ),
} as ReducersMap<NS.IReduxState['edit']>);
