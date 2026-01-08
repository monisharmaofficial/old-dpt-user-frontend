import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Style/TourPage.css";
import Carousel from "react-multi-carousel";
import { connect } from 'react-redux';
import Faq from "./Faq";
import "react-multi-carousel/lib/styles.css";
import CancellationPolicy from "./CancellationPolicy";
import UsefulToKnow from "./UsefulToKnow";
import Itinerary from "./Itinerary";
import WhatToExpect from "./WhatToExpect";
import DetailOverview from "./BannerTabs";
import GetInTouch from "./GetInTouch";
import { useParams } from "react-router-dom";
import { data } from "../../data/Category";
import { addToCart } from "../cart/CartActions";
import axios from 'axios';
import config from "../../config";
import AskQuestion from './AskQuestion'
import Detail from './Detail'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import './Style/TourPage.css'

function ContentSection({ selectedCurrency }) {

  const { title } = useParams();
  const [backendData, setBackendData] = useState(null);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null)
  const [isFormValid, setIsFormValid] = useState(true);
  const [tourName, setTourName] = useState("");
  const [tourPriceAed, setTourPriceAed] = useState("");
  const [tourPriceUsd, setTourPriceUsd] = useState("");
  const [tour_id, setTourId] = useState("");
  const [tour_slug, setTour_Slug] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("1");
  const [hotels, setHotels] = useState([]);
  const [childrenNumber, setChildrenNumber] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  

  const [tourImage, setTourImage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch hotel data from the backend API
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${config.imageUrl}/hotal/list`);
        setHotels(response.data.data); // Assuming the response.data is an array of hotel objects
      } catch (error) {
        console.error('Error fetching hotels:', error);
        // Handle error if the request fails
      }
    };

    fetchHotels(); // Call the function to fetch hotels when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBackendData(data);
        setTourName(data.data[0].tour_name)
        setTourPriceAed(data.data[0].tour_price_aed)
        setTour_Slug(data.data[0].slug)
        setTourPriceUsd(data.data[0].tour_price_usd)
        setTourImage(data.data[0].image)
        setTourId(data.data[0].id)

      } catch (error) {
        console.error("Error fetching data from the backend:", error.message);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    tourDate: null,
    preferredPickupTime: '0',
    preferredPickupLocation: '0',
    pickupLocation: '0',
    endLocation: '0',
    hotelName: '0',
    preferredGuideLanguage: '',
    paymentMode: '0',
    adults: '',
    children: '',
    infants: '',
    additionalDriver: '0',
    additionalLunch: '0',
    additionalTickets: '0',
    specialRequest: '',
    otherPlaceName: '',
    otherPlaceAddress: '',
    otherPlaceTelephone: '',
    //  tourPrice:"",
    //   tourName:"",
    //  tourImage:""
  });
  const formId = "tourForm";
  // State to control the display of the popup
  const [showPopup, setShowPopup] = useState(false);
  const url1 = window.location.href;
  const spliturl1 = url1.split("=");
  const id = spliturl1[1];


  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Set the tour details in formData
    formData.tour_id = tour_id;
    formData.tour_slug = tour_slug;
    formData.tourName = tourName;
    formData.tourImage = tourImage;
    formData.tourPriceAed = tourPriceAed;
    formData.tourPriceUsd = tourPriceUsd;

    formData.tourPriceUsd = tourPriceUsd;

    // Set the selectedCurrency in formData
    formData.selectedCurrency = selectedCurrency;

    // Get all form elements
    const formElements = event.target.elements;

    // Iterate through form elements to get input data
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];

      // Check if the element is an input field
      if (element.tagName === 'INPUT') {
        // Add input data to formData
        formData[element.name] = element.value;
      }
    }

    // Check if any select or input is empty
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];

      if ((element.tagName === 'INPUT' || element.tagName === 'SELECT') && element.value === '0') {
        setIsFormValid(false);
        setShowPopup(true);

        // Automatically hide the popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);

        return;
      }
    }

    // Save the form data in local storage
    let cartdata = localStorage.getItem("cartdata");
    let MyCartData = cartdata ? JSON.parse(cartdata) : [];
    MyCartData.push(formData);
    localStorage.setItem('cartdata', JSON.stringify(MyCartData));

    // If all checks pass, proceed with adding to cart or other actions
    setIsFormValid(true);
    AddToCart(/* pass your item here */);
    // navigate('/cart');
  };



  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[5];

  const ourData = data.CategoryList.filter((item) => item.slug === slug);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userDiscount, setUserDiscount] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error("Error fetching data from the backend:", error.message);
      }
    };

    fetchData();
  }, []);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/popular-attraction/list`);
        if (response.data.status === 'success') {
          setAttractions(response.data.data);
        } else {
          console.error('Error fetching attractions');
        }
      } catch (error) {
        console.error('Error fetching attractions', error);
      }
    };

    fetchAttractions();
  }, []);

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


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const AddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const cart = useSelector((state) => state.cart);
  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  return (
    <div className="ContentSection">
      {backendData && backendData.data && backendData.data.map((tour) => (
        <div className="container" key={tour.id}>
          <div className="ContentSectionWrapper">
            <div className="ContentLHS">
              <GetInTouch />

              {/*BANNER TABS */}
              <div className="DetailTab">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-detail-tab" data-bs-toggle="pill" data-bs-target="#pills-detail" type="button" role="tab" aria-controls="pills-detail" aria-selected="true">
                      <img src="images/info.png" alt="" />Details </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-bookthistour-tab" data-bs-toggle="pill" data-bs-target="#pills-bookthistour" type="button" role="tab" aria-controls="pills-bookthistour" aria-selected="false">
                      <img src="images/add-to-basket.png" alt="" />Book This Tour </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-askquestions-tab" data-bs-toggle="pill" data-bs-target="#pills-askquestions" type="button" role="tab" aria-controls="pills-askquestions" aria-selected="false">
                      <img src="images/question.png" alt="" />Ask Questions </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <Detail />
                  {/* BOOK THIS TOUR */}

                  <div className="tab-pane fade" id="pills-bookthistour" role="tabpanel" aria-labelledby="pills-bookthistour-tab">
                    <div className="BookThisTourSec">
                      <div className="BookingDetailsHd"><span>Booking Details</span></div>
                      <div className="FormInnerDiv">
                        <form id={formId} onSubmit={handleFormSubmit}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3 formGroup">
                                <label>Tour Date*</label>
                                <div className="input-group date" id="datepicker">
                                </div>
                              </div>{/* formGroup */}
                            </div>

                            <div className="col-md-6">
                              <div className="mb-3 formGroup">
                                <label>Pickup Location*</label>
                                <select
                                  className="form-select"
                                  value={formData.preferredPickupLocation} // Set the value dynamically based on the state
                                  onChange={(e) => handleInputChange(e, 'preferredPickupLocation')} // Pass the name to handleInputChange
                                >
                                  <option value="0">Select Pickup Location</option>
                                  <option value="Hotel/Apartment">Hotel/Apartment</option>
                                  <option value="DXB Airport Terminal 1">DXB Airport Terminal 1</option>
                                  {/* ... (other options) */}
                                </select>

                              </div>{/* formGroup */}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 formGroup">
                                <label>End Location*</label>
                                <select
                                  className="form-select"
                                  value={selectedEndLocation}
                                  onChange={(e) => {
                                    handleInputChange(e, 'preferredEndLocation');
                                    setSelectedEndLocation(e.target.value);
                                  }}
                                >
                                  <option value="0">Select Pickup Location</option>
                                  <option value="Hotel/Apartment">Hotel/Apartment</option>
                                  <option value="DXB Airport Terminal 1">DXB Airport Terminal 1</option>
                                  <option value="Abu Dhabi Hotel">Abu Dhabi Hotel</option>
                                  <option value="Any Other Places in Dubai">Any Other Places in Dubai</option>
                                </select>
                                {selectedEndLocation === "Any Other Places in Dubai" && (
                                  <div className="col-md-12">

                                    <label>Place Name</label>
                                    <input className="form-control" placeholder="Place Name" rows="3" name="otherPlaceName"></input>
                                    <label>Place Address</label>
                                    <input className="form-control" placeholder="Residence Address" rows="3" name="otherPlaceAddress"></input>
                                    <label>Place Telephone</label>
                                    <input className="form-control" placeholder="Residence Telephone" rows="3" name="otherPlaceTelephone"></input>

                                  </div>
                                )}

                              </div> {/* formGroup */}
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3 formGroup">
                                <label>Hotel Name*</label>
                                <select
                                  className="form-select"
                                  value={formData.preferredHotelName}
                                  onChange={(e) => {
                                    handleInputChange(e, 'preferredHotelName');
                                    // Find the selected hotel data based on the name
                                    const hotel = hotels.find((hotel) => hotel.hotel_name === e.target.value);
                                    setSelectedHotel(hotel); // Set the selected hotel data
                                  }}
                                >
                                  <option value="0">Select Hotel</option>
                                  {hotels.map((hotel) => (
                                    <option key={hotel.id} value={hotel.hotel_name}>
                                      {hotel.hotel_name}
                                    </option>
                                  ))}
                                </select>
                              </div>{/* formGroup */}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 formGroup">
                                <label>Preferred Language*</label>
                                <select
                                  className="form-select"
                                  value={formData.preferredGuideLanguage} // Set the value dynamically based on the state
                                  onChange={(e) => handleInputChange(e, 'preferredGuideLanguage')} // Pass the name to handleInputChange
                                >
                                  <option value="0">Select Language</option>
                                  <option value="English">English</option>
                                  <option value="Arabic">Arabic</option>
                                  <option value="Spanich">Spanich</option>
                                  {/* ... (other options) */}
                                </select>

                              </div>{/* formGroup */}
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3 formGroup">
                                <label>Pref.currency</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={selectedCurrency}
                                />
                              </div>{/* formGroup */}
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3 formGroup">
                                <label>Payment Mode*</label>

                                <select
                                  className="form-select"
                                  value={formData.preferredPay} // Set the value dynamically based on the state
                                  onChange={(e) => handleInputChange(e, 'preferredPay')} // Pass the name to handleInputChange
                                >
                                  <option value="">Select Pay Option</option>
                                  <option value="Pay Now">Pay Now</option>
                                  <option value="Pay Later">Pay Later</option>
                                  {/* ... (other options) */}
                                </select>
                              </div>{/* formGroup */}
                            </div>

                            <div className="col-md-4">
                              <div className="mb-3 formGroup infoDetail">
                                <label>Adults*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="No of Adults"
                                  name="adults"  // Add the name attribute
                                />
                                <label>Children</label>
                                <input type="text" className="form-control" placeholder="Adult Price" value={selectedCurrency} />

                              </div> {/* formGroup */}
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3 formGroup infoDetail">
                                <label>Children</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Age 5-12"
                                  name="children"
                                  onChange={(e) => {
                                    const childrenValue = parseInt(e.target.value);
                                    setChildrenNumber(childrenValue >= 0 ? childrenValue : 0);
                                  }}
                                  
                                />
                                <label>Children Price</label>
                                {selectedHotel && (
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Children Price"
                                      value={selectedCurrency === 'AED' ? selectedHotel.children_price_aed : selectedHotel.children_price_usd}
                                    // Show children's price based on selectedCurrency
                                    />
                                    {/* You can similarly display other prices */}
                                  </div>
                                )}
                                {selectedHotel && (
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Children Price"
                                      value={
                                        selectedCurrency === 'AED'
                                          ? selectedHotel.children_price_aed * childrenNumber || 0
                                          : selectedHotel.children_price_usd * childrenNumber || 0
                                      }
                                      readOnly // To prevent direct user input
                                    />
                                    {/* You can similarly display other prices */}
                                  </div>
                                )}



                              </div> {/* formGroup */}
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3 formGroup infoDetail">
                                <label>Infants</label>
                                <input type="text" className="form-control" placeholder="Age < 5" name="infants" />
                                <label>Infants Price</label>
                                <input type="text" className="form-control" placeholder="Infants Price" value={selectedCurrency} />
                              </div> {/* formGroup */}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 formGroup">
                                <label>Addition driver</label>
                                <select
                                  className="form-select"
                                  value={formData.preferredDriver} // Set the value dynamically based on the state
                                  onChange={(e) => handleInputChange(e, 'preferredDriver')} // Pass the name to handleInputChange
                                >
                                  <option value="">Select Addition Driver</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  {/* ... (other options) */}
                                </select>
                              </div> {/* formGroup */}
                            </div>
                            <div className="submitcta">
                              <div className="btnGroup">
                                <button type="submit" className="cta">
                                  Book Now
                                </button>
                                <button type="button" className="cta" onClick={() => setShowPopup(true)}>
                                  Clear
                                </button>
                              </div>
                              <div className="captcha">
                                <div className="captchaimg">
                                  <img src="images/captcha.png" alt="" />
                                </div>
                              </div>
                            </div>{/*submitcta*/}
                          </div>{/*row*/}

                        </form>
                        {showPopup && (
                          <div className="popup" style={{ color: 'green' }}>
                            <p>Please fill in all the required fields.</p>
                            {/* Button to close the popup */}
                            {/* <button onClick={() => setShowPopup(false)}>Close</button> */}
                          </div>
                        )}
                      </div>{/*FormInnerDiv*/}
                    </div>{/*BookThisTourSec*/}
                  </div>
                  {/*tab pannel*/}
                  <AskQuestion />
                  { /*tab panne*/}
                </div>
              </div>
              <WhatToExpect />
              <Itinerary />
              <CancellationPolicy />
              <UsefulToKnow />
              <Faq />
            </div>
            <div className="ContentRHS">
              <div className="fromDiv">
                <h4>From</h4>
                <div className="aedrow">
                  <span>
                    {isLoggedIn ? (
                      <div>AED {Math.floor(getUserPrice(tour))}</div>

                    ) : (
                      <div>AED {Math.floor(getUserPrice(tour))}</div>
                    )}
                  </span>
                  <span>
                    {isLoggedIn ? (
                      <div>USD {Math.floor(getUserPriceUsd(tour))}</div>

                    ) : (
                      <div>USD {Math.floor(getUserPriceUsd(tour))}</div>
                    )}
                  </span>
                </div>
                <div className="Person">
                   {tour.no_of_pax} <strong>({tour.tour_duration})</strong>
                </div>
                <div className="right">
                  <Link to="#">View Offers</Link>
                </div>
                <button type="submit" form="tourForm" className="cta">
                  Book This Tour
                </button>
                <p>
                  Free cancellation Up to 24 hours in advance.{" "}
                  <Link to="#">Read More</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
  function getUserPrice(tour) {
    let totalPrice = tour.tour_price_aed;
  
    if (userType === 2) {
      // Agent user type
      totalPrice -= totalPrice * (userDiscount / 100);
    }
  
    // Add children's price based on selectedCurrency
    if (childrenNumber && selectedHotel) {
      totalPrice += selectedCurrency === 'AED'
        ? selectedHotel.children_price_aed * childrenNumber
        : selectedHotel.children_price_usd * childrenNumber;
    }
  
    return totalPrice.toFixed(2);
  }
  
  function getUserPriceUsd(tour) {
    let totalPrice = tour.tour_price_usd;
  
    if (userType === 2) {
      // Agent user type
      totalPrice -= totalPrice * (userDiscount / 100);
    }
  
    // Add children's price based on selectedCurrency
    if (childrenNumber && selectedHotel) {
      totalPrice += selectedCurrency === 'AED'
        ? selectedHotel.children_price_aed * childrenNumber
        : selectedHotel.children_price_usd * childrenNumber;
    }
  
    return totalPrice.toFixed(2);
  }
  

}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
  // ... (other state mappings)
});

export default connect(mapStateToProps)(ContentSection);
