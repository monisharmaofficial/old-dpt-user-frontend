import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Memories from '../common/memories'
import Footer from '../common/Footer'
import TermCondition from '../termCondition/termCondition'

const termCondition = () => {
  return (
    <div>
      <InnerHeader/>
      <TermCondition/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default termCondition
