// MetaTags.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Add more meta tags if needed */}
    </Helmet>
  );
};

export default MetaTags;
