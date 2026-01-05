/**
 * SafetyRuleEngine - 4-Gate Safety System
 * 
 * Implements the 4-gate safety system with 70% confidence minimum.
 */

interface ValidationResult {
  pass: boolean;
  gate: string;
  message?: string;
  action?: string;
}

class SafetyRuleEngine {
  private minimumConfidence = 70;
  private safetyCriticalKeywords = [
    'brakes', 'brake', 'airbag', 'steering', 'suspension',
    'tire', 'wheel bearing', 'fuel system', 'throttle'
  ];

  /**
   * Run all 4 safety gates
   */
  public validate(query: string, consensusResult: any): ValidationResult[] {
    const results: ValidationResult[] = [];

    results.push(this.gate1_inputValidation(query));
    results.push(this.gate2_confidenceThreshold(consensusResult.confidence));
    results.push(this.gate3_safetyCriticalCheck(consensusResult.action));
    results.push(this.gate4_liabilityFilter(consensusResult));

    return results;
  }

  /**
   * Gate 1: Input Validation
   */
  private gate1_inputValidation(query: string): ValidationResult {
    if (!query || query.trim().length === 0) {
      return { pass: false, gate: 'Gate 1', message: 'Empty query' };
    }

    if (query.length > 500) {
      return { pass: false, gate: 'Gate 1', message: 'Query too long' };
    }

    const dangerous = /(<script|SELECT|DROP|DELETE|INSERT|UPDATE)/i;
    if (dangerous.test(query)) {
      return { pass: false, gate: 'Gate 1', message: 'Invalid characters detected' };
    }

    return { pass: true, gate: 'Gate 1' };
  }

  /**
   * Gate 2: Confidence Threshold
   */
  private gate2_confidenceThreshold(confidence: number): ValidationResult {
    if (confidence < this.minimumConfidence) {
      return {
        pass: false,
        gate: 'Gate 2',
        message: 'Low confidence diagnosis. Professional inspection recommended.',
        action: 'display_warning'
      };
    }

    return { pass: true, gate: 'Gate 2' };
  }

  /**
   * Gate 3: Safety-Critical System Check
   */
  private gate3_safetyCriticalCheck(diagnosis: string): ValidationResult {
    const lowercaseDiag = diagnosis.toLowerCase();
    const critical = this.safetyCriticalKeywords.some(kw => lowercaseDiag.includes(kw));

    if (critical) {
      return {
        pass: false,
        gate: 'Gate 3',
        message: '⚠️ SAFETY-CRITICAL SYSTEM: Do NOT attempt DIY repairs. Consult licensed mechanic immediately.',
        action: 'require_professional'
      };
    }

    return { pass: true, gate: 'Gate 3' };
  }

  /**
   * Gate 4: Liability Filter
   */
  private gate4_liabilityFilter(result: any): ValidationResult {
    if (!result.disclaimer) {
      return {
        pass: false,
        gate: 'Gate 4',
        message: 'Missing required disclaimer',
        action: 'add_disclaimer'
      };
    }

    return { pass: true, gate: 'Gate 4' };
  }

  /**
   * Get all failed gates
   */
  public getFailedGates(results: ValidationResult[]): ValidationResult[] {
    return results.filter(r => !r.pass);
  }

  /**
   * Check if all gates passed
   */
  public allGatesPassed(results: ValidationResult[]): boolean {
    return results.every(r => r.pass);
  }
}

export default SafetyRuleEngine;
