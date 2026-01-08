import React, { useState, useEffect } from 'react'
import InnerHeader from '../common/InnerHeader'
import Footer from '../common/Footer'
import Memories from '../common/memories'
import { Link } from 'react-router-dom'
import './style/contactUs.css'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'
import PhoneInput from "react-phone-input-2";
import Select from 'react-select';
import "react-phone-input-2/lib/bootstrap.css";
import config from '../../config'


const CountrySelect = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
            });
    }, []);

    return (
        <select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        // styles={customStyles}

        />
    );
};

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nationality: '',
        discover_us: '',
        country_code: '',
        call_no: '',
        address: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCountryChange = (selectedOption) => {
        setFormData({
            ...formData,
            nationality: selectedOption.value
        });
    };
    const handleDiscoverChange = (e) => {
        setFormData({
            ...formData,
            discover_us: e.target.value
        });
    };

    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: selectedOption.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.baseUrl}/ask/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                // Clear form fields and show success message
                setFormData({
                    name: '',
                    email: '',
                    nationality: '',
                    discover_us: '',
                    country_code: '',
                    call_no: '',
                    address: '',
                    subject: '',
                    message: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Form submitted successfully!',
                    showConfirmButton: false,
                    timer: 2500 // You can adjust the timer to control how long the message is displayed
                });
            } else {
                console.error('Error submitting form:', response.statusText);
                // Optionally, handle error state here
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle fetch error
        }
    };

    const countries = [
        { label: "United States (+1)", value: "US" },
        { label: "Afghanistan (+93)", value: "AF" },
        { label: "Albania (+355)", value: "AL" },
        { label: "Algeria (+213)", value: "DZ" },
        { label: "American Samoa (+684)", value: "AS" },
        { label: "Andorra (+376)", value: "AD" },
        { label: "Angola (+244)", value: "AO" },
        { label: "Anguilla (+1)", value: "AI" },
        { label: "Antigua and Barbuda (+1)", value: "AG" },
        { label: "Argentina (+54)", value: "AR" },
        { label: "Armenia (+374)", value: "AM" },
        { label: "Aruba (+297)", value: "AW" },
        { label: "Australia (+61)", value: "AU" },
        { label: "Austria (+43)", value: "AT" },
        { label: "Azerbaijan (+994)", value: "AZ" },
        { label: "Bahamas (+1)", value: "BS" },
        { label: "Bahrain (+973)", value: "BH" },
        { label: "Bangladesh (+880)", value: "BD" },
        { label: "Barbados (+1)", value: "BB" },
        { label: "Belgium (+32)", value: "BE" },
        { label: "Belize (+501)", value: "BZ" },
        { label: "Benin (+229)", value: "BJ" },
        { label: "Bermuda (+1)", value: "BM" },
        { label: "Bhutan (+975)", value: "BT" },
        { label: "Bolivia (+591)", value: "BO" },
        { label: "Bosnia (+387)", value: "BA" },
        { label: "Botswana (+267)", value: "BW" },
        { label: "Brazil (+55)", value: "BR" },
        { label: "British Virgin Islands (+55)", value: "VG" },
        { label: "Brunei (+673)", value: "BN" },
        { label: "Bulgaria (+359)", value: "BG" },
        { label: "Burkina Faso (+)", value: "BF" },
        { label: "Burundi (+226)", value: "BI" },
        { label: "Cambodia (+855)", value: "KH" },
        { label: "Cameroon (+237)", value: "CM" },
        { label: "Canada (+1)", value: "CA" },
        { label: "Cape Verde (+238)", value: "CV" },
        { label: "Cayman Islands (+1)", value: "KY" },
        { label: "Central African Republic (+236)", value: "CF" },
        { label: "Chad (+235)", value: "TD" },
        { label: "Chile (+56)", value: "CL" },
        { label: "China (+86)", value: "CN" },
        { label: "Christmas Island (+61)", value: "CX" },
        { label: "Colombia (+57)", value: "CO" },
        { label: "Comoros (+269)", value: "KM" },
        { label: "Cook Islands (+682)", value: "CK" },
        { label: "Costa Rica (+506)", value: "CR" },
        { label: "Cote_d'Ivoire (+225)", value: "CI" },
        { label: "Croatia (+385)", value: "HR" },
        { label: "Cuba (+53)", value: "CU" },
        { label: "Cyprus (+357)", value: "CY" },
        { label: "Czech Republic (+420)", value: "CZ" },
        { label: "Democratic Republic of the Congo (+243)", value: "CD" },
        { label: "Denmark (+45)", value: "DK" },
        { label: "Djibouti (+253)", value: "DJ" },
        { label: "Dominica (+1)", value: "DM" },
        { label: "Dominican Republic (+1)", value: "DO" },
        { label: "Ecuador (+593)", value: "EC" },
        { label: "Egypt (+20)", value: "EG" },
        { label: "El Salvador (+503)", value: "SV" },
        { label: "Equatorial Guinea (+240)", value: "GQ" },
        { label: "Eritrea (+291)", value: "ER" },
        { label: "Estonia (+372)", value: "EE" },
        { label: "Ethiopia (+251)", value: "ET" },
        { label: "Falkland Islands (+500)", value: "FK" },
        { label: "Faroe Islands (+298)", value: "FO" },
        { label: "Fiji (+679)", value: "FJ" },
        { label: "Finland (+358)", value: "FI" },
        { label: "France (+33)", value: "FR" },
        { label: "French Polynesia (+689)", value: "PF" },
        { label: "Gabon (+241)", value: "GA" },
        { label: "Gambia (+220)", value: "GM" },
        { label: "Georgia (+995)", value: "GE" },
        { label: "Germany (+49)", value: "DE" },
        { label: "Ghana (+233)", value: "GH" },
        { label: "Gibraltar (+350)", value: "GI" },
        { label: "Greece (+30)", value: "GR" },
        { label: "Greenland (+299)", value: "GL" },
        { label: "Grenada (+1)", value: "GD" },
        { label: "Guam (+1)", value: "GU" },
        { label: "Guatemala (+502)", value: "GT" },
        { label: "Guinea (+224)", value: "GN" },
        { label: "Guinea Bissau (+245)", value: "GW" },
        { label: "Guyana (+592)", value: "GY" },
        { label: "Haiti (+509)", value: "HT" },
        { label: "Honduras (+504)", value: "HN" },
        { label: "Hong Kong (+852)", value: "HK" },
        { label: "Hungary (+36)", value: "HU" },
        { label: "Iceland (+354)", value: "IS" },
        { label: "India (+91)", value: "IN" },
        { label: "Indonesia (+62)", value: "ID" },
        { label: "Iran (+98)", value: "IR" },
        { label: "Iraq (+964)", value: "IQ" },
        { label: "Ireland (+353)", value: "IE" },
        { label: "Israel (+972)", value: "IL" },
        { label: "Italy (+39)", value: "IT" },
        { label: "Jamaica (+1)", value: "JM" },
        { label: "Japan (+81)", value: "JP" },
        { label: "Jordan (+962)", value: "JO" },
        { label: "Kazakhstan (+7)", value: "KZ" },
        { label: "Kenya (+254)", value: "KE" },
        { label: "Kiribati (+686)", value: "KI" },
        { label: "Kuwait (+965)", value: "KW" },
        { label: "Kyrgyzstan (+996)", value: "KG" },
        { label: "Laos (+856)", value: "LA" },
        { label: "Latvia (+371)", value: "LV" },
        { label: "Lebanon (+961)", value: "LB" },
        { label: "Lesotho (+266)", value: "LS" },
        { label: "Liberia (+231)", value: "LR" },
        { label: "Libya (+218)", value: "LY" },
        { label: "Liechtenstein (+423)", value: "LI" },
        { label: "Lithuania (+370)", value: "LT" },
        { label: "Luxembourg (+352)", value: "LU" },
        { label: "Macao (+853)", value: "MO" },
        { label: "Macedonia (+389)", value: "MK" },
        { label: "Madagascar (+261)", value: "MG" },
        { label: "Malawi (+265)", value: "MW" },
        { label: "Malaysia (+60)", value: "MY" },
        { label: "Maldives (+960)", value: "MV" },
        { label: "Mali (+223)", value: "ML" },
        { label: "Malta (+356)", value: "MT" },
        { label: "Marshall Islands (+692)", value: "MH" },
        { label: "Martinique (+596)", value: "MQ" },
        { label: "Mauritania (+222)", value: "MR" },
        { label: "Mauritius (+230)", value: "MU" },
        { label: "Mexico (+52)", value: "MX" },
        { label: "Micronesia (+691)", value: "FM" },
        { label: "Moldova (+373)", value: "MD" },
        { label: "Monaco (+377)", value: "MC" },
        { label: "Mongolia (+976)", value: "MN" },
        { label: "Montserrat (+1)", value: "MS" },
        { label: "Morocco (+212)", value: "MA" },
        { label: "Mozambique (+258)", value: "MZ" },
        { label: "Myanmar (+95)", value: "MM" },
        { label: "Namibia (+264)", value: "NA" },
        { label: "Nauru (+674)", value: "NR" },
        { label: "Nepal (+977)", value: "NP" },
        { label: "Netherlands (+31)", value: "NL" },
        { label: "Netherlands Antilles (+599)", value: "AN" },
        { label: "New Zealand (+64)", value: "NZ" },
        { label: "Nicaragua (+505)", value: "NI" },
        { label: "Niger (+227)", value: "NE" },
        { label: "Nigeria (+234)", value: "NG" },
        { label: "Niue (+683)", value: "NU" },
        { label: "Norfolk Island (+672)", value: "NF" },
        { label: "North Korea (+850)", value: "KP" },
        { label: "Norway (+47)", value: "NO" },
        { label: "Oman (+968)", value: "OM" },
        { label: "Pakistan (+92)", value: "PK" },
        { label: "Palau (+680)", value: "PW" },
        { label: "Panama (+507)", value: "PA" },
        { label: "Papua New Guinea (+675)", value: "PG" },
        { label: "Paraguay (+595)", value: "PY" },
        { label: "Peru (+51)", value: "PE" },
        { label: "Philippines (+63)", value: "PH" },
        { label: "Pitcairn Islands (+649)", value: "PN" },
        { label: "Poland (+48)", value: "PL" },
        { label: "Portugal (+351)", value: "PT" },
        { label: "Puerto Rico (+1)", value: "PR" },
        { label: "Qatar (+974)", value: "QA" },
        { label: "Republic of the Congo (+243)", value: "CG" },
        { label: "Romania (+40)", value: "RO" },
        { label: "Russian Federation (+7)", value: "RU" },
        { label: "Rwanda (+250)", value: "RW" },
        { label: "Saint Kitts and Nevis (+1)", value: "KN" },
        { label: "Saint Lucia (+1)", value: "LC" },
        { label: "Saint Pierre (+508)", value: "PM" },
        { label: "Saint Vincent and the Grenadines (+1-784)", value: "VC" },
        { label: "Samoa (+685)", value: "WS" },
        { label: "San Marino (+378)", value: "SM" },
        { label: "Sao Tome and Principe (+239)", value: "ST" },
        { label: "Saudi Arabia (+966)", value: "SA" },
        { label: "Senegal (+221)", value: "SN" },
        { label: "Serbia and Montenegro (+381)", value: "RS" },
        { label: "Seychelles (+248)", value: "SC" },
        { label: "Sierra Leone (+232)", value: "SL" },
        { label: "Singapore (+65)", value: "SG" },
        { label: "Slovakia (+421)", value: "SK" },
        { label: "Slovenia (+386)", value: "SI" },
        { label: "Solomon Islands (+677)", value: "SB" },
        { label: "Somalia (+252)", value: "SO" },
        { label: "South Africa (+27)", value: "ZA" },
        { label: "South Georgia (+44)", value: "GS" },
        { label: "South Korea (+82)", value: "KR" },
        { label: "Soviet Union (+7)", value: "SU" },
        { label: "Spain (+34)", value: "ES" },
        { label: "Sri Lanka (+94)", value: "LK" },
        { label: "Sudan (+249)", value: "SD" },
        { label: "Suriname (+597)", value: "SR" },
        { label: "Swaziland (+268)", value: "SZ" },
        { label: "Sweden (+46)", value: "SE" },
        { label: "Switzerland (+41)", value: "CH" },
        { label: "Syria (+963)", value: "SY" },
        { label: "Taiwan (+886)", value: "TW" },
        { label: "Tajikistan (+992)", value: "TJ" },
        { label: "Tanzania (+255)", value: "TZ" },
        // Add more countries here
    ];

    return (
        <div>
            <InnerHeader />
            <> <Helmet>
                <title>Contact Us</title>
                <meta name="description" content="Contact Us" />
                <meta name="keywords" content="Contact Us" />
                {/* Add other meta tags if needed */}
            </Helmet>
                <div
                    className="InnerBanner"
                    style={{ backgroundImage: "url(https://res.cloudinary.com/dqslvlm0d/image/upload/v1698737900/innerbanner_rnna6u.jpg)" }}
                >
                    <div className="container">
                        <h1>Contact Us</h1>
                    </div>
                </div>
                {/*InnerBanner*/}
                <div className="BreadcrumbSection">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Contact Us
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </>
            {/*Contact US */}
            <div className="contactUsPage">
                <div className="container">
                    <div className="ContactUsPageForm">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="aa-contact-form">
                                    <form className="form-part" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="formGroup">
                                                    <label>Name<span style={{ color: 'red' }}>*</span></label>
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="Enter First Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>Your Email<span style={{ color: 'red' }}>*</span></label>
                                                    <input type="email"
                                                        className="form-control"
                                                        placeholder="Enter Email Address"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>Confirm Email</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Confirm Email"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>Nationality</label>
                                                    <Select
                                                        options={countries}
                                                        placeholder="Select Nationality"
                                                        value={countries.find(country => country.value === formData.nationality)}
                                                        onChange={(selectedOption) => handleCountryChange(selectedOption)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>How Did You Discover Us<span style={{ color: 'red' }}>*</span></label>
                                                    <select
                                                        className="form-select"
                                                        name="discover_us"
                                                        value={formData.discover_us}
                                                        onChange={handleDiscoverChange}
                                                        required
                                                    >
                                                        <option value="">Select How Discovered Us</option>
                                                        <option value="Google Search">Google Search</option>
                                                        <option value="Trip adviser">Trip adviser</option>
                                                        <option value="Recommended by friend/relatives">Recommended by friend/relatives</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>Country Code</label>
                                                    <Select
                                                        options={countries}
                                                        placeholder="Select Country code"
                                                        value={countries.find(country => country.value === formData.country_code)}
                                                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'country_code')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="formGroup">
                                                    <label>Cell No</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="Cell No"
                                                        name="call_no"
                                                        value={formData.call_no}
                                                        pattern="[0-9]*" // Accepts only numerical values
                                                        maxLength={15}
                                                        onChange={handleInputChange}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="formGroup">
                                                    <label>Address</label>
                                                    <textarea className="form-control"
                                                        placeholder="Type Your Special Requests"
                                                        rows="3"
                                                        name="address"
                                                        value={formData.address}
                                                        maxLength={500}
                                                        onChange={handleInputChange}
                                                        required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="formGroup">
                                                    <label>Subject</label>
                                                    <select className="form-select"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        required>
                                                        <option selected="">Select Your Subject</option>
                                                        <option value="Enquiry">Enquiry</option>
                                                        <option value="Feedback">Feedback</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="formGroup">
                                                    <textarea className="form-control"
                                                        placeholder="Type Your Special Requests"
                                                        rows="3"
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="submitForm">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="ContactInfoMain">
                                    <div className="ContactInfoWrapper">
                                        <div className="infoIcon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="#fff"
                                                className="bi bi-geo-alt"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                            </svg>
                                        </div>
                                        {/*infoIcon*/}
                                        <div className="InfoText">
                                            <p>
                                                {" "}
                                                Dubai Private Tour / Milan Tours &amp; Tour Guide Services
                                                LLC.
                                            </p>
                                            <a
                                                href="https://www.google.com/maps?ll=25.243478,55.311016z=16t=mhl=en-USgl=USmapclient=embedcid=2372382827862710579"
                                                target="_blank"
                                            >
                                                Office 117, Al Makhawi Building, Al Karama, Dubai, UAE,
                                                P.O.Box: 120730{" "}
                                            </a>
                                        </div>
                                        {/*InfoText*/}
                                    </div>
                                    {/*ContactInfoWrapper*/}
                                    <div className="ContactInfoWrapper">
                                        <div className="infoIcon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="#fff"
                                                className="bi bi-telephone"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                            </svg>
                                        </div>
                                        {/*infoIcon*/}
                                        <div className="InfoText">
                                            <a href="tel:+971 55 2501 818">Tel: +971 55 955 4333 </a>
                                        </div>
                                        {/*InfoText*/}
                                    </div>
                                    {/*ContactInfoWrapper*/}
                                    <div className="ContactInfoWrapper">
                                        <div className="infoIcon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="#fff"
                                                className="bi bi-phone"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            </svg>
                                        </div>
                                        {/*infoIcon*/}
                                        <div className="InfoText">
                                            <a href="tel:+971 4 3961444">Cell: +971 4 3961444</a>
                                        </div>
                                        {/*InfoText*/}
                                    </div>
                                    {/*ContactInfoWrapper*/}
                                    <div className="ContactInfoWrapper">
                                        <div className="infoIcon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="#fff"
                                                className="bi bi-envelope"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                            </svg>
                                        </div>
                                        {/*infoIcon*/}
                                        <div className="InfoText">
                                            <a href="mailto:info@dubaiprivatetour.com">
                                                info@dubaiprivatetour.com
                                            </a>
                                            ,
                                            <a href="mailto:info@milantoursdubai.com">
                                                info@milantoursdubai.com
                                            </a>
                                        </div>
                                        {/*InfoText*/}
                                    </div>
                                    {/*ContactInfoWrapper*/}
                                    <div className="ContactInfoWrapper">
                                        <div className="infoIcon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="#fff"
                                                className="bi bi-whatsapp"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                            </svg>
                                        </div>
                                        {/*infoIcon*/}
                                        <div className="InfoText">
                                            <a href="https://wa.me/+971-55-955-4333">Start Whatsapp Chat</a>
                                        </div>
                                        {/*InfoText*/}
                                    </div>
                                    {/*ContactInfoWrapper*/}
                                </div>
                                {/*ContactInfoMain*/}
                                <div className="SocialIconNew">
                                    <div className="ConnectWithUSText">Connect with us</div>
                                    <ul>
                                        <li>
                                            <a href="#" className="fb" />
                                        </li>
                                        <li>
                                            <a href="#" className="mail" />
                                        </li>
                                        <li>
                                            <a href="#" className="tw" />
                                        </li>
                                        <li>
                                            <a href="#" className="gp" />
                                        </li>
                                        <li>
                                            <a href="#" className="lin" />
                                        </li>
                                        <li>
                                            <a href="#" className="wp" />
                                        </li>
                                        <li>
                                            <a href="#" className="yt" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="aa-contact-map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.812258535883!2d55.30872441544949!3d25.243247636024403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d4657c0f21%3A0x20ec659ccdfe5933!2sDubai+Private+Tour!5e0!3m2!1sen!2sus!4v1457163195889"
                                        width="100%"
                                        height={450}
                                        frameBorder={0}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*ContactUsPageForm*/}
                </div>
                {/*container*/}
            </div>


            <Memories />
            <Footer />
        </div>
    )
}

export default ContactUs
