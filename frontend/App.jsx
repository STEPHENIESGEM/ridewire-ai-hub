import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading RIDEWIRE AI Hub...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🤖 RIDEWIRE AI Hub</h1>
          <p>Where Multiple AIs Collaborate & Reach Consensus</p>
        </header>
        
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/chat" 
            element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/chat" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
