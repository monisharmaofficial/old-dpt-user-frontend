import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/header.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../config';

const CustomerSay = () => {
    const [testimonials, setTestimonials] = useState([]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        const fetchTestimonials = async () => {
          try {
            const response = await fetch(`${config.baseUrl}/testimonial/list`);
            const data = await response.json();
            setTestimonials(data.data);
          } catch (error) {
            console.error('Error fetching testimonials:', error);
          }
        };
    
        fetchTestimonials();
    
        // Add TripAdvisor widget scripts dynamically
        const tripAdvisorScript = document.createElement('script');
        tripAdvisorScript.src =
          'https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=642&amp;locationId=2510773&amp;lang=en_US&amp;rating=true&amp;nreviews=2&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2';
        tripAdvisorScript.async = true;
        document.head.appendChild(tripAdvisorScript);
    
        const widgetEmbedScript = document.createElement('script');
        widgetEmbedScript.src =
          'https://www.tripadvisor.com/WidgetEmbed-selfserveprop?border=true&amp;popIdx=true&amp;iswide=false&amp;locationId=2510773&amp;display_version=2&amp;uniq=642&amp;rating=true&amp;lang=en_US&amp;nreviews=2&amp;writereviewlink=true';
        widgetEmbedScript.async = true;
        document.head.appendChild(widgetEmbedScript);
    
        // Cleanup script tags when the component is unmounted
        return () => {
          document.head.removeChild(tripAdvisorScript);
          document.head.removeChild(widgetEmbedScript);
        };
      }, []);

    return (
        <div>
            <div className="customersays">
                <div className="container">
                    <div className="Title">
                        <h2>What our customer says!</h2>
                    </div>
                    <div className="customersaysrow">
                    <div className="customersaylhs">
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
                                to="https://www.tripadvisor.com/Attraction_Review-g295424-d2510773-Reviews-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html"
                                id="allreviews"
                                onclick="ta.cds.handleTALink(11900,this);window.open(this.href, 'newTAWindow', 'toolbar=1,resizable=1,menubar=1,location=1,status=1,scrollbars=1,width=800,height=600'); return false"
                                rel="nofollow"
                                target="_blank"
                              >
                                Read reviews
                              </Link>
                            </li>
                          </ul>
                          <ul className="widSSPWriteReview">
                            <li>
                              <Link
                                to="https://www.tripadvisor.com/UserReview-g295424-d2510773-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html"
                                id="writereview"
                                onclick="ta.cds.handleTALink(11900,this);window.open(this.href, 'newTAWindow', 'toolbar=1,resizable=1,menubar=1,location=1,status=1,scrollbars=1,width=800,height=600'); return false"
                                rel="nofollow"
                                target="_blank"
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
                  

                        <div className="customersayrhs">
                            <div className="customersaySlider">
                                <div className="owl-carousel owl-theme" id="testiSlider">
                                    <Carousel responsive={responsive} infinite={true} arrows={false} itemclassName="carousel-item-padding-60-px">
                                        {testimonials.map((testimonial) => (
                                            <div key={testimonial.id}>
                                                <div className="item">
                                                    <div className="SliderBox">
                                                        <div className="text">
                                                            <p>{JSON.parse(testimonial.description).blocks[0].text}</p>
                                                        </div>
                                                        <div className="ratingstar">
                                                            <div className="starimg">
                                                                <img src="images/homepage/ratingstar.png" alt="" />
                                                            </div>
                                                            <h4>{testimonial.name}</h4>
                                                            <span>{testimonial.country}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSay;
