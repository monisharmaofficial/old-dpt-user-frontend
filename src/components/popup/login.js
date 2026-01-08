import React from 'react';
import './login.css'
const SuccessPopup = ({ handleClose }) => {
  return (
    <div className="success-popup" >
      <div className="success-content">
        <h2>Login Successfully</h2>
      </div>
    </div>
  );
};

export default SuccessPopup;
