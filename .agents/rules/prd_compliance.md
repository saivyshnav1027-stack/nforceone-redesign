# Contest Winning & PRD Compliance Rules

## 1. Absolute PRD Adherence
- **Stick Strictly to PRD v1.3**: Every structural section, capability pillar, product name, and positioning statement MUST come directly from PRD v1.3.
- **Enhance, Don't Invent**: We make what is specified in the PRD look 10x more premium, eye-pleasing, polished, and responsive. We do NOT invent random features or deviate from the PRD requirements.

## 2. No Performative Agreement or False Optimism
- If an approach looks generic, laggy, or departs from the PRD, call it out directly with constructive critique.
- Ground all design choices in tangible proof and technical rigor.

## 3. High Performance & 60FPS Micro-Animations
- Zero-lag, zero layout shifts (CLS), and ultra-fast First Contentful Paint (FCP).
- Use lightweight, GPU-accelerated CSS (`transform`, `opacity`) and clean inline SVGs.
- No heavy 3rd-party animation libraries (no heavy Three.js or GSAP bundles that slow down the page).
- Full accessibility compliance, including `prefers-reduced-motion` fallbacks.

## 4. The 10-Second Enterprise Test
- A visitor/judge must grasp within 10 seconds:
  *"AI. Quality Engineering. Digital Transformation. Built to Scale at Speed."*
- Position NForce One as an enterprise technology and delivery partner (NOT a staffing agency) with US + India delivery (Onshore, Offshore, Hybrid).

## 5. Originality & Bespoke Identity Enforcement (Zero Copying)
- **Strict Prohibition Against Plagiarizing Competitor Styles**: Never copy the color schemes, layout structures, typography, animation curves, or component styling of other contest entries (e.g. avoid generic white rounded cards, purple/blue glow buttons, bouncy Framer spring physics, or generic video loops).
- **Proprietary NForce One Design Identity**:
  - Palette: Deep Crimson (`#C40000`), Dark Slate (`#0B0D11`, `#141820`, `#1A1F2B`), Clean Technical White (`#FFFFFF`), and muted steel borders (`rgba(255,255,255,0.08)`).
  - Aesthetic: Enterprise B2B Mission-Critical Command Center & Digital Engineering Hub. Crisp, authoritative, and telemetry-driven.
  - Motion Architecture: Engineered bespoke using vanilla GPU-accelerated CSS (`transform`, `opacity`) and vanilla JS. Micro-interactions should feel precise, instantaneous, and tactile—not cartoonish or floaty.
  - Dynamic Sheen & Lighting: Utilize mathematical cursor-following specular gradients via CSS custom properties (`--mouse-x`, `--mouse-y`) rather than 3rd-party shader libraries.
## 6. Mandatory PRD Cross-Verification & Zero Information Loss Guarantee
- **Cross-Verification Before Any Modification**: Before making ANY structural, UX consolidation, or visual change, rigorously cross-verify against PRD v1.3 requirements.
- **Zero Information Loss**: Under no circumstances can any PRD-mandated section, capability pillar, product accelerator, verified metric, compliance badge, CTA, or engagement model be deleted or omitted.
- **Architectural Enhancements**: Consolidations (such as unifying tabbed capabilities or mobile swipe carousels) must preserve 100% of the underlying content and requirements while improving ergonomics, page weight, and visual continuity.
- **Explicit Traceability**: Whenever proposing or executing a change, explicitly verify each PRD section code (HOME-001, CAP-001, TEL-001, INNOV-001, CHAT-001, etc.) against the update.
