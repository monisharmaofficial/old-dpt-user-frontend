import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Style/TourPage.css'

const BookThisTour = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const url = window.location.href;
    const spliturl = url.split("=");
    const id = spliturl[1];

    return (
        <>
            <div className="tab-pane fade" id="pills-bookthistour" role="tabpanel" aria-labelledby="pills-bookthistour-tab">
                <div className="BookThisTourSec">
                    <div className="BookingDetailsHd"><span>Booking Details</span></div>
                    <div className="FormInnerDiv">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 ">
                                        <label>Tour Date*</label>
                                        <div className="input-group date" id="datepicker">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                dateFormat="MM/dd/yyyy"
                                                placeholderText="Select Date"
                                                customInput={
                                                    <input
                                                        style={{
                                                            width: '176%', // Set the width to 100%
                                                            paddingLeft:"10px"
                                                        }}
                                                    />
                                                }
                                            />



                                        </div>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Preferred Pickup Time</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Pickup Time</option>
                                            <option value="00:00 AM">12:00 AM</option>
                                            <option value="00:30 AM">12:30 AM</option>
                                            <option value="01:00 AM">01:00 AM</option>
                                            <option value="01:30 AM">01:30 AM</option>
                                            <option value="02:00 AM">02:00 AM</option>
                                            <option value="02:30 AM">02:30 AM</option>
                                            <option value="03:00 AM">03:00 AM</option>
                                            <option value="03:30 AM">03:30 AM</option>
                                            <option value="04:00 AM">04:00 AM</option>
                                            <option value="04:30 AM">04:30 AM</option>
                                            <option value="05:00 AM">05:00 AM</option>
                                            <option value="05:30 AM">05:30 AM</option>
                                            <option value="06:00 AM">06:00 AM</option>
                                            <option value="06:30 AM">06:30 AM</option>
                                            <option value="07:00 AM">07:00 AM</option>
                                            <option value="07:30 AM">07:30 AM</option>
                                            <option value="08:00 AM">08:00 AM</option>
                                            <option value="08:30 AM">08:30 AM</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="09:30 AM">09:30 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="10:30 AM">10:30 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="11:30 AM">11:30 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="12:30 PM">12:30 PM</option>
                                            <option value="13:00 PM">01:00 PM</option>
                                            <option value="13:30 PM">01:30 PM</option>
                                            <option value="14:00 PM">02:00 PM</option>
                                            <option value="14:30 PM">02:30 PM</option>
                                            <option value="15:00 PM">03:00 PM</option>
                                            <option value="15:30 PM">03:30 PM</option>
                                            <option value="16:00 PM">04:00 PM</option>
                                            <option value="16:30 PM">04:30 PM</option>
                                            <option value="17:00 PM">05:00 PM</option>
                                            <option value="17:30 PM">05:30 PM</option>
                                            <option value="18:00 PM">06:00 PM</option>
                                            <option value="18:30 PM">06:30 PM</option>
                                            <option value="19:00 PM">07:00 PM</option>
                                            <option value="19:30 PM">07:30 PM</option>
                                            <option value="20:00 PM">08:00 PM</option>
                                            <option value="20:30 PM">08:30 PM</option>
                                            <option value="21:00 PM">09:00 PM</option>
                                            <option value="21:30 PM">09:30 PM</option>
                                            <option value="22:00 PM">10:00 PM</option>
                                            <option value="22:30 PM">10:30 PM</option>
                                            <option value="23:00 PM">11:00 PM</option>
                                            <option value="23:30 PM">11:30 PM</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Pickup Location*</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Pickup Location</option>
                                            <option value="1">Hotel/Apartment</option>
                                            <option value="2">DXB Airport Terminal 1</option>
                                            <option value="3">DXB Airport Terminal 2</option>
                                            <option value="4">DXB Airport Terminal 3</option>
                                            <option value="5">DWC Airport</option>
                                            <option value="6">Abu Dhabi Airport</option>
                                            <option value="7">Dubai Cruise Ship Terminal</option>
                                            <option value="8">Abu Dhabi Cruise Ship Terminal</option>
                                            <option value="9">Dubai Mall- Next To Souk Al Bahar Information Desk</option>
                                            <option value="10">Burj Khalifa- Next To Souk Al Bahar Information Desk</option>
                                            <option value="11">Mall Of The Emirates - Ski Dubai Entrance</option>
                                            <option value="12">Local Residence</option>
                                            <option value="13">Restaurant</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>End Location*</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select End Location</option>
                                            <option value="1">Hotel/Apartment</option>
                                            <option value="2">DXB Airport Terminal 1</option>
                                            <option value="3">DXB Airport Terminal 2</option>
                                            <option value="4">DXB Airport Terminal 3</option>
                                            <option value="5">DWC Airport</option>
                                            <option value="6">Abu Dhabi Airport</option>
                                            <option value="7">Dubai Cruise Ship Terminal</option>
                                            <option value="8">Abu Dhabi Cruise Ship Terminal</option>
                                            <option value="9">Dubai Mall- Next To Souk Al Bahar Information Desk</option>
                                            <option value="10">Burj Khalifa- Next To Souk Al Bahar Information Desk</option>
                                            <option value="11">Mall Of The Emirates - Ski Dubai Entrance</option>
                                            <option value="12">Local Residence</option>
                                            <option value="13">Restaurant</option>
                                            <option value="14">Gold Souk</option>
                                            <option value="15">Spice Souk</option>
                                            <option value="16">Any Other Place In Dubai</option>
                                        </select>
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
                                        <label>Hotel Name*</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Hotel</option>
                                            <option value="1">Hotel Royal Park</option>
                                            <option value="2">Flora Inn Hotel Dubai </option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Preferred Guide Language*</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select  Preferred Guide Language</option>
                                            <option value="English">English</option>
                                            <option value="Arabic">Arabic</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Italian">Italian</option>
                                            <option value="German">German</option>
                                            <option value="French">French</option>
                                            <option value="Portuguese">Portuguese</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="Russian">Russian</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3 formGroup">
                                        <label>Pref.currency</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Currency</option>
                                            <option value="USD($)">USD($)</option>
                                            <option value="AED">AED</option>
                                            <option value="EURO">EURO</option>
                                            <option value="AUD">AUD</option>
                                            <option value="UK POUND">UK POUND</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-3 formGroup">
                                        <label>Payment Mode*</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Payment Mode</option>
                                            <option value="1">Pay Now</option>
                                            <option value="2">Pay Later</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>

                                <div className="col-md-4">
                                    <div className="mb-3 formGroup infoDetail">
                                        <label>Adults*</label>
                                        <input type="text" className="form-control" placeholder="No of Adults" maxLength="2" required />
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3 formGroup infoDetail">
                                        <label>Children</label>
                                        <input type="text" className="form-control" placeholder="Age 5-12" maxLength="2" required />
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3 formGroup infoDetail">
                                        <label>Infants</label>
                                        <input type="text" className="form-control" placeholder="Age < 5" maxLength="2" required />
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Addition driver</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Addition Driver</option>
                                            <option value="1">Select Addition Driver</option>
                                            <option value="2">Select Addition Driver</option>
                                        </select>
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 formGroup">
                                        <label>Additional lunch </label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Additional Lunch</option>
                                            <option value="1">Select Additional Lunch</option>
                                            <option value="2">Select Additional Lunch</option>
                                        </select>
                                    </div> {/* formGroup */}
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
                                        <label>Additional tickets</label>
                                        <select className="form-select" value="0">
                                            <option value="0">Select Additional tickets</option>
                                            <option value="1">Select Additional tickets</option>
                                            <option value="2">Select Additional tickets</option>
                                        </select>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3 formGroup">
                                        <label>Special Request</label>
                                        <textarea className="form-control" placeholder="Select Special Seat" rows="3"></textarea>
                                    </div>{/* formGroup */}
                                </div>
                                <div className="submitcta">
                                    <div className="btnGroup">
                                        <button type="submit" className="cta">Book Now</button>
                                        <button className="cta">Clear</button>
                                    </div>
                                    <div className="captcha">
                                        <div className="captchaimg">
                                            <img src="images/captcha.png" alt="" />
                                        </div>
                                    </div>
                                </div>{/*submitcta*/}
                            </div>{/*row*/}
                        </form>
                    </div>{/*FormInnerDiv*/}
                </div>{/*BookThisTourSec*/}
            </div>
        </>
    )
}

export default BookThisTour
