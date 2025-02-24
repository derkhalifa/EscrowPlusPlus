import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Stats from './components/Stats';
import GameBoard from './components/GameBoard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-game" element={<CreateGame />} />
      <Route path="/join-game" element={<JoinGame />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/game/:gameId" element={<GameBoard />} />
    </Routes>
  </Router>
);

export default App;