import * as NS from '../../namespace';
import initial from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'IMAGE_SEARCH:CHANGE_ALL_QUERIES': {
      return {
        ...state,
        queries: action.payload.split(/[\n\t]/).filter(item => item),
      };
    }
    default: return state;
  }
}
