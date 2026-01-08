import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import {Link} from 'react-router-dom'
import './style/thankyou.css'

const thankyouPage = () => {
  return (
    <div>
      <InnerHeader/>
      <div className="thankyoulayer">
  <div className="container">
    <div className="thankyouWrapper">
      <h2>thank you!</h2>
      <h1>We wish you a happy journey.</h1>
      <Link to="/tour/dubai" className="cta">
        Explore Dubai
      </Link>
    </div>
    {/*thankyouWrapper*/}
  </div>
</div>

      <Footer/>
    </div>
  )
}

export default thankyouPage
