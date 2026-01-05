# GitHub Copilot Instructions for RideWire AI Hub

## Project Overview

RideWire AI Hub is an AI-powered automotive diagnostic platform that orchestrates multiple AI agents (ChatGPT, Claude, Gemini) to provide consensus-based diagnostic recommendations. This is a high-tech diagnostic company providing AI-powered guidance.

## Legal Framework and Disclaimers

### ⚠️ CRITICAL: Legal Disclaimer Requirements

**RideWire is a high-tech diagnostic company providing AI-powered guidance. We CANNOT and DO NOT replace licensed mechanics, CPAs, financial advisors, or other professionals.**

ALL diagnostic features MUST include the following disclaimers:

#### Standard Diagnostic Disclaimer
```
DISCLAIMER: This AI-powered diagnostic tool provides informational guidance only. 
RideWire does NOT replace professional automotive mechanics, certified technicians, 
or licensed repair professionals. Always consult a qualified mechanic before 
performing any repairs. RideWire assumes no liability for vehicle repairs, 
modifications, or outcomes based on AI recommendations.
```

#### Financial/Business Disclaimer (for pricing estimates)
```
DISCLAIMER: Cost estimates are approximate and for informational purposes only. 
Actual repair costs may vary significantly based on location, parts availability, 
labor rates, and vehicle condition. RideWire is not a financial advisor and does 
not provide professional financial guidance. Consult appropriate professionals 
for financial decisions.
```

#### Safety Disclaimer (for all repair recommendations)
```
SAFETY WARNING: Vehicle repairs can be dangerous. Improper repairs may result in 
injury, death, or vehicle damage. Only qualified, licensed mechanics should perform 
repairs. RideWire is not liable for any injuries, damages, or outcomes resulting 
from following AI recommendations.
```

### Implementation Requirements

1. **User Acceptance**: Users MUST accept legal terms before accessing diagnostic features
2. **Persistent Display**: Disclaimers must be visible on all diagnostic result pages
3. **Database Logging**: Track user acceptance with timestamp in `user_agreements` table
4. **No Warranty**: All AI outputs include "AS-IS" warranty disclaimer
5. **Professional Referral**: Always recommend consulting licensed professionals

## Architecture & Security

### Security Requirements

- **Encryption**: All messages MUST use client-side AES-256 encryption
- **Password Hashing**: Use bcrypt with minimum 12 rounds
- **JWT Tokens**: Session tokens expire after 24 hours maximum
- **SQL Queries**: ALWAYS use parameterized queries (no string concatenation)
- **API Keys**: NEVER commit API keys; use environment variables only
- **Input Validation**: Validate and sanitize ALL user inputs

### Multi-AI Orchestration

All diagnostic queries MUST:
1. Be sent to ALL THREE AI providers (ChatGPT, Claude, Gemini)
2. Collect individual responses with confidence scores
3. Build consensus through the consensus engine
4. Apply safety gating (minimum 70% confidence for recommendations)
5. Log all responses for audit trail

### Database Schema

```sql
-- Required for legal compliance
CREATE TABLE user_agreements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    agreement_type VARCHAR(50) NOT NULL, -- 'diagnostic_disclaimer', 'terms_of_service', etc.
    accepted_at TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Existing schema reference
-- users table: id, email, password_hash, created_at
-- messages table: id, user_id, encrypted_content, nonce, created_at
```

## Code Standards

### JavaScript/Node.js Backend

```javascript
// ✅ CORRECT: Parameterized queries
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ❌ WRONG: SQL injection vulnerability
const result = await pool.query(
  `SELECT * FROM users WHERE email = '${email}'`
);

// ✅ CORRECT: Password hashing
const hash = await bcrypt.hash(password, 12);

// ✅ CORRECT: Environment variables
const apiKey = process.env.OPENAI_API_KEY;

// ❌ WRONG: Hardcoded secrets
const apiKey = 'sk-1234567890...';
```

### React Frontend

```javascript
// ✅ CORRECT: Legal disclaimer component
import LegalDisclaimer from './components/LegalDisclaimer';

function DiagnosticPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  if (!agreedToTerms) {
    return <LegalDisclaimer onAccept={() => setAgreedToTerms(true)} />;
  }
  
  return <DiagnosticResults />;
}

// ✅ CORRECT: Use React Router Link components
import { Link } from 'react-router-dom';
<Link to="/diagnostic">Start Diagnostic</Link>

// ❌ WRONG: Using <a> tags breaks SPA navigation
<a href="/diagnostic">Start Diagnostic</a>
```

### Multi-AI API Integration

```javascript
// ✅ CORRECT: Multi-AI consensus pattern
const multiAI = new MultiAIOrchestrator();
const responses = await multiAI.queryAllAgents(query);
const consensus = multiAI.buildConsensus(responses);

// Apply safety gate
if (consensus.confidence < 0.70) {
  return {
    status: 'low_confidence',
    message: 'Unable to provide confident recommendation. Please consult a professional mechanic.',
    disclaimer: SAFETY_DISCLAIMER
  };
}
```

## Automotive Industry Standards

### Compliance

- Follow SAE (Society of Automotive Engineers) standards for diagnostic codes
- OBD-II standard compliance for diagnostic data
- Proper interpretation of DTCs (Diagnostic Trouble Codes)
- No modifications to safety-critical systems without explicit warnings

### Diagnostic Best Practices

1. **Always verify VIN**: Confirm vehicle make/model/year
2. **Multiple data points**: Don't diagnose from single code
3. **Safety-first**: Flag safety-critical issues (brakes, steering, airbags)
4. **Cost transparency**: Provide reasonable cost ranges
5. **Professional referral**: Always recommend professional verification

## File Organization

```
ridewire-ai-hub/
├── .github/
│   └── copilot-instructions.md (this file)
├── frontend/
│   ├── components/
│   │   ├── LegalDisclaimer.jsx (REQUIRED)
│   │   ├── Chat.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ...
│   ├── App.jsx
│   └── ...
├── docs/
│   ├── EMAIL_TEMPLATES.md
│   ├── EMAIL_AUTOMATION_GUIDE.md
│   ├── WRITING_STYLE_GUIDE.md
│   └── ...
├── server.js
├── multiAIOrchestrator.js
├── encryption.js
├── schema.sql
└── package.json
```

## Development Workflow

### Before Committing

1. Run linter if available
2. Check for exposed secrets or API keys
3. Verify legal disclaimers are present
4. Test authentication flows
5. Validate parameterized queries

### Testing

- Manual testing approach (no automated test suite currently)
- Test all navigation flows
- Verify encryption/decryption
- Test multi-AI consensus with various queries
- Validate legal disclaimer acceptance flow

## Common Pitfalls to Avoid

### Security

- ❌ Committing `.env` files
- ❌ Hardcoding API keys
- ❌ Using string concatenation for SQL
- ❌ Storing passwords in plaintext
- ❌ Exposing sensitive data in error messages

### Legal

- ❌ Providing medical or professional advice
- ❌ Making repair guarantees
- ❌ Omitting safety warnings
- ❌ Not tracking user agreement acceptance
- ❌ Failing to display disclaimers prominently

### Architecture

- ❌ Skipping AI consensus (single AI response)
- ❌ Ignoring confidence scores
- ❌ Not encrypting sensitive messages
- ❌ Breaking existing backend APIs
- ❌ Using <a> tags instead of React Router Links

## API Patterns

### Authentication

```javascript
// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }
  
  // Check user
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user.rows[0]) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const valid = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate JWT
  const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
  
  res.json({ token, userId: user.rows[0].id });
});
```

### Multi-AI Query

```javascript
// Diagnostic query endpoint
app.post('/api/query', authenticateToken, async (req, res) => {
  const { query, vehicleInfo } = req.body;
  
  // Validate input
  if (!query || query.length > 1000) {
    return res.status(400).json({ error: 'Invalid query' });
  }
  
  // Check legal acceptance
  const agreement = await pool.query(
    'SELECT * FROM user_agreements WHERE user_id = $1 AND agreement_type = $2',
    [req.user.userId, 'diagnostic_disclaimer']
  );
  
  if (!agreement.rows[0]) {
    return res.status(403).json({ 
      error: 'Must accept diagnostic disclaimer',
      requiresAgreement: true
    });
  }
  
  // Query multi-AI
  const orchestrator = new MultiAIOrchestrator();
  const result = await orchestrator.queryAllAgents(query, vehicleInfo);
  const consensus = orchestrator.buildConsensus(result.responses);
  
  // Apply safety gating
  if (consensus.confidence < 0.70) {
    consensus.warning = 'Low confidence - consult professional mechanic';
  }
  
  // Add disclaimers
  consensus.disclaimers = {
    safety: SAFETY_DISCLAIMER,
    professional: PROFESSIONAL_DISCLAIMER
  };
  
  res.json(consensus);
});
```

## Contact & Support

For questions about RideWire AI Hub development:
- Technical Issues: aihub@stepheniesgem.io
- General Inquiries: hello@stepheniesgem.io
- Support: support@stepheniesgem.io

---

**Remember: Safety first, legal compliance always, professional referrals required.**
