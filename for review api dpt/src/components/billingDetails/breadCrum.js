import React from 'react'
import { Link } from 'react-router-dom'
import './style/billing.css'

const breadCrum = () => {
  return (
    <div>
    <div className="BreadcrumbSection">
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/cart">Cart </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Billing Details
          </li>
        </ol>
      </nav>
    </div>
  </div>
  
    </div>
  )
}

export default breadCrum
