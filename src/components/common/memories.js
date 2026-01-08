import React from 'react'
import {Link} from 'react-router-dom'

const memories = () => {
  return (
    <div>
    <div className="dubaimemories">
    <div className="container">
      <div className="dubaimemoriesIn">
        <h2>Dubai memories you'll never forget.</h2>
        <p>Explore the Emirates experience and plan an unforgettable trip beyond your flight.</p>
        <Link to="/tour/dubai">Explore Dubai</Link>
      </div>
    </div>
  </div>
    </div>
  )
}

export default memories
