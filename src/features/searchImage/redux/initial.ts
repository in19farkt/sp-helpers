import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  data: {
    queries: [],
  },
  edit: {
    queries: { value: [], error: '' },
  },
};

export default initialState;
