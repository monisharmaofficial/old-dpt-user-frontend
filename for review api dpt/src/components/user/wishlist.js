import React, { useState, useEffect } from 'react'
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed.svg";
import { ReactComponent as House } from "bootstrap-icons/icons/house.svg";
import { ReactComponent as Person } from "bootstrap-icons/icons/person.svg";
import { Link } from 'react-router-dom';
import config from '../../config';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Style/dashboard.css';

const Wishlist = ({ selectedCurrency }) => {
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

    const fetchBookingDetails = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${config.baseUrl}/booking/list`, {
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
                // localStorage.removeItem('first_name');
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
    const [wishlistData, setWishlistData] = useState([]);
    const [userDiscount, setUserDiscount] = useState(0); // Initialize userDiscount
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`${config.baseUrl}/wishlist/detail`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        setWishlistData(data.data);
                        setIsLoggedIn(true);
                        setUserType(data.userType); // Assuming the userType is fetched from data
                        setUserDiscount(data.userDiscount);
                    } else {
                        console.error("Invalid or empty wishlist data structure:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching wishlist data:", error);
                });
        } else {
            // Handle case where token is not available
            console.error("Token not available. User not authenticated.");
        }
    }, []);
    const deleteItem = (id) => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`${config.baseUrl}/wishlist/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    // If deletion is successful, update the wishlistData state by filtering out the deleted item
                    if (data.status === "success") {
                        const updatedWishlist = wishlistData.filter(item => item.id !== id);
                        setWishlistData(updatedWishlist);
                    } else {
                        console.error("Failed to delete item:", data.error);
                    }
                })
                .catch(error => {
                    console.error("Error deleting item:", error);
                });
        } else {
            console.error("Token not available. User not authenticated.");
        }
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
                            <Link to="/user-dashboard" className="nav-link DashboardIcon">
                                <img src="images/homepage/dashboardicon.png" alt="" /> Dashboard
                            </Link>
                            <Link to="/booking" className="nav-link MyBookingIcon">
                                <img src="images/homepage/mybookingicon.png" alt="" /> My Bookings
                            </Link>
                            <Link to="/wishlist" className="nav-link active WishlistIcon">
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
                                <Link onClick={handleLogout}><img src="images/homepage/logouticon.png" alt="" />Logout</Link>
                            </div>
                            {/*     <Link href="/help" className="nav-link HelpIcon">
                                <img src="images/customer-supporticon.png" alt="" /> Help
                            </Link>*/}
                        </div>
                        {/*topSidebar*/}

                    </div>
                    {/*userboardLHS*/}
                    <div className="tab-content userboardRHS">
                        <div className="userboardArea">
                            <div className="UserBoardinner">
                                {wishlistData.length === 0 ? (
                                    <p>Wishlist is Empty</p>
                                ) : (
                                    wishlistData.reverse().map((item, index) => (
                                        <div key={index} className="CartBoxXArea">
                                            <div className="CartBoxWrapper">
                                                <div className="CartTopBox">
                                                <Link to={`/tour/${item.tour_info[0].tour_slug}/${item.tour_info[0].tour_slug}`}>
                                                    <div className="CartimgWrapper">
                                                        <img src={`${config.imageUrl}/${item.tour_info[0].tour_image}`} alt={item.tour_info[0].Tour_name} />
                                                    </div>
                                                    </Link>
                                                    {/*CartimgWrapper*/}
                                                    <div className="CartContentWrapper">
                                                    <Link to={`/tour/${item.tour_info[0].tour_slug}/${item.tour_info[0].tour_slug}`}>
                                                        <h4>{item.tour_info[0].Tour_name}</h4>
                                                        <div className="Price">
                                                            {isLoggedIn ? (
                                                                <div className="aedtext">
                                                                    {selectedCurrency === "AED" ? (
                                                                        <span>AED</span>
                                                                    ) : (
                                                                        <span>USD</span>
                                                                    )} <strong>{getUserPrice(item)}</strong>
                                                                </div>
                                                            ) : (
                                                                <div className="aedtext">
                                                                    {selectedCurrency === "AED" ? (
                                                                        <span>AED</span>
                                                                    ) : (
                                                                        <span>USD</span>
                                                                    )} <strong>{getUserPrice(item)}</strong>
                                                                </div>
                                                            )}
                                                        </div>
                                                        </Link>
                                                        <div className="EditTrashGroup">
                                                            <div onClick={(e) => deleteItem(item.id, e)} className="Trash" />
                                                        </div>
                                                        {/*EditTrashGroup*/}
                                                    </div>
                                                    {/*CartContentWrapper*/}
                                                
                                                {/*CartTopBox*/}

                                                {/*CartBottomBox*/}
                                            </div>
                                            </div>
                                            {/*CartBoxWrapper Loop*/}

                                            {/*CartBoxWrapper Loop*/}
                                        </div>
                                    ))
                                )}
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
    function getUserPrice(item) {
        let price = 0;

        if (userType === 2) {
            // Agent user type
            price =
                selectedCurrency === "AED"
                    ? item.tour_info[0].tour_tour_price_aed - (item.tour_info[0].tour_tour_price_aed * userDiscount) / 100
                    : item.tour_info[0].tour_tour_price_usd - (item.tour_info[0].tour_tour_price_usd * userDiscount) / 100;
        } else if (userType === 3) {
            // Normal user type
            price = selectedCurrency === "AED" ? item.tour_info[0].tour_tour_price_aed : item.tour_info[0].tour_tour_price_usd;
        } else {
            // Default case (handle other user types if needed)
            price = selectedCurrency === "AED" ? item.tour_info[0].tour_tour_price_aed : item.tour_info[0].tour_tour_price_usd;
        }

        // Remove decimal part
        return Math.floor(price);
    }

}
const mapStateToProps = (state) => ({
    selectedCurrency: state.currency.selectedCurrency,
    // ... (other state mappings)
});

export default connect(mapStateToProps)(Wishlist);
