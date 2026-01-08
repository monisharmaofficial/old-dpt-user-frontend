import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Faq from '../homepage/Faq'
import Banner from '../attraction/banner'
import ContentSection from '../attraction/contentListing'

const attraction = () => {
  return (
    <div>
      <InnerHeader/>
      <Banner/>
      <ContentSection/>
      <Faq/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default attraction
