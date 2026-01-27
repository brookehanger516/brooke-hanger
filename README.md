# Brooke Alexis Hanger - Professional Portfolio

> **Salesforce-ready, AI/Cloud-focused personal portfolio** for Brooke Alexis Hanger, showcasing expertise in CRM automation, Power BI, and enterprise B2B solutions.

[![Mobile-First](https://img.shields.io/badge/Mobile-First-success)](/) [![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-blue)](/) [![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-green)](/)

---

## 🎯 Features

- **Mobile-First Responsive Design** – CSS Grid/Flexbox with fluid typography (`clamp()`)
- **Accessible Navigation** – Hamburger menu with focus trap, ESC to close, swipe gestures
- **SEO-Optimized** – Complete meta tags (Open Graph, Twitter Cards, JSON-LD structured data)
- **Analytics Ready** – Plausible (primary) + Google Analytics (fallback) with DNT respect
- **Working Contact Form** – Formspree integration with client-side validation + Netlify Forms alternative
- **Automation Lab Dashboard** – Interactive carousel, tab filtering, video demos
- **WCAG 2.2 AA Compliant** – Semantic HTML, ARIA labels, keyboard navigation, color contrast
- **Performance** – Minimal JS, lazy-loaded images, `content-visibility` optimization
- **Testing** – Playwright E2E tests for navigation, SEO, analytics, form validation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 (Custom Properties, Grid, Flexbox) |
| **JavaScript** | Vanilla JS (no frameworks) |
| **Analytics** | Plausible / Google Analytics 4 (switchable) |
| **Forms** | Formspree / Netlify Forms (switchable) |
| **Testing** | Playwright (E2E, cross-browser) |
| **Hosting** | GitHub Pages / Vercel (static) |

---

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/brookehanger516/brooke-hanger.git
cd brooke-hanger

# Install dependencies (Playwright for testing)
npm ci

# Serve locally (port 4173)
npm start

# Open in browser
open http://localhost:4173
```

### Build & Deploy

```bash
# Run tests before deployment
npm test

# Deploy to GitHub Pages
git push origin main

# Deploy to Vercel
vercel --prod
```

---

## 📂 Project Structure

```
brooke-hanger/
├── public/
│   ├── index-new.html          # Homepage (hero, KPIs, expertise)
│   ├── about.html              # Bio, languages, philosophy
│   ├── experience.html         # Career timeline
│   ├── automation-lab.html     # Dashboard with carousel/tabs
│   ├── resume.html             # Downloadable CV
│   ├── contact-new.html        # Contact form (Formspree)
│   ├── styles.css              # Design system + components
│   ├── nav-new.js              # Hamburger navigation
│   ├── analytics.js            # Plausible/GA integration
│   ├── contact-form.js         # Form validation
│   ├── automation-lab.js       # Dashboard interactivity
│   └── assets/
│       ├── img/
│       │   └── social-card.jpg # Open Graph preview (1200×630)
│       ├── docs/               # Downloadable PDFs
│       └── videos/             # Demo video embeds
├── tests/
│   ├── mobile-nav.spec.js      # Navigation & accessibility
│   ├── seo.spec.js             # Meta tags validation
│   ├── analytics.spec.js       # DNT & provider tests
│   ├── contact-form.spec.js    # Form validation tests
│   └── automation-lab.spec.js  # Dashboard tests
├── package.json                # Dependencies (Playwright, http-server)
├── playwright.config.js        # Test configuration
└── README.md                   # This file
```

---

## 🎨 Customization

### 1. Brand Tokens (Colors, Spacing, Typography)

Edit [styles.css](public/styles.css):

```css
:root {
  /* Colors */
  --color-primary: #0176d3;       /* Salesforce blue */
  --color-primary-dark: #014486;
  --color-primary-light: #e3f3ff;
  
  /* Typography – Fluid with clamp() */
  --font-size-base: clamp(0.875rem, 0.8rem + 0.375vw, 1rem); /* 14px-16px */
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);   /* 20px-24px */
  
  /* Spacing (8px base unit) */
  --space-md: 1.5rem;  /* 24px */
  --space-lg: 2rem;    /* 32px */
  
  /* Breakpoints */
  --breakpoint-sm: 600px;
  --breakpoint-md: 900px;
  --breakpoint-lg: 1200px;
}
```

### 2. Social Card Image

Replace `public/assets/img/social-card.jpg` with your branded image:
- **Dimensions**: 1200×630px
- **Format**: JPG/PNG
- **Size**: <300KB (optimized)
- **Content**: Your photo + tagline + logo

### 3. Analytics Provider

Edit [analytics.js](public/analytics.js):

```javascript
const config = {
  provider: 'plausible', // 'plausible' | 'ga' | 'none'
  
  plausible: {
    domain: 'brookehanger.com', // Your domain
    apiHost: 'https://plausible.io',
  },
  
  ga: {
    measurementId: 'G-XXXXXXXXXX', // Your GA4 ID
  },
};
```

### 4. Contact Form Endpoint

Edit [contact-new.html](public/contact-new.html):

```html
<!-- FORMSPREE (default) -->
<form
  action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"
  method="POST"
>

<!-- OR NETLIFY FORMS (uncomment, comment out Formspree) -->
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
```

### 5. Meta Tags (SEO)

Update each HTML file's `<head>`:

```html
<title>Your Custom Title</title>
<meta name="description" content="Your custom description" />
<meta property="og:title" content="Your OG title" />
<meta property="og:url" content="https://yourdomain.com/" />
<link rel="canonical" href="https://yourdomain.com/" />
```

---

## 🌐 Deployment

### GitHub Pages

1. **Enable Pages** in repository settings:
   - Go to **Settings** → **Pages**
   - Source: `main` branch, `/public` directory
   - Save

2. **Custom Domain (Optional)**:
   - Add `CNAME` file in `public/`:
     ```bash
     echo "brookehanger.com" > public/CNAME
     ```
   - Configure DNS (see DNS section below)

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Access**: `https://brookehanger516.github.io/brooke-hanger/`

### Vercel

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com) → Import Project
   - Connect GitHub repo `brooke-hanger`
   - Framework: **Other**
   - Root Directory: `./`
   - Output Directory: `public`

2. **Configure** (optional):
   - Add `vercel.json` in root:
     ```json
     {
       "cleanUrls": true,
       "trailingSlash": false,
       "headers": [
         {
           "source": "/(.*)",
           "headers": [
             { "key": "X-Frame-Options", "value": "DENY" },
             { "key": "X-Content-Type-Options", "value": "nosniff" }
           ]
         }
       ]
     }
     ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Access**: `https://brooke-hanger.vercel.app`

---

## 🌍 DNS & Custom Domains

### GitHub Pages DNS

#### Subdomain (`www.brookehanger.com`)

1. Add **CNAME** record in your DNS provider:
   ```
   Type:  CNAME
   Host:  www
   Value: brookehanger516.github.io
   TTL:   3600
   ```

2. Add `CNAME` file in repo (`public/CNAME`):
   ```
   www.brookehanger.com
   ```

#### Apex Domain (`brookehanger.com`)

1. Add **A** records (GitHub Pages IPs):
   ```
   Type:  A
   Host:  @
   Value: 185.199.108.153
   
   Type:  A
   Host:  @
   Value: 185.199.109.153
   
   Type:  A
   Host:  @
   Value: 185.199.110.153
   
   Type:  A
   Host:  @
   Value: 185.199.111.153
   ```

2. Add **AAAA** records (optional, for IPv6):
   ```
   Type:  AAAA
   Host:  @
   Value: 2606:50c0:8000::153
   
   Type:  AAAA
   Host:  @
   Value: 2606:50c0:8001::153
   
   Type:  AAAA
   Host:  @
   Value: 2606:50c0:8002::153
   
   Type:  AAAA
   Host:  @
   Value: 2606:50c0:8003::153
   ```

3. Add `CNAME` file in repo:
   ```
   brookehanger.com
   ```

4. Enable **HTTPS** in GitHub Pages settings (automatic)

### Vercel DNS

1. **Add Domain** in Vercel dashboard:
   - Project Settings → Domains → Add Domain
   - Enter `brookehanger.com`

2. **Configure DNS**:

   **Subdomain (`www`)**:
   ```
   Type:  CNAME
   Host:  www
   Value: cname.vercel-dns.com
   ```

   **Apex (`@`)**:
   ```
   Type:  A (or ALIAS/ANAME if supported)
   Host:  @
   Value: 76.76.21.21  (Vercel provides this)
   ```

3. **Verify** in Vercel dashboard (may take 24-48 hours)

---

## 🧪 Testing

### Run All Tests

```bash
# Headless mode (CI/CD)
npm test

# Headed mode (with browser UI)
npx playwright test --headed

# Debug mode (pause on failure)
npx playwright test --debug
```

### Test Coverage

| Test Suite | Coverage |
|------------|----------|
| **mobile-nav.spec.js** | Hamburger menu, focus trap, ESC close, swipe gestures |
| **seo.spec.js** | Meta tags, Open Graph, Twitter Cards, JSON-LD, canonical |
| **analytics.spec.js** | DNT respect, provider switching, script loading |
| **contact-form.spec.js** | Validation, error handling, accessibility, submission |
| **automation-lab.spec.js** | Carousel navigation, tab filtering, video players |

### Run Specific Test

```bash
npx playwright test tests/mobile-nav.spec.js
```

### Generate Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## ♿ Accessibility

### WCAG 2.2 AA Compliance

- ✅ **Semantic HTML** (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ✅ **ARIA Labels** (buttons, navigation, forms)
- ✅ **Keyboard Navigation** (Tab, Shift+Tab, ESC, Enter)
- ✅ **Focus Indicators** (2px outline, 2px offset)
- ✅ **Color Contrast** (4.5:1 for text, 3:1 for UI components)
- ✅ **Skip Links** (jump to main content)
- ✅ **Alt Text** (all images)
- ✅ **Form Labels** (all inputs)
- ✅ **Reduced Motion** (`prefers-reduced-motion: reduce`)

### Test Accessibility

```bash
# Run axe-core via Playwright
npx playwright test tests/seo.spec.js --grep "accessibility"

# Manual testing with screen readers:
# - macOS: VoiceOver (Cmd+F5)
# - Windows: NVDA or JAWS
# - ChromeVox (Chrome extension)
```

---

## 📊 Performance

### Lighthouse Scores (Target)

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### Optimization Techniques

- **Lazy-loaded images** (`loading="lazy"`)
- **Responsive images** (`srcset`, `sizes`)
- **Minimal JS** (<5KB gzipped)
- **CSS custom properties** (no preprocessor)
- **Font system stack** (no external fonts)
- **Defer analytics** (non-blocking)
- **Content visibility** (viewport culling)

### Run Lighthouse

```bash
# Via Chrome DevTools
# 1. Open DevTools → Lighthouse tab
# 2. Select "Mobile" + "Performance"
# 3. Click "Analyze page load"

# Via CLI
npx lighthouse http://localhost:4173 --view
```

---

## 🔒 Privacy & Analytics

### Analytics Disclosure

This site uses **Plausible Analytics** (privacy-friendly, GDPR compliant) or **Google Analytics 4** (with IP anonymization). We respect **Do Not Track** (DNT) headers:

- **DNT enabled**: No analytics scripts loaded
- **DNT disabled**: Analytics load with anonymized IP
- **No cookies**: Plausible is cookieless
- **Data retention**: 12 months maximum

### Update Analytics Notice

Create `public/analytics-notice.html`:

```html
<h2>Analytics Disclosure</h2>
<p>We use [Plausible/Google Analytics] to understand how visitors use our site...</p>
```

---

## 📜 License

This project is **open-licensed** with the following constraints:

- ✅ **Reuse allowed** for personal portfolios
- ✅ **Modification allowed** with attribution
- ❌ **No proprietary Salesforce assets** (logos, trademarks)
- ❌ **No commercial resale** of template

### Credits

- **Design System**: Inspired by Salesforce Lightning Design System
- **Icons**: [Heroicons](https://heroicons.com) (MIT License)
- **Fonts**: System font stack (Inter fallback)

---

## 🤝 Contributing

This is a personal portfolio, but **bug reports** and **accessibility improvements** are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b fix/navigation-bug`)
3. Commit changes (`git commit -m "Fix: Mobile nav focus trap"`)
4. Push to branch (`git push origin fix/navigation-bug`)
5. Open Pull Request

---

## 📞 Support

For questions or customization help:

- **Email**: brooke@example.com
- **LinkedIn**: [linkedin.com/in/brookehanger](https://linkedin.com/in/brookehanger)
- **Issues**: [GitHub Issues](https://github.com/brookehanger516/brooke-hanger/issues)

---

## 🗺️ Roadmap

- [ ] Add blog section (Markdown → HTML)
- [ ] Integrate Calendly for meeting booking
- [ ] Add dark mode toggle
- [ ] Create downloadable case study PDFs
- [ ] Build CMS integration (Decap CMS / Sanity)

---

**Built with ❤️ by Brooke Alexis Hanger | © 2026 All Rights Reserved**
