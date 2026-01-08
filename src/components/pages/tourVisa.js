import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import YouAlsoLike from '../TourPage/YouAlsoLike'
import BreadCrum from '../tourVisa/breadcrum'
import TourVisa from '../tourVisa/tourVisa'

const tourVisa = () => {
  return (
    <div>
        <InnerHeader/>
        <BreadCrum/>
        <TourVisa/>
        <YouAlsoLike/>
        <Memories/>
        <Footer/>
      
    </div>
  )
}

export default tourVisa
