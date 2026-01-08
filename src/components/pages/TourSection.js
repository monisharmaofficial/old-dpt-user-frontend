import React from 'react'
import InnerHeader from '../common/InnerHeader'
import BreadCrum from '../TourPage/BreadCrum'
import TopSection from '../TourPage/TourTitle'
import ContentSection from '../TourPage/ContentSection'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import ReviewRatingSection from '../TourPage/ReviewRatingSection'
import YouAlsoLike from '../TourPage/YouAlsoLike'

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
