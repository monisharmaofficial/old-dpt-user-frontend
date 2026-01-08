import React, { useState } from 'react';
import InnerHeader from '../common/InnerHeader';
import Footer from '../common/Footer';
import './Style/login.css';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import config from '../../config';


const Register = () => {
  // Define state variables to hold user input
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const navigate =useNavigate()
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Create a data object to send in the request body
    const data = {
      first_name,
      last_name,
      email,
      password,
      confirm_password: confirm_password,
    };
  
    try {
      // Send a POST request to the backend API
      const response = await fetch(`${config.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        navigate('/login');
      } else {
        // Registration failed - handle the error scenario here
        const errorData = await response.json(); // Parse error response JSON
        if (errorData && errorData.msg === 'This email already exists') {
          setError('This email is already in use');
        } else {
          setError('Registration failed');
        }
        
      }
    } catch (error) {
      setError('Registration Failed', error);
    }
  };
  

  return (
    <div>
      <InnerHeader />
      <div className="loginForm">
        <div className="container">
          <div className="FormWrapper">
            <div className="FormTopText">
              <h1>Create Account</h1>
              <p>Explore a world of Dubai with DPT</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3 formGroup">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  maxLength={15}
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3 formGroup">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  required
                  maxLength={15}
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3 formGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3 formGroup">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={password}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 formGroup">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                  maxLength={20}
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="error-message" style={{color:"red"}}>{error}</div>}
              <div className="CheckBoxrow">
            {/*    <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    I agree to all Terms and Conditions*
                  </label>
                </div>*/}
              </div>
              <div className="formGroup">
                <button type="submit" className="btn">Create Account</button>
              </div>
              <div className="formGroup">
                <Link to="/login" className="CreateAccountLabel">Or Sign in instead</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
