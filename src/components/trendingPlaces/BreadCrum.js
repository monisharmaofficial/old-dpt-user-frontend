import React from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BreadCrum = () => {
  const { title } = useParams();
  const formattedTitle = title
  .split('-') // Split by hyphens
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  .join(' ');
  return (
    <div>
      <Helmet>
        <title>{formattedTitle}</title>
        <meta name="description" content={formattedTitle} />
        <meta name="keywords" content={formattedTitle} />
        {/* Add other meta tags if needed */}
      </Helmet>
    <div className="BreadcrumbSection">
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{formattedTitle }</li>
        </ol>
      </nav>
    </div>
  </div>
    </div>
  )
}

export default BreadCrum
