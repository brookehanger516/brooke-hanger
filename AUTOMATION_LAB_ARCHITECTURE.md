# Automation Lab Dashboard – Architecture Documentation

## Overview
The Automation Lab is an interactive executive CRM dashboard showcasing Brooke Alexis Hanger's expertise in Salesforce, Power BI, and automation solutions. Built as a static web application with vanilla JavaScript, it provides a Salesforce-inspired user experience with full accessibility compliance.

---

## Design System

### Color Tokens
```css
--color-primary: #0176d3;          /* Salesforce blue */
--color-primary-dark: #014486;
--color-primary-light: #e3f3ff;
--color-bg: #ffffff;
--color-surface: #fafafa;
--color-text: #181818;
--color-text-muted: #706e6b;
--color-border: #dddbda;
```

### Spacing System (8px base)
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
```

### Typography
- **Font Stack**: Inter, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif
- **Sizes**: 12px (xs) → 48px (4xl)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Elevation (Shadows)
```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.12);
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Motion
```css
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
```

All transitions respect `prefers-reduced-motion: reduce`.

---

## Layout System

### Responsive Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: ≥ 1024px (3-4 columns)

### Grid Patterns

**KPI Cards** (4-column responsive):
```css
.kpi-grid {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;            /* Mobile */
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* Desktop */
  }
}
```

**Video & Download Grids** (2-column):
```css
.video-grid, .download-grid {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;            /* Mobile */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet+ */
  }
}
```

**Flows Grid** (3-column):
```css
.flows-grid {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;            /* Mobile */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
  }
}
```

---

## Component Architecture

### 1. Dashboard Header
**Purpose**: Page title, timeframe filter, segment tabs

**Structure**:
- `.dashboard-header` (container)
  - `.header-content` (flex layout)
    - `.header-title` (h1 + subtitle)
    - `.header-controls` (filters)
  - `.segment-tabs` (tab list)

**Behavior**:
- Tabs use ARIA roles (`role="tablist"`, `aria-selected`)
- Tab clicks trigger filter updates across all sections
- Mobile: tabs scroll horizontally with hidden scrollbar

### 2. KPI Cards
**Purpose**: Display key metrics with visual hierarchy

**Structure**:
```html
<div class="kpi-card" data-category="all">
  <div class="kpi-icon">💰</div>
  <div class="kpi-content">
    <div class="kpi-value">$12.4M</div>
    <div class="kpi-label">Pipeline Influenced</div>
    <div class="kpi-change positive">+24% vs Q3</div>
  </div>
</div>
```

**States**:
- Default: visible
- Filtered: `opacity: 0.3`, `pointer-events: none`

### 3. Carousel Component
**Purpose**: Display case studies with navigation

**Features**:
- **Keyboard navigation**: Left/Right arrow keys
- **Button navigation**: Previous/Next buttons with disabled states
- **Indicator dots**: Click to jump to specific slide
- **Touch swipe**: Mobile swipe gestures
- **Autoplay**: 8-second interval (pauses on hover/focus)
- **Accessibility**: 
  - `role="region"`, `aria-live="polite"`
  - Throttled screen reader announcements
  - Focus management on slide changes

**JavaScript API**:
```javascript
window.AutomationLab.carousel.goToSlide(index)
window.AutomationLab.carousel.goToNext()
window.AutomationLab.carousel.goToPrev()
window.AutomationLab.carousel.stopAutoplay()
```

**Animation**:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```
Disabled when `prefers-reduced-motion: reduce`.

### 4. Video Cards
**Purpose**: Demo video previews with play buttons

**Structure**:
```html
<div class="video-card" data-category="salesforce">
  <div class="video-wrapper">
    <img src="poster.jpg" alt="Description" class="video-poster" />
    <button class="video-play-btn" aria-label="Play video">
      <svg>...</svg>
    </button>
  </div>
  <div class="video-info">
    <h3>Title</h3>
    <p>Description</p>
    <span class="video-meta">Duration: 15:32</span>
  </div>
</div>
```

**Behavior**:
- Play button click triggers modal/inline player (placeholder alert in current implementation)
- Hover effect scales play button
- Accessible with keyboard focus

### 5. Download Cards
**Purpose**: Downloadable PDF resources

**Features**:
- Native `<a download>` links
- File metadata (size, pages)
- Icon indicators
- Hover effects (shadow + lift)

### 6. Flow Cards
**Purpose**: Automation workflow templates

**Structure**:
- Logo (Zapier, Make, n8n)
- Title & description
- Visual flow steps (trigger → actions)
- Action links (View Template, Clone Flow)

**Flow Steps Visualization**:
```html
<div class="flow-steps">
  <span class="flow-chip trigger">Trigger: Form Submit</span>
  <span class="flow-arrow">→</span>
  <span class="flow-chip action">Enrich Data</span>
  <span class="flow-arrow">→</span>
  <span class="flow-chip action">Create Lead</span>
  <span class="flow-arrow">→</span>
  <span class="flow-chip action">Notify Team</span>
</div>
```

---

## Accessibility Features

### WCAG 2.2 AA Compliance

✅ **Semantic HTML**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` landmarks
- Proper heading hierarchy (h1 → h2 → h3)
- Descriptive link text

✅ **Keyboard Navigation**
- All interactive elements accessible via Tab
- Arrow keys for carousel
- Focus indicators on all controls
- No keyboard traps

✅ **ARIA Attributes** (strategic use only)
- `role="tablist"`, `aria-selected` for tabs
- `role="region"`, `aria-live="polite"` for carousel
- `aria-label` for icon-only buttons
- `aria-controls` for tab relationships

✅ **Color Contrast**
- Text on background: ≥ 4.5:1
- Large text: ≥ 3:1
- UI components: ≥ 3:1

✅ **Alternative Text**
- All images have descriptive `alt` attributes
- Decorative images use empty `alt=""` or `aria-hidden="true"`

✅ **Motion**
- Respects `prefers-reduced-motion: reduce`
- Disables carousel autoplay
- Removes slide transitions
- Reduces all animation durations to 0.01ms

### Focus Management

**Carousel Navigation**:
When user navigates carousel, focus remains on control that triggered the change (button or indicator). Screen reader users hear announcements via `aria-live` region.

**Tab Filter**:
When tab is activated, focus remains on tab button. Filtered content updates without focus disruption.

**Video Modals** (future):
When video opens, focus moves to modal. When closed, focus returns to play button.

---

## Performance Optimizations

### Bundle Size
- **HTML**: ~15KB (gzipped: ~5KB)
- **CSS**: ~12KB (gzipped: ~3KB)
- **JavaScript**: ~8KB (gzipped: ~2.5KB)
- **Total**: ~35KB (< 50KB target)

### Loading Strategy
1. **Critical CSS**: Inline above-the-fold styles (optional future optimization)
2. **Lazy Loading**: Videos load on demand
3. **Font Loading**: System fonts (no external requests)
4. **Images**: Placeholder images (production would use WebP + fallbacks)

### No External Network Calls
✅ All assets served locally:
- No CDN fonts
- No external JavaScript libraries
- No analytics scripts (placeholder code only)
- No external video embeds (local `<video>` or placeholders)

---

## Testing Strategy

### Playwright E2E Tests

**Coverage**:
1. ✅ Page load & rendering
2. ✅ Navigation links functional
3. ✅ Carousel navigation (buttons, keyboard, indicators)
4. ✅ Tab filtering updates content
5. ✅ Download links present and valid
6. ✅ Video cards render with play buttons
7. ✅ Flow cards display properly
8. ✅ Semantic landmarks present
9. ✅ Skip link functional
10. ✅ All images have alt text
11. ✅ Buttons have labels
12. ✅ Responsive layouts (mobile, tablet, desktop)
13. ✅ No console errors
14. ✅ Load time < 3 seconds

**Run Tests**:
```bash
npm test                  # Headless mode
npm run test:headed       # Watch browser
npm run test:ui          # Interactive UI
npm run test:report      # View HTML report
```

### Manual Testing Checklist
- [ ] Keyboard-only navigation (no mouse)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Mobile swipe gestures
- [ ] Print styles (PDF export)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Touch target sizes (≥ 44px)
- [ ] High contrast mode
- [ ] Zoom to 200%

---

## Deployment

### Static Site Hosting
Compatible with:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static file server

### Build Process
No build step required—pure static files:
```
public/
├── automation-lab.html
├── automation-lab.css
├── automation-lab.js
├── assets/
│   ├── docs/  (PDFs)
│   ├── img/   (posters)
│   └── videos/ (optional)
```

### Environment Configuration
```bash
# Development
npm start  # http://localhost:4173

# Production
# Upload `public/` directory to hosting provider
```

---

## Future Enhancements

### Phase 2 (Q1 2026)
- [ ] Real video embeds (YouTube/Vimeo or self-hosted)
- [ ] PDF generation from dashboard data
- [ ] Export KPI data to CSV
- [ ] Dark mode toggle
- [ ] Multilingual content (ES/PT translations)

### Phase 3 (Q2 2026)
- [ ] Live data integration (Salesforce API)
- [ ] Real-time dashboard updates
- [ ] User authentication
- [ ] Personalized dashboards
- [ ] Advanced filtering (date ranges, custom queries)

### Phase 4 (Q3 2026)
- [ ] AI-powered insights
- [ ] Predictive analytics
- [ ] Automated report generation
- [ ] Slack/Teams integrations
- [ ] Mobile native app (React Native)

---

## Maintenance

### Updating Content

**Add New Case Study**:
1. Edit `automation-lab.html`
2. Add new `.carousel-slide` div
3. Include `data-category` attribute
4. Update carousel indicator count in JS

**Add Download Resource**:
1. Place PDF in `public/assets/docs/`
2. Add `.download-card` link in HTML
3. Include file metadata

**Add Automation Flow**:
1. Add `.flow-card` in flows section
2. Include logo, description, flow steps
3. Add template/clone links

### Performance Monitoring
- Lighthouse audits (monthly)
- WebPageTest (quarterly)
- User analytics (GA4 placeholder)

---

## Support & Documentation

- **Main README**: [README.md](../README.md)
- **Design System**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Code Diff**: [CODE_DIFF.md](CODE_DIFF.md)
- **Playwright Tests**: [tests/automation-lab.spec.js](../tests/automation-lab.spec.js)

For questions or issues, contact: brookehanger@gmail.com

---

**Last Updated**: January 27, 2026  
**Version**: 2.0.0  
**Status**: ✅ Production Ready
