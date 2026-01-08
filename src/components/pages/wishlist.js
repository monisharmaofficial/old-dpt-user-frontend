import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Wishlist from '../whishlist/wishlist'
import BreadCrum from '../whishlist/breadcrum'

const wishlist = () => {
  return (
    <div>
      <InnerHeader/>
      <BreadCrum/>
      <Wishlist/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default wishlist
