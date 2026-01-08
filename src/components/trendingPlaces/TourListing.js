import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Faq from '../homepage/Faq'
import YouAlsoLike from '../trendingDetail/YouAlsoLike'

const TourListing = () => {
  return (
    <div>
      <InnerHeader/>
      <YouAlsoLike/>
      <Faq/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default TourListing
