import { Reducer } from 'redux';

import { IAction, IReduxField, Validator } from '../namespace';

export type IAddAction<AT, IT> = IAction<AT, IT>;

export type IRemoveAction<AT> = IAction<AT, number>;

interface IUpdatePayload<T> {
  index: number;
  item: T;
}

export type IUpdateAction<AT, IT> = IAction<AT, IUpdatePayload<IT>>;

export default function makeArrayFieldReducer<
  A extends IAddAction<string, T>,
  U extends IUpdateAction<string, T>,
  R extends IRemoveAction<string>,
  T = A['payload']
  >(
  addType: A['type'],
  updateType: U['type'],
  removeType: R['type'],
  initial: IReduxField<T[]>,
  validator?: Validator<T[]>,
): Reducer<IReduxField<T[]>> {
  return function arrayFieldReducer(
    state: IReduxField<T[]> = initial, action: A | U | R,
  ): IReduxField<T[]> {
    switch (action.type) {
      case addType: {

        const nextValue = [...state.value, (action as A).payload];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case removeType: {
        const payload = (action as R).payload;
        const nextValue = [
          ...state.value.slice(0, payload),
          ...state.value.slice(payload + 1),
        ];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case updateType: {
        const { index, item } = (action as U).payload;
        const nextValue = [...state.value.slice(0, index), item, ...state.value.slice(index + 1)];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, value: nextValue, error };
      }

      default: return state;
    }
  } as Reducer<IReduxField<T[]>>;
}
