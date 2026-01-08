# Wicked Problems Unified Intelligence System

## Overview

The Wicked Problems Unified Intelligence System is an advanced AI-powered analysis tool that treats 5 complex, interconnected problem reports as ONE mega-system. Using multi-AI consensus from ChatGPT, Claude, and Gemini, it identifies root causes, interconnections, and unified solutions.

## The 5 Wicked Problems

1. **RW-CLD-001**: Mars Biomineralization
2. **RW-GEM-002**: Climate Direct Air Capture
3. **RW-GEM-003**: Cultivated Meat Production
4. **RW-PER-004**: Governance Policy Simulation
5. **RW-LMA-005**: Development & Justice Analysis

## Architecture

### Backend Components

#### `backend/wicked-problems-unified.js`
Main orchestration module that:
- Validates 5 problem reports
- Constructs unified analysis query for AI agents
- Coordinates multi-AI consensus via MultiAIOrchestrator
- Extracts meta-problem, interconnections, solutions, and action plan
- Generates risk assessment and consensus scoring

**Key Methods:**
- `analyzeUnified(reports, sessionId)` - Main analysis entry point
- `buildUnifiedQuery(reports)` - Creates AI query treating all problems as one system
- `processUnifiedAnalysis(aiResults, reports)` - Structures AI responses
- `extractMetaProblem(responses)` - Identifies root cause
- `extractInterconnections(responses, reports)` - Maps problem connections
- `extractUnifiedSolutions(responses)` - Generates cross-problem solutions
- `buildActionPlan(responses, solutions)` - Creates phased implementation roadmap
- `assessRisks(responses)` - Analyzes implementation risks

### API Endpoint

**POST `/api/wicked-problems/unified-analysis`**

**Authentication:** Required (JWT Bearer token)

**Request Body:**
```json
{
  "reports": [
    { "id": "RW-CLD-001", "data": "Mars biomineralization report..." },
    { "id": "RW-GEM-002", "data": "Climate direct air capture report..." },
    { "id": "RW-GEM-003", "data": "Cultivated meat production report..." },
    { "id": "RW-PER-004", "data": "Governance policy simulation report..." },
    { "id": "RW-LMA-005", "data": "Development & justice analysis report..." }
  ]
}
```

**Response Structure:**
```json
{
  "success": true,
  "sessionId": "wicked-1234567890-user123",
  "timestamp": "2026-01-08T21:57:44.430Z",
  "unified_analysis": {
    "meta_problem": "Root cause description connecting all 5 problems",
    "interconnections": [
      {
        "from_problem": "RW-CLD-001",
        "from_name": "Mars Biomineralization",
        "to_problem": "RW-GEM-002",
        "to_name": "Climate Direct Air Capture",
        "connection_type": "technology_transfer",
        "description": "How Mars tech helps climate tech",
        "strength": "high"
      }
    ],
    "unified_solutions": [
      {
        "solution_id": "US-001",
        "title": "Integrated Biotechnology Platform",
        "description": "Solution addressing multiple problems",
        "addresses_problems": ["RW-CLD-001", "RW-GEM-002", "RW-GEM-003"],
        "impact_score": 9.2,
        "implementation_complexity": "high",
        "timeline": "5-10 years",
        "resource_requirements": "Cross-sector funding, regulatory harmonization"
      }
    ],
    "consensus_score": 87,
    "agreement_details": {
      "successful_agents": 3,
      "total_agents": 3,
      "failed_agents": [],
      "dissenting_opinions": []
    },
    "action_plan": {
      "overview": "Phased approach treating all 5 problems as integrated mission",
      "phases": [
        {
          "phase": 1,
          "title": "Foundation & Coordination",
          "duration": "6-12 months",
          "objectives": ["Establish consortium", "Create infrastructure"],
          "key_activities": ["Stakeholder mapping", "Framework design"],
          "success_metrics": ["Consortium operational", "Roadmap published"]
        }
      ],
      "critical_dependencies": ["Funding", "International cooperation"],
      "risk_mitigation": ["Diversified funding", "Modular implementation"]
    },
    "risk_assessment": {
      "overall_risk_level": "medium-high",
      "key_risks": [
        {
          "category": "Coordination Complexity",
          "description": "Managing 5 distinct domains",
          "mitigation": "Strong governance structure",
          "probability": "high",
          "impact": "high"
        }
      ],
      "opportunities": ["Resource efficiency", "Cross-pollination"]
    },
    "agent_responses": {
      "chatgpt": "Full ChatGPT response",
      "claude": "Full Claude response",
      "gemini": "Full Gemini response"
    },
    "disclaimer": "Legal disclaimer about AI-generated analysis"
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing or invalid reports
{
  "error": "Exactly 5 problem reports required",
  "expected_format": { "reports": [...] }
}

// 401 Unauthorized - Missing or invalid token
{
  "error": "Authentication required"
}

// 500 Internal Server Error - Analysis failure
{
  "error": "Analysis failed",
  "message": "Detailed error message",
  "disclaimer": "This is an AI-powered analysis tool..."
}
```

### Frontend Component

#### `frontend/components/WickedProblemsUnified.jsx`

Interactive dashboard featuring:
- **Upload Section**: Text areas for all 5 problem reports
- **Visual Progress**: Shows which reports are uploaded (5/5 required)
- **Analysis Button**: Triggers unified analysis when all reports ready
- **Results Dashboard**:
  - Meta-Problem statement with consensus score
  - Interconnections map showing how problems link
  - Unified solutions addressing multiple problems
  - Implementation action plan with phases
  - Risk assessment with mitigation strategies
  - Legal disclaimer

**Route:** `/wicked-problems` (protected, requires authentication)

**Key Features:**
- Real-time upload status for each report
- Loading states during AI analysis
- Color-coded sections for different analysis components
- Responsive grid layouts
- Error handling with user-friendly messages
- Legal disclaimers prominently displayed

## Integration with RideWire AI Hub

### Dashboard Integration

The Dashboard component (`frontend/components/Dashboard.jsx`) includes:
- New quick action button: "🌐 Wicked Problems AI"
- Styled with gradient background (cyan to green)
- Added to getting started instructions

### Routing

App.jsx includes protected route:
```jsx
<Route 
  path="/wicked-problems" 
  element={isAuthenticated ? <WickedProblemsUnified /> : <Navigate to="/login" />} 
/>
```

## Multi-AI Consensus Mechanism

The system uses the existing `MultiAIOrchestrator` class to:
1. Query all 3 AI agents (ChatGPT, Claude, Gemini) simultaneously
2. Collect responses with error handling for partial failures
3. Calculate consensus score based on successful agent responses
4. Extract common themes and dissenting opinions
5. Generate unified analysis from synthesized responses

**Consensus Score Formula:**
```javascript
consensus_score = (successful_agents / total_agents) * 100
```

## Systems Thinking Approach

The module treats wicked problems as interconnected rather than isolated:

### Interconnection Types
- **Technology Transfer**: Mars tech → Earth applications
- **Policy Integration**: Governance frameworks spanning domains
- **Justice Principles**: Equity considerations across all solutions
- **Resource Sharing**: Unified infrastructure and data systems

### Unified Solutions
Instead of 5 separate solutions, generates 3-5 solutions that:
- Address multiple problems simultaneously
- Share resources and infrastructure
- Have synergistic benefits
- Reduce overall complexity and cost

## Security & Compliance

### Authentication
- All endpoints require valid JWT token
- Session IDs track analyses for audit purposes
- User ID embedded in session identifiers

### Legal Disclaimers
Displayed in multiple locations:
- Module-level JSDoc comments
- API response disclaimer field
- Frontend component header comment
- Results page footer (prominent red box)

**Disclaimer Text:**
> "This unified analysis is for informational purposes only. Consult domain experts and qualified professionals before implementing any recommendations. AI-generated insights should be validated by human expertise."

### Data Privacy
- No user data logged to console (except error messages)
- Session IDs are ephemeral and non-reversible
- Analysis results not automatically persisted to database
- Users control when/if to save results

## Usage Example

### 1. Login to RideWire AI Hub
```bash
POST /login
{ "email": "user@example.com", "password": "secure123" }
```

### 2. Navigate to Wicked Problems Dashboard
Access at: `http://localhost:3000/wicked-problems` (when authenticated)

### 3. Upload All 5 Reports
Enter data for each wicked problem:
- RW-CLD-001: Mars biomineralization findings
- RW-GEM-002: Climate capture analysis
- RW-GEM-003: Cultivated meat research
- RW-PER-004: Policy simulation results
- RW-LMA-005: Justice framework assessment

### 4. Click "Analyze as Unified Problem"
System will:
- Validate all reports present
- Send to multi-AI orchestrator
- Wait for consensus (typically 10-30 seconds)
- Display comprehensive unified analysis

### 5. Review Results
Explore 5 sections:
1. Meta-problem statement
2. Interconnections map
3. Unified solutions
4. Action plan
5. Risk assessment

## Dependencies

### Backend
- `express` - Web server
- `jsonwebtoken` - Authentication
- `axios` - HTTP client for AI APIs
- `dotenv` - Environment variables
- `multiAIOrchestrator.js` - Multi-AI coordination

### Frontend
- `react` - UI framework
- `react-router-dom` - Routing
- `apiClient` - API communication utility

### AI Services
- OpenAI API (ChatGPT)
- Anthropic API (Claude)
- Google AI API (Gemini)

**Required Environment Variables:**
```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
JWT_SECRET=...
DATABASE_URL=postgres://...
```

## Performance Considerations

### Multi-AI Timeouts
- Each AI agent has 30-second timeout (recommended)
- Partial failures allowed (consensus with 2/3 agents)
- Errors logged but don't break entire analysis

### Response Caching
Consider implementing caching for:
- Frequently analyzed report combinations
- Common interconnection patterns
- Standard risk assessments

### Scalability
- Stateless design allows horizontal scaling
- Each analysis is independent
- Consider rate limiting per user

## Future Enhancements

1. **Visual Network Graph**: Interactive D3.js visualization of interconnections
2. **Report Templates**: Pre-filled examples for each wicked problem
3. **Export Options**: PDF/CSV export of unified analysis
4. **Collaboration**: Multi-user sessions for team analysis
5. **Historical Tracking**: Save and compare analyses over time
6. **Custom Problems**: Allow users to define their own wicked problem sets
7. **Fine-tuned AI Prompts**: Domain-specific prompt engineering for each problem type

## Testing

### Unit Tests
```bash
node test-wicked-problems.js
```

Tests module instantiation, query building, and risk assessment.

### Integration Tests
Requires running server and valid API keys:
```bash
node docs/wicked-problems-api-test.js
```

### Manual Testing Checklist
- [ ] Can access /wicked-problems route when authenticated
- [ ] Upload indicators show progress (x/5)
- [ ] Button disabled until all 5 reports uploaded
- [ ] Loading state displays during analysis
- [ ] Results show all 5 sections
- [ ] Consensus score displays correctly
- [ ] Interconnections render with proper styling
- [ ] Legal disclaimer is prominent
- [ ] Can navigate back to dashboard
- [ ] Error messages are user-friendly

## Troubleshooting

### "Exactly 5 problem reports required"
- Ensure all 5 reports have data entered
- Check report IDs match expected values
- Verify JSON structure in API request

### "Authentication required"
- Token missing or expired
- Re-login to get fresh token
- Check Authorization header format: `Bearer <token>`

### "Analysis failed"
- Check AI API keys are valid
- Verify internet connectivity
- Review server logs for detailed error
- Confirm API rate limits not exceeded

### Empty or partial results
- One or more AI services may have failed
- Check consensus_score (should be 67-100%)
- Review agent_responses for error details
- Confirm .env file has all API keys

## Support

For issues or questions:
1. Review this documentation
2. Check server logs for errors
3. Verify environment variables
4. Test individual AI agents
5. Contact RideWire AI Hub support

---

**Version:** 1.0.0  
**Last Updated:** January 8, 2026  
**Maintainer:** RideWire AI Hub Development Team
