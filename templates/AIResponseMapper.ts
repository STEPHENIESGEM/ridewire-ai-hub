/**
 * AIResponseMapper - Multi-AI Consensus Aggregation
 * 
 * Aggregates responses from multiple AI services (ChatGPT, Claude, Gemini)
 * and builds a consensus with confidence scores.
 */

interface AIResponse {
  ai: 'ChatGPT' | 'Claude' | 'Gemini';
  suggestion: string;
  confidence: number;
  reasoning?: string;
}

interface ConsensusResult {
  action: string;
  confidence: number;
  safetyLevel: 'critical' | 'high' | 'medium' | 'low';
  estimatedCost?: string;
  disclaimer: string;
  sources: string[];
  breakdown: AIResponse[];
}

class AIResponseMapper {
  private minimumConfidence = 70;

  /**
   * Aggregate multiple AI responses into consensus
   */
  public buildConsensus(responses: AIResponse[]): ConsensusResult {
    if (responses.length === 0) {
      throw new Error('No AI responses to aggregate');
    }

    // Find common themes
    const themes = this.extractThemes(responses);
    
    // Calculate overall confidence
    const confidence = this.calculateConfidence(themes, responses);
    
    // Determine safety level
    const safetyLevel = this.determineSafetyLevel(responses);
    
    // Generate consensus statement
    const action = this.generateConsensusStatement(themes);

    return {
      action,
      confidence,
      safetyLevel,
      estimatedCost: this.estimateCost(action),
      disclaimer: this.getDisclaimer(),
      sources: responses.map(r => r.ai),
      breakdown: responses,
    };
  }

  /**
   * Extract common themes from AI responses
   */
  private extractThemes(responses: AIResponse[]): Map<string, number> {
    const themes = new Map<string, number>();

    responses.forEach(response => {
      const normalized = this.normalizeText(response.suggestion);
      themes.set(normalized, (themes.get(normalized) || 0) + 1);
    });

    return themes;
  }

  /**
   * Calculate overall confidence based on agreement
   */
  private calculateConfidence(themes: Map<string, number>, responses: AIResponse[]): number {
    // Find most common theme
    let maxCount = 0;
    themes.forEach(count => {
      if (count > maxCount) maxCount = count;
    });

    // Agreement score (% of AIs that agree)
    const agreementScore = (maxCount / responses.length) * 100;

    // Average individual confidence
    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;

    // Weighted: 60% agreement, 40% individual confidence
    return Math.round((agreementScore * 0.6) + (avgConfidence * 0.4));
  }

  /**
   * Determine safety level based on keywords
   */
  private determineSafetyLevel(responses: AIResponse[]): 'critical' | 'high' | 'medium' | 'low' {
    const criticalKeywords = ['brake', 'airbag', 'steering', 'fuel leak'];
    const highKeywords = ['suspension', 'tire', 'coolant', 'oil leak'];

    const text = responses.map(r => r.suggestion).join(' ').toLowerCase();

    if (criticalKeywords.some(kw => text.includes(kw))) return 'critical';
    if (highKeywords.some(kw => text.includes(kw))) return 'high';
    
    const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
    return avgConfidence < this.minimumConfidence ? 'low' : 'medium';
  }

  /**
   * Generate human-readable consensus statement
   */
  private generateConsensusStatement(themes: Map<string, number>): string {
    if (themes.size === 0) return 'Unable to reach consensus';

    const sorted = Array.from(themes.entries()).sort((a, b) => b[1] - a[1]);
    const [topTheme, count] = sorted[0];

    if (count === 3) return `All AIs agree: ${topTheme}`;
    if (count === 2) return `Multiple AIs suggest: ${topTheme}`;
    return `Primary recommendation: ${topTheme}`;
  }

  /**
   * Estimate repair cost (placeholder logic)
   */
  private estimateCost(action: string): string {
    // Simple heuristics - replace with real cost data
    if (action.includes('replace')) return '$200-500';
    if (action.includes('inspect')) return '$50-150';
    return '$100-300';
  }

  /**
   * Get mandatory legal disclaimer
   */
  private getDisclaimer(): string {
    return '⚠️ ADVISORY ONLY: This AI-powered diagnostic information is for educational purposes only. Always consult qualified professionals for vehicle repairs.';
  }

  /**
   * Normalize text for comparison
   */
  private normalizeText(text: string): string {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();
  }
}

export default AIResponseMapper;
