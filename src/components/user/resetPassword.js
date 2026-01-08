import React, { useState, useEffect } from 'react';
import InnerHeader from '../common/InnerHeader';
import Footer from '../common/Footer';
import './Style/login.css';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import './Style/dashboard.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const tokenFromURL = queryParams.get('token') || ''; // Get token from URL query param

    const [token, setToken] = useState(tokenFromURL);
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordMatchError("Passwords don't match");
            return;
        }

        try {
            const response = await fetch(`${config.baseUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (response.ok) {
                setPasswordResetSuccess(true); // Set state to show success message
                setTimeout(() => {
                    setPasswordResetSuccess(false); // Hide success message after 5 seconds
                }, 5000);
                setToken(''); // Clear token input
                setNewPassword(''); // Clear newPassword input
                setConfirmPassword(''); // Clear confirmPassword input
                setPasswordMatchError(''); // Clear password match error
            } else {
                setPasswordResetSuccess(false); // Hide success message on error
                setError('Invalid token');
            }
        } catch (error) {
            setPasswordResetSuccess(false); // Hide success message on error
            setError('An error occurred. Please try again later.');
        }
    };



    return (
        <div>
            {/* INNER HEADER */}
            <InnerHeader />
            <div className="loginForm">
                <div className="container">
                    <div className="FormWrapper">
                        <div className="FormTopText">
                            <h1>Reset Password</h1>
                            {/* <p>Explore a world of Dubai with DPT</p> */}
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className={ 'hideInput'}>
                                <label>Token</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 formGroup">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="formGroup">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {(passwordMatchError && !passwordResetSuccess && !error) && (
                                <div className="error-message" style={{ color: 'red' }}>
                                    {passwordMatchError}
                                </div>
                            )}

                            {(passwordResetSuccess && !error && !passwordMatchError) && (
                                <div className="success-message" style={{ color: 'green' }}>
                                    Password reset successfully!
                                </div>
                            )}
                            {(!passwordResetSuccess && error && !passwordMatchError) && (
                                <div className="error-message" style={{ color: 'red' }}>
                                    {error}
                                </div>
                            )}

                            <div className="formGroup">
                                <button type="submit" className="btn">
                                    Change Password
                                </button>
                            </div>

                            <div className="formGroup">
                                <div className="CreateAccountLabel">
                                    New User? <Link to="/register">Create an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            {/* FOOTER */}
            < Footer />
        </div >
    );
};

export default ResetPassword;
