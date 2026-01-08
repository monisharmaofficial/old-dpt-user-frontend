import React from 'react'
import InnerHeader from '../common/InnerHeader'
import BreadCrum from '../searchDetail/BreadCrum'
import TopSection from '../searchDetail/TourTitle'
import ContentSection from '../searchDetail/ContentSection'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import ReviewRatingSection from '../searchDetail/ReviewRatingSection'
import YouAlsoLike from '../trendingDetail/YouAlsoLike'

const DetailSection = () => {
 
  return (
    <div>
      <InnerHeader/>
      <BreadCrum/>
      <TopSection/>
      <ContentSection/>
      <ReviewRatingSection/>
      <YouAlsoLike/>
      <Memories/>
      <Footer/>
      
    </div>
  )
}

export default DetailSection
