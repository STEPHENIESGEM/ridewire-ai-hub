import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section" style={{
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1626 100%)',
      textAlign: 'center',
      color: '#ffffff'
    }}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{fontSize: '48px', marginBottom: '20px', fontWeight: 'bold'}}>
          RideWire AI Hub
        </h1>
        <p style={{fontSize: '20px', marginBottom: '10px', color: '#0078D4'}}>
          Enterprise Intelligence Platform - Built on Azure OpenAI Service
        </p>
        <p style={{fontSize: '14px', marginBottom: '5px', color: '#107C10'}}>
          RIDEWIRE LLC | Founded by Stephenie N. Lacy
        </p>
        <p style={{fontSize: '16px', marginBottom: '30px', color: '#cccccc', maxWidth: '700px', margin: '0 auto 30px'}}>
          Three Azure OpenAI agents (GPT-4 Strategist, GPT-4o Analyst, GPT-4 Turbo Validator) collaborate with flip-flop adversarial validation to deliver 95%+ confidence intelligence reports and automated email outreach.
        </p>
        
        <div style={{marginBottom: '40px'}}>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 30px',
              margin: '0 10px',
              backgroundColor: '#0078D4',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Start Intelligence Query
          </button>
          <button 
            onClick={() => navigate('/register')}
            style={{
              padding: '12px 30px',
              margin: '0 10px',
              backgroundColor: 'transparent',
              color: '#0078D4',
              border: '2px solid #0078D4',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Get Started Free
          </button>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px'}}>
          <div><span style={{fontSize: '24px'}}>⚡</span> Azure OpenAI Powered</div>
          <div><span style={{fontSize: '24px'}}>🔒</span> 95%+ Confidence</div>
          <div><span style={{fontSize: '24px'}}>📧</span> COCO Email Automation</div>
        </div>

        <div style={{
          backgroundColor: '#1a2f4a',
          padding: '40px',
          borderRadius: '10px',
          border: '2px solid #0078D4',
          textAlign: 'center'
        }}>
          <p style={{margin: 0, color: '#0078D4', fontSize: '14px', marginBottom: '10px'}}>POWERED BY MICROSOFT AZURE</p>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold'}}>🤖 Multi-AI Intelligence Engine + Flip-Flop Adversarial Validation</p>
          <p style={{margin: '10px 0 0 0', color: '#cccccc', fontSize: '14px'}}>Hero image placeholder: Azure OpenAI Agents + Consensus Engine + COCO Email System</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
