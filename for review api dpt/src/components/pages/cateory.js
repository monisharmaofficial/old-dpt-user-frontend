import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import Faq from '../homepage/Faq'
import CustomerSay from '../category/CustomerSay'
import CategoryToursDescription from '../category/CategoryToursDescription'
import Banner from '../category/Banner'
import BreadCrum from '../category/BreadCrum'
import ContentSection from '../category/ContentSection'

const cateory = () => {
  return (
    <div>
      <InnerHeader/>
      <Banner/>
      <BreadCrum/>
      <ContentSection/>

      <CategoryToursDescription/>

      <CustomerSay/>
      <Faq/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default cateory
