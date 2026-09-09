const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe('NForceOne B2B Executive Website UI & Interactivity Tests', () => {

  test('1. Page Title, Header & Navigation Elements Load Correctly', async ({ page }) => {
    await page.goto(fileUrl);

    // Verify Title
    await expect(page).toHaveTitle(/NForceOne — Scale at Speed/);

    // Verify Navigation elements
    const logo = page.locator('header img[alt="NForceOne Logo"]');
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

    // Click first badge (SOC2 Type II)
    await trustBadges.first().click();

    const complianceModal = page.locator('#complianceModal');
    await expect(complianceModal).toHaveClass(/active/);

    const compTitle = page.locator('#complianceTitle');
    await expect(compTitle).toContainText('SOC2 Type II');

    // Close compliance modal
    await page.locator('#complianceCloseBtn').click();
    await expect(complianceModal).not.toHaveClass(/active/);
  });

  test('4. Technology & Testing Matrix Filter Tabs Work Seamlessly', async ({ page }) => {
    await page.goto(fileUrl);

    const allTab = page.locator('button[data-category="all"]');
    const testingTypeTab = page.locator('button[data-category="testing-type"]');
    const engineeringTab = page.locator('button[data-category="engineering"]');

    await expect(allTab).toHaveClass(/active/);

    // Switch to Testing Types
    await testingTypeTab.click();
    await expect(testingTypeTab).toHaveClass(/active/);

    const visibleTypeCards = page.locator('.matrix-card[data-cat="testing-type"]');
    await expect(visibleTypeCards.first()).toBeVisible();

    // Switch to Engineering & AI
    await engineeringTab.click();
    await expect(engineeringTab).toHaveClass(/active/);

    const visibleEngCards = page.locator('.matrix-card[data-cat="engineering"]');
    await expect(visibleEngCards.first()).toBeVisible();
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
    await expect(page.locator('#hero')).toContainText('Cloud SLA Uptime');
    await expect(page.locator('#hero')).toContainText('Faster QA Cycles');
    await expect(page.locator('#hero')).toContainText('Deployments Completed');
    await expect(page.locator('#hero')).toContainText('Active Security Operations');
  });

  test('9. Four Capability Pillars Section Displays All 4 PRD Pillars', async ({ page }) => {
    await page.goto(fileUrl);

    const capSection = page.locator('#capabilities');
    await expect(capSection).toBeVisible();

    await expect(page.getByRole('heading', { name: 'AI & Agentic Solutions' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quality Engineering & AI Assurance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Digital Engineering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Cloud & Platforms' })).toBeVisible();
  });

  test('10. Dedicated Telecom Domain Showcase Displays 4 Carrier Pillars & Tilt Cards', async ({ page }) => {
    await page.goto(fileUrl);

    const telecomSection = page.locator('#telecom');
    await expect(telecomSection).toBeVisible();

    await expect(telecomSection.getByText('OSS/BSS Transformation')).toBeVisible();
    await expect(telecomSection.getByText('End-to-End Telecom QA')).toBeVisible();
    await expect(telecomSection.getByText('Telecom CX & Voice AI')).toBeVisible();
    await expect(telecomSection.getByText('Network Ops & Field AI')).toBeVisible();

    const tiltCards = telecomSection.locator('.tilt-card');
    await expect(tiltCards).toHaveCount(4);
  });

  test('11. Innovation & Products Suite Displays QForce AI and Triggers Demo Flow', async ({ page }) => {
    await page.goto(fileUrl);

    const prodSection = page.locator('#products');
    await expect(prodSection).toBeVisible();

    await expect(prodSection.getByRole('heading', { name: 'QForce AI' })).toBeVisible();
    await expect(prodSection.getByRole('heading', { name: 'AIKTRA' })).toBeVisible();

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

});

