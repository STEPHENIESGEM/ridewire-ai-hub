import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Disclaimer from './components/Disclaimer';
import Terms from './components/Terms';
import NotFound from './components/NotFound';
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Loading RIDEWIRE AI Hub...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <h1>🤖 RIDEWIRE AI Hub</h1>
              </Link>
              <p>Where Multiple AIs Collaborate & Reach Consensus</p>
            </div>
            
            <nav className="main-nav">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/chat">Chat</Link>
                  <Link to="/pricing">Pricing</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<Terms />} />
            <Route 
              path="/chat" 
              element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-links">
              <Link to="/disclaimer">Legal Disclaimer</Link>
              <Link to="/terms">Terms of Service</Link>
              <a href="https://github.com/STEPHENIESGEM/ridewire-ai-hub" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div className="footer-contact">
              <p>Contact: <a href="mailto:hello@stepheniesgem.io">hello@stepheniesgem.io</a></p>
              <p>Support: <a href="mailto:support@stepheniesgem.io">support@stepheniesgem.io</a></p>
            </div>
            <div className="footer-legal">
              <p>⚠️ AI-powered information for educational purposes only. Always consult qualified professionals.</p>
              <p>&copy; 2026 RideWire AI Hub LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
