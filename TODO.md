# Production Deployment Checklist

## Before Going Live
- [ ] Replace homepage avatar placeholder (public/index.html line 133)
- [ ] Create PWA icons: icon-192.png (192×192) and icon-512.png (512×512) in /assets/img/
- [ ] Create social-card.jpg (1200×630px) for social media previews in /assets/img/
- [ ] Set GA4 ID in public/analytics.js (or remove GA fallback entirely if not using)
- [ ] Implement video modal player in public/automation-lab.js (currently marked as TODO)

## Performance
- [ ] Compress all images in public/assets/img/ (use TinyPNG, ImageOptim, or similar)
- [ ] Convert JPG images to WebP format where browser support is sufficient
- [ ] Run Lighthouse audit and target 90+ score on all metrics (Performance, Accessibility, Best Practices, SEO)

## Testing
- [ ] Verify all internal links work (no 404 errors)
- [ ] Test contact form submission to brookehanger@gmail.com
- [ ] Verify language switcher works correctly (EN, ES, ZH)
- [ ] Test dark mode toggle persistence across page navigation
- [ ] Ensure no console errors on any page
- [ ] Verify service worker caches assets correctly
- [ ] Test PWA installation on mobile devices (iOS/Android)
- [ ] Validate social media preview cards (LinkedIn, Twitter, Facebook)
- [ ] Test responsive design at breakpoints: 375px, 768px, 1024px, 1440px

## SEO
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Verify robots.txt is accessible at brooke-hanger.com/robots.txt
- [ ] Check Open Graph tags render correctly using opengraph.xyz or similar
- [ ] Validate JSON-LD structured data using Google Rich Results Test

## Security
- [ ] Ensure HTTPS is enforced (check netlify.toml redirects)
- [ ] Run security headers check at securityheaders.com
- [ ] Verify CSP (Content Security Policy) if implemented
- [ ] Check SSL certificate validity at ssllabs.com

## Maintenance Notes
- **Domain**: All references now use brooke-hanger.com (with hyphen)
- **Languages**: Site supports EN, ES, ZH (French removed)
- **Analytics**: Currently using Plausible (GA4 disabled but can be enabled)
- **Email**: Contact form sends to brookehanger@gmail.com via Formspree
