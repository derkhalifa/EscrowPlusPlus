import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/VerificationPending.css';

const VerificationPending = () => {
  const [resendStatus, setResendStatus] = useState('');
  const location = useLocation();
  const email = location.state?.email || '';

  const handleResendVerification = async () => {
    if (!email) {
      setResendStatus('error');
      return;
    }

    setResendStatus('sending');
    
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/resend-verification`,
        { email }
      );
      
      setResendStatus('success');
    } catch (err) {
      setResendStatus('error');
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="email-icon">📧</div>
        <h2>Verify Your Email</h2>
        
        <p>
          We've sent a verification email to:
          <br />
          <strong>{email || 'your email address'}</strong>
        </p>
        
        <p>Please check your inbox and click on the verification link to activate your account.</p>
        
        <div className="resend-section">
          <p>Didn't receive the email?</p>
          
          {resendStatus === 'sending' ? (
            <p className="status-message">Sending verification email...</p>
          ) : resendStatus === 'success' ? (
            <p className="status-message success">Email sent successfully!</p>
          ) : resendStatus === 'error' ? (
            <p className="status-message error">Failed to send email. Please try again.</p>
          ) : null}
          
          <button 
            className="resend-verification-btn"
            onClick={handleResendVerification}
            disabled={resendStatus === 'sending' || !email}
          >
            Resend Verification Email
          </button>
        </div>
        
        <div className="verification-footer">
          <Link to="/">Return to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;