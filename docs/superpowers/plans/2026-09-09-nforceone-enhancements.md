# NForceOne B2B Website Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an interactive B2B feature suite for NForceOne including a Solution Match Wizard, IT Project Estimator, Technology Architecture Matrix, 5-Stage Delivery Timeline, Compliance Trust Bar, and dynamic Proposal Modal integration.

**Architecture:** Extend existing single-page vanilla JS and CSS framework in `index.html`, `index.css`, and `app.js`. Use modular DOM builders, event delegation, dynamic modal triggers, and CSS animations with design token variables.

**Tech Stack:** HTML5, CSS3 (Vanilla + Tailwind Utilities), Vanilla JavaScript (ES6+), Inter / Inter Tight fonts, Google Material Symbols.

**Spec:** [`docs/superpowers/specs/2026-09-09-nforceone-enhancements-design.md`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/docs/superpowers/specs/2026-09-09-nforceone-enhancements-design.md)

## Global Constraints

- Preserve primary brand colors (`#C40000` Crimson, `#242627` Dark Slate, `#020101` Dark Charcoal, `#F8FAFC` Light Slate).
- Keep vanilla JS zero-dependency approach (no external heavy frameworks).
- All interactive elements must have clear keyboard accessibility and clean responsive styling across desktop and mobile screens.

---

### Task 1: "NForce Solution Match" Interactive Wizard (B1)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: Modal system pattern in `index.html` (`.modal-overlay`, `.modal-card`).
- Produces: `initSolutionWizard()`, pre-fills proposal modal on completion.

- [ ] **Step 1: Add Wizard HTML markup to `index.html`**
Add `#solutionWizardModal` with a 3-step question flow (Goal, Scale, Challenge) and result recommendation card.
- [ ] **Step 2: Add CSS styles for Wizard steps in `index.css`**
Add `.wizard-step`, `.wizard-option-card`, `.wizard-progress-bar`, and transition effects.
- [ ] **Step 3: Implement step switching & logic in `app.js`**
Write `initSolutionWizard()` to handle option selection, step navigation, recommendation generation, and pre-filling `#proposalModal`.
- [ ] **Step 4: Verify Wizard functionality**
Open modal, click through steps 1-3, verify recommendation card displays, and test "Get Tailored Proposal" button pre-filling the main proposal modal.

---

### Task 2: Enterprise Compliance & Trust Bar (B3)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: Header/Hero sub-elements.
- Produces: `initComplianceBar()`, verification detail drawers.

- [ ] **Step 1: Add Compliance Trust Bar HTML to `index.html`**
Insert interactive trust badges (SOC2 Type II, ISO 27001, HIPAA Readiness, AWS/Azure Partner) in the trust strip below Hero.
- [ ] **Step 2: Add styles in `index.css`**
Style trust badges with subtle hover glows, tooltips, and modal verification drawers.
- [ ] **Step 3: Add click-to-verify interaction in `app.js`**
Write `initComplianceBar()` to show detailed compliance popovers when badges are clicked.
- [ ] **Step 4: Verify Trust Bar**
Click each badge, verify popovers display correct standards information.

---

### Task 3: Interactive Technology & Testing Architecture Matrix (A3)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: Services section container in `index.html`.
- Produces: `initTechMatrix()`, filterable capability cards.

- [ ] **Step 1: Add Matrix HTML structure to `index.html`**
Create tab buttons (Testing Types, Testing Platforms, Engineering & AI) and grid cards with tech stack badges (Selenium, Playwright, AWS, Pega, MLOps, Docker).
- [ ] **Step 2: Add Matrix CSS styling in `index.css`**
Style matrix cards, active tab pill indicators, and stack badge tags.
- [ ] **Step 3: Implement tab filtering logic in `app.js`**
Write `initTechMatrix()` to smoothly filter cards based on active category.
- [ ] **Step 4: Verify Matrix**
Click each category tab, verify smooth transition and accurate card display.

---

### Task 4: Interactive 5-Stage Delivery Process Timeline (C2)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: Process section in `index.html`.
- Produces: `initProcessTimeline()`, interactive step expanders.

- [ ] **Step 1: Update Process Section HTML in `index.html`**
Convert standard process cards into an interactive horizontal/vertical 5-stage timeline nodes with expandable accordion panels (Discovery, Assessment, Tailored Proposal, Execution, Scale).
- [ ] **Step 2: Add CSS for Timeline nodes & expanders in `index.css`**
Add CSS for node connectors, active step highlights, and expander accordion transitions.
- [ ] **Step 3: Add accordion logic in `app.js`**
Write `initProcessTimeline()` to toggle detailed step deliverables on click.
- [ ] **Step 4: Verify Delivery Timeline**
Click stage nodes, check accordion expansion and smooth animation.

---

### Task 5: Interactive IT Project Estimator & Scope Calculator (A1) + Contextual Proposal Blueprint (A2)

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`index.css`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.css)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: `#proposalModal` and CTA buttons throughout `index.html`.
- Produces: `initProjectEstimator()`, dynamic modal pre-filling logic.

- [ ] **Step 1: Add Scope Estimator HTML to `index.html`**
Create an interactive Estimator section with service pillar selector, team size slider/toggles, compliance switches, and live proposal summary card.
- [ ] **Step 2: Add Estimator CSS in `index.css`**
Style sliders, toggle buttons, live summary preview box, and CTA button.
- [ ] **Step 3: Write calculation & modal pre-fill script in `app.js`**
Write `initProjectEstimator()` to compute estimated timeline/team size and auto-fill `#proposalModal` inputs.
- [ ] **Step 4: Upgrade `#proposalModal` to show selected blueprint context**
Update proposal modal form to show dynamic "Selected Project Scope Summary".
- [ ] **Step 5: Verify Estimator & Proposal Integration**
Adjust sliders/toggles, verify live summary updates, click "Request Proposal", verify modal opens with pre-filled scope.

---

### Task 6: Animated Proof & Metrics Counter (A4) & Final Verification

**Files:**
- Modify: [`index.html`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/index.html)
- Modify: [`app.js`](file:///c:/Users/Sai%20Vyshnav%20Maddi/Desktop/Nforceone/app.js)

**Interfaces:**
- Consumes: Trust/Proof section in `index.html`.
- Produces: `initMetricsCounters()`.

- [ ] **Step 1: Add metric counters markup in `index.html`**
Ensure metrics have `data-target` attributes for dynamic count-up animation.
- [ ] **Step 2: Write IntersectionObserver count-up logic in `app.js`**
Write `initMetricsCounters()` using `IntersectionObserver` to trigger smooth animated counter increase when visible.
- [ ] **Step 3: Perform end-to-end user experience & visual verification**
Scroll through page, check responsiveness, test all modals, wizards, matrix filters, timeline expanders, and estimator features.
