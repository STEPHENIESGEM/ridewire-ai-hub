# GitHub Copilot Instructions for RideWire AI Hub

## Repository Overview

RideWire AI Hub is a **production-ready multi-AI orchestration platform** built entirely on **Azure OpenAI Service and Microsoft infrastructure**. This is an enterprise intelligence and business automation platform company. The platform uses Azure OpenAI's GPT-4, GPT-4o, and GPT-4 Turbo models with flip-flop adversarial validation for high-confidence intelligence reports and email automation.

**Company:** RIDEWIRE LLC  
**Founder:** Stephenie N. Lacy  
**Contact:** hello@stepheniesgem.io

## 🚨 CRITICAL LEGAL & COMPLIANCE REQUIREMENTS

### Legal Disclaimers - MUST BE INCLUDED

**IMPORTANT**: This platform provides intelligence and automation tools ONLY. When implementing any user-facing features or documentation:

1. **Always include appropriate disclaimers** stating:
   - AI-generated intelligence is for informational purposes only
   - Users should consult qualified professionals in their respective fields
   - RideWire does not replace professional services
   - No liability for damages from following AI recommendations
   - Users are responsible for verifying all information

2. **Professional Services Disclaimer**:
   - This platform does NOT replace licensed professionals (financial advisors, lawyers, etc.)
   - All AI-generated content is advisory and educational only
   - Users must verify critical business decisions with qualified professionals
   - Platform provides tools for analysis, not professional services

3. **Data Privacy & Security**:
   - All user data must be encrypted (AES-256)
   - API keys must never be committed to the repository
   - User authentication must use secure JWT tokens with expiration
   - Passwords must be hashed with bcrypt (12+ rounds)
   - All business data is sensitive and must be treated accordingly

4. **Third-Party AI Services**:
   - All AI responses are from Azure OpenAI Service (Microsoft)
   - AI model outputs are not guaranteed to be accurate
   - Platform uses flip-flop adversarial validation for improved reliability but cannot guarantee correctness

## Technology Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.18+
- **Database**: PostgreSQL 12+ (Azure SQL compatible)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Security**: AES-256 client-side encryption

### Frontend
- **Framework**: React.js
- **Styling**: CSS3 (custom styles in frontend/styles/)

### AI Integrations
- **Azure OpenAI Service**: GPT-4, GPT-4o, GPT-4 Turbo
- **Flip-Flop Adversarial System**: Builder/Villain/Judge architecture
- **Email Automation**: COCO system powered by Azure OpenAI

### Cloud Platform
- **Microsoft Azure**: App Service, Azure SQL, Azure Storage
- **Azure OpenAI Service**: All AI capabilities
- **GitHub**: Version control

### Key Dependencies
- `express`: Web server framework
- `pg`: PostgreSQL client
- `@azure/openai`: Azure OpenAI SDK
- `jsonwebtoken`: JWT token generation/validation
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management
- `sodium-native`: Encryption utilities

## Coding Standards & Conventions

### General Principles
1. **Security First**: Always validate inputs, sanitize outputs, and encrypt sensitive data
2. **Minimal Dependencies**: Only add new dependencies if absolutely necessary
3. **Error Handling**: Always use try-catch blocks for async operations
4. **Logging**: Log errors with context but never log sensitive information (passwords, tokens, API keys)

### JavaScript/Node.js Style
- Use `async/await` for asynchronous operations (avoid callbacks)
- Use `const` and `let` instead of `var`
- Use template literals for string interpolation
- Follow existing code formatting (2-space indentation)
- Use descriptive variable names that reflect purpose
- Add JSDoc comments for functions, especially in API modules

### React/Frontend
- Use functional components with hooks (not class components)
- Keep components focused on single responsibilities
- Store sensitive operations on backend, not in frontend
- Never expose API keys or secrets in frontend code
- Use proper React state management

### Database Operations
- Always use parameterized queries (prevent SQL injection)
- Example: `pool.query('SELECT * FROM users WHERE email = $1', [email])`
- Never concatenate user input into SQL strings
- Use database transactions for multi-step operations
- Always handle database errors gracefully

### API Security
- All protected endpoints must verify JWT tokens
- Rate limit API calls to prevent abuse
- Validate all request parameters
- Return appropriate HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation errors)
  - 401: Unauthorized (authentication failed)
  - 403: Forbidden (insufficient permissions)
  - 500: Internal Server Error

### Environment Variables
- Store all secrets in `.env` file (never commit this file)
- Use `.env.example` as a template
- Required variables:
  - `DATABASE_URL`: PostgreSQL connection string (or Azure SQL)
  - `JWT_SECRET`: Secret for JWT signing
  - `AZURE_OPENAI_KEY`: Azure OpenAI API key
  - `AZURE_OPENAI_ENDPOINT`: Azure OpenAI endpoint URL
  - `AZURE_OPENAI_DEPLOYMENT_GPT4`: GPT-4 deployment name
  - `AZURE_OPENAI_DEPLOYMENT_GPT4O`: GPT-4o deployment name
  - `AZURE_OPENAI_DEPLOYMENT_GPT4_TURBO`: GPT-4 Turbo deployment name
  - `AZURE_OPENAI_API_VERSION`: API version (e.g., 2024-02-15-preview)
  - `PORT`: Server port (default 3000)
  - `NODE_ENV`: development/production

## Security Best Practices

### Encryption
- All user messages must be encrypted before storage
- Use `encryption.js` module for client-side encryption
- Never store unencrypted sensitive data
- Encryption keys should be derived securely

### Authentication
- Password minimum requirements: 8 characters
- Hash passwords with bcrypt (12+ rounds, 12 in production recommended)
- JWT tokens should expire (24 hours recommended)
- Implement session management with secure logout

### API Keys Protection
- Never log API keys
- Never commit API keys to version control
- Rotate API keys regularly
- Use separate keys for development and production
- Monitor API usage for anomalies

### Input Validation
- Validate all user inputs on both client and server
- Sanitize HTML/SQL to prevent injection attacks
- Limit request payload sizes
- Validate email formats, password strength
- Reject malformed JSON gracefully

## AI Integration Guidelines

### Azure OpenAI Multi-Agent Orchestration
- Use `multiAIOrchestrator.js` for coordinating Azure OpenAI agents
- All AI agents are powered by Azure OpenAI Service (GPT-4, GPT-4o, GPT-4 Turbo)
- Always handle API failures gracefully (one agent failing shouldn't break the app)
- Implement timeouts for AI API calls (30 seconds recommended)
- Cache responses when appropriate to reduce API costs
- Log AI interactions for debugging (without sensitive user data)

### Flip-Flop Adversarial System
- Builder Agent (GPT-4): Creates initial analysis
- Villain Agent (GPT-4 Turbo): Challenges and critiques the analysis
- Builder Revision: Addresses critiques and improves analysis
- Judge Synthesizer (GPT-4o): Creates final validated conclusion
- Results in 95%+ confidence scores after adversarial validation

### Consensus Mechanism
- Gather responses from all Azure OpenAI agents
- Compare responses for consistency
- Weight responses by confidence scores
- Provide users with both consensus and individual agent opinions
- Handle conflicting responses transparently

### COCO Email Automation
- Use Azure OpenAI for email generation and reply drafting
- Personalize emails using contact data and templates
- Detect reply intent using Azure OpenAI analysis
- Generate meeting responses and follow-ups automatically
- All drafts require Stephenie's approval before sending

### Error Handling for AI APIs
- Implement retry logic with exponential backoff
- Provide fallback responses if Azure OpenAI fails
- Display user-friendly error messages
- Never expose raw API error messages to users
- Monitor Azure OpenAI quota and rate limits

## Testing & Quality Assurance

### Before Every Commit
1. Test all changed functionality locally
2. Verify no secrets or API keys are being committed
3. Check that error handling works as expected
4. Ensure all database queries use parameterization
5. Validate that legal disclaimers are present where required

### Code Review Checklist
- [ ] Security vulnerabilities addressed
- [ ] Legal disclaimers included in user-facing features
- [ ] Input validation implemented
- [ ] Error handling is comprehensive
- [ ] No sensitive data in logs or commits
- [ ] API keys are in environment variables only
- [ ] Database queries are parameterized
- [ ] Authentication/authorization works correctly

## Deployment Readiness

### Pre-Deployment Checklist
1. **Environment Configuration**
   - All production environment variables are set
   - Database connection string is correct for production
   - JWT_SECRET is a strong random string (not default)
   - All API keys are production keys (not test keys)

2. **Security Verification**
   - SSL/TLS certificates are valid
   - HTTPS is enforced
   - CORS is properly configured
   - Rate limiting is enabled
   - Security headers are set (helmet.js recommended)

3. **Database**
   - Migrations are applied
   - Indexes are created for performance
   - Backup strategy is in place
   - Connection pooling is configured

4. **Legal Compliance**
   - Disclaimer text is prominently displayed
   - Privacy policy is accessible
   - Terms of service are available
   - Cookie consent (if applicable)

5. **Monitoring & Logging**
   - Error logging is configured
   - Performance monitoring is enabled
   - API usage tracking is active
   - Alert system for critical errors

### Production Best Practices
- Use process manager (PM2) for Node.js
- Set NODE_ENV to "production"
- Enable compression middleware
- Implement proper CORS policies
- Use reverse proxy (nginx) if applicable
- Set up automated backups
- Monitor application health
- Have rollback plan ready

## File Structure Understanding

```
ridewire-ai-hub/
├── server.js                          # Main Express server & authentication
├── multiAIOrchestrator.js            # Azure OpenAI multi-agent orchestration
├── encryption.js                      # Client-side encryption utilities
├── schema.sql                         # PostgreSQL database schema
├── package.json                       # Dependencies (@azure/openai included)
├── .env.example                       # Environment variable template
├── .gitignore                         # Exclude node_modules, .env, etc.
├── backend/
│   └── email-automation/             # COCO Email Automation System
│       ├── coco-email-agent.js      # Main email orchestrator
│       ├── email-templates.js       # Template library
│       ├── reply-detector.js        # Reply monitoring & intent detection
│       ├── draft-generator.js       # Azure OpenAI draft generation
│       ├── scheduler.js             # Follow-up scheduling
│       ├── crm-tracker.js          # CRM & pipeline tracking
│       └── target-list.json        # Contact database
├── frontend/
│   ├── App.jsx                      # React root component
│   ├── components/                  # React UI components
│   │   ├── Chat.jsx                # Azure OpenAI chat interface
│   │   ├── Login.jsx               # Login form
│   │   ├── Register.jsx            # Registration form
│   │   ├── Pricing.jsx             # Pricing tiers
│   │   └── HeroSection.jsx         # Landing page hero
│   ├── email-dashboard/             # COCO Email Dashboard
│   │   ├── Dashboard.js            # Email activity overview
│   │   ├── ApprovalQueue.js        # Review COCO's drafts
│   │   └── ContactList.js          # Contact management
│   ├── styles/                      # CSS stylesheets
│   └── public/                      # Static assets
├── docs/                         # Documentation
└── schemas/                      # JSON schemas
```

## Common Tasks & Patterns

### Adding a New API Endpoint
```javascript
// Always include authentication middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Example protected endpoint
app.post('/api/query', authenticateToken, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query required' });
    
    // Process query...
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Query error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Calling Azure OpenAI Agents
```javascript
// Use the orchestrator for Azure OpenAI multi-agent queries
const orchestrator = new MultiAIOrchestrator();
const results = await orchestrator.queryAllAgents(userQuery, sessionId);

// Always handle partial failures
if (Object.keys(results.errors).length > 0) {
  console.warn('Some Azure OpenAI agents failed:', results.errors);
}

// Use flip-flop adversarial validation for high-confidence results
const adversarialResult = await orchestrator.flipFlopAdversarial(
  initialResponse,
  originalQuery
);
// Results in 95%+ confidence after validation

// Process consensus
const consensus = orchestrator.buildConsensus(results.responses);
```

### COCO Email Automation
```javascript
// Generate personalized email using Azure OpenAI
const coco = new CocoEmailAgent();
const email = await coco.generatePersonalizedEmail(contact, 'initialOutreach');

// Add to approval queue for Stephenie
const queuePosition = coco.addToApprovalQueue(email);

// Detect reply intent
const replyDetector = new ReplyDetector();
const intent = await replyDetector.analyzeReplyIntent(incomingEmail.body, contact);

// Generate draft response
const draftGenerator = new DraftGenerator();
const draft = await draftGenerator.generateDraftReply(incomingEmail, contact, intent);
```

### Database Queries
```javascript
// Always use parameterized queries
const result = await pool.query(
  'INSERT INTO messages (user_id, content, encrypted) VALUES ($1, $2, $3) RETURNING id',
  [userId, encryptedContent, true]
);

// Handle errors appropriately
try {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
} catch (dbError) {
  console.error('Database error:', dbError.message);
  return res.status(500).json({ error: 'Database error occurred' });
}
```

## Important Reminders

1. **Microsoft Stack**: All AI capabilities powered by Azure OpenAI Service (GPT-4, GPT-4o, GPT-4 Turbo)
2. **Legal Safety**: Always include disclaimers that this platform does NOT replace licensed professionals
3. **Security**: Treat all user data as sensitive and encrypt appropriately
4. **Quality**: Triple-check authentication, authorization, and data validation
5. **AI Reliability**: Never claim 100% accuracy - flip-flop adversarial validation provides 95%+ confidence but is still advisory
6. **Professional Services**: Make it clear this is an intelligence and automation tool, not professional service delivery
7. **Data Privacy**: User intelligence and email data is private and confidential
8. **API Costs**: Be mindful of Azure OpenAI usage costs when making multiple calls
9. **Error Messages**: User-friendly messages for users, detailed logs for debugging
10. **COCO Automation**: All email drafts require Stephenie's approval before sending
11. **Company Branding**: RIDEWIRE LLC founded by Stephenie N. Lacy (hello@stepheniesgem.io)
6. **Data Privacy**: User diagnostic history is private and confidential
7. **API Costs**: Be mindful of API usage costs when making multiple AI calls
8. **Error Messages**: User-friendly messages for users, detailed logs for debugging
9. **Performance**: Consider caching and rate limiting for production
10. **Compliance**: Ensure GDPR/privacy compliance for user data

## When to Ask for Help

If you encounter:
- Unclear security requirements
- Complex multi-AI coordination logic
- Database migration or schema changes
- Legal/compliance questions
- Performance optimization needs
- Third-party API integration issues

Refer to documentation or raise questions rather than making assumptions.

## Documentation Standards

When adding new features:
1. Update README.md if user-facing
2. Add JSDoc comments to functions
3. Update API documentation if endpoints change
4. Include legal disclaimers in user-facing docs
5. Document environment variables in .env.example
6. Add setup instructions if infrastructure changes

---

**Remember**: This is a high-tech diagnostic platform serving automotive professionals. Code quality, security, and legal compliance are non-negotiable for successful deployment. Always err on the side of caution with legal disclaimers and security measures.
