import React, { useState, useEffect } from 'react';
import UserHeader from '../common/dashboardHeader';
import moment from 'moment'
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed.svg";
import { ReactComponent as House } from "bootstrap-icons/icons/house.svg";
import { ReactComponent as Person } from "bootstrap-icons/icons/person.svg";
import './Style/dashboard.css';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    lastName: '',
    email: '',
    country: '',
    phoneno: '',
    address: '',
  });
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
  });


  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [latestBookingsCount, setLatestBookingsCount] = useState(0); 
  const [first_name, setUserName] = useState('');
  const [canceledBookingsCount, setCanceledBookingsCount] = useState(0);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [bookingDetails, setBookingDetails] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClose, setMenuClose] = useState(true);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };
  const closeMenu = () => {
    setMenuOpen(false);
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

          setUserName(data.data.first_name);
          setEmail(data.data.email);
          setIsLoggedIn(true);
        })

        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${config.baseUrl}/welcome`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.data.first_name);
          setEmail(data.data.email);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);


  const fetchBookingDetails = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${config.baseUrl}/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming the response data is an array of booking details
          setBookingDetails(data.data);
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error);
        });
    }
  };

  // Use useEffect to fetch booking details on component mount
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const handleLogout = () => {
    fetch(`${config.baseUrl}/logout`, {
      method: 'POST',
    })
      .then(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${config.baseUrl}/profile/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {

          if (data.success) {
            setSuccessMessage('Profile updated successfully!');
            // Optionally, reset form fields or perform additional actions
          } else {
            setSuccessMessage('Failed to update profile. Please try again.');
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          setLoading(false);
        });
    }
  };
// Update useEffect blocks for fetching latest and canceled bookings count
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch(`${config.baseUrl}/booking/latest/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Access the correct property containing the array
        if (data && data.data && Array.isArray(data.data)) {
          setLatestBookingsCount(data.data.length);
        } else {
          // Handle the case where the data structure doesn't match the expected format
          console.error('Unexpected data format for latest bookings:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching latest bookings data:', error);
      });
  }
}, []);

// Similar modification for fetching canceled bookings count
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch(`${config.baseUrl}/booking/cancele/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setCanceledBookingsCount(data.data.length);
        } else {
          console.error('Unexpected data format for canceled bookings:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching canceled bookings data:', error);
      });
  }
}, []);

  return (
    <>
      <>
        <header className="userHeader">
          <div className="customcontainer ">
            <div className="userHeaderIn">
              <div className="userHeaderLhs">

                <div className="logo"><Link to="/"><img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701321722/innerlogo_yezfc1.svg"} alt="" /></Link></div>
                <div className="userboardTitle"><span
                  className="ToggleBtn"
                  onClick={() => setMenuOpen(prevState => !prevState)}
                ></span>
                  <span className="closeIcon" onClick={closeMenu}></span> Dashboard</div>
              </div>
              <div className="userHeaderRhs">
                <div className="dropdown notificationIcon">
                  {/*     <Link className="btn notificationIconTag dropdown-toggle" to="#" role="button" id="notificationIcon" data-bs-toggle="dropdown" aria-expanded="false">
                  <small>2</small>
                </Link>*/}

                  <ul className="dropdown-menu" aria-labelledby="notificationIcon">
                    <li><Link className="dropdown-item" to="#"> You have 4 new notifications</Link></li>
                  </ul>
                </div>
                <div className="dropdown userIcon">
                  <Link className="btn userIconTag dropdown-toggle" to="#" role="button" id="userIcon" data-bs-toggle="dropdown" aria-expanded="false">

                  </Link>

                  <ul className="dropdown-menu" aria-labelledby="userIcon">
                    <li>
                      {isLoggedIn ? (
                        <div>
                          <Link to="/user-dashboard" className="dropdown-item">
                            <div >
                              <Person className="text-danger" />
                              <span className="userName" style={{ color: "black" }}>{first_name}</span>
                            </div>
                          </Link>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <Link to="/booking" className="dropdown-item">
                              <House className="text-danger" /> Bookings
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <Link className="dropdown-item" onClick={handleLogout}>
                              <IconDoorClosedFill className="text-danger" /> Logout
                            </Link>
                          </li>
                        </div>

                      ) : (
                        <Link to="/login" className="dropdown-item">Login/SignUp</Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className={`body ${menuOpen ? 'dashboardMenuOpen' : ''} userboardContent`}>
          <div className="d-flex align-items-start">
            <div
              className="nav flex-column nav-pills userboardLHS"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div className="topSidebar">
                <div className="sidebarLogo">
                  <Link to="/">
                    {" "}
                    <img src="images/homepage/innerlogo.svg" alt="" />
                  </Link>
                  <span className="closeIcon" onClick={closeMenu}></span>

                </div>
                <Link to="/user-dashboard" className="nav-link active DashboardIcon">
                  <img src="images/homepage/dashboardicon.png" alt="" /> Dashboard
                </Link>
                <Link to="/booking" className="nav-link MyBookingIcon">
                  <img src="images/homepage/mybookingicon.png" alt="" /> My Bookings
                </Link>
                <Link to="/wishlist" className="nav-link WishlistIcon">
                  <img src="images/homepage/wislisticonnew.png" alt="" />
                  Wishlist
                </Link>
                <Link to="/editprofile" className="nav-link EditrofileIcon">
                  <img src="images/homepage/pen.png" alt="" /> Edit Profile
                </Link>
                <Link to="/changepassword" className="nav-link ChangePassWordIcon">
                  <img src="images/homepage/changepasswordicon.png" alt="" />
                  Change Password
                </Link>
                <div className="logoutDiv">
                <Link to="/">
                  <img src="images/homepage/logouticon.png" alt="" />
                  Logout
                </Link>
              </div>
             
              </div>
              {/*topSidebar*/}
              
            </div>
            {/*userboardLHS*/}
            <div className="tab-content userboardRHS">
              <div className="userboardArea">
                <div className="UserBoardinner">
                  <div className="DashboardFront">
                  <div className="DashboardFront">
                  <div className="DashboardFrontTop">
                    <div className="DashboardBox">
                      <div className="Icon"><img src="images/homepage/graphicon.png" alt="" /></div>
                      <div className="Text">
                        <div className="Heading">{bookingDetails.length}</div>
                        <div className="SubHeading">Total Bookings</div>
                      </div>
                    </div>
                    <div className="DashboardBox">
                      <div className="Icon"><img src="images/homepage/next-weekicon.png" alt="" /></div>
                      <div className="Text">
                      <div className="Heading">{latestBookingsCount}</div> 
                        <div className="SubHeading">Upcoming Bookings</div>
                      </div>
                    </div>
                    <div className="DashboardBox">
                      <div className="Icon"><img src="images/homepage/forbiddenicon.png" alt="" /></div>
                      <div className="Text">
                      <div className="Heading">{canceledBookingsCount}</div>
                        <div className="SubHeading">Cancel Bookings</div>
                      </div>
                    </div>
                  </div>
                </div>
                    {/*DashboardFrontTop*/}
                  </div>
                  {/*"DashboardFront*/}
                  <div className="BookingDetail">
                    <h4>Booking Details</h4>
                    <div className="BookingDetailWrapper">

                    <div className="BookingDetailData">

                      <div className="BookingDetailRow">
                        <div className="srno">SN</div>
                        <div className="BillingName">Billing Name</div>
                        <div className="Date">Date</div>
                        <div className="TotalPayment">Total Payment</div>
                        <div className="Action">Detail</div>
                      </div>

                      {bookingDetails.reverse().map((booking, index) => (
                        <div className="BookingDetailRow">
                          <div className="srno">{index + 1}</div>
                         
                          <div className="BillingName">{booking.first_name}</div>
                          <div className="Date">{moment(booking.booking_date).format("DD-MM-YYYY")}</div>
                          <div className="TotalPayment">{booking.currency} {booking.total}</div>
                          <div className="Action">
                            <div className="IconsAll">
                              <Link to={`/view-tour/${booking.id}`} className="view"></Link>
                            </div>
                          </div>
                        </div>
                      ))}



                    {/*  <div className="paginationDiv">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li className="page-item">
                              <Link className="page-link" to="#" aria-label="Previous">
                                <span aria-hidden="true">&lt;</span>
                              </Link>
                            </li>
                            <li className="page-item"><Link className="page-link inactive" to="#">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                            <li className="page-item">
                              <Link className="page-link" to="#" aria-label="Next">
                                <span aria-hidden="true">&gt;</span>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>*/} 
                    </div>

                  </div>
                    {/*BookingDetailWrapper*/}
                  </div>
                  {/*BookingDetail*/}
                </div>
                {/*UserBoardinner*/}
              </div>
              {/*userboardArea*/}
              <div className="menuOverlay" />
              <footer>
                <div className="userboardFooter">
                  Copyright 2023. All Rights Reserved.
                </div>
              </footer>
            </div>
            {/*userboardRHS*/}
          </div>
          {/*d-flex align-items-start*/}
        </div>
      </>

    </>
  )
}

export default UserProfile
