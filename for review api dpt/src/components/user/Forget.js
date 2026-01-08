import React, { useState } from 'react';
import InnerHeader from '../common/InnerHeader';
import Footer from '../common/Footer';
import './Style/login.css';
import { Link } from 'react-router-dom';
import config from '../../config';

const Forget = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${config.baseUrl}/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();
        // Display the message from the server response.
        setMessage(data.msg);
      } else {
        // Handle the error response from the server.
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle any other error that occurs during the request.
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <InnerHeader />
      <div className="loginForm">
        <div className="container">
          <div className="FormWrapper">
            <div className="FormTopText">
              <h1>Forgot Password</h1>
              <p>To reset your password, please enter the email address associated with your account</p>
            </div>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3 formGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {message && <div className="formGroup" style={{color: 'green'}}>{message}</div>}
              <div className="formGroup">
                <button type="submit" className="btn">
                  Reset Password
                </button>
              </div>
              <div className="formGroup" style={{textAlign:"center"}}>
                <Link to="/login" className="CreateAccountLabel">
                  Or Sign in instead
                </Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forget;
