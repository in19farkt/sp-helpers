import * as React from 'react';
import * as block from 'bem-cn';
import { featureConnect } from 'core';

import { RouteComponentProps } from 'react-router-dom';

import * as searchImage from 'features/searchImage';

import './Layout.scss';

interface IOwnProps {
  searchImageEntry: searchImage.Entry;
}

type Props = IOwnProps & RouteComponentProps<void>;

const b = block('index-page');

class HomeLayout extends React.PureComponent<Props, {}> {

  public render() {
    const { Searcher } = this.props.searchImageEntry.containers;

    return (
      <div className={b()}>
        <Searcher />
      </div>
    );
  }
}

const withFeatures = featureConnect({
  searchImageEntry: searchImage.loadEntry,
})(HomeLayout);

export default withFeatures;
