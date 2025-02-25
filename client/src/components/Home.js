import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Escrow++</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="home-main">
        <h2>Home</h2>
        
        <div className="balance-card">
          <h3>Your Balance</h3>
          <p className="balance-amount">${currentUser?.balance || 0}</p>
        </div>
        
        <nav className="home-nav">
          <Link to="/create-game" className="nav-button">
            Create Game
          </Link>
          <Link to="/join-game" className="nav-button">
            Join Game
          </Link>
          <Link to="/stats" className="nav-button">
            Your Stats
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Home;