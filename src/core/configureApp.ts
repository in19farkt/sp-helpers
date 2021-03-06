import configureDeps from './configureDeps';
import { TYPES, container } from './configureIoc';
import configureStore, { createReducer } from './configureStore';

import { HomeModule } from 'modules';

import { ReducersMap } from 'shared/helpers/redux';
import { IAppData, Module, RootSaga, IAppReduxState, IReduxEntry } from 'shared/types/app';

function configureApp(data?: IAppData): IAppData {
  /* Prepare main app elements */
  const modules: Module[] = [new HomeModule()];

  if (data) {
    return { ...data, modules };
  }

  const sharedReduxEntries: IReduxEntry[] = [];

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: ReducersMap<Partial<IAppReduxState>> = {};

  const { runSaga, store } = configureStore();
  container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);

  const dependencies = configureDeps(store);

  sharedReduxEntries.forEach(connectEntryToStore);
  modules.forEach((module: Module) => {
    module.dependencies = dependencies;
    module.store = store;
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace: boolean = keys.reduce<boolean>((acc, key: keyof typeof reducers) => {
        const featureReducer = reducers[key];
        if (!connectedReducers[key] && featureReducer) {
          connectedReducers[key] = featureReducer;
          return true;
        }
        return acc || false;
      }, false);

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>));
      }
    }

    if (sagas) {
      sagas.forEach((saga: RootSaga) => {
        if (!connectedSagas.includes(saga) && runSaga) {
          runSaga(saga(dependencies));
          connectedSagas.push(saga);
        }
      });
    }
  }

  return { modules, store };
}

export default configureApp;
