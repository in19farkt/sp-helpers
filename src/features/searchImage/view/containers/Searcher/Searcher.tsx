import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAppReduxState, IReduxField } from 'shared/types/app';

import { actions, selectors } from '../../../redux';

import { Input, Button } from 'antd';
import './Searcher.scss';

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

const b = block('searcher');

class Searcher extends React.PureComponent<Props, {}> {
  public render() {
    const { editQueries } = this.props;

    return (
      <div className={b()}>
        <Input
          value=""
          onPaste={this.onAllQueriesChange}
          placeholder={'Сюда вставляй все запросы, разделитель "\\n"'}
        />
        <div className={b('list')()}>
          {editQueries.value.map((query, index) => (
            <div className={b('item')()}>
              <div className={b('input')()}>
                <Input id={this.getInputID(index)} value={query} onChange={this.onChangeItem.bind(null, index)} />
              </div>
              <div className={b('btn')()}>
                <Button onClick={this.onCopyClick.bind(null, index)}>Copy</Button>
              </div>
              {this.renderLinks(query)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private renderLinks(query: string) {
    const hrefOzon: string = encodeURI(`http://www.ozon.ru/?context=search&text=${query}`);
    const hrefYandex: string = encodeURI(`https://yandex.ru/search/?text=${query}`);

    return [
      <a key="1" target="_blank" className={b('link')()} href={hrefOzon}>OZON</a>,
      <a key="2" target="_blank" className={b('link')()} href={hrefYandex}>Yandex</a>,
    ];
  }

  @bind
  private onChangeItem(index: number, e: React.FormEvent<HTMLInputElement>) {
    this.props.updateQuery(index, e.currentTarget.value);
  }

  @bind
  private onAllQueriesChange(e: React.ClipboardEvent<HTMLInputElement>) {
    const { changeAllQueries } = this.props;
    changeAllQueries(e.clipboardData.getData('text/plain'));
  }

  @bind
  private onCopyClick(index: number) {
    const input = window.document.getElementById(this.getInputID(index)) as (HTMLInputElement | null);

    if (!input) { return; }

    input.select();
    window.document.execCommand('copy');
  }

  @bind
  private getInputID(index: number): string {
    return `query-search-${index}`;
  }
}

export { Props, Searcher };
export default connect(mapState, mapDispatch)(Searcher);
