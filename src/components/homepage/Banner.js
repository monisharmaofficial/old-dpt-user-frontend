import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../../Style/header.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

const SearchableSelect = ({ options, placeholder, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option);
    onSelect(option);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const handleInputClick = () => {
    setDropdownOpen(true); // Open the dropdown when the input is clicked
  };

  // Include the search term in filtered options
  const filteredOptions = [
    searchTerm,
    ...options
      .filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 4), // Adjust the number of options as needed
  ];

  return (
    <div className="searchable-select">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={handleInputClick}
        style={{ width: "170px", border: "none", position: "relative" }}
      />
      {isDropdownOpen && (
        <ul
          className="options"
          style={{
            width: "170px",
            position: "absolute",
            background: "white",
            top: "101%",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={option === selectedOption ? "selected" : undefined}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Banner = ({ selectedCurrency }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [userType, setUserType] = useState(null);
  const [userDiscount, setUserDiscount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [tours, setTours] = useState([]);
  const [privates, setPrivates] = useState([]);
  const [wedding, setWedding] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [attraction, setAttraction] = useState([]);
  const [chauffeur, setChauffeur] = useState([]);
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [wishlistData, setWishlistData] = useState(null);

  const CustomInput = React.forwardRef(
    ({ value, onClick, placeholder }, ref) => (
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly={true}
        ref={ref}
        placeholder={placeholder}
        style={{
          border: "none",
          outline: "none",
        }}
      />
    )
  );

  const handleCountrySearch = (country) => {
    setSearchCountry(country);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlePersonSelect = (selectedPerson) => {
    const selectedText = `${selectedPerson} Travellers`;
    // Do something with the selectedText, such as displaying it or storing it in a state variable.
  };
  const handleSearchClick = () => {
    const countryElement = document.querySelector(".countrySelect");
    const dateElement = document.querySelector(".datePicker");
    const personElement = document.querySelector(".personSelect");

    if (!searchCountry) {
      countryElement?.classList.add("countryClassError");
    } else {
      countryElement?.classList.remove("countryClassError");
    }

    if (!selectedDate) {
      dateElement?.classList.add("classDateError");
    } else {
      dateElement?.classList.remove("classDateError");
    }

    if (searchCountry) {
      // This condition should work for navigation.
      const encodedCountry = encodeURIComponent(
        searchCountry.replace(/\s+/g, "-").toLowerCase()
      );
      
      navigate(`/tour/${encodedCountry}`);
      //  navigate(`/tours`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const tabSection = document.querySelector(".tabSection");
      const formobile = document.querySelector(".formobile");
      const homepageContent = document.querySelector(".homepageContent");

      if (window.scrollY > 568) {
        homepageContent.classList.add("ondesSticky");
      } else {
        homepageContent.classList.remove("ondesSticky");
      }

      if (window.scrollY > 300) {
        homepageContent.classList.add("searchSticky");
      } else {
        homepageContent.classList.remove("searchSticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const searchValue = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/desert-safari`);
        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/luxury-tour`);
        const data = await response.json();
        setLuxury(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/wedding-on-yacht`);
        const data = await response.json();
        setWedding(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/attraction-ticket`);
        const data = await response.json();
        setAttraction(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/chauffeur`);
        const data = await response.json();
        setChauffeur(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/cat/private-tour`);
        const data = await response.json();
        setPrivates(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${config.baseUrl}/welcome`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserType(data.data.user_type); // Set user type from login API
          setUserDiscount(data.data.discount); // Set user discount from login API
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/destanition/list`);
        const data = await response.json();
        if (data.status === "success") {
          setDestinations(data.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);
  const [clickedTourId, setClickedTourId] = useState(null);
  const checkTokenAndFetchData = async () => {
    const token = localStorage.getItem("token");

    // Check if token exists before making the API call
    if (token) {
      try {
        const response = await axios.get(`${config.baseUrl}/wishlist/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          const wishlistData = response.data.data.map((item) => item.tour_id);

          setWishlistData(wishlistData);
          // setWishlistData(wishlistData);
        } else {
          console.error("Failed to fetch wishlist data");
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    } else {
      console.log("User not logged in or token not found."); // Handle not logged in scenario
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
        tour_id: tourId, // Setting tour.id as tour_id in the request body
      };

      const response = await fetch(`${config.baseUrl}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        console.error("Failed to add tour to wishlist");
      }
    } catch (error) {
      console.error("Error adding tour to wishlist:", error);
    }
  };

  // Function to validate token expiration
  const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the token payload
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime; // Check if token is expired by comparing the expiration time
    } catch (error) {
      console.error("Token validation error:", error);
      return false; // Return false in case of any error during validation
    }
  };

  useEffect(() => {
    checkTokenAndFetchData();
  }, []);

  // Function to display message as a popup
  const displayMessage = (message) => {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 5000);
  };

  return (
    <div className={`homepageContent`}>
      <div>
        <div>
          {" "}
          {/* Changed class to className */}
          <div className="BannerTabSection">
            {" "}
            {/* Changed class to className */}
            <div
              className="TabImg"
              style={{ backgroundImage: "url(images/homepage/banner.png)" }}
            >
              {" "}
              {/* Used inline style with double curly braces */}
              <div className="container">
                <div className="BannerContent">
                  <span>Unforgateful!</span>
                  <h1>Dubai Memories</h1>
                  <p>
                    Real travelers. Real stories. Real opinions to help you make
                    the right choice.
                  </p>
                  <div className="fordesktop">
                    <div className="bannerSearch">
                      <div className="bannerSearchWrapper">
                        <div className="whereto countrySelect">
                          <div className="wheretoIN ">
                            <div className="iconwithText">
                              <div className="icon"></div>
                              <div className="Text">
                                <div className="toptext">Where to?</div>
                                <div className="bottomtext">
                                  <SearchableSelect
                                    options={destinations.map(
                                      (destination) =>
                                        destination.destination_name
                                    )}
                                    placeholder="Search"
                                    onSelect={handleCountrySearch} // You may need to adjust the onSelect callback if needed
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="selectdate" >
                          <div className="selectdateIN ">
                            <div className="iconwithText">
                              <div className="icon">
                              </div>
                              <div className="Text">
                                <div className="toptext">When to?</div>
                                <DatePicker
                                  selected={selectedDate}
                                  onChange={(date) => setSelectedDate(date)}
                                  minDate={new Date()}
                                  placeholderText="Select Date"
                                  customInput={<CustomInput />}

                                />


                              </div>
                            </div>
                          </div>
                        </div> */}

                        {/* Replace the <button> with a <Link> */}
                        <div className="SearchBtn">
                          <button
                            onClick={handleSearchClick}
                            className="searchIcon"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="formobile">
                    <div className="container">
                      <div
                        className="searchFixedWrapper"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop"
                      >
                        <div className="searchinputformobile">
                          <button type="submit" className="SearchIconInput">
                            {" "}
                          </button>
                          <input
                            type="text"
                            value=""
                            onChange={searchValue}
                            placeholder="Search for a place or activity"
                          />
                        </div>
                      </div>

                      <div
                        className="offcanvas offcanvas-top SearchPopupForMob"
                        tabIndex="9"
                        id="offcanvasTop"
                        aria-labelledby="offcanvasTopLabel"
                      >
                        <div className="offcanvas-header">
                          <h5 id="offcanvasTopLabel">Change your search</h5>
                          <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="offcanvas-body">
                          <div className="SearchPopupForMobInner">
                            <div className="searchinputformobile popupSearchbar">
                              <button type="submit" className="SearchIconInput">
                                {" "}
                              </button>
                              <SearchableSelect
                                options={destinations.map(
                                  (destination) => destination.destination_name
                                )}
                                placeholder="Search"
                                onSelect={handleCountrySearch} // You may need to adjust the onSelect callback if needed
                              />
                            </div>

                            {/* <div className="SelectdateField">
                              <div className="calendarIcon"></div>
                              <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={new Date()}
                                placeholderText="Select Date"
                                customInput={
                                  <input
                                    style={{
                                      border: "none",
                                      outline: "none",
                                    }}
                                  />
                                }
                              />
                            </div> */}

                            <div className="PopupSubmitBtn">
                              {/* Replace the <button> with a <Link> */}
                              <button
                                onClick={handleSearchClick}
                                className="searchIcon"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* banner content */}

                <div className="BannerIconsWrapper">
                  <div className="BannerIconColumnDiv">
                    <div className="BannerIconDIv">
                      <img src="images/homepage/baanerpersonicon.svg" alt="" />
                    </div>
                    <div className="bannerTextDiv">100% private tours</div>
                  </div>
                  <div className="BannerIconColumnDiv">
                    <div className="BannerIconDIv">
                      <img
                        src="images/homepage/bannerlocationicon.svg"
                        alt=""
                      />
                    </div>
                    <div className="bannerTextDiv">
                      Fully customizable itineraries
                    </div>
                  </div>
                  <div className="BannerIconColumnDiv">
                    <div className="BannerIconDIv">
                      <img src="images/homepage/bannerphoneicon.svg" alt="" />
                    </div>
                    <div className="bannerTextDiv">Flexible cancellation</div>
                  </div>
                  <div className="BannerIconColumnDiv">
                    <div className="BannerIconDIv">
                      <img src="images/homepage/bannerheadseticon.svg" alt="" />
                    </div>
                    <div className="bannerTextDiv">24/7 customer support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tabSection">
        <div className="tabstycky">
          <div className="container">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link"
                  id="nav-luxurytour-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-luxurytour"
                  type="button"
                  role="tab"
                  aria-controls="nav-luxurytour"
                  aria-selected="false"
                >
                  <img src="images/homepage/diamond.png" alt="" />
                  Luxury Tour
                </button>
                <button
                  className="nav-link"
                  id="nav-privatetour-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-privatetour"
                  type="button"
                  role="tab"
                  aria-controls="nav-privatetour"
                  aria-selected="false"
                >
                  <img src="images/homepage/tour-guide.png" alt="" />
                  Private Tour
                </button>
                <button
                  className="nav-link"
                  id="nav-weddingonyatch-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-weddingonyatch"
                  type="button"
                  role="tab"
                  aria-controls="nav-weddingonyatch"
                  aria-selected="false"
                >
                  <img src="images/homepage/yatch.png" alt="" />
                  Wedding On Yacht
                </button>
                <button
                  className="nav-link active"
                  id="nav-privatejet-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-privatejet"
                  type="button"
                  role="tab"
                  aria-controls="nav-privatejet"
                  aria-selected="true"
                >
                  <img src="images/homepage/jet.png" alt="" />
                  Desert Safari
                </button>
                <button
                  className="nav-link"
                  id="nav-chauffeur-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-chauffeur"
                  type="button"
                  role="tab"
                  aria-controls="nav-chauffeur"
                  aria-selected="false"
                >
                  <img src="images/homepage/taxi-driver.png" alt="" />
                  Chauffeur
                </button>
                <button
                  className="nav-link"
                  id="nav-attractiontickets-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-attractiontickets"
                  type="button"
                  role="tab"
                  aria-controls="nav-attractiontickets"
                  aria-selected="false"
                >
                  <img src="images/homepage/ticket.png" alt="" />
                  Attraction Ticket
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="container">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-privatejet"
              role="tabpanel"
              aria-labelledby="nav-privatejet-tab"
            >
              <div className="Title">
                <h2>Desert Safari</h2>
              </div>

              <div className="TabLayer">
                <div className="TabWrapper">
                  {tours.map((tour, index) => {
                    const titleWithHyphens = tour.slug; // Declare it here

                    return (
                      <div className="parenttabbox">
                        <Link
                          to={`/desert-safari/${titleWithHyphens}`}
                          className="TabBox"
                          key={index}
                        >
                          <div className="img">
                            <img
                              src={`${config.imageUrl}/${tour.image}`}
                              alt=""
                            />
                            <div className="discountrow">
                              <div className="discount">
                                <span>{`${tour.discount}%`}</span>
                              </div>
                            </div>
                            <div class="imgBottomRow">
                              <div class="lhstext">
                                <span>{tour.hastag}</span>
                              </div>
                              <div className="rhsimg">
                                {tour.sticker_info[0].id === "1" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                    alt=""
                                  />
                                )}
                                {tour.sticker_info[0].id === "2" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                    alt=""
                                  />
                                )}
                                {tour.sticker_info[0].id === "3" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                    alt=""
                                  />
                                )}
                                {tour.sticker_info.length > 1 && (
                                  <img src={tour.sticker_info[1].id} alt="" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="TabBoxBody">
                            <h4>{tour.tour_name}</h4>
                            <p>{tour.intro}</p>
                            <div className="ReviewRow">
                              {tour.destination_info &&
                                tour.destination_info.length > 0 && (
                                  <span className="location">
                                    {tour.destination_info[0].name}
                                  </span>
                                )}
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
                                  )}
                                  <strong>{getUserPrice(tour)}</strong>{" "}
                                  {tour.no_of_pax}
                                </div>
                              ) : (
                                <div className="aedtext">
                                  {selectedCurrency === "AED" ? (
                                    <span>AED</span>
                                  ) : (
                                    <span>USD</span>
                                  )}
                                  <strong>{getUserPrice(tour)}</strong>{" "}
                                  {tour.no_of_pax}
                                </div>
                              )}
                            </div>
                            <div className="aedRHS">{tour.tour_duration}</div>
                          </div>
                        </Link>
                        <button
                          className={
                            wishlistData &&
                            wishlistData.some(
                              (item) => item === String(tour.id)
                            )
                              ? "wishlistIcon wishlistTagFill"
                              : "wishlistIcon"
                          }
                          onClick={() => addToWishlist(tour.id)}
                        ></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-weddingonyatch"
              role="tabpanel"
              aria-labelledby="nav-weddingonyatch-tab"
            >
              <div className="Title">
                <h2>Wedding On Yacht</h2>
                <div className="TabLayer">
                  <div className="TabWrapper">
                    {wedding.map((wedding, index) => {
                      const titleWithHyphens = wedding.slug; // Declare it here

                      return (
                        <div className="parenttabbox">
                          <Link
                            to={`/wedding-on-yacht/${titleWithHyphens}`}
                            className="TabBox"
                            key={index}
                          >
                            <div className="img">
                              <img
                                src={`${config.imageUrl}/${wedding.image}`}
                                alt=""
                              />
                              <div className="discountrow">
                                <div className="discount">
                                  <span>{`${wedding.discount}%`}</span>
                                </div>
                              </div>
                              <div class="imgBottomRow">
                                <div class="lhstext">
                                  <span>{wedding.hastag}</span>
                                </div>
                                <div className="rhsimg">
                                  {wedding.sticker_info &&
                                    wedding.sticker_info.length > 0 &&
                                    wedding.sticker_info[0].id === "1" && (
                                      <img
                                        src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                        alt=""
                                      />
                                    )}
                                  {wedding.sticker_info &&
                                    wedding.sticker_info.length > 0 &&
                                    wedding.sticker_info[0].id === "2" && (
                                      <img
                                        src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                        alt=""
                                      />
                                    )}
                                  {wedding.sticker_info &&
                                    wedding.sticker_info.length > 0 &&
                                    wedding.sticker_info[0].id === "3" && (
                                      <img
                                        src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                        alt=""
                                      />
                                    )}
                                  {wedding.sticker_info.length > 1 && (
                                    <img
                                      src={wedding.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="TabBoxBody">
                              <h4>{wedding.tour_name}</h4>
                              <p>{wedding.intro}</p>
                              <div className="ReviewRow">
                                {wedding.destination_info &&
                                  wedding.destination_info.length > 0 && (
                                    <span className="location">
                                      {wedding.destination_info[0].name}
                                    </span>
                                  )}
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
                                    )}
                                    <strong>{getUserPrice(wedding)}</strong>{" "}
                                    {wedding.no_of_pax}
                                  </div>
                                ) : (
                                  <div className="aedtext">
                                    {selectedCurrency === "AED" ? (
                                      <span>AED</span>
                                    ) : (
                                      <span>USD</span>
                                    )}
                                    <strong>{getUserPrice(wedding)}</strong>{" "}
                                    {wedding.no_of_pax}
                                  </div>
                                )}
                              </div>
                              <div className="aedRHS">
                                {wedding.tour_duration}
                              </div>
                            </div>
                          </Link>
                          <button
                            className={
                              wishlistData &&
                              wishlistData.some(
                                (item) => item === String(wedding.id)
                              )
                                ? "wishlistIcon wishlistTagFill"
                                : "wishlistIcon"
                            }
                            onClick={() => addToWishlist(wedding.id)}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-luxurytour"
              role="tabpanel"
              aria-labelledby="nav-luxurytour-tab"
            >
              <div className="Title">
                <h2>Luxury Tour</h2>
              </div>
              <div className="TabLayer">
                <div className="TabWrapper">
                  {luxury.map((luxury, index) => {
                    const titleWithHyphens = luxury.slug; // Declare it here

                    return (
                      <div className="parenttabbox">
                        <Link
                          to={`/luxury-tour/${titleWithHyphens}`}
                          className="TabBox"
                          key={index}
                        >
                          <div className="img">
                            <img
                              src={`${config.imageUrl}/${luxury.image}`}
                              alt=""
                            />
                            <div className="discountrow">
                              <div className="discount">
                                <span>{`${luxury.discount}%`}</span>
                              </div>
                            </div>
                            <div class="imgBottomRow">
                              <div class="lhstext">
                                <span>{luxury.hastag}</span>
                              </div>
                              <div className="rhsimg">
                                {luxury.sticker_info[0].id === "1" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                    alt=""
                                  />
                                )}
                                {luxury.sticker_info[0].id === "2" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                    alt=""
                                  />
                                )}
                                {luxury.sticker_info[0].id === "3" && (
                                  <img
                                    src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                    alt=""
                                  />
                                )}
                                {luxury.sticker_info.length > 1 && (
                                  <img src={luxury.sticker_info[1].id} alt="" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="TabBoxBody">
                            <h4>{luxury.tour_name}</h4>
                            <p>{luxury.intro}</p>
                            <div className="ReviewRow">
                              {luxury.destination_info &&
                                luxury.destination_info.length > 0 && (
                                  <span className="location">
                                    {luxury.destination_info[0].name}
                                  </span>
                                )}
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
                                  )}
                                  <strong>{getUserPrice(luxury)}</strong>{" "}
                                  {luxury.no_of_pax}
                                </div>
                              ) : (
                                <div className="aedtext">
                                  {selectedCurrency === "AED" ? (
                                    <span>AED</span>
                                  ) : (
                                    <span>USD</span>
                                  )}
                                  <strong>{getUserPrice(luxury)}</strong>{" "}
                                  {luxury.no_of_pax}
                                </div>
                              )}
                            </div>
                            <div className="aedRHS">{luxury.tour_duration}</div>
                          </div>
                        </Link>
                        <button
                          className={
                            wishlistData &&
                            wishlistData.some(
                              (item) => item === String(luxury.id)
                            )
                              ? "wishlistIcon wishlistTagFill"
                              : "wishlistIcon"
                          }
                          onClick={() => addToWishlist(luxury.id)}
                        ></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-privatetour"
              role="tabpanel"
              aria-labelledby="nav-privatetour-tab"
            >
              <div className="Title">
                <h2>Private Tour</h2>
                <div className="TabLayer">
                  <div className="TabWrapper">
                    {privates.map((privates, index) => {
                      const titleWithHyphens = privates.slug; // Declare it here

                      return (
                        <div className="parenttabbox">
                          <Link
                            to={`/private-tour/${titleWithHyphens}`}
                            className="TabBox"
                            key={index}
                          >
                            <div className="img">
                              <img
                                src={`${config.imageUrl}/${privates.image}`}
                                alt=""
                              />
                              <div className="discountrow">
                                <div className="discount">
                                  <span>{`${privates.discount}%`}</span>
                                </div>
                              </div>
                              <div class="imgBottomRow">
                                <div class="lhstext">
                                  <span>{privates.hastag}</span>
                                </div>
                                <div className="rhsimg">
                                  {privates.sticker_info[0].id === "1" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                      alt=""
                                    />
                                  )}
                                  {privates.sticker_info[0].id === "2" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                      alt=""
                                    />
                                  )}
                                  {privates.sticker_info[0].id === "3" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                      alt=""
                                    />
                                  )}
                                  {privates.sticker_info.length > 1 && (
                                    <img
                                      src={privates.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="TabBoxBody">
                              <h4>{privates.tour_name}</h4>
                              <p>{privates.intro}</p>
                              <div className="ReviewRow">
                                {privates.destination_info &&
                                  privates.destination_info.length > 0 && (
                                    <span className="location">
                                      {privates.destination_info[0].name}
                                    </span>
                                  )}
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
                                    )}
                                    <strong>{getUserPrice(privates)}</strong>{" "}
                                    {privates.no_of_pax}
                                  </div>
                                ) : (
                                  <div className="aedtext">
                                    {selectedCurrency === "AED" ? (
                                      <span>AED</span>
                                    ) : (
                                      <span>USD</span>
                                    )}
                                    <strong>{getUserPrice(privates)}</strong>{" "}
                                    {privates.no_of_pax}
                                  </div>
                                )}
                              </div>
                              <div className="aedRHS">
                                {privates.tour_duration}
                              </div>
                            </div>
                          </Link>
                          <button
                            className={
                              wishlistData &&
                              wishlistData.some(
                                (item) => item === String(privates.id)
                              )
                                ? "wishlistIcon wishlistTagFill"
                                : "wishlistIcon"
                            }
                            onClick={() => addToWishlist(privates.id)}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-attractiontickets"
              role="tabpanel"
              aria-labelledby="nav-attractiontickets-tab"
            >
              <div className="Title">
                <h2>Attraction Ticket</h2>
                <div className="TabLayer">
                  <div className="TabWrapper">
                    {attraction.map((attraction, index) => {
                      const titleWithHyphens = attraction.slug; // Declare it here

                      return (
                        <div className="parenttabbox">
                          <Link
                            to={`/attraction-ticket/${titleWithHyphens}`}
                            className="TabBox"
                            key={index}
                          >
                            <div className="img">
                              <img
                                src={`${config.imageUrl}/${attraction.image}`}
                                alt=""
                              />
                              <div className="discountrow">
                                <div className="discount">
                                  <span>{`${attraction.discount}%`}</span>
                                </div>
                              </div>
                              <div class="imgBottomRow">
                                <div class="lhstext">
                                  <span>{attraction.hastag}</span>
                                </div>
                                <div className="rhsimg">
                                  {attraction.sticker_info[0].id === "1" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                      alt=""
                                    />
                                  )}
                                  {attraction.sticker_info[0].id === "2" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                      alt=""
                                    />
                                  )}
                                  {attraction.sticker_info[0].id === "3" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                      alt=""
                                    />
                                  )}
                                  {attraction.sticker_info.length > 1 && (
                                    <img
                                      src={attraction.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="TabBoxBody">
                              <h4>{attraction.tour_name}</h4>
                              <p>{attraction.intro}</p>
                              <div className="ReviewRow">
                                {attraction.destination_info &&
                                  attraction.destination_info.length > 0 && (
                                    <span className="location">
                                      {attraction.destination_info[0].name}
                                    </span>
                                  )}
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
                                    )}
                                    <strong>{getUserPrice(attraction)}</strong>{" "}
                                    {attraction.no_of_pax}
                                  </div>
                                ) : (
                                  <div className="aedtext">
                                    {selectedCurrency === "AED" ? (
                                      <span>AED</span>
                                    ) : (
                                      <span>USD</span>
                                    )}
                                    <strong>{getUserPrice(attraction)}</strong>{" "}
                                    {attraction.no_of_pax}
                                  </div>
                                )}
                              </div>
                              <div className="aedRHS">
                                {attraction.tour_duration}
                              </div>
                            </div>
                          </Link>
                          <button
                            className={
                              wishlistData &&
                              wishlistData.some(
                                (item) => item === String(attraction.id)
                              )
                                ? "wishlistIcon wishlistTagFill"
                                : "wishlistIcon"
                            }
                            onClick={() => addToWishlist(attraction.id)}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="nav-chauffeur"
              role="tabpanel"
              aria-labelledby="nav-chauffeur-tab"
            >
              <div className="Title">
                <h2>Chauffeur</h2>
                <div className="TabLayer">
                  <div className="TabWrapper">
                    {chauffeur.map((chauffeur, index) => {
                      const titleWithHyphens = chauffeur.slug; // Declare it here

                      return (
                        <div className="parenttabbox">
                          <Link
                            to={`/chauffeur/${titleWithHyphens}`}
                            className="TabBox"
                            key={index}
                          >
                            <div className="img">
                              <img
                                src={`${config.imageUrl}/${chauffeur.image}`}
                                alt=""
                              />
                              <div className="discountrow">
                                <div className="discount">
                                  <span>{`${chauffeur.discount}%`}</span>
                                </div>
                              </div>
                              <div class="imgBottomRow">
                                <div class="lhstext">
                                  <span>{chauffeur.hastag}</span>
                                </div>
                                <div className="rhsimg">
                                  {chauffeur.sticker_info[0].id === "1" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise2_hxevxq.png"
                                      alt=""
                                    />
                                  )}
                                  {chauffeur.sticker_info[0].id === "2" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211948/choise1_yir4hd.png"
                                      alt=""
                                    />
                                  )}
                                  {chauffeur.sticker_info[0].id === "3" && (
                                    <img
                                      src="https://res.cloudinary.com/dqslvlm0d/image/upload/v1698211949/choise3_u3nlou.png"
                                      alt=""
                                    />
                                  )}
                                  {chauffeur.sticker_info.length > 1 && (
                                    <img
                                      src={chauffeur.sticker_info[1].id}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="TabBoxBody">
                              <h4>{chauffeur.tour_name}</h4>
                              <p>{chauffeur.intro}</p>
                              <div className="ReviewRow">
                                {chauffeur.destination_info &&
                                  chauffeur.destination_info.length > 0 && (
                                    <span className="location">
                                      {chauffeur.destination_info[0].name}
                                    </span>
                                  )}
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
                                    )}
                                    <strong>{getUserPrice(chauffeur)}</strong>{" "}
                                    {chauffeur.no_of_pax}
                                  </div>
                                ) : (
                                  <div className="aedtext">
                                    {selectedCurrency === "AED" ? (
                                      <span>AED</span>
                                    ) : (
                                      <span>USD</span>
                                    )}
                                    <strong>{getUserPrice(chauffeur)}</strong>{" "}
                                    {chauffeur.no_of_pax}
                                  </div>
                                )}
                              </div>
                              <div className="aedRHS">
                                {chauffeur.tour_duration}
                              </div>
                            </div>
                          </Link>
                          <button
                            className={
                              wishlistData &&
                              wishlistData.some(
                                (item) => item === String(chauffeur.id)
                              )
                                ? "wishlistIcon wishlistTagFill"
                                : "wishlistIcon"
                            }
                            onClick={() => addToWishlist(chauffeur.id)}
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getUserPrice(tour) {
    let price = 0;

    if (userType === 2) {
      // Agent user type
      price =
        selectedCurrency === "AED"
          ? tour.tour_price_aed - (tour.tour_price_aed * userDiscount) / 100
          : tour.tour_price_usd - (tour.tour_price_usd * userDiscount) / 100;
    } else if (userType === 3) {
      // Normal user type
      price =
        selectedCurrency === "AED" ? tour.tour_price_aed : tour.tour_price_usd;
    } else {
      // Default case (handle other user types if needed)
      price =
        selectedCurrency === "AED" ? tour.tour_price_aed : tour.tour_price_usd;
    }

    // Remove decimal part
    return Math.floor(price);
  }
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency,
  // ... (other state mappings)
});

export default connect(mapStateToProps)(Banner);
