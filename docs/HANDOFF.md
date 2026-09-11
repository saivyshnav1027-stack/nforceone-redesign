# NForce One Website — Handoff

**Last updated:** 2026-09-11
**Repo:** github.com/saivyshnav1027-stack/nforceone-redesign (branch `main`)
**Last commit:** `929c422` — everything below is committed and pushed; working tree clean.
**Deploy:** Vercel, auto-deploys from `main`. **The Vercel URL is still unknown to the repo** — see Open Questions.

---

## 1. What this is

A single-page marketing site for NForce One, built to a PRD (v1.3) for an internal company contest.
No framework, no build step, no backend. Open `index.html` in a browser and it runs.

| File | Lines | Role |
|---|---|---|
| `index.html` | 2332 | All markup: header, 9 sections, footer, 4 modals, Ask Navi widget |
| `app.js` | 1051 | All behaviour, in one `DOMContentLoaded` closure |
| `index.css` | 2784 | Design tokens + component, motion and reduced-motion styles (works alongside Tailwind utilities) |
| `tests/ui.spec.js` | 637 | 31 Playwright end-to-end tests |
| `.agents/rules/prd_compliance.md` | — | **Governing rules.** Read before any change |
| `docs/NFORCE_ONE_DEVELOPMENT_TRACKER.md` + `.csv` | — | Sprint/user-story tracker (Sprints 1–8) |
| `docs/superpowers/specs/*prd-v1.3-strategic-spec.md` | — | PRD content source of truth |

**Stack:** Tailwind **Play CDN** (config inline in `<head>`), Google Fonts (Inter / Inter Tight), Material Symbols, vanilla JS.

### Run it
```bash
npx playwright test          # 31 tests, ~1.6 min, all passing
npx playwright test -g "14"  # single test by number
```
There is no dev server; tests load the file over `file://`. `npm test` is still the placeholder script.

---

## 2. Page structure (order matters — nav, scroll-spy and tests depend on it)

1. `#hero` — headline, 2 CTAs, credibility strip, 4 counters
2. `#trust` — 4 compliance-practice badges → `#complianceModal`
3. `#capabilities` — **tabs**: Pillar Overview (4 PRD pillars) + 4 matrix tabs; matrix lives in `#matrix` (hidden by default) inside this section
4. `#telecom` — 5 telecom areas (4 cards + full-width data/automation card)
5. `#products` — 2 flagship cards (QForce AI, AIKTRA) + 4 compact tiles = 6 products
6. `#case-studies` — 3 tabbed representative blueprints
7. `#delivery` — **merged**: `#engagement` (3 models) + `#process` (5-stage timeline) + `.culture-strip` (live clocks)
8. `#estimator` — scope/engagement configurator + Solution Match Wizard link (`#openWizardBtn`)
9. `#contact` — final CTA + animated blueprint visual

Modals: `#proposalModal` (central lead form), `#solutionWizardModal`, `#complianceModal`, `#caseStudyModal`.
Widget: `#askNaviWidget` / `#askNaviDrawer` (chat + in-chat lead capture).

**Nav:** 7 links, full nav from 1280px (`xl:`); below that a menu button opens `#mobileMenu`.

---

## 3. Key JS entry points (`app.js`)

| Feature | Notes |
|---|---|
| `openProposal()` / `openProposalWithSummary(text)` | **Use these for any new CTA.** The first clears the scope summary; the second fills it |
| Capabilities tabs | `.matrix-tab-btn[data-category]`; `pillars` shows `#capPillarsPanel`, anything else shows `#matrix` and filters `.matrix-card[data-cat]`. Cards get `.visible` added directly because they start inside a hidden panel |
| Estimator | `updateEstimator()` — pillar radio + `#estTeamSlider` + delivery model + compliance chip drive timeline, sprint track, squad split and output |
| Ask Navi | `respondTo(query)` → typing indicator → `generateNaviResponse()` (keyword match) or `showLeadCapture()` if the query matches `LEAD_INTENT` |
| Culture clocks | `[data-culture-tz]` blocks, real `Intl` local time for Dallas + Hyderabad, refreshed every 30s |
| Scroll-reveal | IntersectionObserver adds `.visible` to `.reveal*` elements. **Anything starting hidden must be revealed manually** (see matrix cards) |
| Motion | Magnetic CTAs (`.magnetic-btn`), cursor spotlight on cards, header progress bar, scroll-spy nav — all skipped under `prefers-reduced-motion` |

---

## 4. What changed in this session (Sprints 4–8)

- **Bug fixes:** footer wizard link, wizard resets on reopen, stale proposal summary, **Ask Navi XSS** (user text now `textContent`), Esc closes all modals, Navi trigger keyboard-accessible.
- **Responsive nav** below 1280px; desktop nav previously overflowed and hid the header CTA at 1024–1280px.
- **Micro-interactions:** headline word reveal + crimson sweep, header scroll-progress bar, active-section nav, tactile/magnetic buttons, card spotlight, Navi typing indicator.
- **Redesigns:** scope configurator (PRD 5B engagement calculator), Cross-Border Culture live band, final-CTA blueprint visual (replaced a stock photo).
- **PRD gaps closed:** Sync, Tracktion, NForce RetailOps; 5th telecom area; Ask Navi in-chat lead capture with consent.
- **Bengaluru → Hyderabad** everywhere, including cropped/retouched images. Employee card now names Maddi Sai Vyshnav.
- **Credibility pass:** compliance badges reframed as *aligned practices*; hero counters now count real on-page items (4/5/9/3); case studies are *representative blueprints*; fabricated metrics and executive quotes removed; references "on request (NDA)".
- **Consolidation:** matrix → Capabilities tabs; engagement + process + culture → `#delivery`; configurator joined to contact; nav 9 → 7 links; hero 4 → 2 CTAs; pulsing indicators only where data is live.
- **Performance:** loaded images **2.9MB → 0.7MB**.

**Measured result:** desktop 12.5 → **10.9 screens**; phone 19.8 → **19.3**. This is well short of the 7–8 screens originally promised — merging removed padding, not content.

---

## 5. Open items, highest value first

1. **Nothing actually submits.** `#proposalModal` fires an inline `alert()`; the Navi lead form only shows a confirmation. Wire one real endpoint (Vercel form/serverless + email).
2. **AI images contain garbled text.** Visible in `hero_visual.jpg` ("AWC/AZRE UDGE"), `onshore_delivery_us.jpg` ("Cuess System Overviews") and `hybrid_follow_sun_hyd.jpg` (a stray "HYDERABAD" label near southern Africa). The globe's Bengaluru label was already painted out with a canvas clone-stamp; the same technique can remove the rest.
3. **Ask Navi is keyword matching, not AI.** Off-script questions hit the generic fallback. Either label it as a guided assistant or connect a real model.
4. **Still long:** 10.9 / 19.3 screens. Real reduction needs content collapsing (e.g. one expanding panel for the 5 process stages, trimmed case-study columns).
5. **Tailwind CDN** prints a production warning in the console and slows first paint. Compile Tailwind to a static CSS file.
6. **Dead links:** Privacy, Terms, Security Architecture all point to `#`. Industries menu items open the proposal form instead of industry content.
7. **Accessibility:** modals don't trap focus; small crimson labels on dark backgrounds fail contrast.
8. **Re-opened PRD gap (owner's decision, 2026-09-11):** Sync, Tracktion and NForce RetailOps tiles were removed from `#products` at the owner's request. The PRD's innovation catalogue lists them, so the page now shows 6 of the PRD's products. Restore from git history (`929c422`) if a judge flags it.
9. **Unused assets still in the repo** (`discovery_workshop_session.jpg`, `hybrid_follow_sun.jpg`, `offshore_scale_india.jpg`, and three never-referenced visuals). They don't affect page weight; `assets/` is 5.6MB on disk.

---

## 6. Open questions for the owner

- **Vercel URL** — needed so `og:image` can be absolute; link previews may not show an image otherwise.
- **Are SOC2 / ISO 27001 / HIPAA real?** Wording is currently "aligned practices". If any certification genuinely exists, state it plainly instead.
- **Is "Rajesh V." a real colleague?** The second culture quote is still attributed to an unverified person.
- **Is "NForce One Inc." the correct legal entity** for the footer copyright?

---

## 7. Rules to respect when continuing

From `.agents/rules/prd_compliance.md`:
- **Nothing from PRD v1.3 may be deleted.** Consolidation is allowed; removal is not.
- **No invented metrics or unverifiable claims.**
- **Motion:** vanilla CSS/JS only, `transform`/`opacity`, no animation libraries, always with `prefers-reduced-motion` fallbacks.
- Palette: crimson `#C40000` + dark slate; Inter Tight / Inter.

**Workflow for any change:** edit `index.html` / `app.js` / `index.css` together → update `tests/ui.spec.js` (tests assert exact copy and counts) → `npx playwright test` → update the tracker docs.
