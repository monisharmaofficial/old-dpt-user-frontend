import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Memories from '../common/memories'
import Footer from '../common/Footer'
import CancellationPolicy from '../cancellationPolicy/cancellationPolicy'

const cancellationPolicy = () => {
  return (
    <div>
      <InnerHeader/>
      <CancellationPolicy/>
      <Memories/>
      <Footer/>
    </div>
  )
}

export default cancellationPolicy
