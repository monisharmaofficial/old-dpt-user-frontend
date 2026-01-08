import React, { useState, useEffect } from 'react';
import './style/billing.css';
import { getUserPrice } from '../cart/PriceUtlis';
import { useNavigate } from 'react-router-dom';
import config from '../../config'

const PersonDetail = ({ selectedCurrency }) => {
    let cartdata = localStorage.getItem("cartdata");
    const MyCartDetail = cartdata ? JSON.parse(cartdata) : [];

 
    const totalPrice = MyCartDetail.map(item => item.tourPriceAed).reduce((acc, price) => acc + price, 0);
    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const ourSelectedCurrency = MyCartDetail.length > 0 ? MyCartDetail[0].preferredCurrency : 'AED';

    const [emailExistsError, setEmailExistsError] = useState('');

    const particularItemPriceAed = (item) => {
        if (!item) return 0; // Check if item is undefined or null

        const totalInfantsPrice = parseFloat(item.infantsPrice || 0);
        const totalAdultPrice = parseFloat(item.adultPrice || 0);
        const totalChildrenPrice = parseFloat(item.childrenPrice || 0);
        const totalDriverPrice = parseFloat(item.driverTotalPrice || 0);
        const itemPriceAED = parseFloat(item.tourPriceAed) || 0;
        const totalTicketPrice = parseFloat(item.additionalTickets || 0);
        const totalLanguagePrice = parseFloat(item.languagePrice || 0);
        const totalLunchPrice = parseFloat(item.lunchPrice || 0)
        const totalPriceForItem = itemPriceAED + totalInfantsPrice + totalTicketPrice + totalAdultPrice + totalChildrenPrice + totalDriverPrice + totalLanguagePrice + totalLunchPrice;
        return totalPriceForItem.toFixed(2); // Format the price to two decimal places
    };

    const particularItemPriceUsd = (item) => {
        if (!item) return 0; // Check if item is undefined or null

        const totalInfantsPrice = parseFloat(item.infantsPrice || 0);
        const totalAdultPrice = parseFloat(item.adultPrice || 0);
        const totalChildrenPrice = parseFloat(item.childrenPrice || 0);
        const totalDriverPrice = parseFloat(item.driverTotalPrice || 0);
        const totalTicketPrice = parseFloat(item.additionalTickets || 0);
        const totalLanguagePrice = parseFloat(item.languagePrice || 0);
        const totalLunchPrice = parseFloat(item.lunchPrice || 0);
        const itemPriceUSD = parseFloat(item.tourPriceUsd) || 0;
        const totalPriceForItem = itemPriceUSD + totalInfantsPrice + totalAdultPrice + totalTicketPrice + totalChildrenPrice + totalDriverPrice + totalLanguagePrice + totalLunchPrice;
        return totalPriceForItem.toFixed(2); // Format the price to two decimal places
    };
    const subtotal = Array.isArray(MyCartDetail)
        ? MyCartDetail.reduce((total, item) => {
            return total + parseFloat(particularItemPriceAed(item)); // Calculate subtotal for AED prices
        }, 0)
        : 0;
        

const calculateTotal = () => {
    const subtotal = Array.isArray(MyCartDetail)
        ? MyCartDetail.reduce((total, item) => {
              return (
                  total +
                  (ourSelectedCurrency === 'AED'
                      ? parseFloat(particularItemPriceAed(item))
                      : parseFloat(particularItemPriceUsd(item)))
              );
          }, 0)
        : 0;

    const taxPercentage = 0.18; // 18% tax
    const total = subtotal * taxPercentage;
    const fullTotal = subtotal + total;

    return {
        subtotal,
        taxPercentage,
        fullTotal,
        total,
    };
};



    //   const storedCurrency = localStorage.getItem('selectedCurrency');
    //   const parsedCurrency = storedCurrency ? JSON.parse(storedCurrency) : 'AED';
    // Default value 'AED' if not found in local storage


    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        confirm_email: '',
        nationality: '',
        discover_us: '',
        country: '',
        cell_no: '',
    });
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            first_name: '',
            last_name: '',
            email: '',
            confirm_email: '',
            nationality: '',
            discover_us: '',
            country: '',
            cell_no: '',
        };

        // Validate first name
        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
            valid = false;
        }

        // Validate last name
        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
            valid = false;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formattedEmail = formData.email.trim().toLowerCase(); // Convert email to lowercase
        if (!formattedEmail || !emailRegex.test(formattedEmail)) {
            newErrors.email = 'Valid email is required';
            valid = false;
        }

        // Normalize and validate confirm email
        const formattedConfirmEmail = formData.confirm_email.trim().toLowerCase(); // Convert confirm email to lowercase
        const formattedOriginalEmail = formattedEmail; // Store the original formatted email
        if (formattedConfirmEmail !== formattedOriginalEmail) {
            newErrors.confirm_email = 'Emails do not match';
            valid = false;
        }

        // Validate confirm email
        if (formattedConfirmEmail !== formattedOriginalEmail) {
            newErrors.confirm_email = 'Emails do not match';
            valid = false;
        }
        if (!formData.nationality) {
            newErrors.nationality = 'Please select nationality';
            valid = false;
        }
        if (!formData.discover_us) {
            newErrors.discover_us = 'Please select Discover Us';
            valid = false;
        }
        if (!formData.country) {
            newErrors.country = 'Please select Country Code';
            valid = false;
        }
        if (!formData.cell_no) {
            newErrors.cell_no = 'Please select Cell Number';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };




    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        confirm_email: '',
        nationality: '',
        discover_us: '',
        country: '',
        cell_no: '',
        tax: 0.18,
        currency: ourSelectedCurrency,
        special_equest: '',
        cart_data: MyCartDetail,

        sub_total: calculateTotal().subtotal,
        total: calculateTotal().fullTotal,

    });
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${config.baseUrl}/welcome`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (data.success && data.data) {
                            setUserLoggedIn(true); // Set userLoggedIn to true if user data is fetched
                            const { first_name, last_name, email } = data.data;
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                first_name: first_name || '',
                                last_name: last_name || '',
                                email: email || '',
                                confirm_email: email || '', // Assuming email and confirm email are the same initially
                            }));
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = validateForm();

        if (isFormValid) {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            try {
                const response = await fetch(`${config.baseUrl}/cart/add`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    localStorage.removeItem('cartdata');
                    navigate('/thankyou');
                } else {
                    const errorData = await response.json();
                    if (errorData.msg === `Email exists but doesn't match user's email.`) {
                        // Set the state to display the error message
                        setEmailExistsError(errorData.msg);
                    } else {
                        console.error('Booking failed');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Form has validation errors');
        }
    };


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling behavior
        });
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'email') {
            if (value.trim() !== '') {
                try {
                    const response = await fetch(`${config.baseUrl}/check/user-email`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: value }),
                    });

                    if (response.ok) {
                        // Assuming the API returns JSON with a status field
                        const data = await response.json();
                        if (data.status === `Email already exists. Please log in.`) {
                            setEmailExistsError(data.status);
                        } else {
                            setEmailExistsError(''); // Clear the error message if email is valid
                        }
                    } else {
                        setEmailExistsError('Error checking email'); // Handle error response
                    }
                } catch (error) {
                    setEmailExistsError('Network error'); // Handle network errors
                }
            }
        }
    };
    const loginNavigate = () => {
        navigate("/login")
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="BillingDetailPage">
                    <div className="container">
                        <div className="BillingDetailWrapper">
                            <div className="BillingDetailLHS">
                                <div className="BillingDetailLHSInner">
                                    <div className="BookingDetailsHd">
                                        <span>Personal Details</span>
                                    </div>
                                    <div className="PersonalDetailForm">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>First Name<span style={{color:'red'}}>*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                            required=""
                                                            name="first_name"
                                                            value={formData.first_name} // Bind the first name value from state
                                                            onChange={handleChange}

                                                        />
                                                        {errors.first_name && <div className="error">{errors.first_name}</div>}
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>Last Name<span style={{color:'red'}}>*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Last Name"
                                                            required=""
                                                            name="last_name" // Make sure the name attribute is correct
                                                            value={formData.last_name}
                                                            // Ensure the value is controlled
                                                            onChange={handleChange}
                                                        />
                                                        {errors.last_name && <div className="error">{errors.localStorage_name}</div>}

                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    {/* Inside the form */}
                                                    <div className="mb-3 formGroup">
                                                        <label>Email<span style={{color:'red'}}>*</span></label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            required=""
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            onBlur={handleChange} // Call handleChange on blur
                                                        />
                                                        {errors.email && <div className="error">{errors.email}</div>}
                                                        <p style={{ color: 'red' }} className={emailExistsError ? 'error-message' : ''}>
                                                            {emailExistsError}
                                                            {emailExistsError && ( // Render the button only if emailExistsError exists
                                                                <button
                                                                    onClick={loginNavigate}
                                                                    style={{
                                                                        color: 'red',
                                                                        backgroundColor: 'transparent', // Set your desired background color
                                                                        border: 'none', // Remove button border
                                                                        borderColor: '#f25e2e', // Set border color
                                                                        // Add other styles as needed
                                                                    }}
                                                                >
                                                                    Log In
                                                                </button>
                                                            )}
                                                        </p>{/* Display API error message */}
                                                    </div>

                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>Confirm Email<span style={{color:'red'}}>*</span></label>
                                                        <input
                                                            type="mail"
                                                            className="form-control"
                                                            placeholder="Confirm Email"
                                                            required=""
                                                            name="confirm_email" // Make sure the name attribute is correct
                                                            value={formData.confirm_email}

                                                            onChange={handleChange}
                                                        />
                                                        {errors.confirm_email && <div className="error">{errors.confirm_email}</div>}

                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>Nationality<span style={{color:'red'}}>*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="nationality"
                                                            value={formData.nationality}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Nationality</option>
                                                            <option value="Afghanistan">Afghanistan</option>
                                                            <option value="Albania">Albania</option>
                                                            <option value="Algeria">Algeria</option>
                                                            <option value="American Samoa">American Samoa</option>
                                                            <option value="Andorra">Andorra</option>
                                                            <option value="Angola">Angola</option>
                                                            <option value="Anguilla">Anguilla</option>
                                                            <option value="Antigua and Barbuda">
                                                                Antigua and Barbuda
                                                            </option>
                                                            <option value="Argentina">Argentina</option>
                                                            <option value="Armenia">Armenia</option>
                                                            <option value="Aruba">Aruba</option>
                                                            <option value="Australia">Australia</option>
                                                            <option value="Austria">Austria</option>
                                                            <option value="Azerbaijan">Azerbaijan</option>
                                                            <option value="Bahamas">Bahamas</option>
                                                            <option value="Bahrain">Bahrain</option>
                                                            <option value="Bangladesh">Bangladesh</option>
                                                            <option value="Barbados">Barbados</option>
                                                            <option value="Belgium">Belgium</option>
                                                            <option value="Belize">Belize</option>
                                                            <option value="Benin">Benin</option>
                                                            <option value="Bermuda">Bermuda</option>
                                                            <option value="Bhutan">Bhutan</option>
                                                            <option value="Bolivia">Bolivia</option>
                                                            <option value="Bosnia">Bosnia</option>
                                                            <option value="Botswana">Botswana</option>
                                                            <option value="Brazil">Brazil</option>
                                                            <option value="Benin">Benin</option>
                                                            <option value="India">India</option>
                                                            <option value="Yemen">Yemen</option>
                                                            <option value="Yugoslavia ">Yugoslavia </option>
                                                            <option value="Zambia">Zambia</option>
                                                            <option value="Zimbabwe">Zimbabwe</option>
                                                        </select>
                                                        {errors.nationality && <div className="error">{errors.nationality}</div>}
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>How Did You Discover Us<span style={{color:'red'}}>*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="discover_us"
                                                            value={formData.discover_us}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select How Did You Discovered Us</option>
                                                            <option value="Google Search">Google Search</option>
                                                            <option value="Trip adviser">Trip adviser</option>
                                                            <option value="Recommended by friend/relatives">
                                                                Recommended by friend/relatives
                                                            </option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>Country Code<span style={{color:'red'}}>*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="country"
                                                            value={formData.country}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Code</option>
                                                            <option value={+93}> Afghanistan (+93) </option>
                                                            <option value={+355}> Albania (+355) </option>
                                                            <option value={+213}> Algeria (+213) </option>
                                                            <option value={+598}> Uruguay (+598) </option>
                                                            <option value={+340}> US Virgin Islands (+340) </option>
                                                            <option value={+998}> Uzbekistan (+998) </option>
                                                            <option value={+678}> Vanuatu (+678) </option>
                                                            <option value={+379}> Vatican City (+379) </option>
                                                            <option value={+58}> Venezuela (+58) </option>
                                                            <option value={+84}> Vietnam (+84) </option>
                                                            <option value={+681}> Wallis And Futuna (+681) </option>
                                                            <option value={+967}> Yemen (+967) </option>
                                                            <option value={+381}> Yugoslavia (+381) </option>
                                                            <option value={+967}> Zambia (+967) </option>
                                                            <option value={+91}> India (+91) </option>
                                                            <option value={+263}> Zimbabwe (+263) </option>
                                                        </select>
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3 formGroup">
                                                        <label>Cell No<span style={{color:'red'}}>*</span></label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            placeholder="Enter Cell No"
                                                            required=""
                                                            name="cell_no" // Make sure the name attribute is correct
                                                            pattern="[0-9]*" // Accepts only numerical values
                                                            maxLength={15}
                                                            value={formData.cell_no} // Ensure the value is controlled
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="formGroup">
                                                        <label>Special Request</label>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Special Request"
                                                            required=""
                                                            name="special_equest" // Make sure the name attribute is correct
                                                            maxLength={500}
                                                            value={formData.special_equest} // Ensure the value is controlled
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    {/*formGroup*/}
                                                </div>
                                            </div>

                                            {/*row*/}
                                        </form>
                                        <div className="ProceedCheckoutCta">
                                            <button type="submit" className="TopArrow">
                                                Continue
                                            </button>
                                        </div>

                                        {/*ProfileDetailsForm*/}
                                    </div>
                                    {/*PersonalDetailForm*/}
                                </div>
                                {/*BillingDetailLHSInner*/}
                            </div>
                            {/*BillingDetailLHS*/}
                            <div className="BillingDetailRHS">
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
                                            {/*OrderSummaryTablerow*/}
                                            <div className="OrderSummaryTablerow">
                                                <span>Tax</span>
                                                <strong>18 %</strong>
                                            </div>
                                            {/*OrderSummaryTablerow*/}
                                            <div className="OrderSummaryTablerow">
                                                <span>Order total</span>
                                                <strong>{ourSelectedCurrency} {calculateTotal().fullTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                                            </div>
                                            {/*OrderSummaryTablerow*/}
                                            <div className="ProceedCheckoutCta">
                                                <button type="submit" className="cta">
                                                    Book Now
                                                </button>

                                            </div>


                                            {/*ProceedCheckoutCta*/}
                                            {/*PaymentMethodGroup*/}
                                        </div>
                                        {/*OrderSummaryTablebody*/}
                                    </div>
                                    {/*OrderSummaryTable*/}
                                </div>
                            </div>

                            {/*BillingDetailRHS*/}
                        </div>
                        {/*BillingDetailWrapper*/}
                    </div>
                    {/*container*/}
                </div>

            </form>
        </div>
    )
}

export default PersonDetail
