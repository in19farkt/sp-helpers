import { IReduxField } from 'shared/helpers/redux';
import { IAction } from 'shared/types/app';
import { IAddAction, IUpdateAction, IRemoveAction } from 'shared/helpers/redux/field/makeEditArrayFieldReducer';

export interface IReduxState {
  data: {
    queries: string[];
  };
  edit: {
    queries: IReduxField<string[]>;
  };
}

export type IChangeAllQueries = IAction<'IMAGE_SEARCH:CHANGE_ALL_QUERIES', string>;

export type IAddQuery = IAddAction<'SEARCH_IMAGE:ADD_QUERY', string>;
export type IUpdateQuery = IUpdateAction<'SEARCH_IMAGE:UPDATE_QUERY', string>;
export type IRemoveQuery = IRemoveAction<'SEARCH_IMAGE:REMOVE_QUERY'>;

export type Action =
  | IChangeAllQueries;
