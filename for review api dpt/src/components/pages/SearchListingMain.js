import React from 'react'
import TourListing from '../searchListing/listingSection'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Faq from '../homepage/Faq'
import YouAlsoLike from '../TourPage/YouAlsoLike'
import TrendingPlaces from '../homepage/TrendingPlaces'
import BreadCrum from '../searchListing/BreadCrum'
import TopListing from '../searchListing/TopListingDetail'
import { useParams } from 'react-router-dom'

const TourListingMain = () => {
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

export default TourListingMain
