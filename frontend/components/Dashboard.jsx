import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalChats: 0,
    totalMessages: 0,
    accountCreated: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/user/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserStats(response.data);
    } catch (err) {
      // If stats endpoint doesn't exist yet, use placeholder data
      setUserStats({
        totalChats: 0,
        totalMessages: 0,
        accountCreated: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to RideWire AI Hub - Your Multi-AI Diagnostic Platform</p>
      </div>

      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/chat" className="action-btn primary">
              <span className="icon">💬</span>
              <span>Start AI Chat</span>
            </Link>
            <Link to="/pricing" className="action-btn">
              <span className="icon">💎</span>
              <span>Upgrade Plan</span>
            </Link>
          </div>
        </div>

        {/* Stats Card */}
        <div className="dashboard-card stats-card">
          <h2>Your Activity</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{userStats.totalChats}</span>
              <span className="stat-label">Total Chats</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{userStats.totalMessages}</span>
              <span className="stat-label">Messages Sent</span>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="dashboard-card features-card">
          <h2>Platform Features</h2>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">🤖</span>
              <div>
                <strong>Multi-AI Consensus</strong>
                <p>ChatGPT, Claude, and Gemini work together</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🔒</span>
              <div>
                <strong>Encrypted Storage</strong>
                <p>AES-256 encryption for all messages</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🚗</span>
              <div>
                <strong>Auto Diagnostics</strong>
                <p>AI-powered vehicle diagnostic assistance</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Getting Started Card */}
        <div className="dashboard-card getting-started">
          <h2>Getting Started</h2>
          <ol className="steps-list">
            <li>
              <strong>Step 1:</strong> Review the <Link to="/disclaimer">legal disclaimer</Link> before using diagnostic features
            </li>
            <li>
              <strong>Step 2:</strong> Head to the <Link to="/chat">Chat interface</Link> to start your first diagnostic query
            </li>
            <li>
              <strong>Step 3:</strong> Get AI-powered recommendations from multiple AI systems
            </li>
            <li>
              <strong>Step 4:</strong> Always consult qualified professionals for actual repairs
            </li>
          </ol>
        </div>

        {/* Important Notice */}
        <div className="dashboard-card notice-card">
          <h2>⚠️ Important Notice</h2>
          <p>
            RideWire AI Hub provides AI-powered information for <strong>educational purposes only</strong>. 
            Our recommendations are NOT a replacement for professional automotive technicians, mechanics, 
            or licensed professionals. Always consult qualified professionals for vehicle repairs and maintenance.
          </p>
          <p>
            <Link to="/disclaimer">Read full disclaimer →</Link>
          </p>
        </div>

        {/* Support Card */}
        <div className="dashboard-card support-card">
          <h2>Need Help?</h2>
          <div className="support-links">
            <a href="mailto:support@stepheniesgem.io" className="support-link">
              <span className="icon">📧</span>
              <span>Email Support</span>
            </a>
            <a href="https://github.com/STEPHENIESGEM/ridewire-ai-hub/issues" target="_blank" rel="noopener noreferrer" className="support-link">
              <span className="icon">🐛</span>
              <span>Report Issue</span>
            </a>
            <Link to="/terms" className="support-link">
              <span className="icon">📄</span>
              <span>Terms of Service</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
