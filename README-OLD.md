# Brooke Alexis Hanger – Portfolio

Modern, accessible portfolio for **Brooke Alexis Hanger**, Account Executive specializing in Cloud & AI Solutions. Built with semantic HTML5, CSS Grid/Flexbox, and vanilla JavaScript—no frameworks.

## 🎨 Design Philosophy

**Salesforce-inspired aesthetic**: Clean, professional, enterprise-ready UI with:
- White/blue gradient color palette (#0176d3 primary)
- Generous whitespace and soft shadows
- Rounded cards with subtle hover animations
- Mobile-first responsive design
- WCAG 2.2 AA accessibility compliance

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+ recommended)
- Modern web browser

### Installation

```bash
# Clone repository
git clone https://github.com/brookehanger516/brooke-hanger.git
cd brooke-hanger

# Install dependencies
npm install

# Start development server
npm start
```

Server runs at `http://localhost:4173`

## 📁 Project Structure

```
brooke-hanger/
├── public/
│   ├── index.html              # Home page (hero, expertise, CTA)
│   ├── about.html              # Bio, philosophy, background
│   ├── experience.html         # Career timeline, achievements
│   ├── projects.html           # Case studies, portfolio
│   ├── resume.html             # Downloadable resume/CV
│   ├── contact.html            # Contact form
│   ├── thank-you.html          # Form success page
│   ├── 404.html                # Error page
│   ├── styles.css              # Main stylesheet (design system)
│   ├── nav.js                  # Navigation component
│   ├── projects.js             # Projects data loader
│   ├── test-suite.html         # Automated test runner
│   ├── data/
│   │   └── projects.json       # Case studies data
│   └── img/                    # Images (no external CDN)
├── ARCHITECTURE.md             # Design system documentation
├── package.json                # Dependencies and scripts
├── netlify.toml                # Deployment config
└── README.md                   # This file
```

## 🧩 Design System

### Color Palette
```css
--color-primary: #0176d3;       /* Salesforce blue */
--color-primary-dark: #014486;
--color-primary-light: #e3f3ff;
--color-bg: #ffffff;
--color-surface: #fafafa;
--color-text: #181818;
--color-text-muted: #706e6b;
```

### Spacing (8px base unit)
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
```

### Typography
- **Font Stack**: Inter, system-ui, -apple-system, sans-serif
- **Scales**: 12px (xs) → 48px (4xl)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Responsive Breakpoints
- **Mobile**: 320px – 767px
- **Tablet**: 768px – 1023px
- **Desktop**: 1024px+

## ♿ Accessibility Features

- **WCAG 2.2 Level AA** compliant
- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`)
- Skip-to-content link
- Keyboard navigation with visible focus indicators
- Color contrast ratios ≥ 4.5:1 for text
- ARIA labels where semantics insufficient
- `prefers-reduced-motion` support
- Screen reader tested (NVDA, JAWS, VoiceOver)

## 🧪 Testing

### Run Automated Tests
Open `public/test-suite.html` in browser to run:
- ✅ Accessibility validation (landmarks, alt text, labels)
- ✅ Responsive design checks (viewport, overflow, touch targets)
- ✅ Content validation (persona keywords, brand references)

### Manual Testing Checklist
1. **Keyboard Navigation**: Tab through all elements, verify focus order
2. **Screen Reader**: Test with assistive technology
3. **Mobile Menu**: Test hamburger navigation on small screens
4. **Forms**: Submit contact form, test validation
5. **Print**: Preview print styles for all pages

### Lighthouse Audit
Run in Chrome DevTools → Lighthouse tab:
```
Performance:      ≥ 90
Accessibility:    ≥ 95
Best Practices:   ≥ 95
SEO:              ≥ 90
```

## 📝 Content Strategy

### Persona: Brooke Alexis Hanger
- **Role**: Account Executive – Cloud & AI Solutions
- **Languages**: English (native), Spanish (fluent), Portuguese (fluent)
- **Expertise**: Salesforce, Power BI, CRM, B2B sales, AI commercialization, automation
- **Voice**: Results-oriented, enterprise-savvy, metric-backed, credible

### Key Themes
- Full-cycle sales & pipeline management
- Salesforce ecosystem & CRM optimization
- Cloud infrastructure (AWS, Azure, GCP)
- AI/ML commercialization
- Power BI analytics & dashboards
- Multilingual client relationships
- Digital transformation consulting

## 🛠️ Development

### Adding New Pages
1. Create HTML file in `public/`
2. Include `<div id="header-placeholder"></div>` in `<body>`
3. Load `<script src="./nav.js"></script>` before `</body>`
4. Link stylesheet: `<link rel="stylesheet" href="./styles.css">`
5. Use semantic HTML5 structure
6. Test accessibility with `test-suite.html`

### Modifying Design Tokens
Edit CSS custom properties in `styles.css` `:root` block:
```css
:root {
  --color-primary: #0176d3;  /* Change brand color */
  --space-lg: 2rem;          /* Adjust spacing */
  --radius-md: 8px;          /* Modify border radius */
}
```

### Navigation Menu
Edit `nav.js` to add/remove menu items:
```javascript
<li><a href="new-page.html">New Page</a></li>
```

## 📦 Build & Deploy

### Build for Production
```bash
# Optimize assets (if build script added)
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Configuration in `netlify.toml`:
```toml
[build]
  publish = "public"
```

## 📊 Performance Optimization

- ✅ No external CDN calls (fonts/scripts self-hosted or system fallbacks)
- ✅ Minimal JavaScript (< 5KB)
- ✅ CSS bundle < 20KB
- ✅ Images optimized (WebP with fallbacks)
- ✅ Lazy loading for images
- ✅ Prefetch hints for navigation

## 🤝 Contributing

This is a personal portfolio. For inquiries, contact:
- **Email**: brooke@example.com
- **LinkedIn**: linkedin.com/in/brookehanger

## 📄 License

© 2026 Brooke Alexis Hanger. All rights reserved.

## 🔗 Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) – Design system deep dive
- [SECURITY.md](SECURITY.md) – Security policies
- [public/test-suite.html](public/test-suite.html) – Test runner

---

**Built with ❤️ using semantic HTML, modern CSS, and accessible JavaScript**
