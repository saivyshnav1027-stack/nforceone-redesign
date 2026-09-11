// NForce One interactive site script
document.addEventListener('DOMContentLoaded', () => {
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

  // Header scroll-progress telemetry bar
  const headerProgress = document.getElementById('headerProgress');
  if (headerProgress) {
    let progressTicking = false;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      headerProgress.style.transform = `scaleX(${ratio})`;
      progressTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!progressTicking) {
        progressTicking = true;
        requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }

  // Active section scroll-spy for desktop + mobile nav links
  const navLinks = document.querySelectorAll('#main-nav nav a[href^="#"], #mobileMenu a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length > 0) {
    // Non-nav sections are observed too so the highlight clears when the reader leaves nav sections.
    const spyIds = new Set(['hero', 'trust', 'contact']);
    navLinks.forEach(link => spyIds.add(link.getAttribute('href').slice(1)));

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const activeHref = `#${entry.target.id}`;
        navLinks.forEach(link => link.classList.toggle('nav-active', link.getAttribute('href') === activeHref));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    spyIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) navObserver.observe(section);
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

  const footWizardBtn = document.getElementById('footWizardBtn');

  function openWizard() {
    if (!solutionWizardModal) return;
    wizardData.goal = '';
    wizardData.scale = '';
    wizardData.challenge = '';
    solutionWizardModal.querySelectorAll('.wizard-opt.selected').forEach(o => o.classList.remove('selected'));
    goToWizardStep(1);
    solutionWizardModal.classList.add('active');
  }

  if (openWizardBtn) openWizardBtn.addEventListener('click', openWizard);
  if (footWizardBtn) {
    footWizardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWizard();
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

  // 3. Capabilities view tabs: pillar overview vs. filtered technology & testing matrix
  const matrixTabBtns = document.querySelectorAll('.matrix-tab-btn');
  const matrixCards = document.querySelectorAll('.matrix-card');
  const capPillarsPanel = document.getElementById('capPillarsPanel');
  const matrixPanel = document.getElementById('matrix');

  matrixTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      matrixTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      const cat = this.getAttribute('data-category');

      const showPillars = cat === 'pillars';
      if (capPillarsPanel) capPillarsPanel.classList.toggle('hidden', !showPillars);
      if (matrixPanel) matrixPanel.classList.toggle('hidden', showPillars);
      if (showPillars) return;

      matrixCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
          // Cards start hidden inside the collapsed panel, so the scroll-reveal observer
          // never fires for them; reveal them directly when their tab is opened.
          card.classList.add('visible');
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

  // 5. Scope & Engagement Configurator (pillar, squad scale, delivery model, compliance)
  const estimatorSection = document.getElementById('estimator');
  const estTeamSlider = document.getElementById('estTeamSlider');
  const estTeamVal = document.getElementById('estTeamVal');
  const estWeeks = document.getElementById('estWeeks');
  const estSquadBreakdown = document.getElementById('estSquadBreakdown');
  const estReqProposalBtn = document.getElementById('estReqProposalBtn');
  const estSquadViz = document.getElementById('estSquadViz');
  const estSprintTrack = document.getElementById('estSprintTrack');
  const estSprintNote = document.getElementById('estSprintNote');
  const estOnshoreCount = document.getElementById('estOnshoreCount');
  const estOffshoreCount = document.getElementById('estOffshoreCount');
  const estCoverage = document.getElementById('estCoverage');
  const estGovernance = document.getElementById('estGovernance');
  const estPillarLabel = document.getElementById('estPillarLabel');

  const EST_MAX_TEAM = 15;
  const EST_MAX_SPRINTS = 7;
  const plural = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

  const DELIVERY_PROFILES = {
    'Onshore (US)': { coverage: 'US Business Hours', onshore: team => team, weeksOffset: 0 },
    'Offshore (India)': { coverage: 'IST + US Overlap', onshore: () => 1, weeksOffset: 0 },
    'Hybrid Follow-the-Sun': { coverage: '24h Follow-the-Sun', onshore: team => Math.max(1, Math.round(team * 0.3)), weeksOffset: -1 }
  };

  if (estSquadViz) {
    for (let i = 0; i < EST_MAX_TEAM; i++) {
      const slot = document.createElement('span');
      slot.className = 'squad-slot';
      slot.innerHTML = '<span class="material-symbols-outlined">person</span>';
      slot.style.transitionDelay = `${i * 18}ms`;
      estSquadViz.appendChild(slot);
    }
  }

  if (estSprintTrack) {
    for (let i = 0; i < EST_MAX_SPRINTS; i++) {
      const sprint = document.createElement('span');
      sprint.className = 'sprint-segment';
      sprint.textContent = `S${i + 1}`;
      sprint.style.transitionDelay = `${i * 40}ms`;
      estSprintTrack.appendChild(sprint);
    }
  }

  function getEstChoice(name, fallback) {
    const checked = estimatorSection ? estimatorSection.querySelector(`input[name="${name}"]:checked`) : null;
    return checked ? checked.value : fallback;
  }

  function buildSquad(pillar, teamSize) {
    // "Quality Engineering & AI Assurance" also contains "AI", so it must be matched first.
    if (pillar.includes('Quality')) {
      return `1 QE Lead, ${plural(teamSize - 1, 'Test Automation Engineer')}`;
    }
    if (pillar.includes('Cloud')) {
      const security = teamSize >= 4 ? 1 : 0;
      const devops = Math.max(1, Math.floor((teamSize - 1 - security) / 2));
      const data = teamSize - 1 - security - devops;
      return ['1 Cloud Architect', plural(devops, 'DevOps Engineer'), data > 0 ? plural(data, 'Data Engineer') : '', security ? '1 Security Specialist' : '']
        .filter(Boolean).join(', ');
    }
    if (pillar.includes('AI')) {
      const assurance = teamSize >= 4 ? 1 : 0;
      return ['1 AI Solutions Architect', plural(teamSize - 1 - assurance, 'Agentic AI Engineer'), assurance ? '1 AI Assurance Lead' : '']
        .filter(Boolean).join(', ');
    }
    return `1 Solutions Architect, ${plural(teamSize - 1, 'Full-Stack Engineer')}`;
  }

  function updateEstimator() {
    if (!estTeamSlider) return;
    const teamSize = parseInt(estTeamSlider.value, 10);
    const pillar = getEstChoice('estPillar', 'Digital Engineering');
    const model = getEstChoice('estModel', 'Hybrid Follow-the-Sun');
    const profile = DELIVERY_PROFILES[model] || DELIVERY_PROFILES['Hybrid Follow-the-Sun'];
    const activeCompliance = document.querySelector('.estimator-toggle-btn.active');

    const min = Number(estTeamSlider.min);
    const max = Number(estTeamSlider.max);
    estTeamSlider.style.setProperty('--fill', `${((teamSize - min) / (max - min)) * 100}%`);
    if (estTeamVal) estTeamVal.textContent = plural(teamSize, 'Specialist');

    const weeks = Math.max(3, Math.ceil(12 - teamSize * 0.8) + profile.weeksOffset);
    const timeline = `${weeks} - ${weeks + 2} Weeks`;
    if (estWeeks && estWeeks.textContent !== timeline) {
      estWeeks.textContent = timeline;
      estWeeks.classList.remove('est-flash');
      void estWeeks.offsetWidth; // restart flash animation
      estWeeks.classList.add('est-flash');
    }

    const sprints = Math.min(EST_MAX_SPRINTS, Math.ceil((weeks + 2) / 2));
    if (estSprintTrack) {
      estSprintTrack.querySelectorAll('.sprint-segment').forEach((seg, i) => seg.classList.toggle('active', i < sprints));
    }
    if (estSprintNote) estSprintNote.textContent = `${sprints} two-week sprints with continuous staging deploys`;

    const onshore = Math.min(teamSize, profile.onshore(teamSize));
    if (estOnshoreCount) estOnshoreCount.textContent = onshore;
    if (estOffshoreCount) estOffshoreCount.textContent = teamSize - onshore;
    if (estSquadViz) {
      estSquadViz.querySelectorAll('.squad-slot').forEach((slot, i) => {
        slot.classList.toggle('active', i < teamSize);
        slot.classList.toggle('onshore', i < onshore);
      });
    }

    if (estSquadBreakdown) estSquadBreakdown.textContent = buildSquad(pillar, teamSize);
    if (estPillarLabel) estPillarLabel.textContent = pillar;
    if (estCoverage) estCoverage.textContent = profile.coverage;
    if (estGovernance) estGovernance.textContent = activeCompliance ? activeCompliance.dataset.compliance : 'SOC2 Type II';
  }

  if (estTeamSlider) estTeamSlider.addEventListener('input', updateEstimator);
  if (estimatorSection) {
    estimatorSection.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', updateEstimator));
  }

  document.querySelectorAll('.estimator-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.estimator-toggle-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      updateEstimator();
    });
  });

  updateEstimator();

  if (estReqProposalBtn) {
    estReqProposalBtn.addEventListener('click', () => {
      const pillar = getEstChoice('estPillar', 'Digital Engineering');
      const model = getEstChoice('estModel', 'Hybrid Follow-the-Sun');
      const team = estTeamSlider ? estTeamSlider.value : '5';
      const timeline = estWeeks ? estWeeks.textContent : '';
      const governance = estGovernance ? estGovernance.textContent : '';
      openProposalWithSummary(`Estimated Scope: ${pillar} (${team} Engineers, ${model}, ${governance}, Estimated Delivery: ${timeline})`);
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
  function openProposal() {
    if (!proposalModal) return;
    const summaryBox = document.getElementById('proposalScopeSummary');
    if (summaryBox) summaryBox.classList.add('hidden');
    proposalModal.classList.add('active');
  }

  document.querySelectorAll('.open-proposal-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openProposal();
    });
  });

  if (modalCloseBtn && proposalModal) {
    modalCloseBtn.addEventListener('click', () => proposalModal.classList.remove('active'));
    proposalModal.addEventListener('click', (e) => {
      if (e.target === proposalModal) proposalModal.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

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

  // Mobile Navigation Panel
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');

  function setMobileMenuOpen(isOpen) {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (mobileMenuIcon) mobileMenuIcon.textContent = isOpen ? 'close' : 'menu';
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => setMobileMenuOpen(!mobileMenu.classList.contains('open')));
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) setMobileMenuOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMobileMenuOpen(false);
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

  // Magnetic primary CTAs & cursor spotlight on pillar, product and engagement cards
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (finePointer && !reducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty('--mag-x', `${(offsetX * 0.18).toFixed(1)}px`);
        btn.style.setProperty('--mag-y', `${(offsetY * 0.3).toFixed(1)}px`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });

    document.querySelectorAll('.ambient-card, .product-card-enhanced, .engagement-card-hover').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

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

  function setNaviOpen(isOpen) {
    if (!askNaviDrawer) return;
    askNaviDrawer.classList.toggle('active', isOpen);
    if (askNaviTrigger) askNaviTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen && naviInput) naviInput.focus();
  }

  function closeNavi() {
    setNaviOpen(false);
  }

  if (askNaviTrigger && askNaviDrawer) {
    const toggleNavi = () => setNaviOpen(!askNaviDrawer.classList.contains('active'));
    askNaviTrigger.addEventListener('click', toggleNavi);
    askNaviTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNavi();
      }
    });
  }

  if (closeNaviDrawer) closeNaviDrawer.addEventListener('click', closeNavi);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && askNaviDrawer && askNaviDrawer.classList.contains('active')) {
      closeNavi();
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
        <li><strong>CX Voice AI:</strong> Low-latency conversational journeys with automated call journey testing.</li>
        <li><strong>Network Operations:</strong> NOC triage automation and field technician dispatch optimization.</li>
        <li><strong>Telecom Data & Automation:</strong> Data pipelines, churn prediction, fraud detection and automated provisioning.</li>
      </ul>
      <button class="open-proposal-modal text-primary font-bold text-xs mt-2 underline block">Discuss Telecom Transformation →</button>`;
    }

    if (q.includes('qforce') || q.includes('demo') || q.includes('product') || q.includes('accelerator')) {
      return `<strong>NForce One Innovation Suite:</strong> Our flagship platforms include:
      <ul class="list-disc list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>QForce AI:</strong> Self-healing test automation engine designed to reduce test maintenance effort.</li>
        <li><strong>AIKTRA:</strong> Enterprise Agentic AI orchestration framework with RAG workflows.</li>
        <li><strong>Pulse:</strong> Real-time operational observability & SLA telemetry.</li>
        <li><strong>FlightOps:</strong> GitOps release governance & automated CI/CD gating.</li>
        <li><strong>Sync, Tracktion & RetailOps:</strong> Event orchestration, sprint delivery assurance and retail POS validation.</li>
      </ul>
      <button class="open-proposal-modal text-primary font-bold text-xs mt-2 underline block">Request a Live Platform Demo →</button>`;
    }

    if (q.includes('four') || q.includes('pillar') || q.includes('capability') || q.includes('service')) {
      return `<strong>Our Four Capability Pillars:</strong>
      <ol class="list-decimal list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>AI & Agentic Solutions:</strong> Agentic AI, GenAI, Enterprise RAG, and Voice AI.</li>
        <li><strong>Quality Engineering & AI Assurance:</strong> Functional E2E, LLM Evaluation, Hallucination QA, and Security Audits.</li>
        <li><strong>Digital Engineering:</strong> Application Modernization, Cloud-Native APIs, and Microservices.</li>
        <li><strong>Data, Cloud & Platforms:</strong> AWS/Azure/GCP Cloud, Pega PRPC, and automated MLOps.</li>
      </ol>
      <a href="#capabilities" class="text-primary font-bold text-xs mt-2 underline block">Explore All Pillars On-Page →</a>`;
    }

    if (q.includes('delivery') || q.includes('india') || q.includes('onshore') || q.includes('hybrid') || q.includes('model')) {
      return `<strong>US + India Global Delivery Models:</strong>
      <ul class="list-disc list-inside mt-1.5 space-y-1 text-xs">
        <li><strong>Onshore (US):</strong> Strategic architecture leadership, client collaboration, and compliance oversight.</li>
        <li><strong>Offshore (India Hub):</strong> High-velocity engineering labs in Hyderabad with an optimized cost structure.</li>
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
    <button type="button" data-navi-lead class="text-primary font-bold text-xs mt-2 underline block">Connect with a Human Architect →</button>`;
  }

  function appendMessage(text, isUser = false) {
    if (!naviChatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `navi-msg ${isUser ? 'navi-msg-user' : 'navi-msg-bot'}`;
    if (isUser) {
      msgDiv.textContent = text;
    } else {
      msgDiv.innerHTML = text;
    }
    naviChatBody.appendChild(msgDiv);
    naviChatBody.scrollTop = naviChatBody.scrollHeight;

    // Attach click listener to any newly added proposal modal buttons inside bot messages
    msgDiv.querySelectorAll('.open-proposal-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeNavi();
        openProposal();
      });
    });
    msgDiv.querySelectorAll('[data-navi-lead]').forEach(btn => btn.addEventListener('click', () => showLeadCapture()));
  }

  // In-chat lead capture with explicit consent (routes visitors to a human architect)
  const LEAD_INTENT = /architect|human|talk to|contact|meeting|schedule|sales/i;

  function showLeadCapture() {
    if (!naviChatBody) return;
    appendMessage('<strong>Talk to a Solutions Architect.</strong> Share a few details and we will set up a discovery session.', false);

    const wrap = document.createElement('div');
    wrap.className = 'navi-msg navi-msg-bot navi-lead';
    wrap.innerHTML = `
      <form class="navi-lead-form">
        <label>Full name<input name="name" type="text" required autocomplete="name"></label>
        <label>Company<input name="company" type="text" required autocomplete="organization"></label>
        <label>Work email<input name="email" type="email" required autocomplete="email"></label>
        <label>Project interest
          <select name="interest">
            <option>AI & Agentic Solutions</option>
            <option>Quality Engineering & AI Assurance</option>
            <option>Digital Engineering</option>
            <option>Data, Cloud & Platforms</option>
            <option>Telecom Transformation</option>
          </select>
        </label>
        <label class="navi-lead-consent"><input name="consent" type="checkbox" required> I agree to be contacted by NForce One about this request.</label>
        <button type="submit">Request Discovery Session</button>
      </form>`;
    naviChatBody.appendChild(wrap);
    naviChatBody.scrollTop = naviChatBody.scrollHeight;

    const form = wrap.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const confirmation = document.createElement('div');
      confirmation.className = 'navi-msg navi-msg-bot navi-lead-done';
      const title = document.createElement('strong');
      title.textContent = `Thanks, ${data.get('name')}!`;
      const body = document.createElement('p');
      body.textContent = `A Solutions Architect will contact you at ${data.get('email')} about ${data.get('interest')} for ${data.get('company')} within one business day.`;
      confirmation.append(title, body);
      wrap.replaceWith(confirmation);
      naviChatBody.scrollTop = naviChatBody.scrollHeight;
    });
  }

  function respondTo(query) {
    if (!naviChatBody) return;
    appendMessage(query, true);

    const typing = document.createElement('div');
    typing.className = 'navi-msg navi-msg-bot navi-typing';
    typing.setAttribute('role', 'status');
    typing.setAttribute('aria-label', 'Navi is typing');
    typing.innerHTML = '<span></span><span></span><span></span>';
    naviChatBody.appendChild(typing);
    naviChatBody.scrollTop = naviChatBody.scrollHeight;

    setTimeout(() => {
      typing.remove();
      if (LEAD_INTENT.test(query)) {
        showLeadCapture();
      } else {
        appendMessage(generateNaviResponse(query), false);
      }
    }, 700);
  }

  if (naviChatForm && naviInput) {
    naviChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = naviInput.value.trim();
      if (!query) return;
      naviInput.value = '';
      respondTo(query);
    });
  }

  // Case Studies & Appendix A Blueprint Logic (US-602, US-603)
  const caseStudyTabs = document.querySelectorAll('.case-study-tab');
  const caseStudyPanels = document.querySelectorAll('.case-study-panel');
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseModalCloseBtn = document.getElementById('caseModalCloseBtn');

  const caseData = {
    telecom: {
      badge: 'Tier-1 Telecom Carrier Scenario',
      category: 'Representative Engagement Blueprint',
      title: 'Zero-Downtime Billing Modernization & Automated SIT Protocol Testing',
      delivery: 'Hybrid Follow-the-Sun',
      squad: 'Follow-the-Sun Squad (US + IN)',
      timeline: 'Phased Cutover',
      metric: 'Zero-Downtime Cutover',
      solution: 'Re-architect billing mediation into containerized microservices on AWS EKS with Apache Kafka for real-time CDR stream ingestion, using QForce AI to generate automated SIT scenarios that validate subscriber rating engines.',
      qa: 'Automated nightly regression suites spanning 5G interface protocols, rating mediation edge cases and CRM subscriber sync, replacing multi-week manual SIT cycles.',
      value: 'Protect billing revenue, avoid customer-impacting outages during migration, and lower recurring QA overhead.'
    },
    fintech: {
      badge: 'Global FinTech Processor Scenario',
      category: 'Representative Engagement Blueprint',
      title: 'PCI-DSS Cloud Migration & High-Throughput Load Architecture',
      delivery: 'Onshore + Dedicated Offshore CoE',
      squad: 'Dedicated Squad (US + IN)',
      timeline: 'Phased Migration',
      metric: 'Peak-Load Readiness',
      solution: 'Event-driven payment authorization engine using Apache Kafka and multi-region AWS Aurora, with hardware security module (HSM) tokenization aligned to PCI-DSS requirements.',
      qa: 'Distributed Gatling and JMeter performance suites simulating large-scale concurrent payment flows, with FlightOps automated security compliance gates in the CI/CD pipeline.',
      value: 'Handle peak holiday volume without dropped transactions, shorten release cycles, and support PCI-DSS audit readiness.'
    },
    healthtech: {
      badge: 'HealthTech Platform Scenario',
      category: 'Representative Engagement Blueprint',
      title: 'HIPAA-Ready Patient Portal & Automated AI Diagnostic Testing',
      delivery: 'Managed Engineering Capacity',
      squad: 'Managed Squad (US + IN)',
      timeline: 'Phased Hardening',
      metric: 'Lower Test Maintenance',
      solution: 'Modernize EHR patient workflows into scalable Azure Health Data microservices, with synthetic FHIR/HL7 test data generators so no protected health information (PHI) is exposed in staging.',
      qa: 'QForce AI self-healing QA engines that adapt broken UI selectors during continuous clinical portal updates, reducing fragile test failures.',
      value: 'Reduce recurring QA maintenance, speed up release cadence, and keep delivery aligned to HIPAA and SOC2 controls.'
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

  // Cross-border culture strip: live Dallas & Hyderabad clocks with shift status
  const cultureClockBlocks = document.querySelectorAll('[data-culture-tz]');
  if (cultureClockBlocks.length > 0) {
    const updateCultureClocks = () => {
      const now = new Date();
      cultureClockBlocks.forEach(block => {
        const timeZone = block.getAttribute('data-culture-tz');
        const clock = block.querySelector('.culture-clock');
        const shift = block.querySelector('.culture-shift');
        const time = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit' }).format(now);
        const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hourCycle: 'h23' }).format(now));
        const onShift = hour >= 9 && hour < 18;
        if (clock) clock.textContent = time;
        if (shift) {
          shift.textContent = onShift ? 'Engineering shift live' : 'Off-shift · handed over';
          shift.classList.toggle('live', onShift);
        }
      });
    };
    updateCultureClocks();
    setInterval(updateCultureClocks, 30000);
  }

  if (reducedMotion) {
    document.querySelectorAll('.culture-arc svg').forEach(svg => {
      if (typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
    });
  }

  // Handle Quick Discovery Chips
  document.querySelectorAll('.navi-chip').forEach(chip => {
    chip.addEventListener('click', () => respondTo(chip.getAttribute('data-query')));
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
