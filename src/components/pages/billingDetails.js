import React from 'react'
import Header from '../common/InnerHeader'
import Footer from '../common/Footer'
import BreadCrum from '../billingDetails/breadCrum'
import PersonBilling from '../billingDetails/personDetail'

const billingDetails = () => {
  return (
    <div>
      <Header/>
      <BreadCrum/>
      <PersonBilling/>
      <Footer/>
    </div>
  )
}

export default billingDetails
