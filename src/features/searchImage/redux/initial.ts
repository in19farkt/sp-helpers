import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  data: {
    queries: [],
  },
  edit: {
    queries: { value: ['dfgsdfg', 'sadfasdfs', 'sdfasdf'], error: '' },
  },
};

export default initialState;
