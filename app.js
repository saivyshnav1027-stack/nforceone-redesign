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

  // 3. Technology & Testing Matrix Tab Switcher & 3D Interactive Motion
  const matrixTabBtns = document.querySelectorAll('.matrix-tab-btn');
  const matrixCards = document.querySelectorAll('.matrix-card');

  matrixTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      matrixTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-category');

      matrixCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
          card.classList.remove('matrix-card-fade');
          void card.offsetWidth; // trigger reflow for smooth animation
          card.classList.add('matrix-card-fade');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3D Perspective Tilt & Cursor Spotlight tracking for Matrix Cards
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    matrixCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = -deltaY * 7;
        const rotateY = deltaX * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 4. 5-Stage Delivery Process Interactive Framework & Scroll Motion
  const stageCards = document.querySelectorAll('.timeline-stage-card');
  const stagePills = document.querySelectorAll('.stage-nav-pill');
  const spineBeam = document.getElementById('timelineSpineBeam');

  function setActiveStage(index, scrollIntoView = false) {
    stagePills.forEach((pill, idx) => {
      if (idx === index) {
        pill.classList.add('active');
        pill.classList.remove('border-border-light', 'bg-surface', 'text-muted-charcoal');
        pill.classList.add('border-primary', 'bg-primary', 'text-white');
      } else {
        pill.classList.remove('active', 'border-primary', 'bg-primary', 'text-white');
        pill.classList.add('border-border-light', 'bg-surface', 'text-muted-charcoal');
      }
    });

    if (spineBeam) {
      const heights = ['20%', '40%', '60%', '80%', '100%'];
      spineBeam.style.height = heights[index] || '20%';
    }

    if (scrollIntoView && stageCards[index]) {
      stageCards.forEach(c => c.classList.remove('expanded'));
      stageCards[index].classList.add('expanded');
      stageCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Accordion toggle on cards
  stageCards.forEach((card, idx) => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.timeline-details')) return;
      const isExpanded = this.classList.contains('expanded');
      stageCards.forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        this.classList.add('expanded');
        setActiveStage(idx, false);
      }
    });
  });

  // Quick Scrubber pill clicks
  stagePills.forEach((pill, idx) => {
    pill.addEventListener('click', function() {
      setActiveStage(idx, true);
    });
  });

  // Scroll-spy observer for stage cards
  if ('IntersectionObserver' in window && stageCards.length > 0) {
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stageIdx = parseInt(entry.target.getAttribute('data-stage-idx') || '0');
          setActiveStage(stageIdx, false);
        }
      });
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    });

    stageCards.forEach(card => stageObserver.observe(card));
  }

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

  // Estimator Compliance Toggle Buttons
  document.querySelectorAll('.estimator-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.estimator-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

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

  // Industries Header Dropdown Interactivity
  const indDropdownBtn = document.getElementById('industriesDropdownBtn');
  const indDropdownMenu = document.getElementById('industriesDropdownMenu');
  const indDropdownContainer = document.getElementById('industriesDropdownContainer');

  if (indDropdownBtn && indDropdownMenu) {
    indDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      indDropdownMenu.classList.toggle('open');
      const isOpen = indDropdownMenu.classList.contains('open');
      indDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (indDropdownContainer && !indDropdownContainer.contains(e.target)) {
        indDropdownMenu.classList.remove('open');
        indDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && indDropdownMenu.classList.contains('open')) {
        indDropdownMenu.classList.remove('open');
        indDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Industry Dropdown Items: Pre-populate Proposal Modal Context
  document.querySelectorAll('.industry-dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const domain = this.getAttribute('data-domain');
      if (indDropdownMenu) {
        indDropdownMenu.classList.remove('open');
      }
      if (domain) {
        e.preventDefault();
        openProposalWithSummary(`Industry Architecture Assessment: ${domain} (Enterprise Domain Practice)`);
      }
    });
  });

  // 6. Dynamic Counter Animations (Synchronized across all 4 metric boxes)
  const counterElements = document.querySelectorAll('.metric-count');
  if (counterElements.length > 0) {
    const metricsContainer = document.querySelector('.hero-metrics-container') || counterElements[0].closest('section') || document.body;
    let animated = false;

    function startSynchronizedCounters() {
      if (animated) return;
      animated = true;

      // Honor prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        counterElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          el.textContent = `${prefix}${Number.isInteger(target) ? target : target.toFixed(1)}${suffix}`;
        });
        return;
      }

      const duration = 1500; // Exact same duration for all 4
      const startTime = performance.now();

      function tick(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth easeOutCubic curve
        const ease = 1 - Math.pow(1 - progress, 3);

        counterElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const currentVal = target * ease;

          el.textContent = `${prefix}${Number.isInteger(target) ? Math.floor(currentVal) : currentVal.toFixed(1)}${suffix}`;
        });

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          // Final exact values
          counterElements.forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            el.textContent = `${prefix}${Number.isInteger(target) ? target : target.toFixed(1)}${suffix}`;
          });
        }
      }

      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startSynchronizedCounters();
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });

      counterObserver.observe(metricsContainer);
    } else {
      startSynchronizedCounters();
    }
  }

  // 7. US-306: Bespoke 3D Perspective Card Tilt & Specular Sheen
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    const isTelecom = card.classList.contains('telecom-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (!isTelecom) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // subtle max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!isTelecom) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
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

  // Case Studies & Appendix A Blueprint Logic (US-602, US-603)
  const caseStudyTabs = document.querySelectorAll('.case-study-tab');
  const caseStudyPanels = document.querySelectorAll('.case-study-panel');
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseModalCloseBtn = document.getElementById('caseModalCloseBtn');

  const caseData = {
    telecom: {
      badge: 'Tier-1 US Telecom Operator',
      category: 'Appendix A Architecture Specification',
      title: 'Zero-Downtime Billing Modernization & Automated SIT Protocol Testing',
      delivery: 'Hybrid Follow-the-Sun',
      squad: '24 Engineers (US + IN)',
      timeline: '6 Months Cutover',
      metric: '99.99% Uptime',
      solution: 'Re-architected billing mediation into containerized microservices orchestrated on AWS EKS with Apache Kafka for real-time CDR stream ingestion. Deployed QForce AI to generate 8,500+ automated SIT scenarios, validating subscriber rating engines with zero billing leakage.',
      qa: 'Integrated automated nightly regression suites spanning 5G interface protocols, rating mediation edge cases, and CRM subscriber sync. System integration testing turnaround reduced from 28 days to under 48 hours.',
      value: 'Prevented an estimated $4.8M in annual revenue leakage, achieved zero customer-impacting outages during migration, and cut recurring QA overhead by 68%.'
    },
    fintech: {
      badge: 'Global FinTech Processor',
      category: 'Appendix A Architecture Specification',
      title: 'PCI-DSS Level 1 Cloud Migration & 50,000 TPS Load Architecture',
      delivery: 'Onshore + Dedicated Offshore CoE',
      squad: '18 Engineers (US + IN)',
      timeline: '4 Months Migration',
      metric: '50,000 Peak TPS',
      solution: 'Architected an event-driven serverless payment authorization engine utilizing Apache Kafka and multi-region AWS Aurora. Encrypted all transactions with hardware security module (HSM) tokenization adhering to PCI-DSS Level 1 protocols.',
      qa: 'Engineered distributed Gatling and JMeter performance suites simulating 100,000 concurrent payment flows. Implemented FlightOps automated security compliance gates in CI/CD pipeline.',
      value: 'Sustained 50,000 peak TPS during holiday peak volume with zero transaction drops. Cut release deployment cycle times by 45% and passed independent PCI audits with zero findings.'
    },
    healthtech: {
      badge: 'Enterprise HealthTech Enterprise',
      category: 'Appendix A Architecture Specification',
      title: 'HIPAA-Compliant Patient Portal & Automated AI Diagnostic Testing',
      delivery: 'Managed Engineering Capacity',
      squad: '14 Engineers (US + IN)',
      timeline: '5 Months Hardening',
      metric: '60% Maintenance Saved',
      solution: 'Modernized EHR patient workflows into scalable Azure Health Data microservices. Configured synthetic FHIR/HL7 test data generators to guarantee zero protected health information (PHI) exposure during automated staging tests.',
      qa: 'Deployed QForce AI self-healing QA engines that adaptively update broken UI selectors during continuous clinical portal updates, eliminating fragile test failures.',
      value: 'Saved 60% of recurring QA maintenance hours, increased sprint deployment velocity by 3.5x, and passed rigorous HIPAA and SOC2 Type II audits flawlessly.'
    }
  };

  caseStudyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCase = tab.getAttribute('data-case');

      caseStudyTabs.forEach(t => {
        t.classList.remove('active', 'border-primary', 'text-primary');
        t.classList.add('border-transparent', 'text-muted-charcoal');
      });
      tab.classList.add('active', 'border-primary', 'text-primary');
      tab.classList.remove('border-transparent', 'text-muted-charcoal');

      caseStudyPanels.forEach(panel => {
        if (panel.id === `case-${targetCase}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  document.querySelectorAll('.open-case-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseKey = btn.getAttribute('data-case');
      const data = caseData[caseKey];
      if (data && caseStudyModal) {
        document.getElementById('caseModalBadge').textContent = data.badge;
        document.getElementById('caseModalCategory').textContent = data.category;
        document.getElementById('caseModalTitle').textContent = data.title;
        document.getElementById('caseModalDelivery').textContent = data.delivery;
        document.getElementById('caseModalSquad').textContent = data.squad;
        document.getElementById('caseModalTimeline').textContent = data.timeline;
        document.getElementById('caseModalMetric').textContent = data.metric;
        document.getElementById('caseModalSolutionText').textContent = data.solution;
        document.getElementById('caseModalQAText').textContent = data.qa;
        document.getElementById('caseModalValueText').textContent = data.value;

        caseStudyModal.classList.add('active');
      }
    });
  });

  if (caseModalCloseBtn && caseStudyModal) {
    caseModalCloseBtn.addEventListener('click', () => {
      caseStudyModal.classList.remove('active');
    });
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        caseStudyModal.classList.remove('active');
      }
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

  // ==========================================================================
  // Global Scroll-Reveal Engine (IntersectionObserver)
  // ==========================================================================
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, stop observing for perf
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -4% 0px',
      threshold: 0.02
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-heading-reveal').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately for browsers without IO support
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-heading-reveal').forEach(el => {
      el.classList.add('visible');
    });
  }
});
