import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';

import { SagaIterator } from 'redux-saga';

import { namespace as SearchImageNS } from 'features/searchImage';

import Api from 'services/api/Api';

export abstract class Module<C = any> {
  public components?: C; // available componens to pass in other modules

  protected _store: Store<IAppReduxState> | null = null;
  protected _deps: IDependencies | null = null;

  protected extraComponents?: { [key: string]: React.ReactElement<any> | React.ComponentClass<any> | null; };

  public set store(store: Store<IAppReduxState>) {
    this._store = store;
  }

  public set dependencies(value: IDependencies) {
    this._deps = value;
  }

  protected get deps(): IDependencies | null {
    return this._deps || null;
  }

  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  public getReduxEntry?(): IReduxEntry;

  public setExtraComponent(key: keyof C, component: React.ReactElement<any>): void {
    if (this.extraComponents) {
      this.extraComponents[key] = component;
    } else {
      throw new Error('Cannot set module extra component: no requirements found for extra component');
    }
  }
}

export interface IAppData {
  modules: Module[];
  store: Store<IAppReduxState>;
}
export type OnConnectRequestHandler = (reducers: Array<IReducerData<any>>, sagas: RootSaga[]) => void;

export interface IReducerData<S> {
  name: string;
  reducer: Reducer<S>;
}

export interface IDependencies {
  api: Api;
}

export type IDictionary<T, S extends string = string> = {
  [key in S]: T;
};

export interface IReduxEntry {
  reducers?: {[key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]>};
  sagas?: RootSaga[];
}

// TODO: add averload for aptional A, S, C
export interface IFeatureEntry<
  C extends IDictionary<ReactComponent<any>, keyof C> | void,
  A extends IDictionary<ActionCreator<Action>, keyof A> | void,
  S extends IDictionary<(state: any, ...args: any[]) => any, keyof S> | void,
  > extends IReduxEntry {
  actions: A;
  selectors: S;
  containers: C;
}

export interface IAppReduxState {
  searchImage: SearchImageNS.IReduxState;
}

export type Diff<T extends string, U extends string> =
  ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type ReactComponent<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
export interface IModuleEntryData {
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  reducers: Array<IReducerData<any>>;
  sagas: RootSaga[];
}

export type Uid = number;

export * from '../helpers/redux/namespace';
