import React from 'react'
import {Link} from 'react-router-dom'
import './Style/TourPage.css'
import { useParams } from 'react-router-dom';

const BreadCrum = () => {
  const { title } = useParams();
  const formattedTitle = title
  .split('-') // Split by hyphens
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  .join(' ');
  const { country } = useParams();
  const formattedCategory = country
  .split('-') // Split by hyphens
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  .join(' ');
  const formattedLink = `/destination/${formattedCategory.replace(/ /g, "-").toLowerCase()}`;
  return (
    <div>
    <div className="BreadcrumbSection">
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`${formattedLink}`}>{formattedCategory}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{formattedTitle}</li>
        </ol>
      </nav>
    </div>
  </div>
    </div>
  )
}

export default BreadCrum
