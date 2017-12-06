import * as NS from './../../namespace';

export function changeAllQueries(value: string): NS.IChangeAllQueries {
  return { type: 'IMAGE_SEARCH:CHANGE_ALL_QUERIES', payload: value };
}

export function addQuery(value: string): NS.IAddQuery {
  return { type: 'SEARCH_IMAGE:ADD_QUERY', payload: value };
}

export function updateQuery(item: string, index: number): NS.IUpdateQuery {
  return { type: 'SEARCH_IMAGE:UPDATE_QUERY', payload: { index, item } };
}

export function removeQuery(index: number): NS.IRemoveQuery {
  return { type: 'SEARCH_IMAGE:REMOVE_QUERY', payload: index };
}
