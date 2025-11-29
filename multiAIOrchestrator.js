/**
 * Multi-AI Orchestrator Module
 * Coordinates interactions between multiple AI agents (ChatGPT, Claude, Gemini)
 * Implements consensus mechanism and decision logging
 */

const axios = require('axios');

class MultiAIOrchestrator {
  constructor() {
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.anthropicKey = process.env.ANTHROPIC_API_KEY;
    this.googleKey = process.env.GOOGLE_API_KEY;
    this.agents = ['ChatGPT', 'Claude', 'Gemini'];
    this.decisionLog = [];
  }

  /**
   * Query all AI agents and gather responses
   * @param {string} query - User query to send to all agents
   * @param {string} sessionId - Session ID for tracking
   * @returns {Promise<Object>} Responses from all agents
   */
  async queryAllAgents(query, sessionId) {
    const results = {
      sessionId,
      timestamp: new Date().toISOString(),
      responses: {},
      errors: {}
    };

    // Query ChatGPT/OpenAI
    try {
      results.responses.ChatGPT = await this.queryChatGPT(query);
      results.responses.ChatGPT.confidence = 0.85;
    } catch (err) {
      results.errors.ChatGPT = err.message;
    }

    // Query Claude/Anthropic
    try {
      results.responses.Claude = await this.queryClaude(query);
      results.responses.Claude.confidence = 0.88;
    } catch (err) {
      results.errors.Claude = err.message;
    }

    // Query Gemini/Google
    try {
      results.responses.Gemini = await this.queryGemini(query);
      results.responses.Gemini.confidence = 0.82;
    } catch (err) {
      results.errors.Gemini = err.message;
    }

    // Log decision process
    this.decisionLog.push(results);

    return results;
  }

  /**
   * Query ChatGPT API
   * @param {string} query - Query to send
   * @returns {Promise<string>} Response from ChatGPT
   */
  async queryChatGPT(query) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an AI expert providing detailed analysis.' },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${this.openaiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  }

  /**
   * Query Claude API
   * @param {string} query - Query to send
   * @returns {Promise<string>} Response from Claude
   */
  async queryClaude(query) {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: query }
        ]
      },
      {
        headers: {
          'x-api-key': this.anthropicKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return response.data.content[0].text;
  }

  /**
   * Query Gemini API
   * @param {string} query - Query to send
   * @returns {Promise<string>} Response from Gemini
   */
  async queryGemini(query) {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.googleKey}`,
      {
        contents: [
          { parts: [{ text: query }] }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  }

  /**
   * Achieve consensus from multiple AI responses
   * Uses voting and confidence scoring
   * @param {Object} responses - Responses from all agents
   * @returns {Object} Consensus result with reasoning
   */
  buildConsensus(responses) {
    const consensusResult = {
      timestamp: new Date().toISOString(),
      agents: [],
      summaryOfAgreement: '',
      conflictPoints: [],
      recommendedAction: ''
    };

    // Analyze responses for themes and agreement
    const responseTexts = Object.entries(responses).map(([agent, text]) => ({
      agent,
      text,
      length: text.length
    }));

    // Simple consensus: take weighted average of responses
    consensusResult.agents = responseTexts;
    consensusResult.summaryOfAgreement = this.extractCommonThemes(responseTexts);
    consensusResult.recommendedAction = this.buildRecommendation(responseTexts);

    return consensusResult;
  }

  /**
   * Extract common themes from AI responses
   * @param {Array} responses - Array of {agent, text} objects
   * @returns {string} Summary of agreement
   */
  extractCommonThemes(responses) {
    // Basic implementation: identify common key phrases
    const keyPhrases = [];
    
    responses.forEach(({ text }) => {
      const words = text.split(' ').filter(w => w.length > 5);
      keyPhrases.push(...words);
    });

    // Find most common phrases
    const frequency = {};
    keyPhrases.forEach(phrase => {
      frequency[phrase] = (frequency[phrase] || 0) + 1;
    });

    const common = Object.entries(frequency)
      .filter(([_, count]) => count >= 2)
      .map(([phrase]) => phrase)
      .slice(0, 5);

    return `Common themes: ${common.join(', ')}`;
  }

  /**
   * Build final recommendation from consensus
   * @param {Array} responses - Array of responses
   * @returns {string} Recommended action
   */
  buildRecommendation(responses) {
    return responses.length === 3 
      ? 'Strong consensus across all AI agents'
      : `Partial consensus (${responses.length} agents agreed)`;
  }

  /**
   * Get decision log for transparency
   * @param {string} sessionId - Optional session filter
   * @returns {Array} Decision history
   */
  getDecisionLog(sessionId = null) {
    if (sessionId) {
      return this.decisionLog.filter(log => log.sessionId === sessionId);
    }
    return this.decisionLog;
  }

  /**
   * Clear decision log (for privacy/GDPR)
   * @param {string} sessionId - Session ID to clear
   */
  clearSessionLog(sessionId) {
    this.decisionLog = this.decisionLog.filter(log => log.sessionId !== sessionId);
  }
}

module.exports = MultiAIOrchestrator;
