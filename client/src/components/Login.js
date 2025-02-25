import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const [resendEmailStatus, setResendEmailStatus] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const { username, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the login function from AuthContext
      await login(username, password);
      
      setLoading(false);
      
      // Navigate to home page on successful login
      navigate('/home');
    } catch (err) {
      setLoading(false);
      
      // Handle email verification error
      if (err.response && err.response.data && err.response.data.emailNotVerified) {
        setEmailVerificationNeeded(true);
        setError('Email not verified. Please check your inbox or request a new verification email.');
      } else {
        setError(
          err.response && err.response.data.message 
            ? err.response.data.message 
            : 'Login failed. Please try again.'
        );
      }
    }
  };

  const handleResendVerification = async () => {
    if (!formData.username) {
      setError('Please enter your username to resend verification email');
      return;
    }

    setResendEmailStatus('sending');
    
    try {
      // First get the email from username
      const userResponse = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/get-email-by-username`,
        { username: formData.username }
      );
      
      const email = userResponse.data.email;
      
      // Send verification email
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/resend-verification`,
        { email }
      );
      
      setResendEmailStatus('success');
    } catch (err) {
      setResendEmailStatus('failed');
      setError(
        err.response && err.response.data.message 
          ? err.response.data.message 
          : 'Failed to resend verification email. Please try again.'
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Escrow++</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {emailVerificationNeeded && (
          <div className="verification-message">
            <p>Your email hasn't been verified yet.</p>
            {resendEmailStatus === 'sending' ? (
              <p>Sending verification email...</p>
            ) : resendEmailStatus === 'success' ? (
              <p className="success-message">Verification email sent! Please check your inbox.</p>
            ) : (
              <button 
                onClick={handleResendVerification}
                className="resend-button"
                disabled={resendEmailStatus === 'sending'}
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/register">Don't have an account? Register</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;