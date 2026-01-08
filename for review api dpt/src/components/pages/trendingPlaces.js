import React from 'react'
import TourListing from '../trendingPlaces/listingSection'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Faq from '../homepage/Faq'
import YouAlsoLike from '../trendingDetail/YouAlsoLike'
import TrendingPlaces from '../homepage/TrendingPlaces'
import BreadCrum from '../trendingPlaces/BreadCrum'
import TopListing from '../trendingPlaces/TopListingDetail'
import { useParams } from 'react-router-dom'

const EmiratesListingMain = () => {
  const {country} = useParams()
  return (
    <>
    <InnerHeader/>
    <BreadCrum/>
    <TopListing/>
    <TourListing/>
    <TrendingPlaces/>
    <YouAlsoLike/>
    <Faq/>
    <Memories/>
    <Footer/>
    </>
  )
}

export default EmiratesListingMain
