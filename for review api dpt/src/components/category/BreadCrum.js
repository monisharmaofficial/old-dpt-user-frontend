import React from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './Style/category.css'

const BreadCrum = () => {
    const { categoryName } = useParams();
    const formattedCategory = categoryName
    .split('-') // Split by hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' ');
  return (
    <>
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
    </>
  )
}

export default BreadCrum
