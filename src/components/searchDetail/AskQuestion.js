import React, { useState, useEffect } from 'react'
import Select from "react-select";
import Swal from 'sweetalert2';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import config from '../../config';


const customStyles = {
    control: base => ({
        ...base,
        height: 45,
        minHeight: 35
    })
};

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
        <Select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        // styles={customStyles}

        />
    );
};



const AskQuestion = () => {
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailMatchError, setEmailMatchError] = useState(false);
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
        if (formData.email !== confirmEmail) {
            setEmailMatchError(true);
            return;
        }
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
        { label: "India (+91)", value: "IND" },
        { label: "Barbados (+1)", value: "BB" },
        { label: "Belarus (+375)", value: "BY" },
        { label: "Belgium (+32)", value: "BE" },
        { label: "Belize (+501)", value: "BZ" },
        { label: "Benin (+229)", value: "BJ" },
        { label: "Bermuda (+1)", value: "BM" },
        { label: "Bhutan (+975)", value: "BT" },
        { label: "Bolivia (+591)", value: "BO" },
        { label: "Bosnia and Herzegovina (+387)", value: "BA" },
        { label: "Botswana (+267)", value: "BW" },
        { label: "Brazil (+55)", value: "BR" },
        { label: "Brunei (+673)", value: "BN" },
        { label: "Bulgaria (+359)", value: "BG" },
        { label: "Burkina Faso (+226)", value: "BF" },
        { label: "Burundi (+257)", value: "BI" },
        { label: "Cambodia (+855)", value: "KH" },
        { label: "Cameroon (+237)", value: "CM" },
        { label: "Canada (+1)", value: "CA" },
        { label: "Cape Verde (+238)", value: "CV" },
        { label: "Cayman Islands (+1)", value: "KY" },
        { label: "Central African Republic (+236)", value: "CF" },
        { label: "Chad (+235)", value: "TD" },
        { label: "Chile (+56)", value: "CL" },
        { label: "China (+86)", value: "CN" },
        { label: "Colombia (+57)", value: "CO" },
        { label: "Comoros (+269)", value: "KM" },
        { label: "Congo (+242)", value: "CG" },
        { label: "Cook Islands (+682)", value: "CK" },
        { label: "Costa Rica (+506)", value: "CR" },
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
        { label: "Eswatini (+268)", value: "SZ" },
        { label: "Ethiopia (+251)", value: "ET" },
        { label: "Falkland Islands (+500)", value: "FK" },
        { label: "Faroe Islands (+298)", value: "FO" },
        { label: "Fiji (+679)", value: "FJ" },
        { label: "Finland (+358)", value: "FI" },
        { label: "France (+33)", value: "FR" },
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
        { label: "Guernsey (+44)", value: "GG" },
        { label: "Guinea (+224)", value: "GN" },
        { label: "Guinea-Bissau (+245)", value: "GW" },
        { label: "Guyana (+592)", value: "GY" },
        { label: "Haiti (+509)", value: "HT" },
        { label: "Honduras (+504)", value: "HN" },
        { label: "Hong Kong (+852)", value: "HK" },
        { label: "Hungary (+36)", value: "HU" },
        { label: "Iceland (+354)", value: "IS" },
        { label: "Indonesia (+62)", value: "ID" },
        { label: "Iran (+98)", value: "IR" },
        { label: "Iraq (+964)", value: "IQ" },
        { label: "Ireland (+353)", value: "IE" },
        { label: "Isle of Man (+44)", value: "IM" },
        { label: "Israel (+972)", value: "IL" },
        { label: "Italy (+39)", value: "IT" },
        { label: "Jamaica (+1)", value: "JM" },
        { label: "Japan (+81)", value: "JP" },
        { label: "Jersey (+44)", value: "JE" },
        { label: "Jordan (+962)", value: "JO" },
        { label: "Kazakhstan (+7)", value: "KZ" },
        { label: "Kenya (+254)", value: "KE" },
        { label: "Kiribati (+686)", value: "KI" },
        { label: "Kosovo (+383)", value: "XK" },
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
        { label: "Macau (+853)", value: "MO" },
        { label: "Madagascar (+261)", value: "MG" },
        { label: "Malawi (+265)", value: "MW" },
        { label: "Malaysia (+60)", value: "MY" },
        { label: "Maldives (+960)", value: "MV" },
        { label: "Mali (+223)", value: "ML" },
        { label: "Malta (+356)", value: "MT" },
        { label: "Marshall Islands (+692)", value: "MH" },
        { label: "Mauritania (+222)", value: "MR" },
        { label: "Mauritius (+230)", value: "MU" },
        { label: "Mexico (+52)", value: "MX" },
        { label: "Micronesia (+691)", value: "FM" },
        { label: "Moldova (+373)", value: "MD" },
        { label: "Monaco (+377)", value: "MC" },
        { label: "Mongolia (+976)", value: "MN" },
        { label: "Montenegro (+382)", value: "ME" },
        { label: "Montserrat (+1)", value: "MS" },
        { label: "Morocco (+212)", value: "MA" },
        { label: "Mozambique (+258)", value: "MZ" },
        { label: "Myanmar (+95)", value: "MM" },
        { label: "Namibia (+264)", value: "NA" },
        { label: "Nauru (+674)", value: "NR" },
        { label: "Nepal (+977)", value: "NP" },
        { label: "Netherlands (+31)", value: "NL" },
        { label: "New Caledonia (+687)", value: "NC" },
        { label: "New Zealand (+64)", value: "NZ" },
        { label: "Nicaragua (+505)", value: "NI" },
        { label: "Niger (+227)", value: "NE" },
        { label: "Nigeria (+234)", value: "NG" },

        // Add more countries here
    ];


    return (
        <>
            <div className="tab-pane fade" id="pills-askquestions" role="tabpanel" aria-labelledby="pills-askquestions-tab">
                <div className="BookThisTourSec AskQuestionsSection">
                    <div className="FormInnerDiv">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>First Name<span style={{ color: 'red' }}>*</span></label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Enter First Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Last Name<span style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control" placeholder="Enter Last Name" required />
                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Email<span style={{ color: 'red' }}>*</span></label>
                                        <input type="email"
                                            className={`form-control ${emailMatchError ? 'is-invalid' : ''}`}
                                            placeholder="Enter Email Address"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Confirm Email<span style={{ color: 'red' }}>*</span></label>
                                        <input type="email"
                                            className={`form-control ${emailMatchError ? 'is-invalid' : ''}`}
                                            placeholder="Confirm Email Address"
                                            value={confirmEmail}
                                            onChange={(e) => {
                                                setConfirmEmail(e.target.value);
                                                setEmailMatchError(e.target.value !== formData.email);
                                            }}
                                            required />
                                        {emailMatchError && <div className="invalid-feedback">Emails do not match.</div>}
                                    </div>
                                    {/* formGroup */}
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3 formGroup ">
                                        <label>Nationality<span style={{ color: 'red' }}>*</span></label>
                                        <Select
                                            options={countries}
                                            placeholder="Select Nationality"
                                            value={countries.find(country => country.value === formData.nationality)}
                                            onChange={(selectedOption) => handleCountryChange(selectedOption)}
                                            required
                                        />

                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>How Did You Discover Us<span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            className="form-select"
                                            name="discover_us"
                                            value={formData.discover_us}
                                            onChange={handleDiscoverChange}
                                            required
                                        >

                                            <option value="">Select How Did You Discovered Us</option>
                                            <option value="Google Search">Google Search</option>
                                            <option value="Trip adviser">Trip adviser</option>
                                            <option value="Recommended by friend/relatives">Recommended by friend/relatives</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Country Code<span style={{ color: 'red' }}>*</span></label>
                                        <Select
                                            options={countries}
                                            placeholder="Select Country code"
                                            value={countries.find(country => country.value === formData.country_code)}
                                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'country_code')}
                                            required
                                        />
                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Cell No<span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Cell No"
                                            name="call_no"
                                            value={formData.call_no}
                                            onChange={handleInputChange}
                                            pattern="[0-9]*" // Accepts only numerical values
                                            maxLength={15} // Restricts input to a maximum length of 13 characters
                                            required
                                        />

                                    </div>
                                    {/* formGroup */}
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
                                        <label>Address</label>
                                        <textarea className="form-control"
                                            placeholder="Type Your Special Requests"
                                            rows="3"
                                            name="address"
                                            value={formData.address}
                                            maxLength={500}
                                            onChange={handleInputChange}
                                            required></textarea>
                                    </div>{/* formGroup */}
                                </div>

                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
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
                                    {/* formGroup */}
                                </div>

                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
                                        <label>Message</label>
                                        <textarea className="form-control"
                                            placeholder="Type Your Special Requests"
                                            rows="3"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required></textarea>
                                    </div>{/* formGroup */}
                                </div>

                                <div className="submitcta">
                                    <div className="btnGroup">
                                        <button type="submit" className="cta">Submit</button>
                                    </div>
                                    <div className="captcha">
                                        <div className="captchaimg">
                                            <img src="images/homepage/captcha.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>{/*row*/}
                        </form>
                    </div>{/*FormInnerDiv*/}
                </div>{/*AskQuestionsSection*/}
            </div>
        </>
    )
}

export default AskQuestion

