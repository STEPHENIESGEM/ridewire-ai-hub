import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn primary">
            Go to Dashboard
          </Link>
          <Link to="/chat" className="not-found-btn">
            Start Chat
          </Link>
        </div>

        <div className="not-found-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/disclaimer">Legal Disclaimer</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <p className="not-found-help">
          Need help? Contact us at <a href="mailto:support@stepheniesgem.io">support@stepheniesgem.io</a>
        </p>
      </div>
    </div>
  );
}
