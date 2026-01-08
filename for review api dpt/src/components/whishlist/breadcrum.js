import React from 'react'
import {Link} from 'react-router-dom'

const BreadCrum = () => {
  return (
    <div>
    <div class="BreadcrumbSection">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
        </ol>
      </nav>
    </div>
  </div>
    </div>
  )
}

export default BreadCrum
