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

const ViewBookingTour = () => {

    const [expandedItemIndex, setExpandedItemIndex] = useState(null);
    const [first_name, setUserName] = useState('');
    const [bookingList, setBookingList] = useState([]);
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuClose, setMenuClose] = useState(true);
    const navigate = useNavigate();
    const url = window.location.href;
    const spliturl = url.split("/");
    const id = spliturl[4];

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };
    const closeMenu = () => {
        setMenuOpen(false);
    };
    const fetchBookingList = () => {
        const token = localStorage.getItem('token');
        fetch(`${config.baseUrl}/booking/list/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response data is an array of booking items
                setBookingList(data.data);
            })
            .catch((error) => {
                console.error('Error fetching booking list:', error);
            });
    };

    // Use useEffect to fetch booking list from the API on component mount
    useEffect(() => {
        fetchBookingList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                localStorage.removeItem('first_name');
                setIsLoggedIn(false);
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed', error);
            });
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
        const day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if needed

        return `${year}-${day}-${month}`;
    };

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
                                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701321722/innerlogo_yezfc1.svg"} alt="" />
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
                                    <Link onClick={handleLogout}><img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772236/logouticon_swvo87.png"} alt="" />Logout</Link>
                                </div>
                                {/*  <Link href="/help" className="nav-link HelpIcon">
                                <img src="images/customer-supporticon.png" alt="" /> Help
                            </Link>*/}
                            </div>
                            {/*topSidebar*/}

                        </div>
                        {/*userboardLHS*/}
                        <div className="tab-content userboardRHS">
                            <div className="userboardArea">
                                <div className="UserBoardinner">
                                    <h2>Booking Tour Details</h2>

                                    <div className="CartPageContentWrappera">
                                        <div className="CartPageContenLHSa">
                                            {bookingList.map((item, index) => (

                                                <div key={index} className="CartBoxWrapper">
                                                     <Link to={`/tour/${item.tour_slug}/${item.tour_slug}`}>
                                                    <div className="CartTopBox">
                                                        <div className="CartimgWrapper">
                                                            <img src={`${config.imageUrl}/${item.tour_image}`} alt={item.tourName} />
                                                        </div>
                                                        {/*CartimgWrapper*/}
                                                        <div className="CartContentWrapper">
                                                            <div className="textWithNewIcon">
                                                                <h4>{item.tour_name}</h4>
                                                                <div className="AllIconsNew">
                                                                    <Link to= {`/review/${item.id}`}className="reviewstarIconNew"></Link>
                                                                
                                                                    {/* <a href="#" className="TrashIconNew"></a> */}
                                                                </div>
                                                            </div>

                                                            <div className="Price">
                                                                {item.tour_currency} {item.tour_currency === 'AED' ? (
                                                                    <>
                                                                        {item.tourPriceAed + item.tourtotal}
                                                                    </>
                                                                ) : item.tour_currency === 'USD' ? (
                                                                    <>
                                                                        {item.tourPriceUsd + item.tourtotal}
                                                                    </>
                                                                ) : (
                                                                    // Handle other currency types here if needed
                                                                    <>
                                                                        {item.tourPrice + item.tourtotal}
                                                                    </>
                                                                )}
                                                            </div>

                                                            <div className="BtnGroup">
                                                                <Link
                                                                    href="#"
                                                                    className="cta BookingInfoCta"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#collapseExample${index}`}
                                                                    aria-expanded={expandedItemIndex === index}
                                                                    aria-controls={`collapseExample${index}`}
                                                                    onClick={() => setExpandedItemIndex(index)}
                                                                >
                                                                    Booking Info
                                                                </Link>  <div className="Status">
                                                                    {item.status === 0 && <a className="cta pending"><span>Pending</span></a>}
                                                                    {item.status === 1 && <a className="cta success"><span>Success</span></a>}
                                                                    {item.status === 2 && <a className="cta canceled"><span>Canceled</span></a>}
                                                                </div>




                                                            </div>
                                                            <div className="EditTrashGroup">
                                                                {/*   <div className="Edit" />*/}
                                                                {/* <div onClick={() => handleRemoveFromCart(index)} className="Trash" /> */}

                                                            </div>
                                                            {/*EditTrashGroup*/}
                                                        </div>
                                                        {/*CartContentWrapper*/}
                                                    </div>
                                                    </Link>
                                                    {/*CartTopBox*/}
                                                    <div className="CartBottomBox">
                                                        <div className="collapse" id={`collapseExample${index}`}>
                                                            <div className="BookingInfoData">
                                                                <div className="heading">Booking Info</div>
                                                                <div className="BookingInfotableData">
                                                                    <div className="BookingInfotableDiv">
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Tour Date*</span>
                                                                            <span>{formatDate(item.tour_date)}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Pickup Location*</span>
                                                                            <span>{item.pickup_location}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Hotel Name*</span>
                                                                            <span>{item.hotel_name}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Preferred Language*</span>
                                                                            <span>{item.language}</span>
                                                                        </div>

                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Adults*</span>
                                                                            <span>{item.adults}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Adults Price*</span>
                                                                            <span>{item.tour_currency} {item.adult_price}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Children</span>
                                                                            <span>{item.children}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Children Price</span>
                                                                            <span>{item.tour_currency} {item.children_price}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Additional Driver</span>
                                                                            <span>{item.addition_driver}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Driver Price</span>
                                                                            <span>{item.tour_currency} {item.driver_total_price}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Additional Lunch</span>
                                                                            <span>{item.additional_lunch}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Lunch Price</span>
                                                                            <span>{item.tour_currency} {item.lunch_price}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                    </div>
                                                                    {/*BookingInfotableDiv*/}
                                                                    <div className="BookingInfotableDiv">
                                                                    <div className="BookingInfotablerow">
                                                                            <span>ORDER ID* </span>

                                                                            <span>{item.order_id}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Preferred Pickup Time* </span>

                                                                            <span>{item.pickup_time}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">

                                                                            <span>End Location*</span>

                                                                            {item.preferredEndLocation === "Any Other Places in Dubai" ? (
                                                                                <>
                                                                                    {item.otherPlaceName}, {item.otherPlaceAddress} , {item.otherPlaceTelephone}
                                                                                </>
                                                                            ) :
                                                                                item.end_location
                                                                            }

                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Preferred Language Price*</span>
                                                                            <span>{item.tour_currency} {item.language_price}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Pref.currency</span>
                                                                            <span>{item.tour_currency}</span>
                                                                        </div>

                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Infants</span>
                                                                            <span>{item.infants}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Infants Price</span>
                                                                            <span>{item.tour_currency} {item.infants_price}</span>
                                                                        </div>
                                                                        {/*BookingInfotablerow*/}
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Payment Mode*</span>
                                                                            <span>{item.payment_mode}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Itinerary Name</span>
                                                                            <span>{item.itinerary_name}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Itinerary Price</span>
                                                                            <span>{item.tour_currency} {item.additional_tickets_price}</span>
                                                                        </div>
                                                                        <div className="BookingInfotablerow">
                                                                            <span>Special Request</span>
                                                                            <span>{item.special_equest}</span>
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
                                            ))}
                                        </div>

                                    </div>

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

export default ViewBookingTour
