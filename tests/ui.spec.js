const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe('NForce One Website UI & Interactivity Tests', () => {

  test('1. Page Title, Header & Navigation Elements Load Correctly', async ({ page }) => {
    await page.goto(fileUrl);

    // Verify Title
    await expect(page).toHaveTitle(/NForce One — AI, Quality Engineering/);

    // Verify Navigation elements
    const logo = page.locator('header img[alt="NForce One Logo"]');
    await expect(logo).toBeVisible();

    const planBtn = page.locator('header button.open-proposal-modal');
    await expect(planBtn).toBeVisible();
  });

  test('2. Hero Section Displays 10-Second Value Prop, Dual CTAs & Credibility Strip', async ({ page }) => {
    await page.goto(fileUrl);

    const heading = page.locator('h1');
    await expect(heading).toContainText('AI. Quality Engineering. Digital Transformation.');
    await expect(heading).toContainText('Built to Scale at Speed.');

    const talkExpertBtn = page.locator('#heroTalkExpertBtn');
    await expect(talkExpertBtn).toBeVisible();

    const exploreCapBtn = page.locator('#heroExploreCapBtn');
    await expect(exploreCapBtn).toBeVisible();

    // Verify 4-Part Credibility Strip inside Hero
    const hero = page.locator('#hero');
    await expect(hero.getByText('20+ Years Leadership', { exact: true })).toBeVisible();
    await expect(hero.getByText('US + India Delivery', { exact: true })).toBeVisible();
    await expect(hero.getByText('Telecom Domain Strength', { exact: true })).toBeVisible();
    await expect(hero.getByText('AI + QE Heritage', { exact: true })).toBeVisible();
  });

  test('3. Compliance Trust Bar Badges Display & Trigger Popover Modal', async ({ page }) => {
    await page.goto(fileUrl);

    const trustBadges = page.locator('.trust-badge-item');
    await expect(trustBadges).toHaveCount(4);

    // Click first badge (SOC2-aligned controls)
    await trustBadges.first().click();

    const complianceModal = page.locator('#complianceModal');
    await expect(complianceModal).toHaveClass(/active/);

    const compTitle = page.locator('#complianceTitle');
    await expect(compTitle).toContainText('SOC2-Aligned');

    // Close compliance modal
    await page.locator('#complianceCloseBtn').click();
    await expect(complianceModal).not.toHaveClass(/active/);
  });

  test('4. Capability Tabs Switch Between Pillar Overview and Technology & Testing Matrix', async ({ page }) => {
    await page.goto(fileUrl);

    const cap = page.locator('#capabilities');
    const pillarsTab = cap.locator('button[data-category="pillars"]');
    const testingTypeTab = cap.locator('button[data-category="testing-type"]');
    const engineeringTab = cap.locator('button[data-category="engineering"]');

    await expect(pillarsTab).toHaveClass(/active/);
    await expect(page.locator('#capPillarsPanel')).toBeVisible();
    await expect(page.locator('#matrix')).toBeHidden();

    // Switch to Testing Types
    await testingTypeTab.click();
    await expect(testingTypeTab).toHaveClass(/active/);
    await expect(page.locator('#capPillarsPanel')).toBeHidden();
    await expect(cap.locator('.matrix-card[data-cat="testing-type"]').first()).toBeVisible();
    await expect(cap.locator('.matrix-card[data-cat="engineering"]').first()).toBeHidden();

    // Switch to Engineering & AI
    await engineeringTab.click();
    await expect(engineeringTab).toHaveClass(/active/);
    await expect(cap.locator('.matrix-card[data-cat="engineering"]').first()).toBeVisible();

    // Back to the pillar overview
    await pillarsTab.click();
    await expect(page.locator('#capPillarsPanel')).toBeVisible();
    await expect(page.locator('#matrix')).toBeHidden();
  });

  test('5. 5-Stage Delivery Process Timeline Expands Accordion Details', async ({ page }) => {
    await page.goto(fileUrl);

    const firstStage = page.locator('.timeline-stage-card').first();
    await expect(firstStage).toBeVisible();
    await expect(firstStage).not.toHaveClass(/expanded/);

    // Click to expand Stage 1
    await firstStage.click();
    await expect(firstStage).toHaveClass(/expanded/);

    // Verify key deliverables inside Stage 1
    await expect(firstStage.locator('.timeline-details')).toContainText('Technical Feasibility Report');

    // Test Scrubber pill click: Click Stage 2 Scrubber button
    const stage2Pill = page.locator('.stage-nav-pill').nth(1);
    await stage2Pill.click();

    // Verify Stage 2 is expanded and Stage 1 is collapsed
    const secondStage = page.locator('.timeline-stage-card').nth(1);
    await expect(secondStage).toHaveClass(/expanded/);
    await expect(firstStage).not.toHaveClass(/expanded/);
    await expect(secondStage.locator('.timeline-details')).toContainText('Vulnerability Threat Matrix');
  });

  test('6. IT Project Scope Estimator Calculates Timeline & Squad', async ({ page }) => {
    await page.goto(fileUrl);

    const slider = page.locator('#estTeamSlider');
    const estWeeks = page.locator('#estWeeks');
    const estTeamVal = page.locator('#estTeamVal');

    await expect(slider).toBeVisible();
    await expect(estWeeks).toContainText('Weeks');
    await expect(estTeamVal).toContainText('5 Specialists');

    // Change slider value
    await slider.fill('8');
    await slider.dispatchEvent('input');

    await expect(estTeamVal).toContainText('8 Specialists');

    // Click "Request Proposal Blueprint" and verify Proposal Modal pre-fills
    const reqBtn = page.locator('#estReqProposalBtn');
    await reqBtn.click();

    const proposalModal = page.locator('#proposalModal');
    await expect(proposalModal).toHaveClass(/active/);

    const summaryBox = page.locator('#proposalScopeSummary');
    await expect(summaryBox).toBeVisible();
    await expect(summaryBox).toContainText('8 Engineers');

    // Close proposal modal
    await page.locator('#modalCloseBtn').click();
    await expect(proposalModal).not.toHaveClass(/active/);
  });

  test('7. Solution Match Wizard 3-Step Flow Completes & Links to Proposal', async ({ page }) => {
    await page.goto(fileUrl);

    // Open Wizard
    await page.locator('#openWizardBtn').click();
    const wizardModal = page.locator('#solutionWizardModal');
    await expect(wizardModal).toHaveClass(/active/);

    // Step 1: Select Option
    const step1Option = page.locator('.wizard-step[data-step="1"] .wizard-opt').first();
    await step1Option.click();

    // Step 2: Select Option
    const step2 = page.locator('.wizard-step[data-step="2"]');
    await expect(step2).toHaveClass(/active/);
    await page.locator('.wizard-step[data-step="2"] .wizard-opt').first().click();

    // Step 3: Select Option
    const step3 = page.locator('.wizard-step[data-step="3"]');
    await expect(step3).toHaveClass(/active/);
    await page.locator('.wizard-step[data-step="3"] .wizard-opt').first().click();

    // Result Step should display
    const resultStep = page.locator('.wizard-step[data-step="result"]');
    await expect(resultStep).toHaveClass(/active/);

    // Click Get Proposal Blueprint
    await page.locator('#applyWizardToProposal').click();
    await expect(wizardModal).not.toHaveClass(/active/);

    // Proposal modal should be open with custom wizard summary
    const proposalModal = page.locator('#proposalModal');
    await expect(proposalModal).toHaveClass(/active/);
    const summaryBox = page.locator('#proposalScopeSummary');
    await expect(summaryBox).toBeVisible();
    await expect(summaryBox).toContainText('Recommended Solution Blueprint');

    await page.locator('#modalCloseBtn').click();
  });

  test('8. Integrated Hero Telemetry Metrics Dashboard & Credibility Strip Render Accurately', async ({ page }) => {
    await page.goto(fileUrl);

    const metricCounters = page.locator('#hero .metric-count');
    await expect(metricCounters).toHaveCount(4);
    await expect(page.locator('#hero')).toContainText('Capability Pillars');
    await expect(page.locator('#hero')).toContainText('Telecom Domain Areas');
    await expect(page.locator('#hero')).toContainText('Proprietary Platforms');
    await expect(page.locator('#hero')).toContainText('US + India Delivery Models');
  });

  test('9. Four Capability Pillars Section Displays All 4 PRD Pillars', async ({ page }) => {
    await page.goto(fileUrl);

    const capSection = page.locator('#capabilities');
    await expect(capSection).toBeVisible();

    await expect(page.getByRole('heading', { name: 'AI & Agentic Solutions' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quality Engineering & AI Assurance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Digital Engineering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data, Cloud & Platforms' })).toBeVisible();
  });

  test('10. Dedicated Telecom Domain Showcase Displays 5 Carrier Pillars & Tilt Cards', async ({ page }) => {
    await page.goto(fileUrl);

    const telecomSection = page.locator('#telecom');
    await expect(telecomSection).toBeVisible();

    await expect(telecomSection.getByText('OSS/BSS Transformation')).toBeVisible();
    await expect(telecomSection.getByText('End-to-End Telecom QA')).toBeVisible();
    await expect(telecomSection.getByText('Telecom CX & Voice AI')).toBeVisible();
    await expect(telecomSection.getByText('Network Ops & Field AI')).toBeVisible();
    await expect(telecomSection.getByText('Telecom Data & Automation')).toBeVisible();

    const tiltCards = telecomSection.locator('.tilt-card');
    await expect(tiltCards).toHaveCount(5);
  });

  test('11. Innovation & Products Suite Displays QForce AI and Triggers Demo Flow', async ({ page }) => {
    await page.goto(fileUrl);

    const prodSection = page.locator('#products');
    await expect(prodSection).toBeVisible();

    await expect(prodSection.getByRole('heading', { name: 'QForce AI' })).toBeVisible();
    await expect(prodSection.getByRole('heading', { name: 'AIKTRA' })).toBeVisible();
    await expect(prodSection.locator('.prod-demo-btn')).toHaveCount(6);

    // Click Request Demo on QForce AI
    const qforceDemoBtn = prodSection.locator('button[data-product="QForce AI"]');
    await qforceDemoBtn.click();

    const proposalModal = page.locator('#proposalModal');
    await expect(proposalModal).toHaveClass(/active/);

    const summaryBox = page.locator('#proposalScopeSummary');
    await expect(summaryBox).toContainText('QForce AI');

    await page.locator('#modalCloseBtn').click();
  });

  test('12. Persistent Ask Navi Assistant Widget Opens Drawer & Responds to Discovery Chips', async ({ page }) => {
    await page.goto(fileUrl);

    const naviTrigger = page.locator('#askNaviTrigger');
    await expect(naviTrigger).toBeVisible();

    const naviDrawer = page.locator('#askNaviDrawer');
    await expect(naviDrawer).not.toHaveClass(/active/);

    // Click trigger to open Ask Navi
    await naviTrigger.click();
    await expect(naviDrawer).toHaveClass(/active/);

    // Click "Telecom OSS/BSS" discovery chip
    const telecomChip = naviDrawer.locator('.navi-chip[data-query="Telecom OSS/BSS"]');
    await telecomChip.click();

    // Verify Navi response contains grounded Telecom info
    await expect(naviDrawer.locator('.navi-chat-body')).toContainText('OSS/BSS Modernization');

    // Close drawer
    await page.locator('#closeNaviDrawer').click();
    await expect(naviDrawer).not.toHaveClass(/active/);
  });

  test('13. Case Studies Show Representative Blueprints & Switch Tabs (US-602 & US-603)', async ({ page }) => {
    await page.goto(fileUrl);

    const caseSection = page.locator('#case-studies');
    await expect(caseSection).toBeVisible();

    // Verify Default Telecom Carrier panel
    await expect(page.locator('#case-telecom')).toBeVisible();
    await expect(page.locator('#case-telecom')).toContainText('Zero-Downtime');
    await expect(page.locator('#case-telecom')).toContainText('Client References on Request');

    // Switch to FinTech tab
    await page.locator('.case-study-tab[data-case="fintech"]').click();
    await expect(page.locator('#case-fintech')).toBeVisible();
    await expect(page.locator('#case-fintech')).toContainText('High-Throughput Load Architecture');

    // Switch to HealthTech tab
    await page.locator('.case-study-tab[data-case="healthtech"]').click();
    await expect(page.locator('#case-healthtech')).toBeVisible();
    await expect(page.locator('#case-healthtech')).toContainText('HIPAA-Ready Patient Portal');
  });

  test('14. Technical Blueprint Modal & Cross-Border Culture Strip (US-602 & US-604)', async ({ page }) => {
    await page.goto(fileUrl);

    // Open the telecom blueprint modal
    const blueprintBtn = page.locator('#case-telecom .open-case-modal');
    await blueprintBtn.click();

    const caseModal = page.locator('#caseStudyModal');
    await expect(caseModal).toHaveClass(/active/);
    await expect(page.locator('#caseModalTitle')).toContainText('Billing Modernization');
    await expect(page.locator('#caseModalMetric')).toContainText('Zero-Downtime Cutover');

    // Close modal
    await page.locator('#caseModalCloseBtn').click();
    await expect(caseModal).not.toHaveClass(/active/);

    // Verify Cross-Border Employee Culture Strip (US-604), now inside How We Deliver
    await expect(page.locator('#delivery')).toContainText('Rajesh V.');
    await expect(page.locator('#delivery')).toContainText('Dallas, TX');
    await expect(page.locator('#delivery')).toContainText('Maddi Sai Vyshnav');
    await expect(page.locator('#delivery')).toContainText('Hyderabad, India');
    await expect(page.locator('body')).not.toContainText('Bengaluru');
  });

  test('15. Header Round Logo & 11-Sector Industries Dropdown Functionality', async ({ page }) => {
    // Full desktop nav renders from 1280px; narrower widths use the menu panel.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl);

    // Verify logo is inside a rounded-full circular badge
    const logoContainer = page.locator('header a[aria-label="NForce One Home"] div');
    await expect(logoContainer).toHaveClass(/rounded-full/);
    await expect(logoContainer.locator('img[alt="NForce One Logo"]')).toBeVisible();

    // Verify Industries dropdown trigger
    const indBtn = page.locator('#industriesDropdownBtn');
    await expect(indBtn).toBeVisible();
    await expect(indBtn).toContainText('Industries');

    const indMenu = page.locator('#industriesDropdownMenu');
    await expect(indMenu).not.toHaveClass(/open/);

    // Click dropdown button to open
    await indBtn.click();
    await expect(indMenu).toHaveClass(/open/);

    // Verify presence of all 11 sectors
    await expect(indMenu.getByText('Telecommunications')).toBeVisible();
    await expect(indMenu.getByText('Banking & Financial')).toBeVisible();
    await expect(indMenu.getByText('Finance & FinTech')).toBeVisible();
    await expect(indMenu.getByText('Healthcare & Life Sciences')).toBeVisible();
    await expect(indMenu.getByText('Automotive & Mobility')).toBeVisible();
    await expect(indMenu.getByText('Retail & eCommerce')).toBeVisible();
    await expect(indMenu.getByText('Insurance (InsurTech)')).toBeVisible();
    await expect(indMenu.getByText('Digital Media & AdTech')).toBeVisible();
    await expect(indMenu.getByText('Energy & Utilities')).toBeVisible();
    await expect(indMenu.getByText('Smart Manufacturing')).toBeVisible();
    await expect(indMenu.getByText('ISV & Enterprise SaaS')).toBeVisible();

    // Click Banking & Financial to verify proposal modal opens with context
    const bankingItem = indMenu.locator('.industry-dropdown-item[data-domain="Banking & Financial"]');
    await bankingItem.click();

    const proposalModal = page.locator('#proposalModal');
    await expect(proposalModal).toHaveClass(/active/);
    await expect(page.locator('#proposalScopeSummary')).toContainText('Banking & Financial');

    // Close proposal modal
    await page.locator('#modalCloseBtn').click();
    await expect(proposalModal).not.toHaveClass(/active/);
  });

  test('16. Ask Navi Assistant Tooltip Is Hidden by Default and Reveals on Hover', async ({ page }) => {
    await page.goto(fileUrl);

    const tooltip = page.locator('.ask-navi-tooltip');
    await expect(tooltip).toBeAttached();

    // Verify default opacity is 0
    await expect(tooltip).toHaveCSS('opacity', '0');

    // Hover over the widget trigger
    await page.locator('#askNaviWidget').hover();
    await expect(tooltip).toHaveCSS('opacity', '1');
  });

  test('17. Footer Wizard Link Opens Wizard and Reopening Resets to Step 1', async ({ page }) => {
    await page.goto(fileUrl);
    const wizardModal = page.locator('#solutionWizardModal');

    await page.locator('#footWizardBtn').click();
    await expect(wizardModal).toHaveClass(/active/);
    await expect(page.locator('.wizard-step[data-step="1"]')).toHaveClass(/active/);

    for (const step of ['1', '2', '3']) {
      await page.locator(`.wizard-step[data-step="${step}"] .wizard-opt`).first().click();
    }
    await expect(page.locator('.wizard-step[data-step="result"]')).toHaveClass(/active/);

    await page.locator('#wizardCloseBtn').click();
    await expect(wizardModal).not.toHaveClass(/active/);

    await page.locator('#openWizardBtn').click();
    await expect(wizardModal).toHaveClass(/active/);
    await expect(page.locator('.wizard-step[data-step="1"]')).toHaveClass(/active/);
    await expect(page.locator('.wizard-step[data-step="result"]')).not.toHaveClass(/active/);
    await expect(page.locator('.wizard-opt.selected')).toHaveCount(0);
  });

  test('18. Generic CTA Opens Proposal Modal Without Stale Scope Summary', async ({ page }) => {
    await page.goto(fileUrl);
    const proposalModal = page.locator('#proposalModal');
    const summaryBox = page.locator('#proposalScopeSummary');

    await page.locator('#estReqProposalBtn').click();
    await expect(summaryBox).toBeVisible();
    await page.locator('#modalCloseBtn').click();
    await expect(proposalModal).not.toHaveClass(/active/);

    await page.locator('#heroTalkExpertBtn').click();
    await expect(proposalModal).toHaveClass(/active/);
    await expect(summaryBox).toHaveClass(/hidden/);
  });

  test('19. Ask Navi Renders User Input as Plain Text', async ({ page }) => {
    await page.goto(fileUrl);
    const payload = '<img src=x onerror="window.__xss=1">';

    await page.locator('#askNaviTrigger').click();
    await page.locator('#naviInput').fill(payload);
    await page.locator('#naviInput').press('Enter');

    const userMsg = page.locator('.navi-msg-user').last();
    await expect(userMsg).toHaveText(payload);
    await expect(userMsg.locator('img')).toHaveCount(0);
    expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  });

  test('20. Escape Key Closes Open Modals', async ({ page }) => {
    await page.goto(fileUrl);

    const complianceModal = page.locator('#complianceModal');
    await page.locator('.trust-badge-item').first().click();
    await expect(complianceModal).toHaveClass(/active/);
    await page.keyboard.press('Escape');
    await expect(complianceModal).not.toHaveClass(/active/);

    const proposalModal = page.locator('#proposalModal');
    await page.locator('#heroTalkExpertBtn').click();
    await expect(proposalModal).toHaveClass(/active/);
    await page.keyboard.press('Escape');
    await expect(proposalModal).not.toHaveClass(/active/);
  });

  test('21. Ask Navi Trigger Is Keyboard Accessible', async ({ page }) => {
    await page.goto(fileUrl);
    const trigger = page.locator('#askNaviTrigger');
    const drawer = page.locator('#askNaviDrawer');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(drawer).toHaveClass(/active/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveClass(/active/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('22. Mobile Navigation Menu Opens, Lists Sections & Industries, and Closes on Link Tap', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(fileUrl);

    const menuBtn = page.locator('#mobileMenuBtn');
    const menu = page.locator('#mobileMenu');
    await expect(page.locator('#main-nav nav')).toBeHidden();
    await expect(menuBtn).toBeVisible();
    await expect(menu).toBeHidden();

    await menuBtn.click();
    await expect(menu).toHaveClass(/open/);
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('link', { name: 'Products' })).toBeVisible();

    await menu.locator('summary').click();
    await expect(menu.locator('.industry-dropdown-item[data-domain="Energy & Utilities"]')).toBeVisible();

    await menu.getByRole('link', { name: 'Products' }).click();
    await expect(menu).not.toHaveClass(/open/);
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('23. Header Scroll Progress Bar Fills and Active Nav Link Tracks Current Section', async ({ page }) => {
    await page.goto(fileUrl);
    const progress = page.locator('#headerProgress');
    await expect(progress).toBeAttached();

    await page.evaluate(() => document.getElementById('products').scrollIntoView({ block: 'start' }));

    await expect.poll(() => progress.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeGreaterThan(0);
    await expect(page.locator('#main-nav nav a[href="#products"]')).toHaveClass(/nav-active/);
  });

  test('24. Ask Navi Shows Typing Indicator Before Responding', async ({ page }) => {
    await page.goto(fileUrl);
    const chatBody = page.locator('#naviChatBody');

    await page.locator('#askNaviTrigger').click();
    await page.locator('.navi-chip[data-query="QForce AI Demo"]').click();

    await expect(chatBody.locator('.navi-typing')).toBeVisible();
    await expect(chatBody).toContainText('Self-healing test automation engine');
    await expect(chatBody.locator('.navi-typing')).toHaveCount(0);
  });

  test('25. Hero Headline Word Reveal Preserves Exact PRD Positioning Copy', async ({ page }) => {
    await page.goto(fileUrl);
    const headline = page.locator('#hero h1');

    await expect(headline).toHaveText('AI. Quality Engineering. Digital Transformation. Built to Scale at Speed.');
    await expect(headline.locator('.hero-sweep')).toHaveText('Built to Scale at Speed.');
  });

  test('26. Scope Configurator Updates US/India Split, Squad Matrix & Proposal Summary', async ({ page }) => {
    await page.goto(fileUrl);
    const section = page.locator('#estimator');

    await section.locator('label.est-seg', { hasText: 'Offshore (India)' }).click();
    await expect(page.locator('#estOnshoreCount')).toHaveText('1');
    await expect(page.locator('#estOffshoreCount')).toHaveText('4');
    await expect(page.locator('#estCoverage')).toContainText('IST');

    await section.locator('label.est-tile', { hasText: 'Quality Engineering' }).click();
    await expect(page.locator('#estSquadBreakdown')).toContainText('Test Automation Engineer');

    await section.locator('.estimator-toggle-btn[data-compliance="HIPAA PHI"]').click();
    await expect(page.locator('#estGovernance')).toHaveText('HIPAA PHI');
    await expect(section.locator('.squad-slot.active')).toHaveCount(5);

    await page.locator('#estReqProposalBtn').click();
    const summary = page.locator('#proposalScopeSummary');
    await expect(summary).toContainText('Offshore (India)');
    await expect(summary).toContainText('HIPAA PHI');
    await expect(summary).toContainText('5 Engineers');
  });

  test('27. Cross-Border Culture Band Shows Live Dallas & Hyderabad Clocks', async ({ page }) => {
    await page.goto(fileUrl);
    const strip = page.locator('.culture-strip');

    await expect(strip).toContainText('Built by Engineers, Led by Veterans');
    await expect(strip.locator('.culture-card')).toHaveCount(2);

    const clocks = strip.locator('.culture-clock');
    await expect(clocks).toHaveCount(2);
    for (const clock of await clocks.all()) {
      await expect(clock).toHaveText(/^\d{2}:\d{2}\s?(AM|PM)$/);
    }
  });

  test('28. Final CTA Blueprint Visual Replaces Workshop Photo', async ({ page }) => {
    await page.goto(fileUrl);
    const contact = page.locator('#contact');

    await expect(contact.locator('img[src*="discovery_workshop_session"]')).toHaveCount(0);
    const blueprint = contact.locator('.blueprint-card');
    await expect(blueprint).toContainText('Architecture Alignment Session');
    await expect(blueprint).toContainText('Granular technical scoping, stack feasibility & budget estimation');
    await expect(blueprint.locator('.blueprint-step')).toHaveCount(3);
  });

  test('29. Share Metadata & Favicon Present, No Internal Document Jargon in Page Copy', async ({ page }) => {
    await page.goto(fileUrl);

    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /nforce_logo/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /AI, Quality Engineering/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /NForce One/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /hero_visual/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

    const pageText = await page.evaluate(() => document.body.textContent);
    expect(pageText).not.toMatch(/PRD|Appendix A/);

    await page.locator('#case-telecom .open-case-modal').click();
    await expect(page.locator('#caseModalCategory')).toHaveText('Representative Engagement Blueprint');
  });

  test('30. Ask Navi Captures Lead Details Only With Explicit Consent', async ({ page }) => {
    await page.goto(fileUrl);
    const drawer = page.locator('#askNaviDrawer');

    await page.locator('#askNaviTrigger').click();
    await drawer.locator('.navi-chip[data-query="Talk to an Architect"]').click();

    const form = drawer.locator('.navi-lead-form');
    await expect(form).toBeVisible();
    await form.locator('input[name="name"]').fill('Jordan Lee');
    await form.locator('input[name="company"]').fill('Acme Telecom');
    await form.locator('input[name="email"]').fill('jordan@acme.com');
    await form.locator('select[name="interest"]').selectOption('Telecom Transformation');

    await form.locator('button[type="submit"]').click();
    await expect(form).toBeVisible();
    await expect(drawer.locator('.navi-lead-done')).toHaveCount(0);

    await form.locator('input[name="consent"]').check();
    await form.locator('button[type="submit"]').click();

    const confirmation = drawer.locator('.navi-lead-done');
    await expect(confirmation).toContainText('Thanks, Jordan Lee!');
    await expect(confirmation).toContainText('jordan@acme.com');
    await expect(drawer.locator('.navi-lead-form')).toHaveCount(0);
  });

  test('31. Consolidated Layout, Two Hero CTAs & No Unverified Claims in Page Copy', async ({ page }) => {
    await page.goto(fileUrl);

    // Matrix now lives inside Capabilities; engagement, process and culture inside How We Deliver.
    await expect(page.locator('#capabilities #matrix')).toHaveCount(1);
    await expect(page.locator('#delivery #engagement')).toHaveCount(1);
    await expect(page.locator('#delivery #process')).toHaveCount(1);
    await expect(page.locator('#delivery .culture-strip')).toHaveCount(1);

    // Hero carries exactly two calls to action
    await expect(page.locator('#hero a, #hero button')).toHaveCount(2);

    // Pulsing indicators are reserved for genuinely live elements (clocks, live blueprint output)
    await expect(page.locator('main .animate-pulse, main .animate-ping')).toHaveCount(0);

    const pageText = await page.evaluate(() => document.body.textContent);
    expect(pageText).not.toMatch(/99\.9|\$4\.8M|50,000|3\.5x|Certified Partner|Security Certified|Audit Verified|HIPAA Compliant|NForceOne/);
  });

});

