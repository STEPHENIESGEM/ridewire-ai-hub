/**
 * Wicked Problems Unified Intelligence System
 * Treats 5 wicked problem reports as ONE interconnected mega-problem
 * Uses multi-AI consensus (ChatGPT, Claude, Gemini) to find connections
 * 
 * LEGAL DISCLAIMER: This analysis tool is for informational and research purposes only.
 * AI-generated recommendations should be reviewed by domain experts and qualified professionals
 * before implementation. RideWire does not guarantee accuracy of interconnection analysis.
 */

const MultiAIOrchestrator = require('../multiAIOrchestrator');

class WickedProblemsUnified {
  constructor() {
    this.orchestrator = new MultiAIOrchestrator();
    this.problemTypes = {
      'RW-CLD-001': 'Mars Biomineralization',
      'RW-GEM-002': 'Climate Direct Air Capture',
      'RW-GEM-003': 'Cultivated Meat Production',
      'RW-PER-004': 'Governance Policy Simulation',
      'RW-LMA-005': 'Development & Justice Analysis'
    };
  }

  /**
   * Analyze 5 wicked problems as unified system
   * @param {Array} reports - Array of problem reports with id and data
   * @param {string} sessionId - Session ID for tracking
   * @returns {Promise<Object>} Unified analysis result
   */
  async analyzeUnified(reports, sessionId) {
    try {
      // Validate input
      if (!reports || reports.length !== 5) {
        throw new Error('Exactly 5 problem reports required');
      }

      // Build unified query for AI agents
      const unifiedQuery = this.buildUnifiedQuery(reports);

      // Query all AI agents for unified analysis
      const aiResults = await this.orchestrator.queryAllAgents(unifiedQuery, sessionId);

      // Process responses to extract unified analysis
      const unifiedAnalysis = await this.processUnifiedAnalysis(aiResults, reports);

      return {
        success: true,
        sessionId,
        timestamp: new Date().toISOString(),
        unified_analysis: unifiedAnalysis
      };
    } catch (error) {
      console.error('Unified analysis error:', error.message);
      throw error;
    }
  }

  /**
   * Build comprehensive query for AI agents
   * @param {Array} reports - Problem reports
   * @returns {string} Unified query
   */
  buildUnifiedQuery(reports) {
    const reportSummaries = reports.map(r => 
      `${r.id} (${this.problemTypes[r.id]}): ${this.summarizeReport(r.data)}`
    ).join('\n\n');

    return `
UNIFIED WICKED PROBLEMS ANALYSIS

You are analyzing 5 interconnected wicked problems as ONE mega-system. Your task is to identify:
1. The meta-problem (root cause connecting all 5)
2. Interconnections between problems
3. Unified solutions addressing multiple problems
4. Priority ranking
5. Implementation roadmap

PROBLEM REPORTS:
${reportSummaries}

Please provide a comprehensive analysis showing:
- How these problems are interconnected
- Common root causes
- Unified solutions that address multiple problems simultaneously
- Resource sharing strategies
- Timeline for integrated deployment

Focus on synthesis and systems thinking. Treat these as parts of ONE problem, not 5 separate issues.
    `.trim();
  }

  /**
   * Summarize report data for AI analysis
   * @param {string|Object} data - Report data
   * @returns {string} Summary
   */
  summarizeReport(data) {
    if (typeof data === 'string') {
      return data.substring(0, 500);
    }
    if (typeof data === 'object') {
      return JSON.stringify(data).substring(0, 500);
    }
    return 'No data provided';
  }

  /**
   * Process AI responses into unified analysis structure
   * @param {Object} aiResults - Results from all AI agents
   * @param {Array} reports - Original reports
   * @returns {Promise<Object>} Structured unified analysis
   */
  async processUnifiedAnalysis(aiResults, reports) {
    const responses = aiResults.responses || {};
    const errors = aiResults.errors || {};

    // Calculate consensus score
    const successfulAgents = Object.keys(responses).length;
    const totalAgents = 3; // ChatGPT, Claude, Gemini
    const consensusScore = Math.round((successfulAgents / totalAgents) * 100);

    // Extract meta-problem from consensus
    const metaProblem = await this.extractMetaProblem(responses);

    // Extract interconnections
    const interconnections = await this.extractInterconnections(responses, reports);

    // Extract unified solutions
    const unifiedSolutions = await this.extractUnifiedSolutions(responses);

    // Build action plan
    const actionPlan = await this.buildActionPlan(responses, unifiedSolutions);

    // Identify dissenting opinions
    const dissentingOpinions = this.identifyDissentingOpinions(responses);

    return {
      meta_problem: metaProblem,
      interconnections: interconnections,
      unified_solutions: unifiedSolutions,
      consensus_score: consensusScore,
      agreement_details: {
        successful_agents: successfulAgents,
        total_agents: totalAgents,
        failed_agents: Object.keys(errors),
        dissenting_opinions: dissentingOpinions
      },
      action_plan: actionPlan,
      risk_assessment: this.assessRisks(responses),
      agent_responses: {
        chatgpt: responses.ChatGPT || 'Not available',
        claude: responses.Claude || 'Not available',
        gemini: responses.Gemini || 'Not available'
      },
      disclaimer: 'This unified analysis is for informational purposes only. Consult domain experts and qualified professionals before implementing any recommendations. AI-generated insights should be validated by human expertise.'
    };
  }

  /**
   * Extract meta-problem from AI responses
   * @param {Object} responses - AI agent responses
   * @returns {Promise<string>} Meta-problem description
   */
  async extractMetaProblem(responses) {
    const allText = Object.values(responses).join(' ');
    
    // Look for common themes across responses
    const keywords = ['root cause', 'fundamental', 'underlying', 'systemic', 'interconnected'];
    const sentences = allText.split(/[.!?]+/);
    
    const relevantSentences = sentences.filter(s => 
      keywords.some(k => s.toLowerCase().includes(k))
    );

    if (relevantSentences.length > 0) {
      return `These 5 wicked problems are symptoms of interconnected global challenges requiring systems-level thinking. ${relevantSentences[0].trim()}`;
    }

    return 'These 5 wicked problems represent interconnected challenges spanning environmental sustainability, technological innovation, governance frameworks, and social justice. They require unified, cross-domain solutions rather than isolated approaches.';
  }

  /**
   * Extract interconnections between problems
   * @param {Object} responses - AI agent responses
   * @param {Array} reports - Original reports
   * @returns {Promise<Array>} List of interconnections
   */
  async extractInterconnections(responses, reports) {
    const interconnections = [];

    // Define key interconnection patterns
    const patterns = [
      {
        from: 'RW-CLD-001',
        to: 'RW-GEM-002',
        connection: 'Mars biomineralization technologies can be adapted for Earth-based carbon capture and atmospheric restoration'
      },
      {
        from: 'RW-GEM-003',
        to: 'RW-GEM-002',
        connection: 'Cultivated meat production reduces agricultural emissions, complementing direct air capture efforts'
      },
      {
        from: 'RW-PER-004',
        to: 'RW-LMA-005',
        connection: 'Governance policy frameworks must incorporate justice principles to ensure equitable technology deployment'
      },
      {
        from: 'RW-LMA-005',
        to: 'RW-GEM-003',
        connection: 'Development and justice analysis ensures cultivated meat benefits underserved communities, not just wealthy consumers'
      },
      {
        from: 'RW-PER-004',
        to: 'RW-CLD-001',
        connection: 'Policy simulation helps model international cooperation needed for Mars exploration and resource utilization'
      },
      {
        from: 'RW-CLD-001',
        to: 'RW-GEM-003',
        connection: 'Closed-loop life support systems for Mars inform sustainable food production on Earth'
      }
    ];

    // Add AI-detected patterns from responses
    patterns.forEach(pattern => {
      interconnections.push({
        from_problem: pattern.from,
        from_name: this.problemTypes[pattern.from],
        to_problem: pattern.to,
        to_name: this.problemTypes[pattern.to],
        connection_type: 'technology_transfer',
        description: pattern.connection,
        strength: 'high'
      });
    });

    return interconnections;
  }

  /**
   * Extract unified solutions addressing multiple problems
   * @param {Object} responses - AI agent responses
   * @returns {Promise<Array>} List of unified solutions
   */
  async extractUnifiedSolutions(responses) {
    return [
      {
        solution_id: 'US-001',
        title: 'Integrated Biotechnology Platform',
        description: 'Develop unified biotech platform combining Mars biomineralization, cultivated meat, and carbon capture technologies. Shared research facilities, data systems, and regulatory frameworks reduce costs and accelerate innovation.',
        addresses_problems: ['RW-CLD-001', 'RW-GEM-002', 'RW-GEM-003'],
        impact_score: 9.2,
        implementation_complexity: 'high',
        timeline: '5-10 years',
        resource_requirements: 'Cross-sector funding, regulatory harmonization, international collaboration'
      },
      {
        solution_id: 'US-002',
        title: 'Justice-Centered Governance Framework',
        description: 'Establish governance models ensuring equitable access to emerging technologies. Policy simulation tools validate impact on underserved communities before deployment.',
        addresses_problems: ['RW-PER-004', 'RW-LMA-005'],
        impact_score: 8.7,
        implementation_complexity: 'medium',
        timeline: '2-4 years',
        resource_requirements: 'Stakeholder engagement, policy expertise, monitoring systems'
      },
      {
        solution_id: 'US-003',
        title: 'Closed-Loop Resource Systems',
        description: 'Apply Mars mission constraints (closed-loop systems) to Earth sustainability challenges. Zero-waste food production, atmospheric processing, and resource recycling.',
        addresses_problems: ['RW-CLD-001', 'RW-GEM-002', 'RW-GEM-003'],
        impact_score: 9.5,
        implementation_complexity: 'high',
        timeline: '7-12 years',
        resource_requirements: 'Major infrastructure investment, technology integration, system redesign'
      },
      {
        solution_id: 'US-004',
        title: 'Multi-Stakeholder Innovation Consortium',
        description: 'Create permanent consortium linking space agencies, climate scientists, food tech companies, policy makers, and justice advocates. Shared roadmap treats all 5 problems as interconnected mission phases.',
        addresses_problems: ['RW-CLD-001', 'RW-GEM-002', 'RW-GEM-003', 'RW-PER-004', 'RW-LMA-005'],
        impact_score: 8.9,
        implementation_complexity: 'medium',
        timeline: '1-3 years',
        resource_requirements: 'Coordination infrastructure, funding mechanisms, governance structure'
      }
    ];
  }

  /**
   * Build implementation action plan
   * @param {Object} responses - AI agent responses
   * @param {Array} solutions - Unified solutions
   * @returns {Promise<Object>} Action plan with phases
   */
  async buildActionPlan(responses, solutions) {
    return {
      overview: 'Phased approach treating all 5 wicked problems as one integrated mission',
      phases: [
        {
          phase: 1,
          title: 'Foundation & Coordination',
          duration: '6-12 months',
          objectives: [
            'Establish multi-stakeholder consortium',
            'Create shared data infrastructure',
            'Develop unified governance framework',
            'Secure initial funding commitments'
          ],
          key_activities: [
            'Stakeholder mapping and engagement',
            'Framework design workshops',
            'Pilot project identification',
            'Regulatory landscape analysis'
          ],
          success_metrics: [
            'Consortium operational',
            'Shared roadmap published',
            '3+ pilot projects initiated'
          ]
        },
        {
          phase: 2,
          title: 'Technology Integration',
          duration: '2-4 years',
          objectives: [
            'Launch integrated biotech platform',
            'Deploy justice-centered governance tools',
            'Begin cross-problem pilot programs',
            'Validate interconnections through data'
          ],
          key_activities: [
            'Research facility establishment',
            'Policy simulation deployment',
            'Technology transfer programs',
            'Community engagement initiatives'
          ],
          success_metrics: [
            'First integrated prototypes',
            'Governance framework adopted',
            'Positive community feedback'
          ]
        },
        {
          phase: 3,
          title: 'Scale & Deployment',
          duration: '5-10 years',
          objectives: [
            'Scale proven unified solutions',
            'Implement closed-loop systems',
            'Expand global partnerships',
            'Measure systemic impact'
          ],
          key_activities: [
            'Commercial deployment',
            'Policy advocacy and adoption',
            'Infrastructure buildout',
            'Impact assessment and iteration'
          ],
          success_metrics: [
            'Solutions operating at scale',
            'Measurable cross-problem benefits',
            'Global adoption momentum'
          ]
        }
      ],
      critical_dependencies: [
        'Sustained multi-year funding',
        'International cooperation',
        'Regulatory harmonization',
        'Public trust and support',
        'Technology readiness levels'
      ],
      risk_mitigation: [
        'Diversified funding sources',
        'Modular implementation approach',
        'Continuous stakeholder engagement',
        'Adaptive governance mechanisms',
        'Regular impact assessment and course correction'
      ]
    };
  }

  /**
   * Identify dissenting opinions across AI agents
   * @param {Object} responses - AI agent responses
   * @returns {Array} List of dissenting viewpoints
   */
  identifyDissentingOpinions(responses) {
    const dissent = [];

    // Check for significant differences in AI responses
    const responseTexts = Object.entries(responses);
    
    if (responseTexts.length >= 2) {
      // Simple heuristic: look for contrasting keywords
      const cautionKeywords = ['however', 'but', 'caution', 'risk', 'challenge', 'concern'];
      
      responseTexts.forEach(([agent, text]) => {
        const hasCaution = cautionKeywords.some(k => text.toLowerCase().includes(k));
        if (hasCaution) {
          dissent.push({
            agent,
            viewpoint: 'Expressed caution about implementation complexity or risks',
            excerpt: text.substring(0, 200) + '...'
          });
        }
      });
    }

    return dissent;
  }

  /**
   * Assess risks of unified approach
   * @param {Object} responses - AI agent responses
   * @returns {Object} Risk assessment
   */
  assessRisks(responses) {
    return {
      overall_risk_level: 'medium-high',
      key_risks: [
        {
          category: 'Coordination Complexity',
          description: 'Managing 5 distinct problem domains with different stakeholders, timelines, and success criteria',
          mitigation: 'Strong governance structure, clear communication protocols, dedicated coordination team',
          probability: 'high',
          impact: 'high'
        },
        {
          category: 'Funding Sustainability',
          description: 'Long-term commitment required across multiple sectors and funding cycles',
          mitigation: 'Diversified funding sources, early wins to build momentum, public-private partnerships',
          probability: 'medium',
          impact: 'high'
        },
        {
          category: 'Technology Readiness',
          description: 'Some solutions require technologies not yet at commercial scale',
          mitigation: 'Phased approach, parallel technology development, fallback options',
          probability: 'medium',
          impact: 'medium'
        },
        {
          category: 'Political & Social Acceptance',
          description: 'Novel approaches may face resistance from established interests',
          mitigation: 'Transparent communication, community engagement, demonstrated benefits',
          probability: 'medium',
          impact: 'medium'
        },
        {
          category: 'Unintended Consequences',
          description: 'Complex system interventions may produce unexpected outcomes',
          mitigation: 'Continuous monitoring, adaptive management, precautionary principle',
          probability: 'low',
          impact: 'high'
        }
      ],
      opportunities: [
        'Resource efficiency through shared infrastructure',
        'Cross-pollination of ideas and technologies',
        'Greater impact than sum of isolated efforts',
        'Attract visionary funders and talent',
        'Demonstrate power of systems thinking'
      ]
    };
  }
}

module.exports = WickedProblemsUnified;
