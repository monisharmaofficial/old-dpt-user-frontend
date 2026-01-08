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

const ViewDetail = () => {
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

    const [first_name, setUserName] = useState('');
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
    const handleChangePassword = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${config.baseUrl}/profile/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(passwordData),
            })
                .then((response) => response.json())
                .then((data) => {

                    if (data.success) {
                        // Optionally, handle success
                        console.log('Password changed successfully!');
                    } else {
                        // Optionally, handle failure
                        console.log('Failed to change password. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error changing password:', error);
                });
        }
    };
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[4]; 

    const fetchBookingDetailById = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${config.baseUrl}/booking/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Update the bookingDetails state with the fetched data
                    setBookingDetails(data.data); // Assuming the data structure is an array or an object received from the API
                })
                .catch((error) => {
                    console.error('Error fetching booking detail:', error);
                });
        }
    };

    // Call the function to fetch booking details on component mount
    useEffect(() => {
        fetchBookingDetailById();
    }, []);

    const getBookingDetail = (index, property) => {
        return bookingDetails.length > 0 && bookingDetails[index] ? bookingDetails[index][property] : '';
    };


    const handleLogout = () => {
        fetch(`${config.baseUrl}/logout`, {
            method: 'POST',
        })
            .then(() => {
                localStorage.removeItem('token');
                // localStorage.removeItem('first_name');
                setIsLoggedIn(false);
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed', error);
            });
    };


    return (
        <div>
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
                                <span className="closeIcon" onClick={closeMenu}/>
                            </div>
                            <Link to="/user-dashboard" className="nav-link active DashboardIcon">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772236/dashboardicon_n9cufo.png"} alt="" /> Dashboard
                            </Link>
                            <Link to="/booking" className="nav-link MyBookingIcon">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772237/mybookingicon_aume73.png"} alt="" /> My Bookings
                            </Link>
                            <Link to="/wishlist" className="nav-link WishlistIcon">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772538/wislisticonnew_t8tvl3.png"} alt="" />
                                Wishlist
                            </Link>
                            <Link to="/editprofile" className="nav-link EditrofileIcon">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772236/pen_tfhsvm.png"} alt="" /> Edit Profile
                            </Link>
                            <Link to="/changepassword" className="nav-link ChangePassWordIcon">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772237/changepasswordicon_lgsgic.png"} alt="" />
                                Change Password
                            </Link>
                            <div className="logoutDiv">
                            <Link  onClick={handleLogout} to="/">
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772236/logouticon_swvo87.png"} alt="" />
                                Logout
                            </Link>
                        </div>
                         {/*    <Link href="/help" className="nav-link HelpIcon">
                                <img src="images/customer-supporticon.png" alt="" /> Help
                            </Link>*/}
                        </div>
                        {/*topSidebar*/}
                      
                    </div>
                    {/*userboardLHS*/}
                    <div className="tab-content userboardRHS">
                        <div className="userboardArea">
                            <div className="UserBoardinner">
                                <div className="detailviewArea">
                                    <div className="CartBoxXArea">
                                        <div className="CartBoxWrapper">
                                            <div className="CartTopBox">
                                                {bookingDetails.length > 0 && (
                                                    <div className="CartimgWrapper">
                                                        <img src={`${config.imageUrl}/${bookingDetails[0].tour_image}`} alt="" />
                                                    </div>
                                                )}

                                                {/*CartimgWrapper*/}
                                                <div className="CartContentWrapper">
                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                        <div className="CartContentWrapper">
                                                            <h4>{bookingDetails[0].tour_name}</h4>
                                                            {/* Other content related to bookingDetails[0] */}
                                                        </div>
                                                    )}

                                                    <div className="Price">
                                                        AED <strong>500</strong>
                                                    </div>
                                                </div>
                                                {/*CartContentWrapper*/}
                                            </div>
                                            {/*CartTopBox*/}
                                            <div className="CartBottomBox">
                                                <div className="collapseview">
                                                    <div className="BookingInfoData">
                                                        <div className="heading">Booking Info</div>
                                                        <div className="BookingInfotableData">
                                                            <div className="BookingInfotableDiv">
                                                                <div className="BookingInfotablerow">
                                                                    <span>Full Name*</span>
                                                                     {bookingDetails.length > 0 && bookingDetails[0] && (

                                                                        <span>{bookingDetails[0].first_name} {bookingDetails[0].last_name}</span>

                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Email*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (

                                                                        <span>{bookingDetails[0].email}</span>

                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Addition Driver*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (

                                                                        <span>{bookingDetails[0].addition_driver}</span>

                                                                    )}

                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Additional Lunch*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (

                                                                        <span>{bookingDetails[0].additional_lunch}</span>

                                                                    )}

                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Additional Tickets*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].additional_lunch}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Adults*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].adults}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Booking Date*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].adults}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Country* </span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].tour_date}</span>
                                                                    )}
                                                                </div>{/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Cell No* </span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].cell_no}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                               

                                                            </div>
                                                            {/*BookingInfotableDiv*/}

                                                            <div className="BookingInfotableDiv">

                                                                <div className="BookingInfotablerow">
                                                                    <span>Nationality*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].nationality}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>How Did You Discover Us*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].discover_us}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}



                                                                <div className="BookingInfotablerow">
                                                                    <span>End Location*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].end_location}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Pref.currency</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].adults}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Infants</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].adults}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}
                                                                <div className="BookingInfotablerow">
                                                                    <span>Payment Mode*</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].payment_mode}</span>
                                                                    )}
                                                                </div>
                                                                {/*BookingInfotablerow*/}

                                                                <div className="BookingInfotablerow">
                                                                    <span>Special Request</span>
                                                                    {bookingDetails.length > 0 && bookingDetails[0] && (
                                                                        <span>{bookingDetails[0].special_equest}</span>
                                                                    )}
                                                                </div>


                                                                {/*BookingInfotablerow*/}
                                                            </div>
                                                            {/*BookingInfotableDiv*/}
                                                        </div>

                                                        {/*BookingInfotableData*/}
                                                    </div>
                                                    {/*BookingInfoData*/}
                                                </div>
                                            </div>
                                            {/*CartBottomBox*/}
                                        </div>
                                        {/*CartBoxWrapper Loop*/}
                                    </div>
                                    {/*CartBoxXArea*/}
                                </div>
                                {/*detailviewArea*/}
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



        </div>
    )
}

export default ViewDetail
