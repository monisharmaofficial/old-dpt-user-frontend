import React from 'react'
import './style/style.css'
import { Link } from 'react-router-dom'
import AskQuestion from './AskQuestion'
import VisaLHS from './visaLHS'
import UaeTouristVisa from './UaeTouristVisa'

const tourVisa = () => {
    return (
        <div>
            <div className="TouristVisaPage">
                <div className="container">
                    <div className="TouristVisaPageWrapper">
                       <VisaLHS/>
                        {/*TouristVisaLhs*/}
                        <div className="TouristVisaRhs">
                            <div className="TouristVisaTabSection">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-applyuaetouristvisa-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-applyuaetouristvisa"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-applyuaetouristvisa"
                                            aria-selected="true"
                                        >
                                            Apply UAE Tourist Visa
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-aboutuaetouristvisa-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-aboutuaetouristvisa"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-aboutuaetouristvisa"
                                            aria-selected="false"
                                        >
                                            About UAE tourist Visa
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-aboutuaeresidencevisa-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-aboutuaeresidencevisa"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-aboutuaeresidencevisa"
                                            aria-selected="false"
                                        >
                                            About UAE Residence visa
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-qskquestions-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-qskquestions"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-qskquestions"
                                            aria-selected="false"
                                        >
                                            Ask Questions
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-applyuaetouristvisa"
                                        role="tabpanel"
                                        aria-labelledby="pills-applyuaetouristvisa-tab"
                                    >
                                        <div className="TouristVisaTabInner">
                                            <UaeTouristVisa/>
                                            {/*TouristVisaForm*/}
                                        </div>
                                        {/*TouristVisaTabInner*/}
                                    </div>
                                    {/*panel*/}
                                    <div
                                        className="tab-pane fade"
                                        id="pills-aboutuaetouristvisa"
                                        role="tabpanel"
                                        aria-labelledby="pills-aboutuaetouristvisa-tab"
                                    >
                                        <div className="TouristVisaTabInner">
                                            <h2>TOURIST VISA</h2>
                                            <p>
                                                We can assist you with acquiring UAE Tourist visa. Tourist
                                                visa, can be used to travel in all 7 emirates of UAE. No
                                                matter if you arrive and depart at / from Dubai / Abu Dhabi /
                                                Sharjah / Ajman / Ras Al Khaimah / Umm Al Quain / Fujairah.
                                            </p>
                                            <p>
                                                <strong>
                                                    We require clear SCANNED PASSPORT copies + hotel booking
                                                    confirmations OR Flight tickets copy 30 days prior to your
                                                    arrival date to apply for Tourist Visa.
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>Cost for Single Entry Visa is</strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    USD 105 / AED 380 <span> (14 days)</span>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    USD 129 / AED 470 <span>(30 days)</span>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    USD 399 / AED 1455 <span> (90 days)</span>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>Cost for Multiple entry visa is</strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    USD 384 / AED 1400 <span> (30 days)</span>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    USD 699 / AED 2550 <span>  (90 days) </span>
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>Do I need to apply for visa to come to UAE?</strong>
                                            </p>
                                            <p>The Below nationalities can get visas on arrival:</p>
                                            <div className="table-responsive">
                                                <table
                                                    className="table"
                                                    border={1}
                                                    cellSpacing={0}
                                                    cellPadding={0}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <strong>Andorra</strong>
                                                            </td>
                                                            <td>
                                                                <strong>France</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Lithuania</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Singapore</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Australia</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Denmark</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Luxembourg</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Slovakia</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Austria</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Germany</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Malaysia</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Slovenia</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Belgium</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Greece</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Malta</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Spain</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Brune</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Holland (Netherlands)</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Monaco</strong>
                                                            </td>
                                                            <td>
                                                                <strong>South Korea</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Bulgaria</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Hong Kong</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Netherlands (Holland)</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Sweden</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Canada</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Hungary</strong>
                                                            </td>
                                                            <td>
                                                                <strong>New Zealand</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Switzerland</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Croatia</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Iceland</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Norway</strong>
                                                            </td>
                                                            <td>
                                                                <strong>United Kingdom</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Czech Republic</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Ireland</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Poland</strong>
                                                            </td>
                                                            <td>
                                                                <strong>United States&nbsp;&nbsp;</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Cyprus</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Italy</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Liechtenstein</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Vatican City</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Denmark</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Japan</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Portugal</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Russia&nbsp;</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Estonia</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Latvia</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Romania</strong>
                                                            </td>
                                                            <td>
                                                                <strong>China</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Finland</strong>
                                                            </td>
                                                            <td>
                                                                <strong>Liechtenstein</strong>
                                                            </td>
                                                            <td>
                                                                <strong>San Marino</strong>
                                                            </td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p>
                                                <strong>
                                                    Do I need to make a security deposit for visa processing.?
                                                </strong>
                                                No we do not require security deposit. However for certain
                                                African countries passport holders, yes, you will need to make
                                                a security deposit as per emigration rule.
                                            </p>
                                            <p>
                                                <strong>
                                                    I’m visiting Dubai for less than 7 days. How many days visa
                                                    I require.?
                                                </strong>
                                                You may kindly apply for 14 days visa
                                            </p>
                                            <p>
                                                <strong>
                                                    I have USA / UK Visa on my passport. Do I still need to
                                                    apply visa for UAE.?
                                                </strong>
                                                Yes, you will still require a visa to enter UAE
                                            </p>
                                            <p>
                                                <strong>
                                                    My travel dates are 3 months ahead from now. Do I need to
                                                    apply for visa now?
                                                </strong>
                                                Every tourist visa is issued with a validity of 2 months. If
                                                we apply for your visa now, it will be expired in 2 months.
                                                You may kindly send your documents 30 days before your travel
                                                date and we can get your visa issued in 3 working days
                                            </p>
                                            <p>
                                                <strong>
                                                    My travel dates are in next 2 days. Can I get an express
                                                    visa / entry.?
                                                </strong>
                                                We require minimum of 3 working days to get visa issued.
                                                Emigration remains closed on Friday and Saturday and no visas
                                                will be issued in these 2 days. However we can for express
                                                entry in 2 days’ time for which an additional amount of USD
                                                200 will be applicable on top of above visa cost
                                            </p>
                                            <p>
                                                <strong>
                                                    How long / in how many days’ time I can get my visa.?
                                                </strong>
                                                We can get your visas in 3 working days’ time. Emigration
                                                remains closed on Friday and Saturday. Hence visa processing
                                                will not be possible on these 2 days.
                                            </p>
                                            <p>
                                                <strong>How should I apply for my Tourist visa.?</strong>
                                                Kindly visit our website and upload your documents. Our
                                                customer support team shall get in touch with you with payment
                                                options.
                                            </p>
                                            <p>
                                                <strong>
                                                    I will be staying with my friend. Hence do not have hotel
                                                    booking. Can I still get a visa?
                                                </strong>
                                                Yes, you can. You may kindly forward us with your Flight
                                                tickets copy OR your friends Emirates ID as a proof instead of
                                                Hotel booking
                                            </p>
                                            <p>
                                                <strong>
                                                    Do I need to book any of your tours to get visa.?
                                                </strong>
                                                No. you need not book any tours with us to apply and get your
                                                visa. However we do have many tours matching short layover
                                                guest and packages tours. Kindly contact us for further
                                                details{" "}
                                            </p>
                                            <p>
                                                <strong>How do I make the payment.?</strong>Once we receive
                                                your documents, we shall send you the invoice number and
                                                payment link http://www.milantoursdubai.com/pay.php to pay
                                                using (VISA / MASTERCARD) In case you payment gets denied,
                                                kindly contact your bank along with the card you used and they
                                                shall help you resolve the issue and make the payment again
                                                using the same invoice number
                                            </p>
                                            <p>
                                                <strong>Do you accept PayPal or AMEX.?</strong>We are sorry.
                                                Unfortunately for online payment we do not accept AMEX and we
                                                do not have PayPal account
                                            </p>
                                            <p>
                                                <strong>
                                                    My visa has been issued. What is the next step.?
                                                </strong>
                                                Kindly cross check your visa with your passport and verify
                                                your name, DOB and passport number are correct.
                                            </p>
                                            <p>
                                                <strong>Is there any age limit for visa processing.?</strong>
                                                Generally, there is no age limit to get Tourist visa. However
                                                for certain African countries, yes, there is age limit &amp;
                                                gender restriction to get visa . Kindly cross check with our
                                                customer support team for more information
                                            </p>
                                            <p>
                                                <strong>
                                                    How can I check or get to know the status of my visa.?
                                                </strong>
                                                Once the payment is made, to get update on your visa status,
                                                kindly Whatsapp / SMS us on +971552501818
                                            </p>
                                            <p>
                                                <strong>
                                                    Do I need original visa or how the visa will be sent to me.?
                                                </strong>
                                                You do not require original visa. You will be issued with an
                                                e-visa from UAE emigration. You may kindly print the same and
                                                present this at emigration upon your arrival. They shall stamp
                                                your entry on it.
                                            </p>
                                            <p>
                                                <strong>
                                                    My visa has been issued. My travel plan has changed. Can I
                                                    cancel and get refund?
                                                </strong>
                                                Once we submit your documents at emigration, we will not be
                                                able to cancel your application and refund the amount. If
                                                would like to cancel your application once after we apply, an
                                                additional USD 30 / AED 110 will be applicable for same
                                            </p>
                                            <p>
                                                <strong>Do you wish to live in Dubai.? </strong>Yes, we can
                                                arrange for residence visa. Kindly contact us for further
                                                details{" "}
                                            </p>
                                            <p>
                                                <strong>
                                                    Do you wish to do business / invest in Dubai.?
                                                </strong>
                                                Yes, we can assist you set up business including local
                                                sponsor. Kindly contact us for further details{" "}
                                            </p>
                                        </div>
                                        {/*TouristVisaTabInner*/}
                                    </div>
                                    {/*panel*/}
                                    <div
                                        className="tab-pane fade"
                                        id="pills-aboutuaeresidencevisa"
                                        role="tabpanel"
                                        aria-labelledby="pills-aboutuaeresidencevisa-tab"
                                    >
                                        <div className="TouristVisaTabInner">
                                            <h2>UAE RESIDENCE VISA</h2>
                                            <div className="uaeresidancevisadiv">
                                                <p>
                                                    <strong>Do you wish to live in Dubai.?</strong>
                                                    Yes, we can arrange for residence visa. Kindly contact us
                                                    for further details{" "}
                                                </p>
                                                <p>
                                                    <strong>
                                                        Do you wish to do business / invest in Dubai.?
                                                    </strong>
                                                    Yes, we can assist you set up business including local
                                                    sponsor. Kindly contact us for further details
                                                </p>
                                            </div>
                                        </div>
                                        {/*TouristVisaTabInner*/}
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-qskquestions"
                                        role="tabpanel"
                                        aria-labelledby="pills-qskquestions-tab"
                                    >
                                        <div className="TouristVisaTabInner">
                                            <div className="TouristVisaForm">
                                               <AskQuestion/>
                                            </div>
                                            {/*TouristVisaForm*/}
                                        </div>
                                        {/*TouristVisaTabInne*/}
                                    </div>
                                </div>
                            </div>
                            {/*TouristVisaTabSection*/}
                        </div>
                        {/*TouristVisaRhs*/}
                    </div>
                    {/*TouristVisaPageWrapper*/}
                </div>
                {/*container*/}
            </div>

        </div>
    )
}

export default tourVisa
