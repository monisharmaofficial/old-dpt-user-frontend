import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'; // Import the Slider component
import 'rc-slider/assets/index.css';
import './Style/category.css'
import { data } from '../../data/TourListing'
import config from '../../config'
import { connect } from 'react-redux';

const CategoryLHS = ({
  selectedCurrency,
  handlePriceFilter,
  handleCloseSidebar,
  handleDurationFilterChange,
  priceRange,
  handleRatingFilterChange,
  selectedRatingFilter
}) => {
  const [selectedDurationFilter, setSelectedDurationFilter] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [userDiscount, setUserDiscount] = useState(null);
  const [tourList, setTourList] = useState([]);

  const toggleSidebarMenu = () => {
    setIsSidebarMenuOpen(!isSidebarMenuOpen);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/tour-list`);
        const data = await response.json();
        setTourList(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const toggleCategories = () => {
    setShowAllCategories(!showAllCategories);
  }

  const handleDurationCheckboxChange = (event, selectedDurations) => {
    let updatedDurationFilter = selectedDurationFilter ? [...selectedDurationFilter] : [];

    if (event.target.checked) {
      updatedDurationFilter = updatedDurationFilter.concat(selectedDurations);
    } else {
      selectedDurations.forEach((duration) => {
        const index = updatedDurationFilter.indexOf(duration);
        if (index !== -1) {
          updatedDurationFilter.splice(index, 1);
        }
      });
    }

    setSelectedDurationFilter(updatedDurationFilter.length > 0 ? updatedDurationFilter : null);
    handleDurationFilterChange(updatedDurationFilter.length > 0 ? updatedDurationFilter : null);
  };

  return (
    <>
      <div className="CategoryTopSectionLHS" id="sidebarFilter">
        <div className="Attractions">
          <div className="titleRow">
            <div className="icon">
              <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1697701972/locationicon_oyxdy0.png"} alt="" />
            </div>
            <div className="title">
              Tour Listing <span className="closeIcon" onClick={handleCloseSidebar}/>
            </div>
          </div>
          <ul>
          { tourList.slice(0, 8).map((item, index) => (
            <li key={index}><Link to={`/tour/dubai/${item.slug}`} style={{ color: 'black' }}>{item.tour_name}</Link></li>
          ))}
        </ul>

        </div>
        <div className="CategoryTopLHSHd">
          <div className="title">select Preference</div>
          <div>
            <div className="DurationDiv">
              <div className="sidebarlabel">
                <h3>Duration</h3>
              </div>
              <div className="checkBoxDiv">
                {/* Checkbox for 1 Hour */}
                <div>
                  <label className="CheckboxIn">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        value="1 Hour"
                        onChange={(event) =>
                          handleDurationCheckboxChange(event, ["1 Hour"])
                        }
                      />
                      <span className="checkmark"></span>
                    </div>
                    <div className="checkboxText">
                      <div className="CheckboxSublabel">1 Hour</div>
                    </div>
                  </label>
                </div>
                {/* Checkbox for 1 to 4 hours */}
                <div>
                  <label className="CheckboxIn">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        value="1 to 4 hours"
                        onChange={(event) =>
                          handleDurationCheckboxChange(event, ["2 Hours", "3 Hours", "4 Hours"])
                        }
                      />
                      <span className="checkmark"></span>
                    </div>
                    <div className="checkboxText">
                      <div className="CheckboxSublabel">1 to 4 hours</div>
                    </div>
                  </label>
                </div>
                {/* Checkbox for 4 hours to 1 day */}
                <div>
                  <label className="CheckboxIn">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        value="4 hours to 1 day"
                        onChange={(event) =>
                          handleDurationCheckboxChange(event, ["4 Hours", "5 Hours", "6 Hours", "7 Hours", "8 Hours", "9 Hours", "10 Hours", "11 Hours", "12 Hours", "13 Hours", "14 Hours", "15 Hours", "16 Hours", "17 Hours", "18 Hours", "19 Hours", "20 Hours", "21 Hours", "22 Hours", "23 Hours", "24 Hours", "1 Day"])
                        }
                      />
                      <span className="checkmark"></span>
                    </div>
                    <div className="checkboxText">
                      <div className="CheckboxSublabel">4 hours to 1 day</div>
                    </div>
                  </label>
                </div>
                {/* Checkbox for 1 to 3 days */}
                <div>
                  <label className="CheckboxIn">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        value="1 to 3 days"
                        onChange={(event) =>
                          handleDurationCheckboxChange(event, ["1 Day", "2 Days", "3 Days"])
                        }
                      />
                      <span className="checkmark"></span>
                    </div>
                    <div className="checkboxText">
                      <div className="CheckboxSublabel">1 to 3 days</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="RangeSlider">
            <div className="sidebarlabel">
              <h3>Price</h3>
            </div>
            <div className="RangeSliderIn">
              <div className="rangeSliderTopLayer">
                <div className="leftSideFilter">
                  <div className="priceRangeSlider">
                    <Slider
                      min={0}
                      max={5000}
                      step={1}
                      range // Enable the range mode
                      value={priceRange}
                      onChange={(value) => handlePriceFilter(value)}
                    />
                    <div className="priceRangeLabel">
                      Price Range: AED {priceRange[0].toLocaleString('en-US')} - {priceRange[1].toLocaleString('en-US')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    { /*     <div className="RatingDiv">
            <div className="sidebarlabel">
              <h3>Rating</h3>
            </div>
            <div className="RadioBox">
              <div>
                <label className="RadioBoxIn">
                  <div className="radioboxField">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={selectedRatingFilter === 2}
                      onChange={() => handleRatingFilterChange(2)}
                    />


                    <span className="checkmark" />
                  </div>
                  <div className="radioboxText">
                    <div className="radioboxSublabel">
                      <span className="imageStarRating">
                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738115/ratingstar_nisesy.png"} alt="" />
                      </span>
                      <div className="ratingSubtext">2+</div>
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <label className="RadioBoxIn">
                  <div className="radioboxField">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={selectedRatingFilter === 3}
                      onChange={() => handleRatingFilterChange(3)}
                    />
                    <span className="checkmark" />
                  </div>
                  <div className="radioboxText">
                    <div className="radioboxSublabel">
                      <span className="imageStarRating">
                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738115/ratingstar_nisesy.png"} alt="" />
                      </span>
                      <div className="ratingSubtext">3+</div>
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <label className="RadioBoxIn">
                  <div className="radioboxField">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={selectedRatingFilter === 4}
                      onChange={() => handleRatingFilterChange(4)}
                    />
                    <span className="checkmark" />
                  </div>
                  <div className="radioboxText">
                    <div className="radioboxSublabel">
                      <span className="imageStarRating">
                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738115/ratingstar_nisesy.png"} alt="" />
                      </span>
                      <div className="ratingSubtext">4+</div>
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <label className="RadioBoxIn">
                  <div className="radioboxField">
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={selectedRatingFilter === 5}
                      onChange={() => handleRatingFilterChange(5)}
                    />
                    <span className="checkmark" />
                  </div>
                  <div className="radioboxText">
                    <div className="radioboxSublabel">
                      <span className="imageStarRating">
                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738115/ratingstar_nisesy.png"} alt="" />
                      </span>
                      <div className="ratingSubtext">5</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>*/}
        </div>
        <div className="DubaiPrivateTour">
                <div
                  className="TA_selfserveprop"
                  id="TA_selfserveprop642"
                  style={{ width: "100%" }}
                >
                  <div id="CDSWIDSSP" className="widSSP widSSPnarrow" style={{ width: 240 }}>
                    <div className="widSSPData" style={{ border: "1px solid #589442" }}>
                      <div className="widSSPBranding">
                        <dl>
                          <dt>
                            <Link target="_blank" to="https://www.tripadvisor.com/">
                              <img
                                src="https://www.tripadvisor.com/img/cdsi/img2/branding/150_logo-11900-2.png"
                                alt="TripAdvisor"
                              />
                            </Link>
                          </dt>
                          <dt className="widSSPTagline">
                            Know better. Book better. Go better.
                          </dt>
                        </dl>
                      </div>
                      {/*/ cdsBranding*/}
                      <div className="widSSPComponent">
                        <div className="widSSPSummary">
                          <dl>
                            <Link
                              target="_blank"
                              to="https://www.tripadvisor.com/Attraction_Review-g295424-d2510773-Reviews-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html"
                              onclick="ta.cds.handleTALink(11900,this);return true;"
                              rel="nofollow"
                            >
                              <dt className="widSSPH18">Dubai Private Tour</dt>
                            </Link>
                          </dl>
                        </div>
                        {/*/ cdsSummary*/}{" "}
                      </div>
                      {/*/ cdsComponent*/}
                      <div className="widSSPComponent widSSPOptional">
                        <div className="widSSPTrvlRtng">
                          <dl>
                            <dt className="widSSPH11">TripAdvisor Traveler Rating</dt>
                            <dd>
                              <div className="widSSPOverall">
                                <img
                                  src="https://static.tacdn.com/img2/ratings/traveler/s5.0.gif"
                                  alt="5.0 of 5 bubbles"
                                  className="rsImg"
                                />
                                <div>
                                  Based on <b>1,420</b> traveler reviews
                                </div>
                              </div>
                              {/*/ overall */}{" "}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      {/*/ cdsComponent */}
                      <div className="widSSPWrap widSSPOptional">
                        <div className="widSSPInformation">
                          <div className="widSSPWrap">
                            <div className="widSSPPopIdx widSSPSingle">
                              <b>TripAdvisor Ranking</b>
                              <span className="widSSPPopIdxData">
                                {" "}
                                <span className="widSSPPopIdxData widSSPPopIdxNumbers">
                                  {" "}
                                  <sup>#</sup>5 of 341{" "}
                                </span>{" "}
                                Outdoor Activities in Dubai{" "}
                              </span>
                            </div>
                            {/*/ popIdx*/}{" "}
                          </div>
                          {/*/ cdsWrap*/}{" "}
                        </div>
                        {/*/ cdsInformation*/}{" "}
                      </div>
                      {/*/ cdsWrap*/}
                      <div className="widSSPComponent widSSPOptional">
                        <dl className="widSSPReviews">
                          <dt className="widSSPH11">Most Recent Traveler Reviews</dt>
                          <dd className="widSSPOneReview">
                            <ul className="widSSPBullet">
                              <li>
                                <span className="widSSPDate">Dec 21, 2016:</span>{" "}
                                <span className="widSSPQuote">“Excellent your group”</span>
                              </li>
                              <li>
                                <span className="widSSPDate">Dec 20, 2016:</span>{" "}
                                <span className="widSSPQuote">
                                  “Quick way to explore Dubai if you...”
                                </span>
                              </li>
                            </ul>
                            {/*/ bullet*/}{" "}
                          </dd>
                          {/*/ hReview*/}
                        </dl>
                      </div>
                      <div className="widSSPAll">
                        <ul className="widSSPReadReview">
                          <li>
                            <Link
                            target="_blank"
                              to="https://www.tripadvisor.com/Attraction_Review-g295424-d2510773-Reviews-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html"
                              id="allreviews"
                              onclick="ta.cds.handleTALink(11900,this);window.open(this.href, 'newTAWindow', 'toolbar=1,resizable=1,menubar=1,location=1,status=1,scrollbars=1,width=800,height=600'); return false"
                              rel="nofollow"
                            >
                              Read reviews
                            </Link>
                          </li>
                        </ul>
                        <ul className="widSSPWriteReview">
                          <li>
                            <Link
                            target="_blank"
                              to="https://www.tripadvisor.com/UserReview-g295424-d2510773-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html"
                              id="writereview"
                              onclick="ta.cds.handleTALink(11900,this);window.open(this.href, 'newTAWindow', 'toolbar=1,resizable=1,menubar=1,location=1,status=1,scrollbars=1,width=800,height=600'); return false"
                              rel="nofollow"
                            >
                              Write a review
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/*/ cdsAll*/}
                      <div className="widSSPLegal">© 2016 TripAdvisor LLC</div>
                      {/*/ cdsLegal*/}{" "}
                    </div>
                    {/*/ cdsData*/}
                  </div>
                  {/*/ CDSPOP.cdsBx*/}
                </div>
              </div>
        <div className="offerDiv">
          <div className="offer">10% OFF</div>
          <p>
            we offer the best tour packages for Dubai &amp; Abu Dhabi at
            affordable prices.
          </p>
      { /*   <Link href="#" className="cta">
            Check Out
          </Link> */}
        </div>
        <div className="TouristDiv">
                <div className="img">
                  <img
                    src={
                      "https://res.cloudinary.com/dqslvlm0d/image/upload/v1697702277/plane_lsvzcu.png"
                    }
                    alt=""
                  />
                </div>
                <span>Dubai</span>
                <span>Tourist Visa</span>
                <div className="TouristFooter">
                      <Link to="/tourist-visa" className="cta">
                    Apply Now
                  </Link>
                </div>
              </div>
      </div>
    </>
  );
};

export default CategoryLHS;
