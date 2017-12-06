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

class HomeLayout extends React.PureComponent<Props, {}> {
  private b = block('index-page');

  public render() {
    const b = this.b;

    return (
      <div className={b()}>
        <div className={b('content')()}>
          asd
        </div>
      </div>
    );
  }
}

const withFeatures = featureConnect({
  searchImageEntry: searchImage.loadEntry,
})(HomeLayout);

export default withFeatures;
