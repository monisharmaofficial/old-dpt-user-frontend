import React from 'react'
import InnerHeader from '../common/InnerHeader'
import BreadCrum from '../destinationDetail/BreadCrum'
import TopSection from '../destinationDetail/TourTitle'
import ContentSection from '../destinationDetail/ContentSection'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import ReviewRatingSection from '../destinationDetail/ReviewRatingSection'
import YouAlsoLike from '../destinationDetail/YouAlsoLike'

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
