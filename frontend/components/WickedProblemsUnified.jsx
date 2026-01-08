import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

/**
 * Wicked Problems Unified Intelligence Dashboard
 * Analyzes 5 wicked problems as ONE interconnected system
 * 
 * LEGAL DISCLAIMER: This tool provides AI-powered analysis for informational purposes only.
 * All recommendations must be validated by qualified domain experts before implementation.
 */
export default function WickedProblemsUnified() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([
    { id: 'RW-CLD-001', name: 'Mars Biomineralization', data: '', uploaded: false },
    { id: 'RW-GEM-002', name: 'Climate Direct Air Capture', data: '', uploaded: false },
    { id: 'RW-GEM-003', name: 'Cultivated Meat Production', data: '', uploaded: false },
    { id: 'RW-PER-004', name: 'Governance Policy Simulation', data: '', uploaded: false },
    { id: 'RW-LMA-005', name: 'Development & Justice Analysis', data: '', uploaded: false }
  ]);
  
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('upload');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleReportInput = (id, value) => {
    setReports(reports.map(r => 
      r.id === id ? { ...r, data: value, uploaded: !!value } : r
    ));
  };

  const allReportsUploaded = reports.every(r => r.uploaded);

  const handleAnalyze = async () => {
    if (!allReportsUploaded) {
      setError('Please provide data for all 5 wicked problems');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/api/wicked-problems/unified-analysis', {
        reports: reports.map(r => ({ id: r.id, data: r.data }))
      });

      setAnalysis(response.data.unified_analysis);
      setActiveSection('results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.message || 'Failed to analyze wicked problems');
    } finally {
      setLoading(false);
    }
  };

  const renderUploadSection = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '30px' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#00d9ff' }}>
        📊 Upload 5 Wicked Problem Reports
      </h2>
      <p style={{ color: '#cccccc', marginBottom: '30px', lineHeight: '1.6' }}>
        Provide data for all 5 wicked problems. The AI will analyze them as ONE interconnected system,
        identifying root causes, connections, and unified solutions.
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {reports.map((report) => (
          <div 
            key={report.id}
            style={{
              background: report.uploaded ? 'rgba(0, 217, 255, 0.1)' : 'rgba(255,255,255,0.03)',
              border: report.uploaded ? '2px solid #00d9ff' : '2px solid #444',
              borderRadius: '8px',
              padding: '20px',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '16px', color: '#00d9ff' }}>{report.id}</strong>
                <p style={{ color: '#999', fontSize: '14px', marginTop: '5px' }}>{report.name}</p>
              </div>
              {report.uploaded && <span style={{ color: '#00ff88' }}>✓ Ready</span>}
            </div>
            <textarea
              value={report.data}
              onChange={(e) => handleReportInput(report.id, e.target.value)}
              placeholder={`Enter diagnostic data, research findings, or report summary for ${report.name}...`}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid #555',
                borderRadius: '5px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
            />
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(255, 68, 68, 0.1)',
          border: '2px solid #ff4444',
          borderRadius: '8px',
          color: '#ff4444'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handleAnalyze}
          disabled={!allReportsUploaded || loading}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            background: allReportsUploaded ? '#00d9ff' : '#555',
            color: allReportsUploaded ? '#000' : '#999',
            border: 'none',
            borderRadius: '8px',
            cursor: allReportsUploaded && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '🔄 Analyzing with Multi-AI...' : '🚀 Analyze as Unified Problem'}
        </button>
        <p style={{ color: '#999', fontSize: '12px', marginTop: '15px' }}>
          Reports uploaded: {reports.filter(r => r.uploaded).length} / 5
        </p>
      </div>
    </div>
  );

  const renderMetaProblem = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '25px', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '24px', color: '#00d9ff', marginBottom: '15px' }}>
        🎯 The Meta-Problem
      </h3>
      <p style={{ color: '#fff', lineHeight: '1.8', fontSize: '16px' }}>
        {analysis.meta_problem}
      </p>
      <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0, 217, 255, 0.1)', borderRadius: '5px' }}>
        <strong style={{ color: '#00d9ff' }}>Multi-AI Consensus Score:</strong>
        <span style={{ fontSize: '24px', color: '#00ff88', marginLeft: '10px' }}>
          {analysis.consensus_score}%
        </span>
      </div>
    </div>
  );

  const renderInterconnections = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '25px', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '24px', color: '#00d9ff', marginBottom: '15px' }}>
        🔗 Interconnections Map
      </h3>
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        How the 5 wicked problems connect and influence each other:
      </p>
      <div style={{ display: 'grid', gap: '15px' }}>
        {analysis.interconnections.map((conn, idx) => (
          <div 
            key={idx}
            style={{
              background: 'rgba(0, 217, 255, 0.05)',
              border: '1px solid #00d9ff',
              borderRadius: '8px',
              padding: '15px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#00d9ff', fontWeight: 'bold' }}>{conn.from_problem}</span>
              <span style={{ margin: '0 10px', color: '#00ff88' }}>→</span>
              <span style={{ color: '#00d9ff', fontWeight: 'bold' }}>{conn.to_problem}</span>
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>
              {conn.description}
            </p>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
              Strength: <span style={{ color: '#00ff88' }}>{conn.strength}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnifiedSolutions = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '25px', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '24px', color: '#00d9ff', marginBottom: '15px' }}>
        💡 Unified Solutions
      </h3>
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Solutions that address multiple problems simultaneously:
      </p>
      <div style={{ display: 'grid', gap: '20px' }}>
        {analysis.unified_solutions.map((solution) => (
          <div 
            key={solution.solution_id}
            style={{
              background: 'rgba(0, 255, 136, 0.05)',
              border: '2px solid #00ff88',
              borderRadius: '10px',
              padding: '20px'
            }}
          >
            <h4 style={{ fontSize: '20px', color: '#00ff88', marginBottom: '10px' }}>
              {solution.title}
            </h4>
            <p style={{ color: '#fff', lineHeight: '1.6', marginBottom: '15px' }}>
              {solution.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
                <div style={{ fontSize: '12px', color: '#999' }}>Impact Score</div>
                <div style={{ fontSize: '20px', color: '#00ff88', fontWeight: 'bold' }}>{solution.impact_score}/10</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
                <div style={{ fontSize: '12px', color: '#999' }}>Timeline</div>
                <div style={{ fontSize: '16px', color: '#00d9ff' }}>{solution.timeline}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
                <div style={{ fontSize: '12px', color: '#999' }}>Complexity</div>
                <div style={{ fontSize: '16px', color: '#ff9800' }}>{solution.implementation_complexity}</div>
              </div>
            </div>
            <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
              <strong style={{ color: '#00d9ff', fontSize: '14px' }}>Addresses Problems:</strong>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {solution.addresses_problems.map(id => (
                  <span 
                    key={id}
                    style={{
                      padding: '5px 10px',
                      background: 'rgba(0, 217, 255, 0.2)',
                      borderRadius: '5px',
                      fontSize: '12px',
                      color: '#00d9ff'
                    }}
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActionPlan = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '25px', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '24px', color: '#00d9ff', marginBottom: '15px' }}>
        📋 Implementation Action Plan
      </h3>
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        {analysis.action_plan.overview}
      </p>
      <div style={{ display: 'grid', gap: '20px' }}>
        {analysis.action_plan.phases.map((phase) => (
          <div 
            key={phase.phase}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid #00d9ff',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ fontSize: '20px', color: '#00d9ff' }}>
                Phase {phase.phase}: {phase.title}
              </h4>
              <span style={{ color: '#00ff88', fontSize: '14px' }}>{phase.duration}</span>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#fff' }}>Objectives:</strong>
              <ul style={{ marginTop: '8px', marginLeft: '20px', color: '#ccc' }}>
                {phase.objectives.map((obj, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{obj}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Success Metrics:</strong>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {phase.success_metrics.map((metric, idx) => (
                  <span 
                    key={idx}
                    style={{
                      padding: '5px 12px',
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid #00ff88',
                      borderRadius: '5px',
                      fontSize: '13px',
                      color: '#00ff88'
                    }}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRiskAssessment = () => (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '25px', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '24px', color: '#00d9ff', marginBottom: '15px' }}>
        ⚠️ Risk Assessment
      </h3>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ color: '#999' }}>Overall Risk Level: </span>
        <span style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '18px' }}>
          {analysis.risk_assessment.overall_risk_level.toUpperCase()}
        </span>
      </div>
      <div style={{ display: 'grid', gap: '15px' }}>
        {analysis.risk_assessment.key_risks.map((risk, idx) => (
          <div 
            key={idx}
            style={{
              background: 'rgba(255, 152, 0, 0.05)',
              border: '1px solid #ff9800',
              borderRadius: '8px',
              padding: '15px'
            }}
          >
            <h4 style={{ fontSize: '16px', color: '#ff9800', marginBottom: '8px' }}>
              {risk.category}
            </h4>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '10px' }}>
              {risk.description}
            </p>
            <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
              <strong style={{ color: '#00ff88', fontSize: '13px' }}>Mitigation:</strong>
              <p style={{ color: '#ccc', fontSize: '13px', marginTop: '5px' }}>{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'rgba(0, 217, 255, 0.1)',
        borderRadius: '10px'
      }}>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '5px', color: '#00d9ff' }}>
            🌐 Unified Analysis Complete
          </h2>
          <p style={{ color: '#ccc' }}>All 5 wicked problems analyzed as ONE interconnected system</p>
        </div>
        <button
          onClick={() => setActiveSection('upload')}
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.1)',
            color: '#00d9ff',
            border: '2px solid #00d9ff',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← New Analysis
        </button>
      </div>

      {renderMetaProblem()}
      {renderInterconnections()}
      {renderUnifiedSolutions()}
      {renderActionPlan()}
      {renderRiskAssessment()}

      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: 'rgba(255, 68, 68, 0.1)',
        border: '2px solid #ff4444',
        borderRadius: '10px'
      }}>
        <h4 style={{ color: '#ff4444', marginBottom: '10px' }}>⚠️ Legal Disclaimer</h4>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>
          {analysis.disclaimer}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1626 100%)',
      color: '#ffffff',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '10px'
        }}>
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '5px' }}>
              🌐 Wicked Problems Unified Intelligence
            </h1>
            <p style={{ color: '#00d9ff', fontSize: '16px' }}>
              Multi-AI System Analysis • Treating 5 Problems as ONE
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {activeSection === 'upload' ? renderUploadSection() : renderResults()}
      </div>
    </div>
  );
}
