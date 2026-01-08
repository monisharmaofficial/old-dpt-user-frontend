import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import InnerHeader from '../common/InnerHeader';
import Footer from '../common/Footer';
import './404.css'

const NotFound = () => {
  const navigate = useNavigate();

  // You can customize the content of the 404 page here
  return (
    <>
      <InnerHeader/>
      <div className="notfoundpage">
      <div className="container">
            <div className="404image">
            <img src={"https://res.cloudinary.com/debhpxgxy/image/upload/v1703744960/tftjulewlapazwqf3wjr.png"} alt="" />
            </div>
            <h2>Page not found</h2>
            <p>The page you are looking for does not exist.</p>
            <button className="cta" onClick={() => navigate('/')}>Back to home</button>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default NotFound;
