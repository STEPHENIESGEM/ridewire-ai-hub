/**
 * HUDManager - AR Panel Lifecycle Management
 * 
 * Manages the lifecycle of AR overlay panels including show/hide,
 * transitions, and state management.
 */

interface PanelConfig {
  id: string;
  visible: boolean;
  opacity: number;
  position: { x: number; y: number };
  zIndex: number;
}

class HUDManager {
  private panels: Map<string, PanelConfig> = new Map();
  private animationDuration = 300; // ms

  /**
   * Register a new panel
   */
  public registerPanel(id: string, config: Partial<PanelConfig> = {}): void {
    this.panels.set(id, {
      id,
      visible: config.visible ?? false,
      opacity: config.opacity ?? 0,
      position: config.position ?? { x: 0, y: 0 },
      zIndex: config.zIndex ?? 1,
    });
  }

  /**
   * Show panel with fade-in animation
   */
  public showPanel(id: string): void {
    const panel = this.panels.get(id);
    if (!panel) return;

    panel.visible = true;
    this.animateOpacity(id, 0, 1);
  }

  /**
   * Hide panel with fade-out animation
   */
  public hidePanel(id: string): void {
    const panel = this.panels.get(id);
    if (!panel) return;

    this.animateOpacity(id, 1, 0, () => {
      panel.visible = false;
    });
  }

  /**
   * Animate panel opacity
   */
  private animateOpacity(id: string, from: number, to: number, onComplete?: () => void): void {
    const panel = this.panels.get(id);
    if (!panel) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      
      panel.opacity = from + (to - from) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };

    animate();
  }

  /**
   * Update panel position
   */
  public updatePosition(id: string, x: number, y: number): void {
    const panel = this.panels.get(id);
    if (panel) {
      panel.position = { x, y };
    }
  }

  /**
   * Get panel state
   */
  public getPanelState(id: string): PanelConfig | undefined {
    return this.panels.get(id);
  }

  /**
   * Get all visible panels
   */
  public getVisiblePanels(): PanelConfig[] {
    return Array.from(this.panels.values()).filter(p => p.visible);
  }

  /**
   * Clear all panels
   */
  public clearAll(): void {
    this.panels.forEach(panel => {
      panel.visible = false;
      panel.opacity = 0;
    });
  }
}

export default HUDManager;
