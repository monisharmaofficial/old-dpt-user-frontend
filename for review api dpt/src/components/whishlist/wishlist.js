import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../cart/style/cart.css'
import config from "../../config";
import { connect } from 'react-redux';

const Wishlist = ({ selectedCurrency }) => {

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


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [expandedItemIndex, setExpandedItemIndex] = useState(null);


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

                    setIsLoggedIn(true);
                })

                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
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
        <div className="CartPageContent">
            <div className="container">
                <div className="CartPageContentWrapper">
                    <div className="CartPageContenLHS">{
                        wishlistData.map((item, index) => (
                            <div key={index} className="CartBoxWrapper">
                                <Link to={`/tour/${item.tour_info[0].tour_slug}/${item.tour_info[0].tour_slug}`} className="CartTopBox">
                                    <div className="CartimgWrapper">
                                        <img src={`${config.imageUrl}/${item.tour_info[0].tour_image}`} alt={item.tour_info[0].Tour_name} />
                                    </div>
                                    {/*CartimgWrapper*/}
                                    <div className="CartContentWrapper">
                                        <h4>{item.tour_info[0].Tour_name}</h4>
                                        <div className="Price">
                                            {isLoggedIn ? (
                                                <div className="aedtext">
                                                    {selectedCurrency === "AED" ? (
                                                        <span>AED</span>
                                                    ) : (
                                                        <span>USD</span>
                                                    )}
                                                    <strong>{getUserPrice(item)}</strong>
                                                </div>
                                            ) : (
                                                <div className="aedtext">
                                                    {selectedCurrency === "AED" ? (
                                                        <span>AED</span>
                                                    ) : (
                                                        <span>USD</span>
                                                    )}
                                                    <strong>{getUserPrice(item)}</strong>
                                                </div>
                                            )}

                                        </div>
                                        <div className="BtnGroup">


                                        </div>
                                        <div className="EditTrashGroup">
                                            {/*   <div className="Edit" />*/}
                                            <div onClick={() => deleteItem(item.id)} className="Trash" />

                                        </div>
                                        {/*EditTrashGroup*/}
                                    </div>
                                    {/*CartContentWrapper*/}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
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


