import * as React from 'react';
import * as block from 'bem-cn';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAppReduxState, IReduxField } from 'shared/types/app';

import { actions, selectors } from '../../../redux';

import './styles.scss';

interface IStateProps {
  editQueries: IReduxField<string[]>;
}

interface IActionProps {
  changeAllQueries: typeof actions.changeAllQueries;
  updateQuery: typeof actions.updateQuery;
}

type Props = IActionProps & IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    editQueries: selectors.selectEditQueries(state),
  };
}

function mapDispatch(dispatch: Dispatch<any>): IActionProps {
  return bindActionCreators({
    changeAllQueries: actions.changeAllQueries,
    updateQuery: actions.updateQuery,
  }, dispatch);
}

const b = block('categories-select');

class CategorySelect extends React.PureComponent<Props, {}> {
  public render() {
    const {  } = this.props;

    return (
      <div className={b()}>qweqwe</div>
    );
  }
}

export { Props, CategorySelect };
export default connect(mapState, mapDispatch)(CategorySelect);
