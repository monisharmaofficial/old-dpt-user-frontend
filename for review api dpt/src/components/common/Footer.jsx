import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { data } from '../../data/Footer'
import config from '../../config'


const Footer = () => {
    const [categories, setCategories] = useState([]);
    const currentYear = new Date().getFullYear();
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const loadJivosite = () => {
            const widgetId = 'Ajwd8F0W7H';
            const script = document.createElement('script');
            script.src = `//code.jivosite.com/script/widget/${widgetId}`;
            script.async = true;

            document.body.appendChild(script);
        };

        // Fetch categories useEffect code...

        setShowChat(true);

        if (showChat) {
            loadJivosite();
        }
    }, [showChat]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/categories/cat-list`);
                const data = await response.json();

                if (data && data.data && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error('No categories found in the response:', data);
                    setCategories([]); // Set to an empty array if 'data.data' is not present, not an array, or undefined
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    return (

        <footer>
            <div className="followUs">
                <div className="container">
                    <div className="followtext">follow us on</div>
                    <ul>
                        <li>
                            <Link to="https://www.facebook.com/DubaiPrivateTour" className="fb" target="_blank"></Link>
                        </li>
                        <li>
                            <Link to="https://twitter.com/i/flow/login?redirect_after_login=%2Fdubaipvttour" className="tw" target="_blank"></Link>
                        </li>
                        <li>
                            <Link to="https://www.youtube.com/channel/UC1b7fJBbKWpHYMUnNQ5XTCA" className="yt" target="_blank"></Link>
                        </li>
                        <li>
                            <Link to="https://www.instagram.com/dubaiprivatetour/" className="ig" target="_blank"></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="menuWrapper">
                    <div className="footerWidget">
                        <h6>Get In Touch</h6>
                        <p>
                            Dubai Private Tour / Milan Tours & Tour Guide Services LLC. Office
                            117, Al Makhawi Building, Al Karama, Dubai, UAE, P.O.Box: 120730
                        </p>
                        <div className="fInfo">
                            <a href="tel:+91 971 4 3961444" className="call">
                                +971 4 3961444
                            </a>
                            <a href="mailto:info@milantoursdubai.com" className="mail">
                                info@milantoursdubai.com
                            </a>
                        </div>
                    </div>
                    <div className="footerWidget">
                        <h6>Tours & Safaris</h6>

                        <ul>
                            {categories.slice(0, 8).map((item, index) => (
                                <li key={index}>
                                    <Link to={`/${item.slug}`}>{item.name}</Link>
                                    {  /* <Link to={`/plan`}>{item.category}</Link>*/}
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div className="footerWidget">
                        <ul>
                            {categories.slice(8, 16).map((item, index) => (
                                <li key={index}>
                                    <Link to={`/${item.slug}`}>{item.name}</Link>
                                    {  /* <Link to={`/plan`}>{item.category}</Link>*/}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footerWidget">
                        <ul>
                            {categories.slice(32, 40).map((item, index) => (
                                <li key={index}>
                                    <Link to={`/${item.slug}`}>{item.name}</Link>
                                    {  /* <Link to={`/plan`}>{item.category}</Link>*/}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footerlogoWrapper">
                    <div className="footerlogoLhs">
                        <Link to="#">
                            <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738421/footerimg1_zar3zu.png"} alt="" target="_blank"/>
                        </Link>
                        <Link to="https://www.tripadvisor.com/Attraction_Review-g295424-d2510773-Reviews-Dubai_Private_Tour-Dubai_Emirate_of_Dubai.html" target="_blank">
                            <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738422/footerimg2_ywzywb.png"} alt="" />
                        </Link>
                        <Link to="#">
                            <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738420/footerimg3_taqggo.png"} alt="" target="_blank"/>
                        </Link>
                        <Link to="#">
                            <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1698738419/footerimg4_b8gxe1.png"} alt="" target="_blank"/>
                        </Link>
                    </div>
                    <div className="footerlogoRhs">
                            <img src={"https://res.cloudinary.com/dkwplszcw/image/upload/v1715160647/credit-card_pvvtc9.png"} alt="" target="_blank"/>
                    </div>
                </div>
                <div className="footerMenu">
                    <ul>
                        <li>
                            <Link to="/contact-us">Contact us</Link>
                        </li>
                        <li>
                            <Link to="/about-us">About us</Link>
                        </li>
                        {/*  <li>
                            <Link to="#">Careers</Link>
                        </li>*/}
                        <li>
                            <Link to="https://www.dubaiprivatetour.com/blog/">Blog</Link>
                        </li>
                        {/*   <li>
                         <Link to="#">FAQ</Link>
                        </li>*/}
                    </ul>
                </div>
                <div className="footerMenuBorder"></div>
                <div className="footerBottom">
                    <div className="footerBottomLhs">
                        <p>Copyright {currentYear}. All Rights Reserved.</p>
                    </div>
                    <div className="footerBottomRhs">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/term-condition">Terms & Conditions</Link>
                        <Link to="/cancellation-policy">Cancellation Policy</Link>
                        {/*   <Link to="#">Sitemap</Link>*/}
                    </div>
                </div>
            </div>
            {showChat && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px", // Adjust this value to set the distance from the bottom
                        right: "20px", // Adjust this value to set the distance from the right
                        zIndex: "1000" // Adjust this value to ensure it appears above other elements
                    }}
                >
                    {/* Add Jivosite chat script directly */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(){ var widget_id = 'Ajwd8F0W7H';
                                var d=document;var w=window;function l(){
                                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
                            `
                        }}
                    />
                </div>
            )}
            
        </footer>
    );
};

export default Footer;
