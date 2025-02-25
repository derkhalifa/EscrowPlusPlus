import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerificationPending from './components/VerificationPending';
import VerificationSuccess from './components/VerificationSuccess';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Stats from './components/Stats';
import GameBoard from './components/GameBoard';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <Router>
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verification-pending" element={<VerificationPending />} />
      <Route path="/verification-success" element={<VerificationSuccess />} />
      
      {/* Protected Routes */}
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/create-game" element={
        <PrivateRoute>
          <CreateGame />
        </PrivateRoute>
      } />
      <Route path="/join-game" element={
        <PrivateRoute>
          <JoinGame />
        </PrivateRoute>
      } />
      <Route path="/stats" element={
        <PrivateRoute>
          <Stats />
        </PrivateRoute>
      } />
      <Route path="/game/:gameId" element={
        <PrivateRoute>
          <GameBoard />
        </PrivateRoute>
      } />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default App;