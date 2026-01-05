# Game Engine Architecture for RideWire AI Hub

Complete Unity WebGL + AR.js architecture for AR automotive diagnostics.

---

## 🎯 Overview

RideWire AI Hub's game engine integration enables **Augmented Reality (AR) overlays** for automotive diagnostics. This architecture combines:

- **Unity WebGL** - 3D rendering engine
- **AR.js** - Marker-based AR for web browsers
- **Multi-AI Consensus** - Real-time AI diagnostic integration
- **Safety-First Design** - 4-gate safety system with confidence thresholds

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Device (Mobile/Tablet)           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           React Frontend (ridewire.tech)             │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │        AR Camera View (AR.js)                  │ │  │
│  │  │  ┌──────────────────────────────────────────┐ │ │  │
│  │  │  │   Unity WebGL Canvas (3D Overlays)      │ │ │  │
│  │  │  │   - Wiring diagrams                      │ │ │  │
│  │  │  │   - Sensor data visualization            │ │ │  │
│  │  │  │   - Fault code annotations               │ │ │  │
│  │  │  └──────────────────────────────────────────┘ │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │        AI Diagnostic HUD (React Components)    │ │  │
│  │  │  - ChatGPT Analysis                            │ │  │
│  │  │  - Claude Recommendations                      │ │  │
│  │  │  - Gemini Consensus                            │ │  │
│  │  │  - Confidence Scores                           │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕️                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           WebSocket Bridge (Real-time)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕️
┌─────────────────────────────────────────────────────────────┐
│                  RideWire Backend Server                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Multi-AI Orchestrator                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  ChatGPT   │  │   Claude   │  │   Gemini   │    │  │
│  │  │    API     │  │    API     │  │    API     │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  │                                                       │  │
│  │        ↓ Consensus Aggregation ↓                     │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │    Safety Rule Engine (4-Gate System)          │ │  │
│  │  │  Gate 1: Input Validation (malformed queries)  │ │  │
│  │  │  Gate 2: Confidence Threshold (< 70% = warn)   │ │  │
│  │  │  Gate 3: Safety-Critical Check (brakes, etc.)  │ │  │
│  │  │  Gate 4: Liability Filter (add disclaimers)    │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                      │  │
│  │  - User sessions                                      │  │
│  │  - Diagnostic history                                 │  │
│  │  - Consensus logs                                     │  │
│  │  - AR marker data                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎮 Unity WebGL Integration

### Unity Project Structure

```
RideWireUnityProject/
├── Assets/
│   ├── Scenes/
│   │   └── ARDiagnosticScene.unity
│   ├── Scripts/
│   │   ├── ARManager.cs
│   │   ├── DiagnosticOverlayController.cs
│   │   ├── WebGLBridge.cs
│   │   └── SafetyValidator.cs
│   ├── Prefabs/
│   │   ├── WiringDiagram.prefab
│   │   ├── SensorDataPanel.prefab
│   │   └── FaultCodeMarker.prefab
│   ├── Materials/
│   │   └── AROverlayMaterial.mat
│   └── WebGL/
│       └── Plugins/
│           └── JSBridge.jslib
├── Build/
│   └── WebGL/
│       ├── index.html
│       ├── Build.data
│       ├── Build.wasm
│       └── Build.loader.js
└── ProjectSettings/
    └── QualitySettings.asset (optimized for mobile)
```

### Unity Build Settings

**Target Platform:** WebGL  
**Template:** Minimal (custom React integration)  
**Compression:** Brotli  
**Code Optimization:** Size (aggressive)  
**Strip Engine Code:** Enabled  
**Target Build:** Release

**Build Size Targets:**
- Build.wasm: < 5 MB
- Build.data: < 10 MB
- Total: < 15 MB (acceptable for mobile)

### Unity-React Communication

**JavaScript → Unity (SendMessage):**
```javascript
// From React/JavaScript to Unity
UnityInstance.SendMessage('ARManager', 'LoadDiagnosticData', JSON.stringify({
  faultCode: 'P0300',
  vehicleModel: '2020 Toyota Camry',
  aiRecommendations: [...],
  confidence: 85
}));
```

**Unity → JavaScript (Application.ExternalCall):**
```csharp
// From Unity C# to JavaScript
Application.ExternalCall("OnARMarkerDetected", markerID, position, rotation);
```

---

## 📱 AR.js Integration

### Marker-Based AR Setup

**AR Marker Types:**
1. **QR Code Markers** - Printed and placed on vehicle components
2. **Hiro Markers** - Default AR.js markers for testing
3. **Custom Barcode Markers** - VIN-specific identifiers

### AR.js Configuration

```html
<!-- AR.js embedded in React -->
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
  <!-- AR Camera -->
  <a-marker-camera 
    preset="hiro" 
    raycaster="objects: .clickable"
    emitevents="true"
    cursor="fuse: false; rayOrigin: mouse;">
  </a-marker-camera>

  <!-- Unity WebGL canvas overlay -->
  <a-entity 
    id="unity-overlay" 
    position="0 0 0" 
    rotation="0 0 0">
  </a-entity>
</a-scene>
```

### Marker Placement Strategy

**Vehicle Components with AR Markers:**
1. **Engine Bay** - QR code on air filter housing
2. **Under Hood** - Marker on fuse box cover
3. **Dashboard** - Marker on OBD-II port cover
4. **Wheels** - Marker on wheel well (brake inspection)
5. **Transmission** - Marker near dipstick

**Marker Detection Flow:**
1. User opens AR diagnostic mode
2. Camera activates with AR.js scanning
3. Marker detected → Trigger Unity scene load
4. Unity overlays 3D diagnostic visuals
5. AI data streamed via WebSocket
6. Real-time updates as user moves camera

---

## 🔌 WebSocket Real-Time Communication

### WebSocket Protocol

**Client (React) → Server:**
```javascript
{
  "type": "DIAGNOSTIC_QUERY",
  "data": {
    "faultCode": "P0300",
    "vehicleInfo": {
      "make": "Toyota",
      "model": "Camry",
      "year": 2020,
      "vin": "1HGBH41JXMN109186"
    },
    "markerPosition": { "x": 0.5, "y": 1.2, "z": -0.3 }
  }
}
```

**Server → Client (AI Response):**
```javascript
{
  "type": "AI_CONSENSUS_RESULT",
  "data": {
    "faultCode": "P0300",
    "diagnosis": "Random misfire detected",
    "recommendations": [
      {
        "ai": "ChatGPT",
        "suggestion": "Check spark plugs",
        "confidence": 85
      },
      {
        "ai": "Claude",
        "suggestion": "Inspect ignition coils",
        "confidence": 78
      },
      {
        "ai": "Gemini",
        "suggestion": "Check spark plugs and ignition system",
        "confidence": 90
      }
    ],
    "consensus": {
      "action": "Inspect spark plugs first, then ignition coils",
      "confidence": 84,
      "safetyLevel": "non-critical",
      "estimatedCost": "$150-300",
      "disclaimer": "Always consult a qualified mechanic"
    }
  }
}
```

### WebSocket Reconnection Strategy

**Auto-Reconnect Logic:**
1. Connection lost → Show offline indicator
2. Attempt reconnect every 3 seconds (max 10 attempts)
3. Exponential backoff: 3s, 6s, 12s, 24s...
4. Restore session state on reconnection
5. Resend pending messages

---

## 🛡️ Safety Rule Engine (4-Gate System)

### Gate 1: Input Validation

**Purpose:** Prevent malformed queries from reaching AI systems

```javascript
function validateInput(query) {
  // Check for empty or null
  if (!query || query.trim().length === 0) {
    return { valid: false, error: "Empty query" };
  }

  // Check length limits
  if (query.length > 500) {
    return { valid: false, error: "Query too long (max 500 chars)" };
  }

  // Check for malicious patterns (SQL injection, XSS)
  const dangerousPatterns = /(<script|SELECT|DROP|DELETE|INSERT|UPDATE)/i;
  if (dangerousPatterns.test(query)) {
    return { valid: false, error: "Invalid characters detected" };
  }

  return { valid: true };
}
```

### Gate 2: Confidence Threshold

**Purpose:** Flag low-confidence results for professional consultation

```javascript
function checkConfidenceThreshold(consensusResult) {
  const MINIMUM_CONFIDENCE = 70; // 70% threshold

  if (consensusResult.confidence < MINIMUM_CONFIDENCE) {
    return {
      pass: false,
      warning: "Low confidence diagnosis. Professional inspection recommended.",
      action: "display_warning"
    };
  }

  return { pass: true };
}
```

### Gate 3: Safety-Critical System Check

**Purpose:** Identify safety-critical components requiring professional service

```javascript
const SAFETY_CRITICAL_SYSTEMS = [
  'brakes', 'brake', 'airbag', 'steering', 'suspension',
  'tire', 'wheel bearing', 'fuel system', 'throttle'
];

function isSafetyCritical(diagnosis) {
  const lowercaseDiag = diagnosis.toLowerCase();
  
  const critical = SAFETY_CRITICAL_SYSTEMS.some(system => 
    lowercaseDiag.includes(system)
  );

  if (critical) {
    return {
      critical: true,
      warning: "⚠️ SAFETY-CRITICAL SYSTEM: Do NOT attempt DIY repairs. Consult licensed mechanic immediately.",
      urgency: "HIGH"
    };
  }

  return { critical: false };
}
```

### Gate 4: Liability Filter

**Purpose:** Add mandatory disclaimers to all diagnostic outputs

```javascript
function applyLiabilityFilter(aiResponse) {
  const disclaimer = {
    text: "⚠️ ADVISORY ONLY: This AI-powered diagnostic information is for educational purposes only. RideWire AI Hub does NOT replace professional automotive technicians. Always consult qualified professionals for repairs. We accept NO liability for repair outcomes.",
    version: "1.0.0",
    required: true
  };

  return {
    ...aiResponse,
    disclaimer,
    legalNotice: "By using this diagnostic information, you agree to our Terms of Service and Legal Disclaimer."
  };
}
```

---

## 📊 Multi-AI Consensus Algorithm

### Consensus Building Process

```javascript
class ConsensusEngine {
  constructor(responses) {
    this.responses = responses; // Array of AI responses
  }

  /**
   * Calculate consensus from multiple AI responses
   */
  buildConsensus() {
    // Step 1: Extract key recommendations
    const recommendations = this.extractRecommendations();

    // Step 2: Find common themes
    const themes = this.findCommonThemes(recommendations);

    // Step 3: Calculate weighted confidence
    const confidence = this.calculateConfidence(themes);

    // Step 4: Generate consensus statement
    const statement = this.generateStatement(themes, confidence);

    return {
      statement,
      confidence,
      sources: this.responses.map(r => r.ai),
      breakdown: themes
    };
  }

  /**
   * Find recommendations that appear in multiple AI responses
   */
  findCommonThemes(recommendations) {
    const themeMap = {};

    recommendations.forEach(rec => {
      const key = this.normalizeRecommendation(rec.text);
      if (!themeMap[key]) {
        themeMap[key] = { count: 0, confidences: [], text: rec.text };
      }
      themeMap[key].count++;
      themeMap[key].confidences.push(rec.confidence);
    });

    // Sort by frequency
    return Object.values(themeMap)
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Calculate overall confidence based on agreement
   */
  calculateConfidence(themes) {
    if (themes.length === 0) return 0;

    const topTheme = themes[0];
    const agreementScore = (topTheme.count / this.responses.length) * 100;
    const avgConfidence = topTheme.confidences.reduce((a, b) => a + b, 0) / topTheme.confidences.length;

    // Weighted: 60% agreement, 40% individual confidence
    return Math.round((agreementScore * 0.6) + (avgConfidence * 0.4));
  }

  /**
   * Generate human-readable consensus statement
   */
  generateStatement(themes, confidence) {
    if (themes.length === 0) {
      return "Unable to reach consensus. Professional diagnosis recommended.";
    }

    const top = themes[0];
    const agreementLevel = top.count === this.responses.length ? "All AIs agree" : 
                          top.count > 1 ? "Multiple AIs suggest" : 
                          "One AI suggests";

    return `${agreementLevel}: ${top.text}`;
  }
}
```

---

## 🎨 HUD Design Patterns

### AR Overlay Layout

```
┌─────────────────────────────────────────────────┐
│  [Camera View - Live Video Feed]                │
│                                                   │
│  ┌─────────────────────────────────────────┐   │
│  │  AR Marker Detected                     │   │
│  │  Component: Engine Spark Plugs          │   │
│  │  ┌───────────────────────────────────┐  │   │
│  │  │  [3D Wiring Diagram Overlay]      │  │   │
│  │  │  [Animated Fault Indicator]       │  │   │
│  │  └───────────────────────────────────┘  │   │
│  └─────────────────────────────────────────┘   │
│                                                   │
│  ┌─────────────────────────────────────────┐   │
│  │  AI Consensus Panel (Semi-transparent)  │   │
│  │  ┌──────────────────────────────────┐   │   │
│  │  │ 🤖 ChatGPT: Check spark plugs    │   │   │
│  │  │ Confidence: 85%                   │   │   │
│  │  └──────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────┐   │   │
│  │  │ 🧠 Claude: Inspect ignition coils│   │   │
│  │  │ Confidence: 78%                   │   │   │
│  │  └──────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────┐   │   │
│  │  │ ✨ Gemini: Check spark plugs     │   │   │
│  │  │ Confidence: 90%                   │   │   │
│  │  └──────────────────────────────────┘   │   │
│  │                                          │   │
│  │  ✅ CONSENSUS (84% confidence)          │   │
│  │  Action: Inspect spark plugs            │   │
│  │  Est. Cost: $150-300                    │   │
│  └─────────────────────────────────────────┘   │
│                                                   │
│  [⚠️ Advisory Only - Consult Professionals]     │
└─────────────────────────────────────────────────┘
```

### HUD Component Lifecycle

1. **Marker Detection** → Load relevant 3D models
2. **AI Query Trigger** → Show loading spinner
3. **Consensus Building** → Display individual AI responses
4. **Final Result** → Highlight consensus + confidence
5. **User Action** → Tap for details, save report, share

---

## 🔧 Performance Optimization

### Unity WebGL Optimization

**Graphics Settings:**
- Texture compression: ETC2 (Android), ASTC (iOS)
- Max texture size: 1024x1024
- Shadow quality: Disabled (AR doesn't need shadows)
- Anti-aliasing: Disabled (performance)
- VSync: Disabled (reduce latency)

**Script Optimization:**
- Object pooling for frequently spawned overlays
- Aggressive garbage collection settings
- Minimize Update() loops
- Use coroutines instead of Update() where possible

**Build Size Reduction:**
- Strip unused Unity components
- Code stripping: High
- Managed stripping level: High
- Remove debugging symbols

### AR.js Performance

**Optimization Strategies:**
- Use smaller marker detection resolution (640x480)
- Reduce marker detection frequency (30 FPS → 15 FPS)
- Disable marker smoothing for faster response
- Use single marker mode (faster than multi-marker)

---

## 📱 Mobile Considerations

### Device Compatibility

**Minimum Requirements:**
- iOS 12+ (Safari with AR support)
- Android 8+ (Chrome with WebXR)
- 2GB RAM minimum
- Camera: 720p minimum

**Tested Devices:**
- iPhone 11 and newer ✅
- Samsung Galaxy S10 and newer ✅
- Google Pixel 4 and newer ✅
- iPad Pro 2018 and newer ✅

### Battery & Performance

**Battery Optimization:**
- AR session timeout after 5 minutes of inactivity
- Lower camera resolution option (save battery)
- Reduce AI query frequency (cache results)
- Pause Unity rendering when marker not in view

**Performance Monitoring:**
```javascript
// Track FPS and warn if performance degrades
let fps = 0;
let lastFrameTime = Date.now();

function monitorPerformance() {
  const now = Date.now();
  fps = 1000 / (now - lastFrameTime);
  lastFrameTime = now;

  if (fps < 15) {
    console.warn("Low FPS detected. Consider reducing quality.");
    // Auto-reduce quality settings
    reduceARQuality();
  }
}
```

---

## 🔐 Security Considerations

### AR Marker Security

**Prevent Marker Spoofing:**
- Cryptographic signatures on QR codes
- Server-side validation of marker IDs
- Rate limiting on marker scans
- Detect duplicate/fake markers

**Privacy Protection:**
- No camera data sent to server
- Only marker ID and position transmitted
- User consent required for camera access
- Clear indication when camera is active

---

## 📚 Tech Stack Summary

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Frontend Framework | React | 18.x | UI components |
| 3D Engine | Unity | 2021.3 LTS | WebGL rendering |
| AR Library | AR.js | 3.4.x | Marker-based AR |
| Real-time Comm | WebSocket | - | Live AI updates |
| Backend | Node.js + Express | 16.x+ | API server |
| Database | PostgreSQL | 12+ | Data persistence |
| AI APIs | OpenAI, Anthropic, Google | Latest | Multi-AI consensus |

---

## 🚀 Next Steps

See `IMPLEMENTATION_ROADMAP.md` for the 4-phase, 13-week implementation plan.

---

*Last Updated: January 5, 2026*  
*Version: 1.0.0*
