# Portfolio Architecture – Salesforce-Style Design System

## Overview
Modern, accessible portfolio for Brooke Alexis Hanger, Account Executive in Cloud & AI Solutions. Built with semantic HTML5, CSS Grid/Flexbox, and vanilla JavaScript—no frameworks.

## Design System

### Visual Identity
**Brand Inspiration**: Salesforce aesthetic—clean, professional, enterprise-ready
- **Color Palette**: White backgrounds, blue accents (Salesforce blue), soft gradients
- **Typography**: System font stack with Inter/Roboto fallbacks
- **Spacing**: 8px base unit, generous whitespace
- **Elevation**: Soft shadows (0 2px 8px rgba(0,0,0,0.08))
- **Motion**: Subtle transitions (200-300ms), respects prefers-reduced-motion

### Design Tokens (CSS Custom Properties)
```css
:root {
  /* Colors – Salesforce-inspired */
  --color-primary: #0176d3;        /* Salesforce blue */
  --color-primary-dark: #014486;
  --color-primary-light: #e3f3ff;
  --color-bg: #ffffff;
  --color-surface: #fafafa;
  --color-text: #181818;
  --color-text-muted: #706e6b;
  --color-border: #dddbda;
  --color-success: #2e844a;
  --color-warning: #fe9339;
  
  /* Spacing – 8px base */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 1rem;      /* 16px */
  --space-md: 1.5rem;    /* 24px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 3rem;      /* 48px */
  --space-2xl: 4rem;     /* 64px */
  
  /* Typography */
  --font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  --font-size-3xl: 2.5rem;    /* 40px */
  
  /* Elevation */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.1);
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Motion */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### Layout System
**Responsive Breakpoints**:
- Mobile: 320px – 767px
- Tablet: 768px – 1023px
- Desktop: 1024px+

**Grid System**: CSS Grid with flexible columns
**Container**: Max-width 1200px, responsive padding

### Component Inventory
1. **Navigation**: Sticky header, collapsible mobile menu
2. **Hero**: Large heading, subtitle, CTA buttons
3. **Cards**: Project cards, experience cards, stat cards
4. **Stats/KPIs**: Metric display with numbers + labels
5. **Forms**: Contact form with validation
6. **Buttons**: Primary, secondary, ghost variants
7. **Testimonials**: Quote block with attribution

### Accessibility Standards
- **WCAG 2.2 Level AA** compliance
- Semantic HTML5 landmarks (header, nav, main, section, footer)
- ARIA labels only when semantics insufficient
- Keyboard navigation (tab order, focus states)
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI
- Focus-visible indicators
- `prefers-reduced-motion` support
- Skip-to-content link

### File Structure
```
public/
├── index.html              # Home/Hero
├── about.html              # Bio, philosophy
├── experience.html         # Career history
├── projects.html           # Case studies/portfolio
├── resume.html             # Resume/CV
├── contact.html            # Contact form
├── thank-you.html          # Form success
├── 404.html                # Error page
├── styles.css              # Main stylesheet (design system)
├── nav.js                  # Navigation component
├── projects.js             # Projects data loader
├── data/
│   └── projects.json       # Projects/case studies data
└── img/                    # Images (no external CDN)
```

## Content Strategy

### Persona: Brooke Alexis Hanger
- **Role**: Account Executive – Cloud & AI Solutions
- **Languages**: English (native), Spanish (fluent), Portuguese (fluent)
- **Expertise**: Salesforce ecosystem, Power BI, CRM optimization, B2B sales, cloud infrastructure, AI commercialization, automation
- **Voice**: Results-oriented, enterprise-savvy, metric-backed, credible, concise
- **Key Themes**: Full-cycle sales, stakeholder alignment, pipeline management, revenue growth, digital transformation

### Content Sections
1. **Hero**: Clear value prop—"Driving Revenue Through Cloud & AI Solutions"
2. **About**: Brief bio, multilingual capabilities, industry focus
3. **Experience**: Roles, companies, dates, achievements with metrics
4. **Projects/Case Studies**: Real-world examples of sales wins, implementations
5. **Skills**: Salesforce, Power BI, CRM platforms, analytics, automation tools
6. **Contact**: Professional CTA, LinkedIn, email

## Performance Targets
- **Lighthouse Mobile Scores**:
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - Best Practices: ≥ 95
  - SEO: ≥ 90
- **Bundle Size**: < 100KB (HTML + CSS + JS)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## Testing Strategy
1. **Unit Tests**: Component logic (nav toggle, form validation)
2. **Accessibility Tests**: axe-core, keyboard nav, screen reader
3. **Visual Regression**: Responsive breakpoints
4. **E2E Tests**: Critical user journeys (nav, contact form)

## Development Workflow
```bash
# Install dependencies
npm install

# Start dev server (localhost:4173)
npm start

# Run tests
npm test

# Lighthouse audit
npm run audit
```

## Future Enhancements
- [ ] Dark mode toggle
- [ ] Multi-language content (ES/PT translations)
- [ ] Blog/articles section
- [ ] Testimonials from clients
- [ ] Case study detail pages
