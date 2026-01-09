require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const CocoEmailAgent = require('./backend/email-automation/coco-email-agent');
const ReplyDetector = require('./backend/email-automation/reply-detector');
const DraftGenerator = require('./backend/email-automation/draft-generator');
const EmailScheduler = require('./backend/email-automation/scheduler');
const CRMTracker = require('./backend/email-automation/crm-tracker');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize email automation components
const cocoAgent = new CocoEmailAgent();
const replyDetector = new ReplyDetector();
const draftGenerator = new DraftGenerator();
const scheduler = new EmailScheduler();
const crmTracker = new CRMTracker();

// Load CRM data on startup
crmTracker.loadData().catch(err => console.error('Error loading CRM data:', err));

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
      [email, hash]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, userId: rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Store encrypted message
app.post('/messages', async (req, res) => {
  try {
    const { ciphertext, nonce, salt, hash, session_id } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await pool.query(
      'INSERT INTO messages (user_id, session_id, ciphertext, nonce, salt, hash, timestamp) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [decoded.id, session_id, ciphertext, nonce, salt, hash]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve encrypted messages
app.get('/messages/:session_id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(
      'SELECT * FROM messages WHERE user_id = $1 AND session_id = $2',
      [decoded.id, req.params.session_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// EMAIL AUTOMATION ENDPOINTS (COCO System)
// ============================================

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get email dashboard stats
app.get('/api/email-automation/dashboard', authenticateToken, async (req, res) => {
  try {
    const stats = crmTracker.getDashboardStats();
    const alerts = crmTracker.getAlerts();
    res.json({ stats, alerts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pending email approvals
app.get('/api/email-automation/pending-approvals', authenticateToken, async (req, res) => {
  try {
    const pendingEmails = cocoAgent.getPendingApprovals();
    res.json({ pendingEmails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve email
app.post('/api/email-automation/approve', authenticateToken, async (req, res) => {
  try {
    const { approvalId, edits } = req.body;
    const approvedEmail = cocoAgent.approveEmail(approvalId, edits);
    
    // Track email sent
    const contact = cocoAgent.contacts.find(c => c.id === approvedEmail.contactId);
    if (contact) {
      crmTracker.trackEmailSent(approvedEmail, contact);
      await cocoAgent.updateContact(contact.id, 'contacted');
    }
    
    // Save data
    await crmTracker.saveData();
    await cocoAgent.saveContacts();
    
    res.json({ success: true, email: approvedEmail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject email
app.post('/api/email-automation/reject', authenticateToken, async (req, res) => {
  try {
    const { approvalId, reason } = req.body;
    const rejectedEmail = cocoAgent.rejectEmail(approvalId, reason);
    res.json({ success: true, email: rejectedEmail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contacts
app.get('/api/email-automation/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = cocoAgent.contacts;
    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new contact
app.post('/api/email-automation/contacts', authenticateToken, async (req, res) => {
  try {
    const newContact = {
      id: cocoAgent.contacts.length + 1,
      ...req.body,
      status: 'new',
      lastContact: null,
      nextFollowUp: null,
      conversationHistory: [],
      tags: req.body.tags || []
    };
    
    cocoAgent.contacts.push(newContact);
    await cocoAgent.saveContacts();
    
    // Add to CRM pipeline
    crmTracker.moveToStage(newContact, 'new');
    await crmTracker.saveData();
    
    res.status(201).json({ success: true, contact: newContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete contact
app.delete('/api/email-automation/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    cocoAgent.contacts = cocoAgent.contacts.filter(c => c.id !== contactId);
    await cocoAgent.saveContacts();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate email for contact
app.post('/api/email-automation/generate', authenticateToken, async (req, res) => {
  try {
    const { contactId, templateName } = req.body;
    const contact = cocoAgent.contacts.find(c => c.id === contactId);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    const email = await cocoAgent.generatePersonalizedEmail(contact, templateName);
    const queuePosition = cocoAgent.addToApprovalQueue(email);
    
    res.json({ success: true, email, queuePosition });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process incoming reply
app.post('/api/email-automation/reply', authenticateToken, async (req, res) => {
  try {
    const { contactId, emailBody, emailHeaders } = req.body;
    const contact = cocoAgent.contacts.find(c => c.id === contactId);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Check if out of office
    if (replyDetector.isOutOfOffice(emailBody, emailHeaders)) {
      return res.json({ 
        success: true, 
        message: 'Out of office detected, no action needed',
        outOfOffice: true 
      });
    }
    
    // Analyze intent
    const intent = await replyDetector.analyzeReplyIntent(emailBody, contact);
    
    // Track reply
    crmTracker.trackReplyReceived({ body: emailBody }, contact, intent);
    
    // Add to conversation history
    await cocoAgent.addToConversationHistory(contactId, 'contact', emailBody);
    
    // Generate draft response
    const draft = await draftGenerator.generateDraftReply(
      { id: Date.now(), body: emailBody },
      contact,
      intent
    );
    
    // Add draft to approval queue
    cocoAgent.addToApprovalQueue(draft);
    
    // Save data
    await crmTracker.saveData();
    await cocoAgent.saveContacts();
    
    res.json({ success: true, intent, draft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process follow-ups
app.post('/api/email-automation/process-followups', authenticateToken, async (req, res) => {
  try {
    const followUps = await cocoAgent.processFollowUps();
    await cocoAgent.saveContacts();
    res.json({ success: true, followUpsGenerated: followUps.length, followUps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`COCO Email Automation System initialized`);
  console.log(`Built on Azure OpenAI Service - RIDEWIRE LLC`);
});
