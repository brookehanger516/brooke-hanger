# Brooke Alexis Hanger - Professional Portfolio

> **Salesforce-ready, AI/Cloud-focused personal portfolio** for Brooke Alexis Hanger, showcasing expertise in CRM automation, Power BI, and enterprise B2B solutions.

[![Mobile-First](https://img.shields.io/badge/Mobile-First-success)](/) [![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-blue)](/) [![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-green)](/)

---

## 🎯 Features

- **Mobile-First Responsive Design** – CSS Grid/Flexbox with fluid typography (`clamp()`)
- **Accessible Navigation** – Sticky header, scrollspy, hamburger menu with focus trap, ESC to close, swipe gestures
- **SEO-Optimized** – Complete meta tags (Open Graph, Twitter Cards, JSON-LD structured data with @graph linking)
- **Multilingual Support** – EN/ES/FR/ZH language switcher with localStorage persistence
- **Analytics Ready** – Plausible (primary) + Google Analytics (fallback) with DNT respect
- **Working Contact Form** – Formspree integration with client-side validation + Netlify Forms alternative
- **Automation Lab Dashboard** – Interactive carousel, tab filtering, video demos
- **CI/CD Pipeline** – GitHub Actions auto-deploy to GitHub Pages on push
- **WCAG 2.2 AA Compliant** – Semantic HTML, ARIA labels, keyboard navigation, color contrast
- **Performance** – Minimal JS, lazy-loaded images, `content-visibility` optimization, IntersectionObserver
- **Testing** – Playwright E2E tests for navigation, SEO, analytics, form validation, i18n, JSON-LD

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

```bash
# Install dependencies
npm install

# Development server (http://localhost:4173)
npm start

# Run all tests
npm test

# Validate before deploy
npm run validate

# Deploy to GitHub Pages
npm run deploy
```

### Development Workflow

1. **Make changes** in your local environment
2. **Test locally**: `npm start` and visit http://localhost:4173
3. **Run validation**: `npm run validate` (checks placeholders, JSON, HTML, tests)
4. **Commit changes**: Use conventional commit messages
5. **Deploy**: `npm run deploy` (runs validation, then pushes to gh-pages branch)

---

## 📋 Pre-Deployment Checklist

Complete these steps before your first deployment:

- [ ] **Update analytics domain** in `public/analytics.js` (line 10) to `brookehanger.com`
- [ ] **Add Formspree endpoint** in `public/contact.html` (line 49): Sign up at [formspree.io](https://formspree.io) and replace `YOUR_ENDPOINT_HERE`
- [ ] **Generate social card image** (1200×630px JPG) at `public/assets/img/social-card.jpg`
- [ ] **Create favicon set** (use [realfavicongenerator.net](https://realfavicongenerator.net))
- [ ] **Run validation**: `npm run validate` - must pass all checks
- [ ] **Run tests**: `npm test` - must have 0 failures
- [ ] **Test contact form** - submit test message and verify receipt
- [ ] **Check Lighthouse scores** - all metrics should be 90+

### Quick Validation

```bash
# Run pre-deployment checks
npm run validate

# Check accessibility
bash tools/a11y-check.sh

# Build resume JSON
npm run resume:build
```

---

## 🌐 Custom Domain Setup

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**:
   - Go to **Settings → Pages**
   - Source: **GitHub Actions** (for automatic deployment)
   - Custom domain: `brookehanger.com`

2. **DNS Configuration**:
   Add these records to your DNS provider:
   
   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     brookehanger516.github.io
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```
   
   Site will be live at `https://brookehanger.com` within 5-10 minutes

### Vercel (Alternative)

1. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com) and import your GitHub repo
   - Framework: **Other**
   - Output Directory: `public`
   
2. **Add Custom Domain**:
   - Go to **Settings → Domains**
   - Add `brookehanger.com`
   - Update DNS: `CNAME → cname.vercel-dns.com`

3. **Deploy**:
   ```bash
   npm run deploy:vercel
   ```

---

## 📊 Analytics & Tracking

### Configuration

Analytics are configured in `public/analytics.js`:

```javascript
const config = {
  provider: 'plausible',  // 'plausible' | 'ga' | 'none'
  plausible: {
    domain: 'brookehanger.com',
    apiHost: 'https://plausible.io',
  }
};
```

### Automatically Tracked Events

- ✅ **Page views** - All page navigation
- ✅ **File downloads** - PDF, JSON, ZIP, DOCX files
- ✅ **Outbound clicks** - Links to external sites
- ✅ **Form submissions** - Contact form completions

### Manual Event Tracking

Use the exposed API for custom events:

```javascript
// Track custom event
window.trackEvent('custom_event_name', {
  property: 'value',
  category: 'engagement'
});

// Example: Track CTA clicks
document.querySelector('#cta-button').addEventListener('click', () => {
  window.trackEvent('cta_click', {
    button: 'automation_lab',
    location: 'homepage'
  });
});
```

### Privacy

- **Do Not Track (DNT)** is respected - no tracking if DNT is enabled
- **No cookies** when using Plausible
- **GDPR compliant** by default
- **IP anonymization** enabled for Google Analytics fallback

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
│   ├── nav-new.js              # Sticky navigation + language switcher
│   ├── analytics.js            # Plausible/GA integration
│   ├── contact-form.js         # Form validation
│   ├── automation-lab.js       # Dashboard interactivity
│   ├── js/
│   │   ├── i18n.js             # Multilingual module (EN/ES/FR/ZH)
│   │   └── scrollspy.js        # Section-aware navigation
│   ├── i18n/
│   │   ├── en.json             # English translations
│   │   ├── es.json             # Spanish translations
│   │   ├── fr.json             # French translations
│   │   └── zh.json             # Chinese translations
│   └── assets/
│       ├── img/
│       │   └── social-card.jpg # Open Graph preview (1200×630)
│       ├── docs/               # Downloadable PDFs
│       └── videos/             # Demo video embeds
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD
├── tests/
│   ├── mobile-nav.spec.js      # Navigation & accessibility
│   ├── seo.spec.js             # Meta tags validation
│   ├── analytics.spec.js       # DNT & provider tests
│   ├── contact-form.spec.js    # Form validation tests
│   ├── json-ld.spec.js         # JSON-LD structured data tests
│   ├── i18n.spec.js            # Multilingual switching tests
│   └── scrollspy.spec.js       # Sticky nav & scrollspy tests
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

### 5. Meta Tags & JSON-LD (SEO)

Update each HTML file's `<head>`:

```html
<title>Your Custom Title</title>
<meta name="description" content="Your custom description" />
<meta property="og:title" content="Your OG title" />
<meta property="og:url" content="https://yourdomain.com/" />
<link rel="canonical" href="https://yourdomain.com/" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://yourdomain.com/#person",
      "name": "Your Name",
      "jobTitle": "Your Title",
      "knowsLanguage": [
        { "@type": "Language", "name": "English" },
        { "@type": "Language", "name": "Spanish" }
      ]
    }
  ]
}
</script>
```

**JSON-LD @id Strategy**:
- `#person` – Your Person entity
- `#website` – Your WebSite entity
- `#organization` – Your Organization entity
- `#work-slug` – CreativeWork items (e.g., `#work-salesforce-dashboard`)

Reference entities using `"@id"` links:
```json
{
  "author": { "@id": "https://yourdomain.com/#person" },
  "employee": { "@id": "https://yourdomain.com/#person" }
}
```

---

## 📄 Resume: Print-Ready & Machine-Readable

### Overview

The portfolio includes a professional resume at [/resume-new.html](public/resume-new.html) with:
- **Print-optimized** layout (Save as PDF in browser)
- **Machine-readable** JSON export ([resume.json](public/assets/data/resume.json))
- **JSON-LD** structured data for search engines
- **Download buttons** for PDF and JSON formats
- **Share-friendly URLs**: `/resume` and `/cv` redirect to main resume page

### File Structure

```
public/
├── resume-new.html              # Main resume page
├── resume/index.html            # Alias redirect (/resume)
├── cv/index.html                # Alias redirect (/cv)
├── assets/
│   ├── css/resume.css           # Print & screen styles
│   ├── js/resume.js             # Download & copy functionality
│   └── data/resume.json         # JSON Resume format export
tools/
└── build-resume.mjs             # Build script (regenerates JSON)
```

### JSON Resume Format

The `resume.json` follows [JSON Resume schema](https://jsonresume.org/schema/):

```json
{
  "basics": {
    "name": "Brooke Alexis Hanger",
    "label": "Account Executive – Cloud & AI Solutions",
    "email": "brookehanger@gmail.com",
    "phone": "(631) 506-1147",
    "summary": "...",
    "location": { "city": "New York", "region": "NY" },
    "profiles": [...]
  },
  "work": [...],
  "education": [...],
  "skills": [...],
  "languages": [...],
  "certificates": [...]
}
```

### Updating Resume Content

**Option 1: Manual Edit**
```bash
# Edit JSON directly
nano public/assets/data/resume.json

# Update HTML content
nano public/resume-new.html
```

**Option 2: Build from Source (Future)**
```bash
# Place updated PDF in content/source/
cp ~/Brooke-Resume-2026.pdf content/source/

# Regenerate JSON (requires pdf-parse)
npm run resume:build
```

### Exporting to PDF

**Method 1: Browser** (Recommended)
1. Open [http://localhost:4173/resume-new.html](http://localhost:4173/resume-new.html)
2. Press `Ctrl+P` or click "Download PDF" button
3. Select "Save as PDF" as printer
4. Adjust margins to "Default" or "Minimum"
5. Save

**Method 2: Automated** (Requires Playwright)
```bash
# Export via headless browser
npm run resume:print
```

### JSON-LD Validation

The resume includes inline JSON-LD structured data (Schema.org/Person):

```bash
# Validate with online tools
open https://validator.schema.org/
# Paste: https://brookehanger.com/resume-new.html

# Or use local linter
npx jsonld-linter public/resume-new.html
```

### Print Stylesheet Features

- **Single-column** layout optimized for A4/Letter paper
- **Serif fonts** for professional print appearance (`Georgia`, `Times New Roman`)
- **Removes** navigation, backgrounds, and interactive elements
- **Shows URLs** after external links `(https://...)`
- **Page breaks** before major sections
- **Orphans/widows** control for paragraph flow
- **High contrast** black text on white background

---

## 🌍 Multilingual Support

### Adding a New Language

1. **Create translation file** in `public/i18n/`:
   ```bash
   cp public/i18n/en.json public/i18n/de.json
   ```

2. **Translate keys** in `de.json`:
   ```json
   {
     "nav": {
       "home": "Startseite",
       "about": "Über mich",
       "contact": "Kontakt"
     },
     "hero": {
       "title": "Salesforce-Experte",
       "subtitle": "CRM-Automatisierung..."
     }
   }
   ```

3. **Add language button** to `nav-new.js`:
   ```javascript
   <button data-lang-switch="de" aria-pressed="false" title="Deutsch">DE</button>
   ```

4. **Update i18n.js** supported languages:
   ```javascript
   const supportedLangs = ['en', 'es', 'fr', 'zh', 'de'];
   ```

### Using Translations in HTML

Add `data-i18n` attributes pointing to JSON keys:

```html
<h1 data-i18n="hero.title">Salesforce Account Executive</h1>
<p data-i18n="hero.subtitle">Driving revenue through CRM automation...</p>
<button data-i18n="hero.cta.primary">View Projects</button>
```

**Dot notation** accesses nested keys: `"hero.cta.primary"` → `hero: { cta: { primary: "..." } }`

### Language Persistence

- **Storage**: `localStorage.setItem('brooke-lang', 'es')`
- **Detection**: Falls back to `navigator.language` (e.g., `en-US` → `en`)
- **HTML Attribute**: Updates `<html lang="es">`

### Testing i18n

```bash
npx playwright test tests/i18n.spec.js
```

Tests validate:
- All 4 languages load translation files
- Language switcher updates visible text
- Selection persists across page reload
- CRM terminology preserved in all languages

---

## 📊 JSON-LD Structured Data

### Schema.org Entities Used

| Entity | Purpose | @id |
|--------|---------|-----|
| **Person** | Brooke's profile, skills, languages | `#person` |
| **WebSite** | Portfolio site metadata | `#website` |
| **Organization** | Independent Consultant entity | `#organization` |
| **CreativeWork** | Project showcases, resume | `#work-slug` |

### Example: Person Entity

```json
{
  "@type": "Person",
  "@id": "https://brookehanger.com/#person",
  "name": "Brooke Alexis Hanger",
  "givenName": "Brooke",
  "familyName": "Hanger",
  "jobTitle": "Salesforce Account Executive",
  "knowsLanguage": [
    { "@type": "Language", "name": "English", "alternateName": "en" },
    { "@type": "Language", "name": "Spanish", "alternateName": "es" }
  ],
  "knowsAbout": [
    "Salesforce CRM", "Pipeline Management", "Quota Attainment",
    "Forecast Accuracy", "B2B Sales Automation"
  ],
  "sameAs": [
    "https://linkedin.com/in/brookehanger",
    "https://github.com/brookehanger516"
  ]
}
```

### Adding JSON-LD to New Pages

1. **Create @graph structure** in `<head>`:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@graph": [
       {
         "@type": "Person",
         "@id": "https://brookehanger.com/#person",
         "name": "Brooke Alexis Hanger"
       },
       {
         "@type": "CreativeWork",
         "@id": "https://brookehanger.com/#work-example",
         "name": "Salesforce Dashboard",
         "author": { "@id": "https://brookehanger.com/#person" }
       }
     ]
   }
   </script>
   ```

2. **Use stable @ids** for cross-page linking
3. **Validate** with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Testing JSON-LD

```bash
npx playwright test tests/json-ld.spec.js
```

Tests validate:
- JSON-LD script present on all pages
- Valid JSON parsing
- Person entity has required properties
- @id references are unique and canonical
- CRM terminology included in `knowsAbout`

---

## 🚀 CI/CD Deployment

## 🚀 CI/CD Deployment

### GitHub Actions Workflow

**Automatic deployment** to GitHub Pages on every push to `main`:

1. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Source: **GitHub Actions**
   - Save

2. **Workflow** (`.github/workflows/deploy.yml`):
   - Triggers on `push` to `main` branch
   - Installs dependencies if `package.json` exists
   - Runs tests (continues on error)
   - Detects build step: checks for `"build"` script in `package.json`
   - Deploys `dist/` (if build) or `public/` (if static)
   - Uses `peaceiris/actions-gh-pages@v4`

3. **Push to deploy**:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   # GitHub Actions automatically deploys to gh-pages branch
   ```

4. **Monitor**: View workflow runs in **Actions** tab

### Manual GitHub Pages Deployment

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

3. **Access**: `https://brookehanger516.github.io/brooke-hanger/`

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
