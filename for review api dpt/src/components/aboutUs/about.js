import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Memories from '../common/memories'
import Footer from '../common/Footer'
import './style/about.css'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const about = () => {
    return (
        <div>
            <InnerHeader />
            <Helmet>
                <title>About Us</title>
                <meta name="description" content="About Us" />
                <meta name="keywords" content="About Us" />
                {/* Add other meta tags if needed */}
            </Helmet>
            <>
                <div
                    className="InnerBanner"
                    style={{ backgroundImage: "url(https://res.cloudinary.com/dqslvlm0d/image/upload/v1698737900/innerbanner_rnna6u.jpg)" }}
                >
                    <div className="container">
                        <h1>About Us</h1>
                    </div>
                </div>
                {/*InnerBanner*/}
                <div className="BreadcrumbSection">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="#">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    About Us
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/*BreadcrumbSection*/}
                <div className="AboutUsPage">
                    <div className="container">
                        <div className="TopAboutUs">
                            <h2>About Us</h2>
                            <p>
                                If you are looking for a warm and sunny holiday or a family vacation, look no further than Dubai city. Dubai is every tourist’s paradise. With its modern skyline, comprehensive infrastructure, brilliant attractions, glamorous shopping malls, fine dining and quality hotels; Dubai is easily one of the best places to visit in the world. From the timeless tranquility of the Arabian deserts to the lively bustle of the souk, your holiday travel to Dubai will offer you the best of both worlds. Rugged mountains, inspiring sand dunes, sandy white beaches, green parks and luxurious residences will make your travel to Dubai worth every penny.
                            </p>
                        </div>
                        {/*TopAboutUs*/}
                        <div className="BottomAboutUs">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="AboutTextLhs">
                                        <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1701508263/760_zaulnd.jpg"} className="img-fluid" alt="" height="500px" width="600px" />
                                    </div>
                                    {/*AboutTextLhs*/}
                                </div>
                                {/*col-lg-6*/}
                                <div className="col-lg-6">
                                    <div className="AboutTextRhs">
                                        <h3>Dubai Private Tour / Milan Tours & Tour Guide Services LLC</h3>
                                        <p>
                                            At Dubai Private Tour / Milan Tours & Tour Guide Services LLC, we strive to offer you the best in travel and tours to make your holiday experience a memorable one. We have a holiday package to suit every pocket. From seven star luxuries to a cheap but quality package; our deals are the best in the industry. Our holiday tour packages are bespoken and our tour guides are multi-lingual, speaking most European and Asian languages.
                                        </p>
                                        <p>
                                        Dubai Private Tour / Milan Tours & Tour Guide Services LLC is licensed and ranked the most experienced tour operator in the UAE. With sixteen years of brilliant experience, our services have consistently been of exceptional standard. We can organize a special and spectacular experience for you, right from prompt airport transfers, a comfortable stay coupled with a stunning sight-seeing experience.
                                        </p>
                                    </div>
                                    {/*AboutTextRhs*/}
                                </div>
                                {/*col-lg-6*/}
                            </div>
                            {/*row*/}
                        </div>
                        {/*BottomAboutUs*/}
                    </div>
                    {/*container*/}
                </div>
            </>

            <Memories />
            <Footer />
        </div>
    )
}

export default about
