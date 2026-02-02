# 🚀 Quick Reference: New Features & Usage

## New Design Tokens

### Colors
```css
/* Use these in your HTML/CSS */
--color-primary: #014B8C        /* Deep authority blue */
--color-accent: #1B8B7E         /* Teal for CTAs */
--color-surface: #F8FAFB        /* Light background */
--color-text-muted: #706e6b     /* Muted text */

/* Gradients */
--gradient-hero                 /* Animated hero gradient */
--gradient-primary              /* Button gradient */
--gradient-shimmer              /* Hover effect */
```

### Spacing
```css
--space-xs: 8px    --space-sm: 16px   --space-md: 24px
--space-lg: 32px   --space-xl: 48px   --space-2xl: 72px
--space-3xl: 96px  --space-4xl: 128px
```

## Animation Classes

### Scroll Animations
Add these classes to elements for scroll-triggered animations:

```html
<!-- Fade in from bottom -->
<div class="fade-in-up">Content</div>

<!-- Simple fade in -->
<div class="fade-in">Content</div>

<!-- Slide from left -->
<div class="slide-in-left">Content</div>

<!-- Slide from right -->
<div class="slide-in-right">Content</div>
```

### Animated Counters
```html
<!-- Counter with prefix and suffix -->
<span class="metric-number" data-counter data-prefix="$" data-suffix="M+" data-count="5">
  $5M+
</span>

<!-- Simple counter -->
<span data-counter data-count="100">100</span>
```

### Repeating Animations
```html
<!-- Animation repeats when scrolling in/out -->
<div class="fade-in-up" data-repeat>Content</div>
```

## Button Styles

### Primary CTA (Accent Color)
```html
<a href="#" class="cta-button">Primary Action</a>
```
- Teal background (#1B8B7E)
- Shimmer effect on hover
- Lifts with shadow

### Secondary CTA (Glass Effect)
```html
<a href="#" class="cta-button secondary">Secondary Action</a>
```
- White glass-morphism
- Backdrop blur
- Subtle hover lift

### Submit Button
```html
<button type="submit">Submit Form</button>
```
- Automatically styled like primary CTA
- Includes disabled state
- Loading spinner ready

## Card Components

### Basic Card
```html
<div class="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```
- Automatic scroll animation
- Hover lift effect
- Staggered reveal

### Stats Card
```html
<div class="card stats-card">
  <div class="metric">
    <span class="metric-number" data-counter data-count="100">100</span>
    <span class="metric-label">📊 Metric Name</span>
  </div>
</div>
```
- Animated gradient top border
- Counter animation
- Hover with glow

### Expertise Card
```html
<div class="expertise-card">
  <div class="expertise-icon">🎯</div>
  <h3>Skill Title</h3>
  <p>Description</p>
</div>
```

## Form Elements

### Input with Validation
```html
<div class="form-field">
  <label for="email">Email <span class="required">*</span></label>
  <input type="email" id="email" required>
  <span class="error-message" role="alert"></span>
</div>
```

### Success State
```html
<div class="form-field has-success">
  <input type="text" class="success">
</div>
```
- Shows animated checkmark
- Green border

### Error State
```html
<input type="text" class="error" aria-invalid="true">
```
- Shake animation
- Red border and background

## Utility Classes

### Spacing
```html
<div class="mb-xl">Margin bottom XL</div>
<div class="mt-lg">Margin top LG</div>
```

### Text Alignment
```html
<div class="text-center">Centered text</div>
<div class="text-muted">Muted text color</div>
```

### Visibility
```html
<span class="visually-hidden">Screen reader only</span>
```

## JavaScript Features

### Back to Top Button
Automatically created - no code needed!
- Appears after 50vh scroll
- Smooth scroll to top

### Scroll Indicator
Automatically added to hero section
- Bounces to attract attention
- Fades out on scroll
- Clickable to scroll down

### Sticky Header
Automatically adds `.scrolled` class at 50px
- Gradient background appears
- Enhanced shadow

### Smooth Scroll
All anchor links (#) scroll smoothly automatically

## Responsive Breakpoints

```css
/* Mobile first - base styles apply to mobile */

/* Tablet */
@media (min-width: 600px) { }

/* Desktop */
@media (min-width: 900px) { }

/* Large Desktop */
@media (min-width: 1200px) { }

/* Extra Large */
@media (min-width: 1440px) { }
```

## Grid Layouts

```html
<!-- 3-column grid (responsive) -->
<div class="grid grid-3">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>

<!-- 2-column grid -->
<div class="grid grid-2">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
</div>
```

Mobile: 1 column
Tablet: 2 columns
Desktop: 3 columns (for grid-3)

## Accessibility Features

### Focus Indicators
All interactive elements have 3px glowing outlines
- Auto-applied on keyboard focus
- High contrast
- Proper offset

### Touch Targets
All buttons and links are 48px minimum height
- Mobile optimized
- WCAG compliant

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations automatically simplified */
}
```

### ARIA Support
```html
<!-- Proper ARIA attributes -->
<button aria-label="Close menu">X</button>
<input aria-invalid="true" aria-describedby="error-msg">
<span id="error-msg" role="alert">Error message</span>
```

## Performance Tips

### Lazy Load Images
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### Async Scripts
```html
<script src="script.js" defer></script>
```

### Efficient Animations
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly

## Common Patterns

### Hero Section Structure
```html
<section class="section">
  <div class="container">
    <div class="hero-section">
      <div class="avatar">
        <img src="photo.jpg" alt="Your name">
      </div>
      <h1>Your Name</h1>
      <p class="hero-subtitle">Your tagline</p>
      <div class="cta-group">
        <a href="#" class="cta-button">Primary CTA</a>
        <a href="#" class="cta-button secondary">Secondary</a>
      </div>
    </div>
  </div>
</section>
```

### Section with Cards
```html
<section class="section" style="background: var(--color-surface);">
  <div class="container">
    <h2 class="text-center mb-xl fade-in-up">Section Title</h2>
    <div class="grid grid-3">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </div>
  </div>
</section>
```

## Customization

### Change Primary Color
```css
:root {
  --color-primary: #YOUR_COLOR;
}
```

### Change Accent Color
```css
:root {
  --color-accent: #YOUR_COLOR;
}
```

### Adjust Animation Speed
```css
:root {
  --duration-normal: 500ms; /* Default 300ms */
}
```

### Disable Animation
```css
.my-element {
  animation: none !important;
  transition: none !important;
}
```

## Debugging

### Check if Script Loaded
```javascript
// In browser console
console.log('Animations loaded:', typeof animateOnScroll !== 'undefined');
```

### Check Animation State
```javascript
// Check if element is visible
document.querySelector('.card').classList.contains('is-visible');
```

### Force Animation
```javascript
// Manually trigger
document.querySelectorAll('.card').forEach(el => {
  el.classList.add('is-visible');
});
```

## Browser Support

### Supported
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari iOS 14+
- ✅ Chrome Android

### Fallbacks
- Older browsers: Basic styling without animations
- No JS: All content visible, no dynamic effects
- Reduced motion: Simplified animations

---

## Quick Tips

1. **Always test mobile first** - Use DevTools mobile view
2. **Check accessibility** - Tab through all elements
3. **Test performance** - Run Lighthouse in DevTools
4. **Validate HTML** - Use W3C validator
5. **Check console** - Look for JavaScript errors

## Need Help?

- **CSS Issues:** Check browser console for errors
- **JS Not Working:** Verify script loaded in Network tab
- **Layout Issues:** Inspect element in DevTools
- **Performance:** Use Lighthouse Performance audit

---

*Created: February 2, 2026*  
*Version: 1.0*  
*Phase: 1 - Visual & Branding Improvements*
