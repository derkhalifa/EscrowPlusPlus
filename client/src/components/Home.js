// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
    <nav>
      <Link to="/create-game">Create Game</Link> |{' '}
      <Link to="/join-game">Join Game</Link> |{' '}
      <Link to="/stats">Your Stats</Link>
    </nav>
  </div>
);

export default Home;