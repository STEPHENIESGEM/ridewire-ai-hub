require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const MultiAIOrchestrator = require('./multiAIOrchestrator');
const SafetyGating = require('./safetyGating');
const GameEngine = require('./gameEngine');
const EcommerceAutomation = require('./ecommerceAutomation');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize modules
const multiAI = new MultiAIOrchestrator();
const safetyGating = new SafetyGating();
const gameEngine = new GameEngine(pool);
const ecommerce = new EcommerceAutomation(pool);

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
// DIAGNOSTIC ENDPOINTS (Multi-AI + Safety Gating)
// ============================================

// Submit diagnostic query with automated AI consensus
app.post('/api/diagnostic/query', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { query, vehicle, symptoms } = req.body;
    
    // Query all AI agents in parallel
    const sessionId = `DIAG-${Date.now()}`;
    const aiResponses = await multiAI.queryAllAgents(query, sessionId);
    
    // Calculate consensus
    const agents = Object.entries(aiResponses.responses).map(([name, response]) => ({
      name,
      response,
      confidence: response.confidence || 0.8,
      diagnosis: response.substring(0, 200)
    }));
    
    const consensus = safetyGating.calculateConsensus(agents);
    
    // Extract P-code from query
    const pCodeMatch = query.match(/P[0-3][0-9A-F]{3}/i);
    const pCode = pCodeMatch ? pCodeMatch[0].toUpperCase() : null;
    
    // Apply safety gating
    const decision = safetyGating.evaluateConsensus(consensus, pCode);
    
    // Store diagnostic event
    await pool.query(
      `INSERT INTO diagnostic_events 
       (event_id, user_id, timestamp, query, vehicle, agents, consensus, decision, xp_earned)
       VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, $8)`,
      [
        sessionId,
        decoded.id,
        JSON.stringify({ text: query, p_code: pCode, symptoms }),
        JSON.stringify(vehicle),
        JSON.stringify(agents),
        JSON.stringify(consensus),
        JSON.stringify(decision),
        10
      ]
    );
    
    // Award XP and check achievements
    const xpResult = await gameEngine.addXP(decoded.id, 10);
    const achievements = await gameEngine.checkAchievements(decoded.id, {
      diagnostic_completed: true,
      consensus_score: consensus.score
    });
    
    // Update statistics
    const gameState = await gameEngine.getGameState(decoded.id);
    await gameEngine.updateStatistics(decoded.id, {
      diagnostics_run: gameState.statistics.diagnostics_run + 1,
      consensus_score_avg: (gameState.statistics.consensus_score_avg * gameState.statistics.diagnostics_run + consensus.score) / (gameState.statistics.diagnostics_run + 1)
    });
    
    // Auto-generate and list diagram if approved
    let diagramListing = null;
    if (decision.status === 'approved' && process.env.AUTO_LIST_DIAGRAMS === 'true') {
      try {
        diagramListing = await ecommerce.autoListDiagram(decoded.id, sessionId, {
          query: { text: query, p_code: pCode },
          vehicle,
          consensus
        });
      } catch (err) {
        console.error('Auto-list diagram error:', err);
      }
    }
    
    res.json({
      diagnostic_id: sessionId,
      consensus: {
        score: consensus.score,
        averageConfidence: consensus.averageConfidence,
        diagnosis: agents[0]?.diagnosis || 'Analysis complete',
        agents: agents.map(a => ({ name: a.name, confidence: a.confidence }))
      },
      decision: decision,
      xp_earned: 10,
      level_up: xpResult.leveledUp,
      new_level: xpResult.newLevel,
      achievements_unlocked: achievements,
      diagram_listing: diagramListing,
      disclaimer: safetyGating.getLiabilityDisclaimer()
    });
    
  } catch (err) {
    console.error('Diagnostic query error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get diagnostic history
app.get('/api/diagnostic/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const result = await pool.query(
      `SELECT event_id, timestamp, query, vehicle, consensus, decision
       FROM diagnostic_events
       WHERE user_id = $1
       ORDER BY timestamp DESC
       LIMIT $2 OFFSET $3`,
      [decoded.id, limit, offset]
    );
    
    res.json({
      diagnostics: result.rows,
      page: parseInt(page),
      limit: parseInt(limit),
      total: result.rowCount
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GAME ENGINE ENDPOINTS
// ============================================

// Get user game state
app.get('/api/game/state', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const gameState = await gameEngine.getGameState(decoded.id);
    
    res.json(gameState);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get leaderboard
app.get('/api/game/leaderboard', async (req, res) => {
  try {
    const { category = 'global', limit = 100 } = req.query;
    const leaderboard = await gameEngine.getLeaderboard(category, parseInt(limit));
    
    res.json({
      category,
      leaderboard,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// ECOMMERCE AUTOMATION ENDPOINTS
// ============================================

// Get marketplace listings
app.get('/api/marketplace/listings', async (req, res) => {
  try {
    const { search, tags, min_price, max_price, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM marketplace_listings WHERE status = $1';
    const params = ['active'];
    let paramCount = 1;
    
    if (search) {
      paramCount++;
      query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (min_price) {
      paramCount++;
      query += ` AND price >= $${paramCount}`;
      params.push(parseFloat(min_price));
    }
    
    if (max_price) {
      paramCount++;
      query += ` AND price <= $${paramCount}`;
      params.push(parseFloat(max_price));
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    res.json({
      listings: result.rows,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Purchase product (automated payment processing)
app.post('/api/marketplace/purchase', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { product_id, payment_method } = req.body;
    
    // Process automated purchase
    const result = await ecommerce.processPurchase(product_id, decoded.id, payment_method);
    
    // Award XP to buyer
    await gameEngine.addXP(decoded.id, 5);
    
    res.json(result);
  } catch (err) {
    console.error('Purchase error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get seller revenue dashboard
app.get('/api/revenue/dashboard', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const dashboard = await ecommerce.getSellerDashboard(decoded.id);
    
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manually trigger diagram listing (for testing)
app.post('/api/marketplace/list', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { diagnostic_id } = req.body;
    
    // Get diagnostic data
    const diagResult = await pool.query(
      'SELECT * FROM diagnostic_events WHERE event_id = $1 AND user_id = $2',
      [diagnostic_id, decoded.id]
    );
    
    if (diagResult.rows.length === 0) {
      return res.status(404).json({ error: 'Diagnostic not found' });
    }
    
    const diagnostic = diagResult.rows[0];
    const listing = await ecommerce.autoListDiagram(decoded.id, diagnostic_id, {
      query: diagnostic.query,
      vehicle: diagnostic.vehicle,
      consensus: diagnostic.consensus
    });
    
    // Award XP for listing
    await gameEngine.addXP(decoded.id, 25);
    
    // Update statistics
    const gameState = await gameEngine.getGameState(decoded.id);
    await gameEngine.updateStatistics(decoded.id, {
      diagrams_generated: gameState.statistics.diagrams_generated + 1
    });
    
    res.json(listing);
  } catch (err) {
    console.error('Listing error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin endpoint: Process weekly payouts
app.post('/api/admin/process-payouts', async (req, res) => {
  try {
    // TODO: Add admin authentication
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const results = await ecommerce.processWeeklyPayouts();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 RideWire AI Hub server running on port ${port}`);
  console.log(`✅ Multi-AI Orchestrator: Enabled`);
  console.log(`✅ Safety Gating: Enabled`);
  console.log(`✅ Game Engine: Enabled`);
  console.log(`✅ E-Commerce Automation: Enabled`);
});
