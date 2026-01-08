import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./CartActions";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './style/cart.css'
import { getUserPrice } from './PriceUtlis';
import config from "../../config";

const Cart = () => {
  const dispatch = useDispatch();
  let cartdata = localStorage.getItem("cartdata");
  console.log(cartdata)
  const [cart, setCart] = useState([]);
  // const cart = useSelector((state) => state.cart.cart);
  const ourSelectedCurrency = cart.length > 0 ? cart[0].preferredCurrency : 'AED';


  const particularItemPriceAed = (item) => {
    if (!item) {
      console.error("Item is undefined or null");
      return 0;
    }


    const totalInfantsPrice = parseFloat(item.infantsPrice || 0);
    const totalAdultPrice = parseFloat(item.adultPrice || 0);
    const totalChildrenPrice = parseFloat(item.childrenPrice || 0);
    const totalDriverPrice = parseFloat(item.driverTotalPrice || 0);
    const totalLunchPrice = parseFloat(item.lunchPrice || 0);
    const totalTicketPrice = parseFloat(item.additionalTickets || 0);
    const totalLanguagePrice = parseFloat(item.languagePrice || 0);
    const itemPriceAED = parseFloat(item.tourPriceAed) || 0;

    const totalPriceForItem =
      itemPriceAED +
      totalInfantsPrice +
      totalAdultPrice +
      totalChildrenPrice +
      totalDriverPrice +
      totalTicketPrice +
      totalLunchPrice +
      totalLanguagePrice;


    return totalPriceForItem.toFixed(2);
  };


  const particularItemPriceUsd = (item) => {

    const totalInfantsPrice = parseFloat(item.infantsPrice || 0);
    const totalAdultPrice = parseFloat(item.adultPrice || 0);
    const totalChildrenPrice = parseFloat(item.childrenPrice || 0);
    const totalDriverPrice = parseFloat(item.driverTotalPrice || 0);
    const totalLunchPrice = parseFloat(item.lunchPrice || 0);
    const totalTicketPrice = parseFloat(item.additionalTickets || 0);
    const totalLanguagePrice = parseFloat(item.languagePrice || 0);
    const itemPriceUSD = parseFloat(item.tourPriceUsd) || 0;
    const totalPriceForItem = itemPriceUSD + totalInfantsPrice + totalAdultPrice + totalChildrenPrice + totalDriverPrice + totalTicketPrice + totalLunchPrice + totalLanguagePrice;

    return totalPriceForItem.toFixed(2); // Format the price to two decimal places
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const currency = item.preferredCurrency || 'AED'; // Assuming a default value if preferredCurrency is undefined
      return total + (currency === 'AED' ? parseFloat(particularItemPriceAed(item)) : parseFloat(particularItemPriceUsd(item)));
    }, 0);

    const taxPercentage = 0.18; // 18% tax
    const total = subtotal * taxPercentage;
    const fullTotal = subtotal + total;

    return {
      subtotal,
      taxPercentage,
      fullTotal,
      total
    };
  };



  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState("");
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
  useEffect(() => {
    // Fetch cart data from localStorage when the component mounts
    const storedCart = localStorage.getItem("cartdata");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (itemIndex) => {
    // Remove item from the cart
    const updatedCart = cart.filter((_, index) => index !== itemIndex);
    setCart(updatedCart);

    // If the removed item was the one that was expanded, setExpandedItemIndex(null);
    if (expandedItemIndex !== null && expandedItemIndex === itemIndex) {
      setExpandedItemIndex(null);
    }

    // Update localStorage with the modified cart
    localStorage.setItem("cartdata", JSON.stringify(updatedCart));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if needed

    return `${year}-${day}-${month}`;
  };



  return (
    <div className="CartPageContent">
      <div className="container">
        <div className="CartPageContentWrapper">
          <div className="CartPageContenLHS">
            {cart && Array.isArray(cart) && cart.length === 0 ? (
              <div className="EmptyCartMessage">Your cart is empty</div>
            ) : (
              cart.map((item, index) => (

                <div key={index} className="CartBoxWrapper">
                  <div className="CartTopBox">
                    <div className="CartimgWrapper">
                      <img src={`${config.imageUrl}/${item.tourImage}`} alt={item.tourName} />
                    </div>
                    {/*CartimgWrapper*/}
                    <div className="CartContentWrapper">
                      <h4>{item.tourName}</h4>
                      <div className="Price">
                        {isLoggedIn ? (
                          <div className="aedtext">
                            {item.preferredCurrency === "AED" ? (
                              <strong>{item.preferredCurrency} {particularItemPriceAed(item)}</strong>
                            ) : (
                              <strong>{item.preferredCurrency} {particularItemPriceUsd(item)}</strong>
                            )}
                          </div>
                        ) : (
                          <div className="aedtext">
                            {item.preferredCurrency === "AED" ? (
                              <strong>{item.preferredCurrency} {particularItemPriceAed(item)}</strong>
                            ) : (
                              <strong>{item.preferredCurrency} {particularItemPriceUsd(item)}</strong>
                            )}
                          </div>
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
                        </Link>

                      </div>
                      <div className="EditTrashGroup">
                        {/*   <div className="Edit" />*/}
                        <div onClick={() => handleRemoveFromCart(index)} className="Trash" />

                      </div>
                      {/*EditTrashGroup*/}
                    </div>
                    {/*CartContentWrapper*/}
                  </div>
                  {/*CartTopBox*/}
                  <div className="CartBottomBox">
                    <div className="collapse" id={`collapseExample${index}`}>
                      <div className="BookingInfoData">
                        <div className="heading">Booking Info</div>
                        <div className="BookingInfotableData">
                          <div className="BookingInfotableDiv">
                            <div className="BookingInfotablerow">
                              <span>Tour Date</span>
                              <span>{formatDate(item.tourDate)}</span>
                            </div>
                           
                            <div className="BookingInfotablerow">
                              <span>Pickup Location</span>
                              <span>
                                {item.preferredPickupLocation === "Hotel/Apartment" ? (
                                  <>
                                     {item.preferredPickupLocation} <br/>{item.pickupHotelName}, {item.pickupHotelAddress}, {item.pickupHotelTelephone}
                                  </>
                                
                                ) : item.preferredPickupLocation === "Restaurant" ? (
                                  <>
                                    {item.preferredPickupLocation} <br/>{item.pickupRestaurantName}, {item.pickupRestaurantAddress}, {item.pickupRestaurantTelephone}
                                  </>
                                ) : item.preferredPickupLocation === "Local Residence" ? (
                                  <>
                                    {item.preferredPickupLocation} <br/>{item.pickupResidenceAddress}, {item.pickupResidenceTelephone}
                                  </>
                                ) : item.preferredPickupLocation === "DXB Airport Terminal 1" ||item.preferredPickupLocation === "DXB Airport Terminal 2" || item.preferredPickupLocation === "DXB Airport Terminal 3"|| item.preferredPickupLocation === "DWC Airport" || item.preferredPickupLocation==="Abu Dhabi Airport"? (
                                  <>
                                    {item.preferredPickupLocation} <br/>{item.pickupFlightNameNumber}, {item.pickupFlightArrivalTime}, {item.pickupFlightDepartureTime}
                                  </>
                                ) : item.preferredPickupLocation === "Dubai Cruise Ship Terminal" || item.preferredPickupLocation === "Abu Dhabi Cruise Ship Terminal" ? (
                                  <>
                                    {item.preferredPickupLocation} <br/>{item.pickupShipName}
                                  </>
                                ) : (
                                  item.preferredPickupLocation
                                )}
                              </span>
                            </div>

                            <div className="BookingInfotablerow">
                              <span>Hotel Name</span>
                              <span>{item.preferredHotelName}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Preferred Language</span>
                              <span>{item.preferredGuideLanguage}</span>
                            </div>

                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Adults</span>
                              <span>{item.adults}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Adults Price</span>
                              <span>{item.preferredCurrency} {item.adultPrice}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Children</span>
                              <span>{item.children}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Children Price</span>
                              <span>{item.preferredCurrency} {item.childrenPrice}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Additional Driver</span>
                              <span>{item.preferredDriver}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Driver Price</span>
                              <span>{item.preferredCurrency} {item.driverTotalPrice}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Additional Lunch</span>
                              <span>{item.preferredLunc}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Lunch Price</span>
                              <span>{item.preferredCurrency} {item.lunchPrice}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                          </div>
                          {/*BookingInfotableDiv*/}
                          <div className="BookingInfotableDiv">
                            <div className="BookingInfotablerow">
                              <span>Preferred Pickup Time</span>

                              <span>{item.preferredPickupTime}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>End Location</span>
                              <span>
                                {item.preferredEndLocation === "Any Other Places in Dubai" ? (
                                  <>
                                    {item.preferredEndLocation}<br />
                                    {item.otherPlaceName}, {item.otherPlaceAddress}, {item.otherPlaceTelephone}
                                  </>
                                ) : item.preferredEndLocation === "Hotel/Apartment" ? (
                                  <>
                                    {item.preferredEndLocation}<br />{item.endHotelName}, {item.endHotelAddress}, {item.endHotelTelephone}
                                  </>
                                ) : item.preferredEndLocation === "Restaurant" ? (
                                  <>
                                    {item.preferredEndLocation}<br />{item.endRestaurantName}, {item.endRestaurantAddress}, {item.endRestaurantTelephone}
                                  </>
                                ) : item.preferredEndLocation === "Local Residence" ? (
                                  <>
                                    {item.preferredEndLocation}<br />{item.endResidenceAddress}, {item.endResidenceTelephone}
                                  </>
                                ) : item.preferredEndLocation === "DXB Airport Terminal 1" ||item.preferredEndLocation === "DXB Airport Terminal 2" || item.preferredEndLocation === "DXB Airport Terminal 3"|| item.preferredEndLocation === "DWC Airport" || item.preferredEndLocation==="Abu Dhabi Airport" ? (
                                  <>
                                    {item.preferredEndLocation}<br />{item.endFlightNameNumber}, {item.endFlightArrivalTime}, {item.endFlightDepartureTime}
                                  </>
                                ) :  item.preferredEndLocation === "Dubai Cruise Ship Terminal" || item.preferredEndLocation === "Abu Dhabi Cruise Ship Terminal" ? (
                                  <>
                                    {item.preferredEndLocation}<br />{item.endShipName}
                                  </>
                                ) : (
                                  item.preferredEndLocation
                                )}
                              </span>
                            </div>

                            <div className="BookingInfotablerow">
                              <span>Preferred Language Price</span>
                              <span>{item.preferredCurrency} {item.languagePrice}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Pref.currency</span>
                              <span>{item.preferredCurrency}</span>
                            </div>

                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Infants</span>
                              <span>{item.infants}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Infants Price</span>
                              <span>{item.preferredCurrency} {item.infantsPrice}</span>
                            </div>
                            {/*BookingInfotablerow*/}
                            <div className="BookingInfotablerow">
                              <span>Payment Mode</span>
                              <span>{item.preferredPay}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Itinerary Name</span>
                              <span>{item.itinerary_name}</span>
                            </div>
                            <div className="BookingInfotablerow">
                              <span>Itinerary Price</span>
                              <span>{item.preferredCurrency} {item.additionalTickets}</span>
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
              ))
            )}
          </div>
          <div className="CartPageContenRHS">
            {cart && Array.isArray(cart) && cart.length > 0 && (
              <div className="OrderSummaryDiv">
                <div className="heading">Order Summary</div>
                <div className="OrderSummaryTable">

                  <div className="OrderSummaryTablebody">
                    <div className="OrderSummaryTablerow">
                      <span>Subtotal</span>
                      <span>
                        {ourSelectedCurrency} <strong>{calculateTotal().subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                      </span>
                    </div>
                    <div className="OrderSummaryTablerow">
                      <span>Tax</span>
                      <span>
                        <strong>18 %</strong>
                      </span>
                    </div>
                    <div className="OrderSummaryTablerow">
                      <span>Order total</span>

                      <span>
                        {ourSelectedCurrency}  <strong>{calculateTotal().fullTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>

                      </span>
                    </div>
                    <div className="ProceedCheckoutCta">
                      <Link to="/billing-detail" className="cta">Proceed to Checkout</Link>
                    </div>
                    <div className="PaymentMethodGroup">
                      <a href="#"><img src="images/homepage/mastercard.png" alt="" /></a>
                      <a href="#"><img src="images/homepage/visacard.png" alt="" /></a>
                      <a href="#"><img src="images/homepage/rupaycard.png" alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


export default Cart;

