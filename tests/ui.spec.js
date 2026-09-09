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

  test('2. Hero Section Displays Heading, CTA & Solution Wizard Trigger', async ({ page }) => {
    await page.goto(fileUrl);

    const heading = page.locator('h1');
    await expect(heading).toContainText('Build, secure, and scale the technology your business depends on.');

    const wizardBtn = page.locator('#openWizardBtn');
    await expect(wizardBtn).toBeVisible();

    const estimatorCta = page.getByRole('link', { name: 'Calculate Project Scope' });
    await expect(estimatorCta).toBeVisible();
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
  });

});
