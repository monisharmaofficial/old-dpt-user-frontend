import React, { useState, useEffect } from 'react'
import './Style/category.css'
import { data } from '../../data/Category'
import CategoryLHS from './categoryLHS'
import Overview from './Overview'
import { Link } from 'react-router-dom'
import { useParams , useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import config from '../../config'
import { Helmet } from 'react-helmet'
import axios from 'axios';

const ContentSection = ({ selectedCurrency }) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 5000]);
  const totalItems = data.CategoryList.length;

  const [apiData, setApiData] = useState(null);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState(null);
  const [selectedDurationFilter, setSelectedDurationFilter] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userDiscount, setUserDiscount] = useState(null);
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const { categoryName } = useParams()
  const [clickedTourId, setClickedTourId] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);
  const navigate = useNavigate()

  const formattedCategory = categoryName
    .split('-') // Split by hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' ');
  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[3];
  const handleToggleSidebarMenu = () => {
    setIsSidebarMenuOpen((prevIsSidebarMenuOpen) => !prevIsSidebarMenuOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarMenuOpen(false);
  };



  const handleDurationFilterChange = (duration) => {
    setSelectedDurationFilter(duration);
  };

  const handlePageChange = (increment) => {
    const nextPage = currentPage + increment;
    const newStartIndex = (nextPage - 1) * itemsPerPage;
    if (newStartIndex >= 0 && newStartIndex < filteredData.length) {
      setCurrentPage(nextPage);
    }
  };

  const handlePriceFilter = (newPriceRange) => {
    setSelectedPriceRange(newPriceRange);
  };

  const handleRatingFilterChange = (rating) => {
    setSelectedRatingFilter((prevRating) => {
      // If the same rating is clicked again, unselect it
      if (prevRating === rating) {
        return null;
      }
      // Otherwise, select the new rating
      return rating;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${config.baseUrl}/welcome`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUserType(data.data.user_type); // Set user type from login API
          setUserDiscount(data.data.discount); // Set user discount from login API
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // const itemsToShow = filteredData.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/plan/${slug}`);
        const result = await response.json();
        if (result.status === 'success' && result.length > 0) {
          setApiData(result.data[0]);
          setMetaTitle(data.data[0].meta_title);
          setMetaDescription(data.data[0].meta_description);
          setMetaKeywords(data);
        } else {
          console.error('Failed to fetch data from the API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [slug]);

  const filteredData = apiData && apiData.tour_info
  ? apiData.tour_info.filter((tour) => {
    const tourPrice = parseInt(tour.tour_tour_price_aed);
    const tourDiscount = parseInt(tour.tour_discount); // Use the field you want for filtering

    if (
      selectedDurationFilter &&
      selectedDurationFilter.includes(tour.tour_tour_duration)
    ) {
      return (
        tourPrice >= selectedPriceRange[0] &&
        tourPrice <= selectedPriceRange[1] &&
        tourDiscount >= selectedRatingFilter // Use the selectedRatingFilter as needed
      );
    } else if (!selectedDurationFilter) {
      return (
        tourPrice >= selectedPriceRange[0] &&
        tourPrice <= selectedPriceRange[1] &&
        tourDiscount >= selectedRatingFilter // Use the selectedRatingFilter as needed
      );
    }
    return false; // Exclude items that don't match the duration filter
  })
  : [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Check if pagination is needed based on the number of items
  const showPagination = filteredData.length > itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = filteredData.slice(startIndex, endIndex);

  const checkTokenAndFetchData = async () => {
    const token = localStorage.getItem('token');

      // Check if token exists before making the API call
      if (token) {
        try {
          const response = await axios.get(`${config.baseUrl}/wishlist/detail`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === 'success') {
            const wishlistData = response.data.data.map(item => item.tour_id);

            setWishlistData(wishlistData);
            // setWishlistData(wishlistData);
          } else {
            console.error('Failed to fetch wishlist data');
          }
        } catch (error) {
          console.error('Error fetching wishlist data:', error);
        }
      } else {
        console.log('User not logged in or token not found.'); // Handle not logged in scenario
      }
    };


    const addToWishlist = async (tourId) => {
      try {
        let token = localStorage.getItem("token");
    
        if (!token) {
          // If token is not available, handle the scenario accordingly (e.g., navigate to the login page)
          navigate("/login");
          return;
        }
    
        const isTokenValid = isTokenExpired(token);
    
        if (!isTokenValid) {
          // If token is expired or invalid, handle the scenario accordingly (e.g., navigate to the login page)
          navigate("/login");
          return;
        }
    
        // Token is available and valid, proceed with the API call
        const requestBody = {
          tour_id: tourId // Setting tour.id as tour_id in the request body
        };
    
        const response = await fetch(`${config.baseUrl}/wishlist/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          // Wishlist addition successful
          const responseData = await response.json();
    
          checkTokenAndFetchData();
          displayMessage(responseData.msg);
          setClickedTourId(tourId);
    
          // Any other actions you want to perform after a successful addition
        } else {
          // Handle errors if the addition fails
          console.error('Failed to add tour to wishlist');
        }
      } catch (error) {
        console.error('Error adding tour to wishlist:', error);
      }
    };
    
    // Function to validate token expiration
    const isTokenExpired = (token) => {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the token payload
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime; // Check if token is expired by comparing the expiration time
      } catch (error) {
        console.error('Token validation error:', error);
        return false; // Return false in case of any error during validation
      }
    };  
  
  
  // Function to display message as a popup
  const displayMessage = (message) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 5000);
  };
  useEffect(() => {
    checkTokenAndFetchData();
}, []);
 
  return (
    <>
      <div className={`body ${isSidebarMenuOpen ? 'sidebarMenuOpen' : ''} listingPage`}>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />
          {/* Add other meta tags if needed */}
        </Helmet>
        <div className="container">
          <div className="CategorySectionWrapper">
            {/*Category LHS------- */}
            <CategoryLHS
              handlePriceFilter={handlePriceFilter}
              priceRange={selectedPriceRange}
              handleRatingFilterChange={handleRatingFilterChange}
              selectedRatingFilter={selectedRatingFilter}
              handleDurationFilterChange={handleDurationFilterChange}
              handleCloseSidebar={handleCloseSidebar}
            />
            <>
             
              <div className="listingRhs CategoryTopSectionRHS">
                <div className="listingGridTab">
                     <Overview/>
                  <div className="listingToplayer">
               
                    <div className="Title"><h2>{formattedCategory}</h2>
                 
                    </div>
                    
                    <div>
                      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <div className="filterDiv" onClick={handleToggleSidebarMenu}></div>
                        <li className="nav-item active" role="presentation">
                          <button className="nav-link active" id="pills-grid-tab" data-bs-toggle="pill" data-bs-target="#pills-grid"
                            type="button" role="tab" aria-controls="pills-grid" aria-selected="true">Grid <img
                              src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211736/grid_emrbiy.png"} alt="" /></button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link " id="pills-listing-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-listing" type="button" role="tab" aria-controls="pills-listing"
                            aria-selected="true"><img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211812/list_k2k6ct.png"} alt="" />Listing</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContentlisting">
                    <div className="tab-pane fade show active" id="pills-grid" role="tabpanel" aria-labelledby="pills-grid-tab">
                      <div className="listingRow GridRowWrapper">
                        {filteredData.length > 0 ? (
                          itemsToShow.map((tour) => (
                            <div className="parenttabbox">
                            <Link to={`${tour.tour_slug}`} className="TabBox" key={`grid-${tour.tour_id}`}>
                              <div className="img">
                                <img src={`${config.imageUrl}/${tour.tour_image}`} alt="" />
                                <div className="discountrow">
                                  <div className="discount">
                                    <span>{tour.tour_discount} %</span>
                                  </div>
                                </div>
                                <div className="imgBottomRow">
                                  <div className="lhstext">
                                    <span>{tour.tour_hastag}</span>
                                  </div>
                                  <div className="rhsimg">

                                  {tour.sticker_info[0].id === '1' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info[0].id === '2' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info[0].id === '3' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info.length > 1 && (
                                    <img
                                      src={tour.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}

                                  </div>
                                </div>
                              </div>
                              <div className="TabBoxBody">
                                <h4>{tour.Tour_name}</h4>
                                <p>{tour.tour_intro}</p>
                                <div className="ReviewRow">
                                  <span className="location">{tour.destination_info[0].name}</span>
                                </div>
                              </div>
                              <div className="TabBoxFooter">
                                <div className="aedLHS">
                                  <span>Starting from</span>
                                  {isLoggedIn ? (
                                    <div className="aedtext">
                                      {selectedCurrency === "AED" ? (
                                        <span>AED</span>
                                      ) : (
                                        <span>USD</span>
                                      )} <strong>{getUserPrice(tour)}</strong> {tour.tour_no_of_pax} 
                                    </div>
                                  ) : (
                                    <div className="aedtext">
                                      {selectedCurrency === "AED" ? (
                                        <span>AED</span>
                                      ) : (
                                        <span>USD</span>
                                      )} <strong>{getUserPrice(tour)}</strong> {tour.tour_no_of_pax}
                                    </div>
                                  )}
                                </div>
                                <div className="aedRHS">{tour.tour_tour_duration}</div>
                              </div>
                            </Link>
                            <button
                              className={
                                wishlistData && wishlistData.some(item => item === String(tour.tour_id))
                                  ? "wishlistIcon wishlistTagFill"
                                  : "wishlistIcon"
                              }
                              onClick={() => addToWishlist(tour.tour_id)}
                            >
                            </button>
                               </div>
                          ))
                        ) : (
                          <p>No Tour Found</p>
                        )}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="pills-listing" role="tabpanel" aria-labelledby="pills-listing-tab">
                      <div className="listingRow listingfillwishlist">
                        {itemsToShow.map((tour) => (
                                <div className="parenttabbox">
                          <Link to={`${tour.tour_slug}`} className="listingBox" key={`listing-${tour.tour_id}`}>
                            <div className="listingBoxImg">
                              <img src={`${config.imageUrl}/${tour.tour_image}`} alt="" />
                              <div className="discountrow">
                                <div className="discount">
                                  <span>{tour.tour_discount} %</span>
                                </div>
                              </div>
                              <div className="imgBottomRow">
                                <div className="lhstext">
                                  <span>{tour.tour_hastag}</span>
                                </div>
                                <div className="rhsimg">

                                  {tour.sticker_info[0].id === '1' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info[0].id === '2' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info[0].id === '3' && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                      alt=""
                                    />
                                  )}
                                  {tour.sticker_info.length > 1 && (
                                    <img
                                      src={tour.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}

                                </div>
                              </div>
                            </div>
                         
                            <div className="listingBoxContent">
                              <div className="listingBoxTop">
                                <h4>{tour.Tour_name}</h4>
                                <div className="ReviewRow">
                                    <span className="location">{tour.destination_info[0].name}</span>
                                  </div>
                                {/* <div className="ReviewsDivrow">
                                  <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1697704991/ratingstar_p0ani1.png"} alt="" />
                                  <span>5 | 500 Reviews</span>
                                </div> */}
                                <div className="descrition">
                                  <p>{tour.tour_intro}</p>
                                </div>
                              </div>
                              <div className="listingBoxFooter">
                                <div className="listboxlhs">
                                  <span>Free Cancellation</span>
                                  <span>6 Days</span>
                                </div>
                                <div className="listboxrhs">
                                  <div className="startingFromTag">Starting from</div>
                                  <div className="price">
                                    {isLoggedIn ? (
                                      <div >
                                        {selectedCurrency === "AED" ? (
                                          <span>AED</span>
                                        ) : (
                                          <span>USD</span>
                                        )} <strong>{getUserPrice(tour)}</strong> {tour.tour_no_of_pax} 
                                      </div>
                                    ) : (
                                      <div>
                                        {selectedCurrency === "AED" ? (
                                          <span>AED</span>
                                        ) : (
                                          <span>USD</span>
                                        )} <strong>{getUserPrice(tour)}</strong> {tour.tour_no_of_pax} 
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <button
                              className={
                                wishlistData && wishlistData.some(item => item === String(tour.tour_id))
                                  ? "wishlistIcon wishlistTagFill"
                                  : "wishlistIcon"
                              }
                              onClick={() => addToWishlist(tour.tour_id)}
                            >
                            </button>
                               </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="paginationSec">
                  {showPagination && (
          <nav aria-label="...">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link
                  className="page-link"
                  onClick={() => handlePageChange(-1)}
                  to="#"
                >
                  Previous
                </Link>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <Link
                  className="page-link"
                  onClick={() => handlePageChange(1)}
                  to="#"
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        )}
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
        {/* <div className="menuOverlay"></div> */}
      </div>

    </>
  )
  function getUserPrice(tour) {
    let price = 0;

    if (userType === 2) {
      // Agent user type
      price =
        selectedCurrency === "AED"
          ? tour.tour_tour_price_aed - (tour.tour_tour_price_aed * userDiscount) / 100
          : tour.tour_tour_price_usd - (tour.tour_tour_price_usd * userDiscount) / 100;
    } else if (userType === 3) {
      // Normal user type
      price = selectedCurrency === "AED" ? tour.tour_tour_price_aed : tour.tour_tour_price_usd;
    } else {
      // Default case (handle other user types if needed)
      price = selectedCurrency === "AED" ? tour.tour_tour_price_aed : tour.tour_tour_price_usd;
    }

    // Remove decimal part
    return Math.floor(price);
  }

}
const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
  // ... (other state mappings)
});

export default connect(mapStateToProps)(React.memo(ContentSection));




