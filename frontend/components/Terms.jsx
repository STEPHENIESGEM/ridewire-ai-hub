import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="legal-page-container">
      <div className="legal-page-content">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last Updated: January 5, 2026 | Version 1.0.0</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using RideWire AI Hub ("the Service"), you accept and agree to be bound by these 
            Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            RideWire AI Hub is a multi-AI orchestration platform that provides automotive diagnostic information 
            through the integration of multiple artificial intelligence systems (ChatGPT, Claude, Gemini, and others).
          </p>
          <p>
            <strong>Important:</strong> The Service provides educational and informational content only and does 
            NOT constitute professional automotive advice or repair services.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. User Accounts</h2>
          <h3>3.1 Registration</h3>
          <ul>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must be at least 18 years old to use this Service</li>
            <li>One account per user; multiple accounts are prohibited</li>
          </ul>

          <h3>3.2 Account Security</h3>
          <ul>
            <li>You are responsible for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Use strong passwords and enable two-factor authentication when available</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Acceptable Use Policy</h2>
          <h3>You agree NOT to:</h3>
          <ul>
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Transmit viruses, malware, or other harmful code</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Scrape, crawl, or systematically extract data from the Service</li>
            <li>Reverse engineer or attempt to discover source code</li>
            <li>Impersonate RideWire AI Hub staff or other users</li>
            <li>Use the Service to provide professional automotive services to third parties</li>
            <li>Redistribute or resell access to the Service without authorization</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Service are owned by RideWire AI Hub LLC and are 
            protected by copyright, trademark, and other intellectual property laws.
          </p>
          <h3>You may NOT:</h3>
          <ul>
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Use our trademarks or branding without written authorization</li>
            <li>Create derivative works based on our platform</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
            BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Accuracy, reliability, or completeness of information</li>
            <li>Uninterrupted or error-free service</li>
            <li>Security of data transmission</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, RIDEWIRE AI HUB LLC SHALL NOT BE LIABLE FOR:
          </p>
          <ul>
            <li>Any direct, indirect, incidental, or consequential damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Vehicle damage or repair costs</li>
            <li>Personal injury or property damage</li>
            <li>Actions taken based on information from the Service</li>
          </ul>
          <p>
            <strong>Your sole remedy for dissatisfaction with the Service is to stop using it.</strong>
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless RideWire AI Hub LLC, its officers, directors, employees, 
            and agents from any claims, damages, losses, or expenses (including attorney fees) arising from:
          </p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Vehicle repairs or modifications based on Service information</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Privacy and Data</h2>
          <h3>9.1 Data Collection</h3>
          <p>
            We collect and process personal data as described in our Privacy Policy. By using the Service, 
            you consent to this data collection and processing.
          </p>

          <h3>9.2 Message Encryption</h3>
          <p>
            User messages are encrypted using AES-256 encryption before storage. However, no system is 100% 
            secure, and we cannot guarantee absolute security.
          </p>

          <h3>9.3 AI Processing</h3>
          <p>
            Your queries are sent to third-party AI services (OpenAI, Anthropic, Google) for processing. 
            These services have their own privacy policies and terms of service.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Subscription and Payments</h2>
          <h3>10.1 Free Tier</h3>
          <ul>
            <li>Limited diagnostic queries per month</li>
            <li>Basic feature access</li>
            <li>May be modified or discontinued at any time</li>
          </ul>

          <h3>10.2 Paid Subscriptions</h3>
          <ul>
            <li>Billed monthly or annually as selected</li>
            <li>Auto-renews unless canceled</li>
            <li>No refunds for partial months</li>
            <li>Prices subject to change with 30 days notice</li>
          </ul>

          <h3>10.3 Cancellation</h3>
          <ul>
            <li>Cancel anytime from account settings</li>
            <li>Access continues until end of billing period</li>
            <li>No refunds for unused time</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. Termination</h2>
          <h3>11.1 By You</h3>
          <p>
            You may terminate your account at any time by contacting support@stepheniesgem.io
          </p>

          <h3>11.2 By Us</h3>
          <p>
            We reserve the right to suspend or terminate your account if:
          </p>
          <ul>
            <li>You violate these Terms of Service</li>
            <li>Your account is inactive for 12+ months</li>
            <li>We suspect fraudulent activity</li>
            <li>Required by law or regulatory authorities</li>
          </ul>
          <p>
            Upon termination, your data may be deleted in accordance with our data retention policies.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
            posting. Significant changes will be communicated via email or platform notification.
          </p>
          <p>
            <strong>Your continued use of the Service after changes constitutes acceptance of the new Terms.</strong>
          </p>
        </section>

        <section className="legal-section">
          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by the laws of New Mexico, USA, without regard to conflict of law principles. 
            Any disputes shall be resolved in the state or federal courts located in New Mexico.
          </p>
        </section>

        <section className="legal-section">
          <h2>14. Dispute Resolution</h2>
          <h3>14.1 Informal Resolution</h3>
          <p>
            Before filing a claim, contact us at hello@stepheniesgem.io to attempt informal resolution.
          </p>

          <h3>14.2 Arbitration</h3>
          <p>
            Any disputes not resolved informally shall be settled by binding arbitration in accordance with 
            the American Arbitration Association rules.
          </p>

          <h3>14.3 Class Action Waiver</h3>
          <p>
            You agree to resolve disputes individually and waive any right to participate in class action lawsuits.
          </p>
        </section>

        <section className="legal-section">
          <h2>15. Miscellaneous</h2>
          <h3>15.1 Entire Agreement</h3>
          <p>
            These Terms constitute the entire agreement between you and RideWire AI Hub LLC.
          </p>

          <h3>15.2 Severability</h3>
          <p>
            If any provision is found unenforceable, the remaining provisions continue in full effect.
          </p>

          <h3>15.3 No Waiver</h3>
          <p>
            Failure to enforce any provision does not waive our right to enforce it later.
          </p>

          <h3>15.4 Assignment</h3>
          <p>
            You may not assign these Terms. We may assign our rights to any successor entity.
          </p>
        </section>

        <section className="legal-section">
          <h2>16. Contact Information</h2>
          <p>
            For questions about these Terms:
          </p>
          <ul className="contact-list">
            <li><strong>Email:</strong> <a href="mailto:hello@stepheniesgem.io">hello@stepheniesgem.io</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@stepheniesgem.io">support@stepheniesgem.io</a></li>
            <li><strong>Legal:</strong> RideWire AI Hub LLC, New Mexico, USA</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Acknowledgment</h2>
          <p>
            <strong>BY USING RIDEWIRE AI HUB, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE 
            BOUND BY THESE TERMS OF SERVICE.</strong>
          </p>
        </section>

        <div className="legal-actions">
          <Link to="/disclaimer" className="legal-link">View Legal Disclaimer →</Link>
          <Link to="/dashboard" className="legal-link">Return to Dashboard →</Link>
        </div>
      </div>
    </div>
  );
}
