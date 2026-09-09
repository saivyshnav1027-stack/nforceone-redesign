# NForce One Website Modernization (PRD v1.3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform NForceOne.com into an enterprise-grade digital platform fully aligned with PRD v1.3, establishing immediate 10-second positioning, 4 strategic capability pillars, a prominent Telecom domain showcase, an Innovation & Products catalog, flexible US + India engagement models, and a persistent "Ask Navi" AI Website Assistant.

**Architecture:** Extend existing single-page web framework in `index.html`, `index.css`, and `app.js`. Modularize capability tab switchers, interactive product drawers, responsive modals, Ask Navi conversational concierge engine, and verified Playwright test suites.

**Tech Stack:** HTML5, CSS3 (Tailwind + Design Token Variables), Vanilla JavaScript (ES6+), Playwright Test Framework.

**Spec:** [`docs/superpowers/specs/2026-09-09-nforce-one-prd-v1.3-strategic-spec.md`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/docs/superpowers/specs/2026-09-09-nforce-one-prd-v1.3-strategic-spec.md)

---

## Global Constraints

- **10-Second Value Proposition:** Visitor must immediately grasp: "AI. Quality Engineering. Digital Transformation. Built to Scale at Speed."
- **Logo-Derived Palette:** Primary Crimson Red (`#C40000`, `#9E0000`), Dark Slate/Charcoal (`#020101`, `#1A1C1D`), Pure White (`#FFFFFF`), Soft Slate (`#F8FAFC`).
- **No Generic Staffing Tone:** Must clearly communicate an end-to-end technology and delivery partner with US + India delivery (Onshore, Offshore, Hybrid).
- **Accessibility & Performance:** Zero performance lag on desktop or mobile, responsive layouts, `prefers-reduced-motion` compliance.

---

### Task 1: Brand & Hero Storyline Reset (P0)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)

**Requirements:** `HOME-001`, `HOME-002`, `HOME-003`, `BR-001`, `BR-002`, `BR-003`, `BR-004`.
- [ ] **Step 1:** Update Hero headline to *"AI. Quality Engineering. Digital Transformation. Built to Scale at Speed."*
- [ ] **Step 2:** Include two primary CTAs: *"Talk to an Expert"* and *"Explore Our Capabilities"*.
- [ ] **Step 3:** Implement the executive Credibility Strip covering:
  - 20+ Years Technology & QA Leadership
  - US + India Delivery (Onshore, Offshore, Hybrid)
  - Telecom Domain Strength
  - AI + Quality Engineering Heritage
- [ ] **Step 4:** Verify Hero and Credibility Strip display cleanly without text wrapping issues on mobile and desktop.

---

### Task 2: Four Strategic Capability Pillars (P0)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Requirements:** `HOME-004`, `CAP-001`, `CAP-002`, `CAP-004`.
- [ ] **Step 1:** Implement the 4 distinct capability sections:
  1. **AI & Agentic Solutions** (Agentic AI, GenAI, AI Agents, RAG, Voice AI)
  2. **Quality Engineering & AI Assurance** (Functional E2E, Automation, LLM Evaluation, Hallucination QA, Voice/IVR QA)
  3. **Digital Engineering** (App Modernization, Microservices, Web & Mobile, API Engineering)
  4. **Data, Cloud & Enterprise Platforms** (AWS/Azure/GCP, DevOps, Pega PRPC, SAP)
- [ ] **Step 2:** Build interactive pillar cards with technology stack badges and problem-solution summaries.
- [ ] **Step 3:** Implement smooth tab/filter switcher in `app.js`.
- [ ] **Step 4:** Verify all 4 pillars render with zero placeholder content.

---

### Task 3: Dedicated Telecom Domain Showcase (P0/P1)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)

**Requirements:** `HOME-005`, `TEL-001`, `TEL-002`, `TEL-003`, `TEL-004`.
- [ ] **Step 1:** Build a dedicated high-impact Telecom section (`#telecom`) showcasing:
  - OSS/BSS Transformation (Billing, Provisioning, Service Activation)
  - End-to-End Telecom QA (System Integration, Billing Validation)
  - AI & Customer Experience (Voice AI, IVR Validation, Call Analytics)
  - Network & Field Operations (NOC Automation, Field Service Workflows)
  - Telecom Data & Automation (Predictive Churn Analytics)
- [ ] **Step 2:** Add dedicated Telecom CTAs: *"Discuss Your Telecom Transformation"* & *"Request an AI or QA Assessment"*.
- [ ] **Step 3:** Verify all generic hardware/cabling references are removed.

---

### Task 4: Innovation & Proprietary Products Showcase (P1)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Requirements:** `HOME-007`, `INNOV-001`, `INNOV-002`, `INNOV-003`, `PROD-CASE-001`.
- [ ] **Step 1:** Build the Innovation & Products section (`#products`) featuring NForce-built platforms:
  - **QForce AI**: AI-driven Quality Engineering & Self-Healing QA
  - **AIKTRA**: Enterprise Agentic Automation Framework
  - **OneHR**: Cloud Workforce & HR Platform
  - **Pulse**: Real-time Telemetry & SLA Monitoring
  - **FlightOps**: Continuous Delivery & DevOps Pipeline Automation
  - **AuraFace**: Biometric Identity & Zero-Trust Verification
- [ ] **Step 2:** Each card features Problem, Solution, Architecture tags, and a *"Request a Demo"* CTA.
- [ ] **Step 3:** Add interactive modal drawer to view product architecture diagrams.

---

### Task 5: Persistent "Ask Navi" AI Website Assistant (P0/P1)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Requirements:** `HOME-011`, `CHAT-001` through `CHAT-012`.
- [ ] **Step 1:** Create floating persistent widget button (`#askNaviBtn`) on bottom-right of viewport.
- [ ] **Step 2:** Build conversational modal `#askNaviModal` with brand-aligned styling and quick-action prompt chips:
  - *"Tell me about AI & Agentic Solutions"*
  - *"How does NForce One handle Telecom OSS/BSS?"*
  - *"What products do you build (QForce AI, AIKTRA)?"*
  - *"Explain your US + India delivery models"*
  - *"Book a Technical Discovery Session"*
- [ ] **Step 3:** Implement grounded knowledge engine in `app.js` with instant responses, lead capture form, and human fallback.
- [ ] **Step 4:** Verify mobile responsiveness without blocking page content.

---

### Task 6: Flexible Engagement Models & Proof Library (P1/P2)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)

**Requirements:** `HOME-008`, `HOME-009`, `HOME-012`, `ENG-001`, `CASE-001`.
- [ ] **Step 1:** Implement Engagement Models section (`#engagement`) showcasing:
  - Onshore (US Client-Facing Teams)
  - Offshore (India Scalable Engineering)
  - Hybrid (Combined Global Delivery)
  - Managed Delivery (Outcome-Based)
  - Project/SOW & T&M
- [ ] **Step 2:** Add Client Case Studies (Appendix A format) with verified business outcomes.
- [ ] **Step 3:** Add Employee Experience & Culture Voices module (`#culture`) highlighting real team perspectives.

---

### Task 7: Playwright Automated Verification & Git Push

**Files:**
- Modify: [`tests/ui.spec.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/tests/ui.spec.js)
- Run test suite & verify 100% passing tests across all new PRD components.
- Commit and push to GitHub repository.
