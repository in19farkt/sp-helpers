import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  data: {
    queries: [],
  },
  edit: {
    queries: { value: ['котики', 'мимими', 'уруруру'], error: '' },
  },
};

export default initialState;
