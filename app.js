// NForceOne Master Executive Interactive Suite Script
document.addEventListener('DOMContentLoaded', () => {
  console.log('NForceOne Master Executive UI Initialized.');

  const siteHeader = document.getElementById('main-nav');
  const proposalModal = document.getElementById('proposalModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const solutionWizardModal = document.getElementById('solutionWizardModal');
  const complianceModal = document.getElementById('complianceModal');

  // Sticky Header dynamics
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('shadow-md');
      } else {
        siteHeader.classList.remove('shadow-md');
      }
    });
  }

  // Smooth scroll for all hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Industry Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const industryItems = document.querySelectorAll('.industry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-on-background', 'text-white');
        b.classList.add('bg-surface', 'text-muted-charcoal');
      });
      btn.classList.remove('bg-surface', 'text-muted-charcoal');
      btn.classList.add('bg-on-background', 'text-white');

      const filterValue = btn.getAttribute('data-filter');
      industryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 1. Solution Match Wizard Logic
  const openWizardBtn = document.getElementById('openWizardBtn');
  const wizardCloseBtn = document.getElementById('wizardCloseBtn');
  const wizardSteps = document.querySelectorAll('.wizard-step');
  let currentStep = 1;
  const wizardData = { goal: '', scale: '', challenge: '' };

  if (openWizardBtn && solutionWizardModal) {
    openWizardBtn.addEventListener('click', () => {
      solutionWizardModal.classList.add('active');
    });
  }
  if (wizardCloseBtn && solutionWizardModal) {
    wizardCloseBtn.addEventListener('click', () => {
      solutionWizardModal.classList.remove('active');
    });
  }

  document.querySelectorAll('.wizard-opt').forEach(opt => {
    opt.addEventListener('click', function() {
      const step = this.closest('.wizard-step').getAttribute('data-step');
      const value = this.getAttribute('data-val');
      
      this.closest('.wizard-step').querySelectorAll('.wizard-opt').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');

      if (step === '1') wizardData.goal = value;
      if (step === '2') wizardData.scale = value;
      if (step === '3') wizardData.challenge = value;

      setTimeout(() => {
        if (step === '1') goToWizardStep(2);
        else if (step === '2') goToWizardStep(3);
        else if (step === '3') showWizardResults();
      }, 250);
    });
  });

  function goToWizardStep(stepNum) {
    currentStep = stepNum;
    wizardSteps.forEach(s => s.classList.remove('active'));
    const target = document.querySelector(`.wizard-step[data-step="${stepNum}"]`);
    if (target) target.classList.add('active');
  }

  function showWizardResults() {
    wizardSteps.forEach(s => s.classList.remove('active'));
    const resStep = document.querySelector('.wizard-step[data-step="result"]');
    if (resStep) {
      resStep.classList.add('active');
      document.getElementById('resGoalText').textContent = wizardData.goal || 'IT Modernization';
      document.getElementById('resScaleText').textContent = wizardData.scale || 'Enterprise Squad';
      document.getElementById('resChallengeText').textContent = wizardData.challenge || 'Security & Velocity';
    }
  }

  const applyWizardToProposal = document.getElementById('applyWizardToProposal');
  if (applyWizardToProposal) {
    applyWizardToProposal.addEventListener('click', () => {
      if (solutionWizardModal) solutionWizardModal.classList.remove('active');
      openProposalWithSummary(`Recommended Solution Blueprint: ${wizardData.goal || 'Modernization'} for ${wizardData.scale || 'Growth'} (${wizardData.challenge || 'Security'} Focus)`);
    });
  }

  // 2. Compliance Trust Bar Popover Handler
  document.querySelectorAll('.trust-badge-item').forEach(badge => {
    badge.addEventListener('click', function() {
      const title = this.getAttribute('data-title') || 'Compliance Verification';
      const desc = this.getAttribute('data-desc') || 'Full audit verification details available upon request.';
      
      const compTitle = document.getElementById('complianceTitle');
      const compDesc = document.getElementById('complianceDesc');
      if (compTitle) compTitle.textContent = title;
      if (compDesc) compDesc.textContent = desc;
      if (complianceModal) complianceModal.classList.add('active');
    });
  });

  const complianceCloseBtn = document.getElementById('complianceCloseBtn');
  if (complianceCloseBtn && complianceModal) {
    complianceCloseBtn.addEventListener('click', () => complianceModal.classList.remove('active'));
    complianceModal.addEventListener('click', (e) => {
      if (e.target === complianceModal) complianceModal.classList.remove('active');
    });
  }

  // 3. Technology & Testing Matrix Tab Switcher
  const matrixTabBtns = document.querySelectorAll('.matrix-tab-btn');
  const matrixCards = document.querySelectorAll('.matrix-card');

  matrixTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      matrixTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-category');

      matrixCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. 5-Stage Delivery Process Accordion Expanders
  document.querySelectorAll('.timeline-stage-card').forEach(card => {
    card.addEventListener('click', function() {
      const isExpanded = this.classList.contains('expanded');
      document.querySelectorAll('.timeline-stage-card').forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        this.classList.add('expanded');
      }
    });
  });

  // 5. IT Project Scope & Estimator Calculator
  const estPillar = document.getElementById('estPillar');
  const estTeamSlider = document.getElementById('estTeamSlider');
  const estTeamVal = document.getElementById('estTeamVal');
  const estWeeks = document.getElementById('estWeeks');
  const estSquadBreakdown = document.getElementById('estSquadBreakdown');
  const estReqProposalBtn = document.getElementById('estReqProposalBtn');

  function updateEstimator() {
    if (!estPillar || !estTeamSlider) return;
    const teamSize = parseInt(estTeamSlider.value);
    if (estTeamVal) estTeamVal.textContent = `${teamSize} Specialist${teamSize > 1 ? 's' : ''}`;

    let weeks = Math.max(3, Math.ceil(12 - teamSize * 0.8));
    if (estWeeks) estWeeks.textContent = `${weeks} - ${weeks + 2} Weeks`;

    const pillar = estPillar.value;
    let squad = '';
    if (pillar.includes('Cloud')) squad = `1 Cloud Architect, ${Math.max(1, Math.floor(teamSize/2))} DevOps Engineers, 1 Security Specialist`;
    else if (pillar.includes('QA')) squad = `1 QA Lead, ${Math.max(1, teamSize - 1)} Test Automation Engineers`;
    else squad = `1 Solutions Architect, ${Math.max(1, teamSize - 1)} Full-Stack/Pega Engineers`;

    if (estSquadBreakdown) estSquadBreakdown.textContent = squad;
  }

  if (estTeamSlider) estTeamSlider.addEventListener('input', updateEstimator);
  if (estPillar) estPillar.addEventListener('change', updateEstimator);
  updateEstimator();

  if (estReqProposalBtn) {
    estReqProposalBtn.addEventListener('click', () => {
      const pillar = estPillar ? estPillar.value : 'IT Modernization';
      const team = estTeamSlider ? estTeamSlider.value : '5';
      const timeline = estWeeks ? estWeeks.textContent : '4-6 Weeks';
      openProposalWithSummary(`Estimated Scope: ${pillar} (${team} Engineers, Estimated Delivery: ${timeline})`);
    });
  }

  // Helper to open Proposal Modal with custom summary context
  function openProposalWithSummary(summaryText) {
    if (proposalModal) {
      proposalModal.classList.add('active');
      const summaryBox = document.getElementById('proposalScopeSummary');
      if (summaryBox) {
        summaryBox.textContent = summaryText;
        summaryBox.classList.remove('hidden');
      }
    }
  }

  // General Proposal Modal Triggers
  document.querySelectorAll('.open-proposal-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (proposalModal) {
        proposalModal.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && proposalModal) {
    modalCloseBtn.addEventListener('click', () => proposalModal.classList.remove('active'));
    proposalModal.addEventListener('click', (e) => {
      if (e.target === proposalModal) proposalModal.classList.remove('active');
    });
  }

  // 6. Dynamic Counter Animations
  const counterElements = document.querySelectorAll('.metric-count');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const step = target / 40;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = `${prefix}${Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}${suffix}`;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }
});
