import React, { useState, useEffect } from 'react'
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed.svg";
import { ReactComponent as House } from "bootstrap-icons/icons/house.svg";
import { ReactComponent as Person } from "bootstrap-icons/icons/person.svg";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment'
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import './Style/dashboard.css';

const Review = () => {
    const [reviewData, setReviewData] = useState({
        rating: '',
        comments: ''
    });


    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [first_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviews, setReviews] = useState([]);
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
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[4];

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
                    setCountry(data.data.country);
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


    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // Prepare the data to be sent to the backend
        const dataToSend = {
            rating: reviewData.rating,
            comments: reviewData.comments
        };
    
        // Make a POST request to the backend API
        fetch(`${config.baseUrl}/review/add/${slug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review submitted successfully!',
                    showConfirmButton: false,
                    timer: 2500 // You can adjust the timer to control how long the message is displayed
                });
                setReviewData({
                    rating: '',
                    comments: '',
                    
                });
            } else {
                // Handle errors, maybe show an error message
                console.error('Failed to submit review');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error submitting review:', error);
        });
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
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${config.baseUrl}/review/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                // Set the reviews state with the fetched data
                setReviews(data.data); 
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
        }
    }, []);
    
    return (
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
                                <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701772538/wislisticonnew_t8tvl3.png"}  alt="" />
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
                                <div className="IntabReviewField">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-readreviews-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-readreviews"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-readreviews"
                                                aria-selected="true"
                                            >
                                                Read Reviews
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active"
                                                id="pills-writeareview-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-writeareview"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-writeareview"
                                                aria-selected="false"
                                            >
                                                Write a Review
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade"
                                            id="pills-readreviews"
                                            role="tabpanel"
                                            aria-labelledby="pills-readreviews-tab"
                                        >
                                            <div className="readReviewDiv">
                                            {reviews.map((review, index) => (
                                                <div className="readReviewBox" key={index}>
                                                    <div className="titlewithsubtitle">
                                                        <h2>
                                                            {review.name} <small>{review.country}</small>
                                                        </h2>
                                                    </div>
                                                    {/*titlewithsubtitle*/}
                                                    <div className="posteddiv">
                                                        <span>Posted:</span> {moment(review.created_at).format('YYYY-MM-DD')}
                                                    </div>
                                                    <div className="RatingDivNew">
                                                        <img src="images/ratingstar.png" alt="" />
                                                    </div>
                                                    <div className="descnew">
                                                        <p>
                                                           {review.comments}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                                {/*readReviewBox*/}
                                               

                                                {/*readReviewBox*/}
                                            </div>
                                            {/*readReviewDiv*/}
                                        </div>
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-writeareview"
                                            role="tabpanel"
                                            aria-labelledby="pills-writeareview-tab"
                                        >
                                            <div className="INreviewFieldForm">
                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Your Name"
                                                                    required
                                                                    value={first_name}
                                                                    onChange={(e) => setUserName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Email</label>
                                                                <input
                                                                    type="gmail"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    required
                                                                    value={email} // Use optional chaining and provide a fallback value
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Your Rating</label>
                                                                <select
                                                                    className="form-select"
                                                                    required
                                                                    value={reviewData.rating}
                                                                    onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="5">Excellent</option>
                                                                    <option value="4">Very Good</option>
                                                                    <option value="3">Average</option>
                                                                    <option value="2">Poor</option>
                                                                    <option value="1">Terrible</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Select Country</label>
                                                                <input
                                                                    type="gmail"
                                                                    className="form-control"
                                                                    placeholder="Country"
                                                                    required
                                                                    value={country} // Use optional chaining and provide a fallback value
                                                                    onChange={(e) => setCountry(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Comments</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    placeholder=""
                                                                    rows={3}
                                                                    required
                                                                    value={reviewData.comments}
                                                                    maxLength={500}
                                                                    onChange={(e) => setReviewData({ ...reviewData, comments: e.target.value })}
                                                                />
                                                            </div>
                                                            {/*formGroup*/}
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="BtnGroupCta">
                                                                <button type="submit" className="cta">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/*INreviewFieldForm*/}
                                        </div>
                                    </div>
                                </div>
                                {/*IntabReviewField*/}
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
    )
}

export default Review
