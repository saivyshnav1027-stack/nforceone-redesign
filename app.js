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

  // 7. US-306: Bespoke 3D Perspective Card Tilt & Specular Sheen
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // subtle max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 8. US-405: Product Demo Triggers
  document.querySelectorAll('.prod-demo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const prodName = this.getAttribute('data-product') || 'Enterprise Accelerator';
      openProposalWithSummary(`Requested Platform Demo: ${prodName} Architecture & Live Evaluation`);
    });
  });

  // 9. US-501 & US-507: Persistent "Ask Navi" AI Website Assistant
  const askNaviTrigger = document.getElementById('askNaviTrigger');
  const askNaviDrawer = document.getElementById('askNaviDrawer');
  const closeNaviDrawer = document.getElementById('closeNaviDrawer');
  const naviChatBody = document.getElementById('naviChatBody');
  const naviChatForm = document.getElementById('naviChatForm');
  const naviInput = document.getElementById('naviInput');

  if (askNaviTrigger && askNaviDrawer) {
    askNaviTrigger.addEventListener('click', () => {
      askNaviDrawer.classList.toggle('active');
      if (askNaviDrawer.classList.contains('active') && naviInput) {
        naviInput.focus();
      }
    });
  }

  if (closeNaviDrawer && askNaviDrawer) {
    closeNaviDrawer.addEventListener('click', () => {
      askNaviDrawer.classList.remove('active');
    });
  }

  // Keyboard shortcut Esc closes Ask Navi
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && askNaviDrawer && askNaviDrawer.classList.contains('active')) {
      askNaviDrawer.classList.remove('active');
    }
  });

  // Grounded PRD v1.3 Knowledge Responses
  function generateNaviResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes('telecom') || q.includes('oss') || q.includes('bss')) {
      return `<strong>Telecom Domain Strength:</strong> NForce One specializes in mission-critical communications engineering. Our key pillars include:
      <ul class="list-disc list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>OSS/BSS Modernization:</strong> Order orchestration, rating & billing validation without revenue leakage.</li>
        <li><strong>End-to-End Telecom QA:</strong> SIT testing, protocol validation, and carrier regression suites.</li>
        <li><strong>CX Voice AI:</strong> Sub-300ms conversational latency with automated call journey testing.</li>
        <li><strong>Network Operations:</strong> NOC triage automation and field technician dispatch optimization.</li>
      </ul>
      <button class="open-proposal-modal text-primary font-bold text-xs mt-2 underline block">Discuss Telecom Transformation →</button>`;
    }

    if (q.includes('qforce') || q.includes('demo') || q.includes('product') || q.includes('accelerator')) {
      return `<strong>NForce One Innovation Suite:</strong> Our flagship platforms include:
      <ul class="list-disc list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>QForce AI:</strong> Self-healing test automation engine that cuts test maintenance overhead by 60%.</li>
        <li><strong>AIKTRA:</strong> Enterprise Agentic AI orchestration framework with RAG workflows.</li>
        <li><strong>Pulse:</strong> Real-time operational observability & SLA telemetry.</li>
        <li><strong>FlightOps:</strong> GitOps release governance & automated CI/CD gating.</li>
      </ul>
      <button class="open-proposal-modal text-primary font-bold text-xs mt-2 underline block">Request a Live Platform Demo →</button>`;
    }

    if (q.includes('four') || q.includes('pillar') || q.includes('capability') || q.includes('service')) {
      return `<strong>Our Four Capability Pillars:</strong>
      <ol class="list-decimal list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>AI & Agentic Solutions:</strong> Agentic AI, GenAI, Enterprise RAG, and Voice AI.</li>
        <li><strong>Quality Engineering & AI Assurance:</strong> Functional E2E, LLM Evaluation, Hallucination QA, and Security Audits.</li>
        <li><strong>Digital Engineering:</strong> Application Modernization, Cloud-Native APIs, and Microservices.</li>
        <li><strong>Data Cloud & Platforms:</strong> AWS/Azure/GCP Cloud, Pega PRPC, and automated MLOps.</li>
      </ol>
      <a href="#capabilities" class="text-primary font-bold text-xs mt-2 underline block">Explore All Pillars On-Page →</a>`;
    }

    if (q.includes('delivery') || q.includes('india') || q.includes('onshore') || q.includes('hybrid') || q.includes('model')) {
      return `<strong>US + India Global Delivery Models:</strong>
      <ul class="list-disc list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>Onshore (US):</strong> Strategic architecture leadership, client collaboration, and compliance oversight.</li>
        <li><strong>Offshore (India Hub):</strong> High-velocity engineering labs in Hyderabad & Bengaluru (up to 40% cost optimization).</li>
        <li><strong>Hybrid Follow-the-Sun:</strong> 24-hour continuous development & testing cycles.</li>
      </ul>
      Contracting options: Dedicated Managed Capacity, SOW Milestones, or Agile T&M.`;
    }

    if (q.includes('pega')) {
      return `<strong>Pega Enterprise Platform Expertise:</strong> NForce One engineers have extensive experience in Pega PRPC rule configuration, case management workflows, Pega Infinity upgrades, and automated Pega Unit QA.`;
    }

    // Default Fallback
    return `NForce One is an enterprise technology and delivery partner (20+ years leadership). We deliver <strong>AI & Agentic Solutions</strong>, <strong>Quality Engineering</strong>, <strong>Digital Modernization</strong>, and <strong>Carrier Telecom Systems</strong>.
    <br><br>Would you like to speak directly with a Solutions Architect?
    <button class="open-proposal-modal text-primary font-bold text-xs mt-2 underline block">Connect with a Human Architect →</button>`;
  }

  function appendMessage(text, isUser = false) {
    if (!naviChatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `navi-msg ${isUser ? 'navi-msg-user' : 'navi-msg-bot'}`;
    msgDiv.innerHTML = text;
    naviChatBody.appendChild(msgDiv);
    naviChatBody.scrollTop = naviChatBody.scrollHeight;

    // Attach click listener to any newly added proposal modal buttons inside bot messages
    msgDiv.querySelectorAll('.open-proposal-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (askNaviDrawer) askNaviDrawer.classList.remove('active');
        if (proposalModal) proposalModal.classList.add('active');
      });
    });
  }

  if (naviChatForm && naviInput) {
    naviChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = naviInput.value.trim();
      if (!query) return;

      appendMessage(query, true);
      naviInput.value = '';

      setTimeout(() => {
        const response = generateNaviResponse(query);
        appendMessage(response, false);
      }, 400);
    });
  }

  // Handle Quick Discovery Chips
  document.querySelectorAll('.navi-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      const q = this.getAttribute('data-query');
      appendMessage(q, true);
      setTimeout(() => {
        const response = generateNaviResponse(q);
        appendMessage(response, false);
      }, 350);
    });
  });
});

