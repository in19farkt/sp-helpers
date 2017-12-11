import { combineReducers, Reducer } from 'redux';
import { ReducersMap } from 'shared/helpers/redux';
import initial from '../initial';
import * as NS from '../../namespace';
import makeArrayFieldReducer from 'shared/helpers/redux/field/makeEditArrayFieldReducer';
import composeReducers from 'shared/helpers/redux/composeReducers';

export function editReducer(state: NS.IReduxState['edit'] = initial.edit, action: NS.Action): NS.IReduxState['edit'] {
  switch (action.type) {
    case 'IMAGE_SEARCH:CHANGE_ALL_QUERIES': {
      return {
        ...state,
        queries: {
          error: '',
          value: action.payload.split(/[\n\t]/).filter(item => item).map(item => item.replace(/вн\.брак/, '').trim()),
        },
      };
    }
    default: return state;
  }
}

export default composeReducers<NS.IReduxState['edit']>([
  editReducer as Reducer<NS.IReduxState['edit']>,
  combineReducers({
    queries: makeArrayFieldReducer<NS.IAddQuery, NS.IUpdateQuery, NS.IRemoveQuery>(
      'SEARCH_IMAGE:ADD_QUERY', 'SEARCH_IMAGE:UPDATE_QUERY', 'SEARCH_IMAGE:REMOVE_QUERY', initial.edit.queries,
    ),
  } as ReducersMap<NS.IReduxState['edit']>),
]);
