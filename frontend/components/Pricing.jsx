import React from 'react';
import axios from 'axios';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Get started with AI consensus chat',
      features: [
        '50 messages/month',
        'Basic AI consensus (2 models)',
        'Message history (7 days)',
        'Community support',
        'Basic encryption'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For power users and teams',
      features: [
        '500 messages/month',
        'Full Azure OpenAI intelligence (GPT-4, GPT-4o, GPT-4 Turbo)',
        'Message history (90 days)',
        'Priority support',
        'Advanced encryption',
        'Custom conversation limits',
        'API access'
      ],
      cta: 'Start Pro Trial',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For organizations and businesses',
      features: [
        'Unlimited messages',
        'Full AI consensus + custom models',
        'Unlimited history',
        '24/7 dedicated support',
        'Enterprise encryption',
        'Team management',
        'Advanced API',
        'SLA guarantee',
        'Custom training'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const handleSelectPlan = async (plan) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/subscribe', {
        planId: plan.id,
        userId: localStorage.getItem('userId')
      });
      
      if (plan.id === 'enterprise') {
        window.location.href = 'mailto:sales@ridewire.ai?subject=Enterprise%20Plan%20Inquiry';
      } else {
        // Redirect to Stripe checkout
        window.location.href = response.data.checkoutUrl;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error processing subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the perfect plan for your AI collaboration needs</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
            <div className="pricing-header-card">
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="pricing-price">
              <span className="price-amount">{plan.price}</span>
              <span className="price-period">{plan.period}</span>
            </div>

            <div className="pricing-features">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="feature">
                  <span className="checkmark">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              className={`pricing-button ${plan.highlighted ? 'primary' : 'secondary'}`}
              onClick={() => handleSelectPlan(plan)}
              disabled={loading}
            >
              {loading ? 'Processing...' : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h4>Can I upgrade or downgrade plans?</h4>
            <p>Yes! You can change your plan at any time. Changes take effect on your next billing cycle.</p>
          </div>
          <div className="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a free trial?</h4>
            <p>Yes! All paid plans include a 7-day free trial with full access to premium features.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer discounts for annual billing?</h4>
            <p>Yes! Annual plans receive 20% discount. Contact us for custom volume pricing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
