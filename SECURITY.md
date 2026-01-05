# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The RideWire AI Hub team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities by emailing:

**security@stepheniesgem.io** (or hello@stepheniesgem.io)

Include the following information:
- Type of vulnerability (e.g., SQL injection, XSS, authentication bypass)
- Full path of the affected source file(s)
- Location of the affected source code (tag/branch/commit)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue (what an attacker could do)

### What to Expect

1. **Acknowledgment:** We'll acknowledge receipt within 48 hours
2. **Assessment:** We'll confirm the vulnerability and determine severity within 5 business days
3. **Fix Development:** We'll work on a fix (timeline depends on severity)
4. **Disclosure:** We'll notify you when the fix is deployed
5. **Credit:** With your permission, we'll credit you in our security advisories

### Response Timeline

| Severity | Initial Response | Fix Target |
|----------|-----------------|------------|
| Critical | 24 hours | 7 days |
| High | 48 hours | 14 days |
| Medium | 5 days | 30 days |
| Low | 7 days | 60 days |

## Security Best Practices for Contributors

### Code Security

1. **Never commit secrets**
   - No API keys, passwords, or tokens in code
   - Use environment variables
   - Check .gitignore includes .env

2. **Input Validation**
   - Validate and sanitize ALL user input
   - Use parameterized queries (prevent SQL injection)
   - Escape HTML output (prevent XSS)

3. **Authentication & Authorization**
   - Use bcrypt for password hashing (min 12 rounds)
   - Implement JWT token expiration
   - Validate tokens on every protected endpoint
   - Never trust client-side authorization

4. **Encryption**
   - Use AES-256-GCM for data encryption
   - Store encryption keys in environment variables
   - Use HTTPS in production
   - Never log sensitive data

### Common Vulnerabilities to Avoid

#### ❌ SQL Injection
```javascript
// BAD - vulnerable to SQL injection
pool.query(`SELECT * FROM users WHERE id = ${userId}`);

// GOOD - parameterized query
pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

#### ❌ Cross-Site Scripting (XSS)
```javascript
// BAD - unsanitized HTML
element.innerHTML = userInput;

// GOOD - sanitized with DOMPurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

#### ❌ Weak Password Storage
```javascript
// BAD - plaintext password
const password = user.password;

// GOOD - bcrypt hashed
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 12);
```

#### ❌ Exposed Secrets
```javascript
// BAD - hardcoded API key
const apiKey = 'sk-abc123def456';

// GOOD - environment variable
const apiKey = process.env.OPENAI_API_KEY;
```

#### ❌ Insecure Direct Object Reference
```javascript
// BAD - no authorization check
app.get('/api/messages/:id', async (req, res) => {
  const message = await getMessageById(req.params.id);
  res.json(message);
});

// GOOD - verify ownership
app.get('/api/messages/:id', authMiddleware, async (req, res) => {
  const message = await getMessageById(req.params.id);
  if (message.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(message);
});
```

## Security Features

### Current Implementations

1. **Authentication**
   - JWT-based authentication
   - Bcrypt password hashing (12+ rounds)
   - Session management

2. **Data Protection**
   - Client-side AES-256 encryption for messages
   - Encrypted storage in PostgreSQL
   - HTTPS enforcement (production)

3. **Input Validation**
   - Email format validation
   - Password strength requirements
   - SQL parameterized queries

4. **Authorization**
   - Protected API endpoints
   - User-specific data access
   - Legal disclaimer acceptance tracking

5. **Rate Limiting**
   - Login attempt limiting
   - API request throttling
   - DDOS protection

### Planned Security Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Security headers (helmet.js)
- [ ] Content Security Policy (CSP)
- [ ] Regular security audits
- [ ] Automated vulnerability scanning
- [ ] Session timeout enforcement
- [ ] IP-based rate limiting
- [ ] Audit logging for sensitive operations

## Third-Party Dependencies

### AI Services

We integrate with third-party AI services:

- **OpenAI (ChatGPT):** https://openai.com/security
- **Anthropic (Claude):** https://www.anthropic.com/security
- **Google (Gemini):** https://cloud.google.com/security

Your queries are sent to these services. Review their privacy policies and security practices.

### Data Transmission

- User queries → Encrypted → Our server → AI service → Response → Encrypted → User
- We do NOT store AI service responses in plaintext
- All data in transit uses TLS 1.2+

## Database Security

### PostgreSQL Best Practices

1. **User Permissions**
   - Dedicated database user (not postgres superuser)
   - Minimal required permissions (GRANT)
   - Password authentication required

2. **Connection Security**
   - SSL/TLS connections in production
   - Firewall rules restrict access
   - No public database exposure

3. **Data Encryption**
   - Encrypted message content (AES-256)
   - Sensitive user data hashed
   - Regular backups encrypted

## Infrastructure Security

### Production Checklist

- [ ] HTTPS/TLS enabled (Let's Encrypt)
- [ ] Firewall configured (ports 80, 443 only)
- [ ] SSH key authentication only
- [ ] Automatic security updates enabled
- [ ] Database not publicly accessible
- [ ] Environment variables secured
- [ ] Log rotation configured
- [ ] Intrusion detection enabled

### Environment Variables

Never commit these to Git:
- `JWT_SECRET`
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `CLAUDE_API_KEY`
- `GEMINI_API_KEY`
- `SMTP_PASS`
- `ENCRYPTION_KEY`

## Incident Response

### If a Security Breach Occurs

1. **Immediate Actions**
   - Take affected systems offline
   - Notify the security team
   - Preserve logs and evidence

2. **Investigation**
   - Determine scope of breach
   - Identify affected data
   - Find entry point and vulnerability

3. **Containment**
   - Patch vulnerability
   - Rotate compromised credentials
   - Deploy fixes

4. **Notification**
   - Notify affected users (if applicable)
   - Report to authorities (if required)
   - Post public disclosure

5. **Post-Mortem**
   - Document incident
   - Improve security measures
   - Update policies

## Security Contacts

- **Security Team:** security@stepheniesgem.io
- **General Support:** support@stepheniesgem.io
- **Urgent Issues:** hello@stepheniesgem.io

## Bug Bounty Program

We currently do NOT have a formal bug bounty program, but we appreciate responsible disclosure and will:

- Acknowledge your contribution
- Credit you (with permission) in security advisories
- Consider compensation for critical vulnerabilities

## Compliance

### Legal Requirements

- GDPR compliance (for EU users)
- CCPA compliance (for California users)
- Data breach notification laws

### Industry Standards

- OWASP Top 10 awareness
- Secure coding practices
- Regular security training

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

---

**Last Updated:** January 5, 2026  
**Version:** 1.0.0

Thank you for helping keep RideWire AI Hub secure! 🔒
