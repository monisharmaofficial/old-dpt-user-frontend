import React from 'react'
import InnerHeader from '../common/InnerHeader'
import BreadCrum from '../trendingDetail/BreadCrum'
import TopSection from '../trendingDetail/TourTitle'
import ContentSection from '../trendingDetail/ContentSection'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import ReviewRatingSection from '../trendingDetail/ReviewRatingSection'
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
