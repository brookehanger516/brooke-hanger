# Mobile-First Architecture & Design System

## 📐 Design Tokens

### Color Palette (Salesforce-Inspired)

```css
/* Primary Colors */
--color-primary: #0176d3;        /* Salesforce blue */
--color-primary-dark: #014486;   /* Hover state */
--color-primary-light: #e3f3ff;  /* Focus ring background */
--color-primary-hover: #005fb2;  /* Interactive elements */

/* Neutral Colors */
--color-bg: #ffffff;             /* Page background */
--color-surface: #fafafa;        /* Card background */
--color-surface-raised: #f4f6f9; /* Elevated components */
--color-text: #181818;           /* Primary text */
--color-text-muted: #706e6b;     /* Secondary text */
--color-text-light: #a8a29e;     /* Tertiary text */
--color-border: #dddbda;         /* Dividers */
--color-border-light: #e5e5e5;   /* Subtle borders */

/* Semantic Colors */
--color-success: #2e844a;        /* Success states */
--color-warning: #fe9339;        /* Warning states */
--color-error: #ea001e;          /* Error states */
```

### Typography Scale (Fluid with clamp)

```css
/* Base: 14px-16px (mobile-desktop) */
--font-size-base: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);

/* Small: 12-14px */
--font-size-sm: 0.875rem;

/* Large: 16-18px */
--font-size-lg: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);

/* XL: 20-24px */
--font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);

/* 2XL: 24-32px (h2) */
--font-size-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);

/* 3XL: 32-40px (h1 on mobile) */
--font-size-3xl: clamp(2rem, 1.5rem + 2.5vw, 2.5rem);

/* 4XL: 40-48px (hero text) */
--font-size-4xl: clamp(2.5rem, 2rem + 2.5vw, 3rem);
```

### Spacing System (8px Base Unit)

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

### Breakpoints (Mobile-First)

```css
--breakpoint-sm: 600px;   /* Small tablets */
--breakpoint-md: 900px;   /* Tablets landscape */
--breakpoint-lg: 1200px;  /* Desktop */
--breakpoint-xl: 1440px;  /* Large desktop */
```

**Usage**:
```css
/* Mobile-first (default) */
.container {
  padding: var(--space-md);
}

/* Tablets and up */
@media (min-width: 600px) {
  .container {
    padding: var(--space-lg);
  }
}

/* Desktop and up */
@media (min-width: 1200px) {
  .container {
    max-width: var(--container-max-width);
    margin: 0 auto;
  }
}
```

### Elevation (Shadows)

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);   /* Subtle lift */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);   /* Cards */
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);   /* Raised cards */
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.1);   /* Modals */
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.12);  /* Overlays */
```

### Border Radius

```css
--radius-sm: 4px;    /* Buttons, inputs */
--radius-md: 8px;    /* Cards */
--radius-lg: 12px;   /* Large cards */
--radius-xl: 16px;   /* Hero sections */
--radius-full: 9999px; /* Pills, avatars */
```

### Motion

```css
--transition-fast: 150ms ease;   /* Hover states */
--transition-base: 250ms ease;   /* Default interactions */
--transition-slow: 350ms ease;   /* Slide-ins, modals */
```

---

## 🏗️ Layout Patterns

### Container

```css
.container {
  max-width: var(--container-max-width); /* 1200px */
  margin: 0 auto;
  padding: 0 var(--space-md); /* 24px on mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-lg); /* 32px on desktop */
  }
}
```

### Grid System

```css
/* Base grid (mobile: stacked) */
.grid {
  display: grid;
  gap: var(--space-lg);
}

/* 2-column (tablet+) */
.grid-2 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3-column (desktop+) */
.grid-3 {
  grid-template-columns: 1fr;
}

@media (min-width: 900px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Cards

```css
.card {
  background: var(--color-bg);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

---

## 📱 Mobile-First Principles

### 1. Fluid Typography

Instead of fixed font sizes, use `clamp()` for responsive scaling:

```css
/* ❌ Fixed size (not responsive) */
h1 { font-size: 48px; }

/* ✅ Fluid size (scales 40px-48px) */
h1 { font-size: clamp(2.5rem, 2rem + 2.5vw, 3rem); }
```

### 2. Touch Targets

All interactive elements must meet **44×44px minimum** (WCAG 2.2 AA):

```css
button,
a.button,
input[type="submit"] {
  min-height: var(--touch-target); /* 44px */
  padding: var(--space-sm) var(--space-lg);
}
```

### 3. Stacked Layout (Mobile Default)

```css
/* Mobile: stack vertically */
.hero-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* Desktop: horizontal layout */
@media (min-width: 900px) {
  .hero-section {
    flex-direction: row;
    align-items: center;
    gap: var(--space-xl);
  }
}
```

### 4. Progressive Enhancement

Start with semantic HTML, layer on styles and JS:

```html
<!-- Works without CSS/JS -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about.html">About</a></li>
  </ul>
</nav>

<!-- Enhanced with hamburger menu (JS) -->
<button data-menu-toggle aria-expanded="false">Menu</button>
```

---

## ♿ Accessibility Patterns

### Focus Indicators

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Skip Link

```html
<a class="skip-link" href="#main">Skip to content</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--space-xs) var(--space-md);
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### ARIA Labels

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <button aria-expanded="false" aria-label="Open navigation menu">
    Menu
  </button>
</nav>

<!-- Form validation -->
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid="false"
/>
<span id="email-error" role="alert"></span>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧩 Component Inventory

### Navigation (Hamburger Menu)

**Features**:
- Mobile overlay with smooth transition
- Focus trap (Tab cycles through links)
- ESC key to close
- Touch swipe gesture (down to close)
- Backdrop click to close
- ARIA expanded state

**Files**:
- `nav-new.js` - Component logic
- `styles.css` - `.site-header`, `.nav-toggle`, `.menu-overlay`

### Contact Form

**Features**:
- Formspree integration (default)
- Netlify Forms alternative (commented)
- HTML5 + JavaScript validation
- Real-time error feedback
- Honeypot spam prevention
- Character counter
- Success/failure states

**Files**:
- `contact-new.html` - Form markup
- `contact-form.js` - Validation logic
- `styles.css` - `.contact-form`, `.form-field`, `.error-message`

### Analytics Module

**Features**:
- Provider toggle (Plausible/GA/none)
- DNT respect
- Deferred loading
- Console logging
- Exposed config for testing

**Files**:
- `analytics.js` - Analytics initialization

### Automation Lab Dashboard

**Features**:
- Interactive carousel (arrows, dots, keyboard, swipe)
- Tab filtering (All/Salesforce/Power BI/Automation)
- Video player cards
- Download center
- Automation flow library

**Files**:
- `automation-lab.html` - Dashboard markup
- `automation-lab.css` - Dashboard styles
- `automation-lab.js` - Carousel + filtering logic

---

## 🔍 SEO Meta Template

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  
  <!-- Primary Meta Tags -->
  <title>[Page Title] - Brooke Alexis Hanger</title>
  <meta name="description" content="[120-160 char description]" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://brooke-hanger.com/[page].html" />
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="https://brooke-hanger.com/assets/img/social-card.jpg" />
  <meta property="og:image:alt" content="Brooke Alexis Hanger - Cloud & AI Solutions Expert" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Page Title]" />
  <meta name="twitter:description" content="[Description]" />
  <meta name="twitter:image" content="https://brooke-hanger.com/assets/img/social-card.jpg" />
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Brooke Alexis Hanger",
    "jobTitle": "Account Executive - Cloud & AI Solutions",
    "knowsLanguage": ["en", "es", "pt"],
    "url": "https://brooke-hanger.com/"
  }
  </script>
  
  <!-- Canonical -->
  <link rel="canonical" href="https://brooke-hanger.com/[page].html" />
  
  <!-- Styles & Scripts -->
  <link rel="stylesheet" href="./styles.css" />
  <meta name="theme-color" content="#0176d3" />
  <script src="./analytics.js" defer></script>
</head>
```

---

## 🧪 Testing Strategy

### Viewport Coverage

```javascript
// Mobile
{ width: 375, height: 667 }  // iPhone SE

// Tablet
{ width: 768, height: 1024 }  // iPad

// Desktop
{ width: 1200, height: 800 }  // Standard desktop
{ width: 1920, height: 1080 } // Large desktop
```

### Accessibility Checks

```javascript
// Focus order
await page.keyboard.press('Tab');
await expect(skipLink).toBeFocused();

// ARIA attributes
await expect(button).toHaveAttribute('aria-expanded', 'false');

// Contrast ratios (manual check with DevTools)
// - Text: 4.5:1 minimum
// - Large text: 3:1 minimum
// - UI components: 3:1 minimum
```

### SEO Validation

```javascript
// Meta tags present
await expect(page.locator('meta[name="description"]')).toHaveCount(1);

// Content not empty
const description = await page.locator('meta[name="description"]').getAttribute('content');
expect(description.length).toBeGreaterThan(50);

// Structured data valid JSON
const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
expect(() => JSON.parse(jsonLd)).not.toThrow();
```

---

## 📊 Performance Budget

| Metric | Target | Priority |
|--------|--------|----------|
| First Contentful Paint | <1.8s | High |
| Largest Contentful Paint | <2.5s | High |
| Total Blocking Time | <200ms | Medium |
| Cumulative Layout Shift | <0.1 | High |
| Speed Index | <3.4s | Medium |
| Total Page Size | <1MB | Medium |
| JavaScript | <50KB gzipped | High |

### Optimization Checklist

- [ ] Lazy-load images (`loading="lazy"`)
- [ ] Responsive images (`srcset`, `sizes`)
- [ ] Defer non-critical JS (`defer`, `async`)
- [ ] Minify CSS/JS (production build)
- [ ] Compress images (TinyPNG, ImageOptim)
- [ ] Enable HTTP/2
- [ ] Add cache headers (`Cache-Control: max-age=31536000`)
- [ ] Use `content-visibility: auto` for off-screen content

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Run all tests (`npm test`)
- [ ] Check Lighthouse scores (95+ target)
- [ ] Validate HTML (W3C Validator)
- [ ] Test on real devices (iOS, Android)
- [ ] Review accessibility (axe DevTools)
- [ ] Verify meta tags (OpenGraph.xyz)

### Configuration

- [ ] Update analytics domain (`analytics.js`)
- [ ] Configure contact form endpoint (`contact.html`)
- [ ] Create social card image (1200×630px)
- [ ] Add CNAME file for custom domain (`public/CNAME`)
- [ ] Set up DNS records (A/CNAME)

### Post-Deployment

- [ ] Test production URLs
- [ ] Verify analytics tracking
- [ ] Submit sitemap (`robots.txt`, `sitemap.xml`)
- [ ] Monitor Lighthouse scores (PageSpeed Insights)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)

---

**Last Updated**: 2026-01-27  
**Version**: 1.0.0  
**Maintained By**: Brooke Alexis Hanger
