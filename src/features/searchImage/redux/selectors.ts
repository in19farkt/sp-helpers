import { IAppReduxState, IReduxField } from 'shared/types/app';
import { IReduxState } from '../namespace';

export function selectState(state: IAppReduxState): IReduxState {
  if (!state.searchImage) {
    throw new Error('Cannot find categorySelect feature state!');
  }

  return state.searchImage;
}

export function selectOriginalQueries(state: IAppReduxState): string[] {
  return selectState(state).data.queries;
}

export function selectEditQueries(state: IAppReduxState): IReduxField<string[]> {
  return selectState(state).edit.queries;
}
