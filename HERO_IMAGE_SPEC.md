# RideWire AI Hub - Hero Image Specifications

## Overview

This document specifies the hero image for RideWire AI Hub's landing page and marketing materials. The image should visually communicate the core concept: **multi-AI agent collaboration** orchestrating **consensus** for **automotive AR diagnostics**.

---

## Core Visual Elements

### 1. **Central Focus: The Vehicle**
- Show a vehicle (sedan or SUV, 3/4 view angle)
- **Style**: Semi-realistic or stylized tech product render
- **AR Visualization**: Transparent diagnostic overlays around the vehicle
  - Wiring diagrams (semi-transparent teal lines)
  - Error codes floating near the engine (P0300, etc.)
  - Parts highlighted with glowing outlines

### 2. **Multi-AI Agent Nodes** (Three circles/badges)

Arranged around the vehicle in a triangular formation:

- **ChatGPT Agent** (top-left)
  - Icon: OpenAI logo or "GPT" badge
  - Color: Orange/red (#FF6D00) or teal highlight
  - Shows receiving diagnostic data
  
- **Claude Agent** (top-right)
  - Icon: Anthropic logo or "Claude" badge  
  - Color: Purple/blue (#8B5CF6) or teal highlight
  - Shows analyzing data
  
- **Gemini Agent** (bottom-center or top-center)
  - Icon: Google Gemini logo or "Gemini" badge
  - Color: Blue (#1F2937) or teal highlight
  - Shows processing query

### 3. **Central Hub / Consensus Engine** (Center circle)
- **Symbol**: Large glowing circle or badge labeled "CONSENSUS"
- **Color**: Bright green/lime (#00FF88) or teal with glow effect
- **Effect**: Pulsing or radiating energy lines to show active processing
- **Purpose**: Visual anchor showing where all AI responses converge

### 4. **Connection Lines / Data Flow**
- **Style**: Animated dashed lines or glowing paths
- **Color**: Electric teal (#00D9FF) with opacity gradient
- **Flow**: From each AI node → Vehicle → Consensus Hub
- **Effect**: Suggests real-time collaboration and data flow

### 5. **Message/Response Indicators** (Small elements)
- Floating around the scene: small messages or thought bubbles
  - "Analyzing..."
  - "Checking..."
  - "Consensus reached"
- **Color**: Subtle white or light teal text
- **Placement**: Near each AI node and consensus hub

---

## Color Palette

```
Primary Colors:
- Dark Navy/Charcoal: #1a1f3a (background)
- Electric Teal: #00D9FF (primary accent, connections, UI)
- Bright Lime Green: #00FF88 (consensus/success indicator)
- Deep Blue: #0f1626 (background depth)

Accent Colors:
- Orange: #FF6D00 (ChatGPT highlight)
- Purple: #8B5CF6 (Claude highlight)
- White/Light: #FFFFFF (text, highlights)
```

---

## Layout Options

### Option A: "Horizontal Collaboration" (Wide format: 16:9)
- Left side: Vehicle with AR overlays
- Right side: AI agents arranged vertically with consensus hub in middle
- Top center: "RideWire AI Hub" logo and tagline
- **Best for**: Landing page hero section

### Option B: "Pyramid Consensus" (Square format: 1:1)
- Top: Three AI nodes (triangle)
- Center: Vehicle with diagnostics
- Bottom: Consensus hub with result display
- All elements connected with flowing lines
- **Best for**: GitHub README, Twitter/Social media

### Option C: "Dashboard Screenshot" (16:9)
- Screenshot-style mockup showing:
  - Top: RideWire header with "Start Diagnostic" button
  - Left: Chat panel with user query
  - Center: AI analysis cards (GPT, Claude, Gemini)
  - Right: Consensus result and AR preview
- **Best for**: Product demo, documentation

---

## Visual Style Guidelines

### **Overall Aesthetic**
- **Genre**: SaaS/Tech product (Midjourney, Figma, Notion style)
- **Tone**: Modern, trustworthy, cutting-edge
- **Lighting**: Dark theme with neon/tech accents
- **Effects**: Subtle glows, soft shadows, gradient fills

### **Typography** (if text is included)
- Clean, modern sans-serif: Helvetica, Inter, Space Mono
- **Title**: Bold, 48-64px, white or teal
- **Labels**: 12-16px, semi-transparent white/teal

### **Avoid**
- Photorealism (too generic)
- Cartoon style (not professional enough)
- Too many effects/clutter
- Generic AI/tech clichés (overused circuit boards)

---

## Generation Instructions for AI Image Generators

### **For DALL·E 3 / Midjourney / Ideogram:**

```prompt
"Modern SaaS product hero image: A sleek sedan (3/4 view) with transparent 
AR diagnostic overlays (teal glowing lines, error codes, wiring diagrams). 
Three AI agent nodes (ChatGPT, Claude, Gemini) positioned around the vehicle 
with glowing connection lines flowing to a central 'CONSENSUS' hub. Dark navy 
background with electric teal accents (#00D9FF), bright green success indicator 
(#00FF88). Subtle pulsing energy effects, professional tech product render style. 
RideWire AI Hub branding visible. Aspect ratio 16:9."
```

### **Detailed Prompts by Component:**

**Hero Image - Landing Page (16:9):**
```
A modern tech product visualization: (LEFT SIDE) A sleek white/silver sedan in 
3/4 view angle with transparent AR diagnostic overlays - glowing teal circuit 
lines, floating error codes (P0300, etc.), semi-transparent wiring diagrams. 
(CENTER) Three glowing circular AI agent badges arranged in triangle: OpenAI 
GPT (orange top-left), Anthropic Claude (purple top-right), Google Gemini 
(blue bottom). (MIDDLE) Large central hub labeled "CONSENSUS" with bright 
lime-green glow. (DESIGN) Dashed electric teal connecting lines between all 
elements showing data flow. Dark navy gradient background fading to deep blue. 
Subtle pulsing energy effects. Professional SaaS product render aesthetic. 
RideWire AI Hub logo and tagline at top. 16:9 aspect ratio.
```

**Product Icon / GitHub README (1:1):**
```
A compact icon showing three AI agent nodes arranged in triangle around a 
central vehicle with AR overlays, all connected by glowing teal lines to a 
bright green consensus hub. Dark background. Modern tech aesthetic, clean and 
minimalist. 1:1 square format. No text.
```

---

## Deliverables

Generate **at least 3 versions**:

1. **Main Hero** (16:9, 1920x1080px)
   - Landing page format
   - High resolution
   - Text-included version + text-less version

2. **Social Media / README** (1:1, 1200x1200px)
   - Compact, square format
   - Works well on Twitter, LinkedIn, GitHub
   - Optional: Include small RideWire logo

3. **Product Demo Screenshot** (16:9, 1440x810px)
   - Dashboard-style mockup
   - Shows UI elements (chat, AI cards, results)
   - More detailed than hero

---

## File Naming Convention

```
ridewire-ai-hub-hero-main-v1.png
ridewire-ai-hub-hero-social-v1.png
ridewire-ai-hub-demo-dashboard-v1.png
```

---

## Integration Points

### In Repository:
- `frontend/public/images/hero-main.png` - Main landing hero
- `frontend/public/images/hero-social.png` - GitHub/social
- `frontend/components/HeroSection.jsx` - Already includes placeholder
- `README.md` - Can embed hero image at top

### Marketing Use:
- Landing page hero background
- GitHub repository banner
- LinkedIn/Twitter media
- Pitch deck slides
- Product documentation

---

## Next Steps

1. **Generate images** using Midjourney, DALL·E, or Ideogram with provided prompts
2. **Upload to repository** in `frontend/public/images/`
3. **Update HeroSection.jsx** to reference actual image URL
4. **Update README.md** to embed hero image
5. **Test on multiple devices** (mobile, tablet, desktop)
6. **Get feedback** from stakeholders

---

## Questions?

Refer to RideWire AI Hub main README for project context, or open an issue for design collaboration.

**Image Status**: 🔴 Pending generation
**Last Updated**: November 28, 2025
