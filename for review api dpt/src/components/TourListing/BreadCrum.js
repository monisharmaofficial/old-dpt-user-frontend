import React from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BreadCrum = () => {
  const { country } = useParams();
  const formattedCategory = country
  .split('-') // Split by hyphens
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  .join(' ');
  return (
    <div>
      <Helmet>
        <title>{formattedCategory}</title>
        <meta name="description" content={formattedCategory} />
        <meta name="keywords" content={formattedCategory} />
        {/* Add other meta tags if needed */}
      </Helmet>
    <div className="BreadcrumbSection">
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{formattedCategory}</li>
        </ol>
      </nav>
    </div>
  </div>
    </div>
  )
}

export default BreadCrum
