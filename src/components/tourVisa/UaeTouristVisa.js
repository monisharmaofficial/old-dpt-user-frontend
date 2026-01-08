import React, { useState } from 'react';
import config from '../../config';
import Swal from 'sweetalert2'
import UploadGalleryFiles from '../UploadFiles/upload-gallery-files'
const UaeTouristVisa = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        nationality: '',
        how_did_you_discover_us: '',
        cell_no: '',
        arrival_date: '',
        departure_date: '',
        upload_hotel_booking: '',
        upload_your_flight_ticket: '',
        upload_passport_copy: ''
    });
    const handleFileUpload = (fileNames, uploadType) => {
        setFormData({
          ...formData,
          [uploadType]: fileNames,
        });
      };


    const handleChange = (e) => {
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
    const convertFilenamesToString = (filenamesArray) => {
        return JSON.stringify(filenamesArray);
      };


    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: selectedOption.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert upload data to string format
        const formattedHotelBooking = convertFilenamesToString(formData.upload_hotel_booking);
        const formattedPassportCopy = convertFilenamesToString(formData.upload_passport_copy);
        const formattedFlightTicket = convertFilenamesToString(formData.upload_your_flight_ticket);
    
        try {
          const formDataWithImages = {
            ...formData,
            upload_hotel_booking: formattedHotelBooking,
            upload_passport_copy: formattedPassportCopy,
            upload_your_flight_ticket: formattedFlightTicket,
            // Include other form fields here...
          };
    
          const response = await fetch(`${config.baseUrl}/tourist-visa/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataWithImages),
          });
    
          if (response.ok) {
            const responseData = await response.json();
          
            setFormData({
              // Reset form fields
              name: '',
              email: '',
              country: '',
              nationality: '',
              how_did_you_discover_us: '',
              cell_no: '',
              arrival_date: '',
              departure_date: '',
              upload_hotel_booking: [],
              upload_your_flight_ticket: [],
              upload_passport_copy: [],
              // ... other form fields
            });
    
            // Show success message
            Swal.fire({
              icon: 'success',
              title: 'Form submitted successfully!',
              showConfirmButton: false,
              timer: 2500,
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
    
      const handleClear = () => {
        // Clear state data
        setFormData({
            name: '',
            email: '',
            country: '',
            nationality: '',
            how_did_you_discover_us: '',
            cell_no: '',
            arrival_date: '',
            departure_date: '',
            upload_hotel_booking: [], // Clear uploaded hotel booking images
            upload_your_flight_ticket: [], // Clear uploaded flight ticket images
            upload_passport_copy: [], // Clear uploaded passport copy images
        });
    
        // Clear uploaded images from view by updating state variables
        setFormData({
            ...formData,
            upload_hotel_booking: [], // Clear uploaded hotel booking images from view
            upload_your_flight_ticket: [], // Clear uploaded flight ticket images from view
            upload_passport_copy: [], // Clear uploaded passport copy images from view
        });
    
        // Clear localStorage data for uploaded images
        localStorage.removeItem('filedata_upload_hotel_booking');
        localStorage.removeItem('filedata_upload_your_flight_ticket');
        localStorage.removeItem('filedata_upload_passport_copy');
    };
    
    
    

    return (
        <>
            <div className="TouristVisaForm">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Name<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required=""
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Email<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required=""
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Country Code<span style={{color:'red'}}>*</span></label>
                                <select
                                    name="country"
                                    id="country"
                                    required=""
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    {" "}
                                    <option value="">Select Code</option>{" "}
                                    <option value={+93}> Afghanistan (+93) </option>{" "}
                                    <option value={+355}> Albania (+355) </option>{" "}
                                    <option value={+213}> Algeria (+213) </option>{" "}
                                    <option value={+684}>
                                        {" "}
                                        American Samoa (+684){" "}
                                    </option>{" "}
                                    <option value={+376}> Andorra (+376) </option>{" "}
                                    <option value={+244}> Angola (+244) </option>{" "}
                                    <option value={+1}> Anguilla (+1) </option>{" "}
                                    <option value={+1}>
                                        {" "}
                                        Antigua and Barbuda (+1){" "}
                                    </option>{" "}
                                    <option value={+54}> Argentina (+54) </option>{" "}
                                    <option value={+374}> Armenia (+374) </option>{" "}
                                    <option value={+297}> Aruba (+297) </option>{" "}
                                    <option value={+61}> Australia (+61) </option>{" "}
                                    <option value={+43}> Austria (+43) </option>{" "}
                                    <option value={+91}>India (+91)</option>{" "}
                                    <option value={+688}> Tuvalu (+688) </option>{" "}
                                    <option value={+256}> Uganda (+256) </option>{" "}
                                    <option value={+380}> Ukraine (+380) </option>{" "}
                                    <option value={+971}>
                                        {" "}
                                        United Arab Emirates (+971){" "}
                                    </option>{" "}
                                    <option value={+44}>
                                        {" "}
                                        United Kingdom (+44){" "}
                                    </option>{" "}
                                    <option value={+1}>
                                        {" "}
                                        United States Of America (+1){" "}
                                    </option>{" "}
                                    <option value={+598}> Uruguay (+598) </option>{" "}
                                    <option value={+340}>
                                        {" "}
                                        US Virgin Islands (+340){" "}
                                    </option>{" "}
                                    <option value={+998}>
                                        {" "}
                                        Uzbekistan (+998){" "}
                                    </option>{" "}
                                    <option value={+678}> Vanuatu (+678) </option>{" "}
                                    <option value={+379}> Vatican City (+379) </option>{" "}
                                    <option value={+58}> Venezuela (+58) </option>{" "}
                                    <option value={+84}> Vietnam (+84) </option>{" "}
                                    <option value={+681}>
                                        {" "}
                                        Wallis And Futuna (+681){" "}
                                    </option>{" "}
                                    <option value={+967}> Yemen (+967) </option>{" "}
                                    <option value={+381}> Yugoslavia (+381) </option>{" "}
                                    <option value={+967}> Zambia (+967) </option>{" "}
                                    <option value={+263}> Zimbabwe (+263) </option>{" "}
                                </select>
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Cell No<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="tel"
                                    placeholder="Cell No"
                                    required=""
                                    name="cell_no"
                                    value={formData.cell_no}
                                    maxLength={15}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Nationality<span style={{color:'red'}}>*</span></label>
                                <select
                                    name="nationality"
                                    id="nat"
                                    data-bv-field="nationality"
                                    required=""
                                    value={formData.nationality}
                                    onChange={handleChange}
                                >
                                    {" "}
                                    <option value="">Select</option>{" "}
                                    <option value="Afghanistan">Afghanistan</option>{" "}
                                    <option value="Albania">Albania</option>{" "}
                                    <option value="Algeria">Algeria</option>{" "}
                                    <option value="American Samoa">
                                        American Samoa
                                    </option>{" "}
                                    <option value="Andorra">Andorra</option>{" "}
                                    <option value="Angola">Angola</option>{" "}
                                    <option value="Anguilla">Anguilla</option>{" "}
                                    <option value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                    </option>{" "}
                                    <option value="Argentina">Argentina</option>{" "}
                                    <option value="Armenia">Armenia</option>{" "}
                                    <option value="Aruba">Aruba</option>{" "}
                                    <option value="Australia">Australia</option>{" "}
                                    <option value="Austria">Austria</option>{" "}
                                    <option value="Azerbaijan">Azerbaijan</option>{" "}
                                    <option value="Bahamas">Bahamas</option>{" "}
                                    <option value="Bahrain">Bahrain</option>{" "}
                                    <option value="Bangladesh">Bangladesh</option>{" "}
                                    <option value="Ecuador">Ecuador</option>{" "}
                                    <option value="Egypt">Egypt</option>{" "}
                                    <option value="El Salvador">El Salvador</option>{" "}
                                    <option value="Equatorial_Guinea">
                                        Equatorial_Guinea
                                    </option>{" "}
                                    <option value="Eritrea">Eritrea</option>{" "}
                                    <option value="Estonia">Estonia</option>{" "}
                                    <option value="Ethiopia">Ethiopia</option>{" "}
                                    <option value="Falkland Islands">
                                        Falkland Islands
                                    </option>{" "}
                                    <option value="Faroe Islands">Faroe Islands</option>{" "}
                                    <option value="Fiji">Fiji</option>{" "}
                                    <option value="Finland">Finland</option>{" "}
                                    <option value="France">France</option>{" "}
                                    <option value="French Polynesi">
                                        French Polynesi
                                    </option>{" "}
                                    <option value="Gabon">Gabon</option>{" "}
                                    <option value="Gambia">Gambia</option>{" "}
                                    <option value="Georgia">Georgia</option>{" "}
                                    <option value="Germany">Germany</option>{" "}
                                    <option value="Ghana">Ghana</option>{" "}
                                    <option value="Gibraltar">Gibraltar</option>{" "}
                                    <option value="Greece">Greece</option>{" "}
                                    <option value="Greenland">Greenland</option>{" "}
                                    <option value="Grenada">Grenada</option>{" "}
                                    <option value="Guam">Guam</option>{" "}
                                    <option value="Guatemala">Guatemala</option>{" "}
                                    <option value="Guinea">Guinea</option>{" "}
                                    <option value="Guinea Bissau">Guinea Bissau</option>{" "}
                                    <option value="Guyana">Guyana</option>{" "}
                                    <option value="Haiti">Haiti</option>{" "}
                                    <option value="Honduras">Honduras</option>{" "}
                                    <option value="Hong Kong">Hong Kong</option>{" "}
                                    <option value="Hungary">Hungary</option>{" "}
                                    <option value="Iceland">Iceland</option>{" "}
                                    <option value="India">India</option>{" "}

                                </select>
                            </div>
                        </div>

                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Arrival Date<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="date"
                                    placeholder="Arrival Date"
                                    required=""
                                    name="arrival_date"
                                    value={formData.arrival_date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                                />

                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>Departure Date<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="date"
                                    placeholder="Departure Date"
                                    required=""
                                    name="departure_date"
                                    value={formData.departure_date}
                                    onChange={handleChange}
                                    min={formData.arrival_date ? formData.arrival_date : new Date().toISOString().split('T')[0]} // Set min attribute to arrival date if available, else today's date
                                />

                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup">
                                <label>No of People<span style={{color:'red'}}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="No of People"
                                    required=""
                                    name="no_of_people"
                                    value={formData.no_of_people}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-12">
                            <div className="mb-3 formGroup">
                                <label>How Did You Discover Us<span style={{color:'red'}}>*</span></label>

                                <select
                                    id="hdu"
                                    name="how_did_you_discover_us"
                                    data-bv-field="how_did_you_discover_us"
                                    required=""
                                    value={formData.how_did_you_discover_us}
                                    onChange={handleChange}
                                >
                                    {" "}
                                    <option value="">Select</option>{" "}
                                    <option value="Google Search">Google Search</option>{" "}
                                    <option value="Trip adviser">Trip adviser</option>{" "}
                                    <option value="Recommended by friend/relatives">
                                        Recommended by friend/relatives
                                    </option>{" "}
                                    <option value="Other">Other</option>{" "}
                                </select>
                            </div>
                        </div>
                        {/*col-md-6*/}
                        <div className="col-md-6">
                            <div className="mb-3 formGroup fileattach">
                                <label>
                                    Upload Hotel Booking<span style={{color:'red'}}>*</span>{" "}
                                    {/* <small>(You can choose multiple files here)</small> */}
                                </label>
                                <UploadGalleryFiles
                                    uploadType="upload_hotel_booking"
                                    onFileUpload={handleFileUpload}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 formGroup fileattach">
                                <label>
                                    Upload Your Flight Ticket<span style={{color:'red'}}>*</span>{" "}
                                    {/* <small>(You can choose multiple files here)</small> */}
                                </label>
                                <UploadGalleryFiles
                                    uploadType="upload_your_flight_ticket"
                                    onFileUpload={handleFileUpload}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3 formGroup fileattach">
                                <label>
                                    Upload Passport Copy<span style={{color:'red'}}>*</span>{" "}
                                    {/* <small>(You can choose multiple files here)</small> */}
                                </label>
                                <UploadGalleryFiles
                                    uploadType="upload_passport_copy"
                                    onFileUpload={handleFileUpload}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="BtnGroupTouristVisa">
                                <button type="submit" className="cta">
                                    Apply
                                </button>
                                <button type="button" className="cta" onClick={handleClear}>
                                    Clear
                                </button>
                            </div>
                            {/*BtnGroupTouristVisa*/}
                        </div>
                    </div>
                    {/*row*/}
                </form>
            </div>
        </>
    )
}

export default UaeTouristVisa