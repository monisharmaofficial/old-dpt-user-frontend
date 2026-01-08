// withMetaTags.jsx
import React from 'react';
import MetaTags from './metaTag';

const withMetaTags = (WrappedComponent, metaInfo) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <MetaTags {...metaInfo} />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withMetaTags;
