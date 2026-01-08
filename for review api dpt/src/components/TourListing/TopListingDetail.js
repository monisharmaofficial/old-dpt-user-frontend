import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router if you are using it
import { useParams } from 'react-router-dom';
const TopListing = () => {
  const { country } = useParams();
  const formattedCategory = country
  .split('-') // Split by hyphens
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
  .join(' ');
  return (
    <div>
      <div className="TopSection">
        <div className="container">
          <div className="TopSectionWrapper">
            <h1>{formattedCategory}</h1>
            <div className="TopSectionRHS">
              <div className="telrow">
                <Link to="tel:+971559554333">+971 55 955 4333</Link>
                <Link to="tel:+97143961444">+971 4 3961 444</Link>
              </div>
              <div className="tel">
                <Link to="tel:+18006590187">+1 (800) 659 0187</Link>
                <div className="tollfree">
                  <span>Toll Free Number</span>
                  <span>USA</span>
                </div>
              </div>
            </div>
            {/* TopSectionRHS */}
          </div>
          {/* TopSectionWrapper */}
          <div className="GetinTouch">
            <div className="GetinTouchWrapper">
              <div className="time">5 Hours</div>
              <div className="location">{formattedCategory}</div>
              {/* <div className="review">
                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1697704991/ratingstar_p0ani1.png"} alt="" />4.5 | 500 Reviews
              </div> */}
            </div>
            {/* GetinTouchWrapper */}
          </div>
          {/* GetinTouch */}
        </div>
        {/* container */}
      </div>
    </div>
  );
}

export default TopListing;
