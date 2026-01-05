import React from 'react';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <div className="legal-page-container">
      <div className="legal-page-content">
        <h1>Legal Disclaimer</h1>
        <p className="legal-updated">Last Updated: January 5, 2026 | Version 1.0.0</p>

        <section className="legal-section">
          <h2>⚠️ Advisory Only - Not Professional Services</h2>
          <p>
            RideWire AI Hub is a high-tech diagnostic platform that provides AI-powered guidance and information. 
            We <strong>DO NOT</strong> provide professional automotive repair services, mechanical work, or licensed 
            professional advice.
          </p>
        </section>

        <section className="legal-section">
          <h2>No Replacement for Licensed Professionals</h2>
          <p>
            Our AI-powered diagnostic tools and recommendations are for <strong>informational and educational 
            purposes only</strong>. They are NOT a substitute for:
          </p>
          <ul>
            <li>Licensed automotive technicians and mechanics</li>
            <li>Professional diagnostic equipment and tools</li>
            <li>In-person vehicle inspections</li>
            <li>Manufacturer-certified service centers</li>
            <li>Safety-critical system evaluations</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>No Liability for Repair Outcomes</h2>
          <p>
            RideWire AI Hub and its operators <strong>accept NO liability</strong> for:
          </p>
          <ul>
            <li>Repair outcomes or results based on our AI recommendations</li>
            <li>Vehicle damage or malfunction</li>
            <li>Personal injury or property damage</li>
            <li>Financial losses from repair costs</li>
            <li>Accuracy of cost estimates or diagnostic predictions</li>
            <li>Third-party services or parts obtained based on our information</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Always Consult Qualified Professionals</h2>
          <p>
            Before performing any repairs, modifications, or maintenance on your vehicle, you MUST:
          </p>
          <ul>
            <li>Consult with licensed automotive professionals</li>
            <li>Have your vehicle properly inspected</li>
            <li>Follow manufacturer guidelines and recommendations</li>
            <li>Use proper tools and safety equipment</li>
            <li>Obtain professional advice for safety-critical systems</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>AI Limitations</h2>
          <p>
            Our multi-AI consensus system provides recommendations based on available information, but:
          </p>
          <ul>
            <li>AI cannot physically inspect your vehicle</li>
            <li>AI may not have complete information about your specific vehicle</li>
            <li>AI recommendations are probabilistic, not guaranteed</li>
            <li>AI cannot account for all variables in vehicle condition</li>
          </ul>
        </section>

        <section className="legal-section warning-section">
          <h2>⚠️ SAFETY WARNING</h2>
          <p>
            <strong>Do not attempt repairs on safety-critical systems (brakes, steering, airbags, etc.) without 
            professional assistance.</strong> Improper repairs can result in serious injury or death.
          </p>
        </section>

        <section className="legal-section">
          <h2>Your Responsibility</h2>
          <p>By using RideWire AI Hub, you acknowledge that:</p>
          <ul>
            <li>You have read and understood this disclaimer</li>
            <li>You will use RideWire AI Hub for informational purposes only</li>
            <li>You will consult qualified professionals before performing repairs</li>
            <li>You accept all risks associated with vehicle repair and maintenance</li>
            <li>You will not hold RideWire AI Hub liable for any outcomes</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            All content, trademarks, and data on this platform are the property of RideWire AI Hub LLC. 
            Unauthorized use is prohibited.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Users will be notified of significant 
            changes and may be required to accept the updated disclaimer before continuing to use the platform.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Information</h2>
          <p>
            For questions about this disclaimer or our services:
          </p>
          <ul className="contact-list">
            <li>General Inquiries: <a href="mailto:hello@stepheniesgem.io">hello@stepheniesgem.io</a></li>
            <li>Legal Questions: <a href="mailto:hello@stepheniesgem.io">hello@stepheniesgem.io</a></li>
            <li>Support: <a href="mailto:support@stepheniesgem.io">support@stepheniesgem.io</a></li>
          </ul>
        </section>

        <div className="legal-actions">
          <Link to="/terms" className="legal-link">View Terms of Service →</Link>
          <Link to="/dashboard" className="legal-link">Return to Dashboard →</Link>
        </div>
      </div>
    </div>
  );
}
