import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/VerificationSuccess.css';

const VerificationSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to login after 5 seconds
    const timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="verification-success-container">
      <div className="verification-success-card">
        <div className="success-icon">✅</div>
        <h2>Email Verified Successfully!</h2>
        
        <p>Your account has been activated and you can now log in to Escrow++.</p>
        
        <p className="countdown">
          Redirecting to login page in <span>{countdown}</span> seconds...
        </p>
        
        <Link to="/" className="login-button">
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;