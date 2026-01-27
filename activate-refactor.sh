#!/bin/bash
# Activation Script - Deploy Mobile-First Refactor
# Activates new files, runs tests, and prepares for deployment

set -e

echo "🚀 Brooke Hanger Portfolio - Activation Script"
echo "=============================================="
echo ""

cd "$(dirname "$0")"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "📋 Step 1: Activating new files..."

# Backup old files
echo "   Creating backups..."
cd public

if [ -f nav.js ]; then
    mv nav.js nav-backup-$(date +%Y%m%d).js
    echo "   ✓ Backed up nav.js"
fi

if [ -f index.html ]; then
    mv index.html index-backup-$(date +%Y%m%d).html
    echo "   ✓ Backed up index.html"
fi

if [ -f contact.html ]; then
    mv contact.html contact-backup-$(date +%Y%m%d).html
    echo "   ✓ Backed up contact.html"
fi

# Activate new files
if [ -f nav-new.js ]; then
    cp nav-new.js nav.js
    echo -e "   ${GREEN}✓${NC} Activated nav.js"
fi

if [ -f index-new.html ]; then
    cp index-new.html index.html
    echo -e "   ${GREEN}✓${NC} Activated index.html"
fi

if [ -f contact-new.html ]; then
    cp contact-new.html contact.html
    echo -e "   ${GREEN}✓${NC} Activated contact.html"
fi

cd ..

echo ""
echo "⚙️  Step 2: Configuration check..."

# Check for placeholders that need updating
echo "   Checking analytics.js..."
if grep -q "YOUR_PLAUSIBLE_DOMAIN" public/analytics.js; then
    echo -e "   ${YELLOW}⚠${NC} Update YOUR_PLAUSIBLE_DOMAIN in public/analytics.js"
else
    echo -e "   ${GREEN}✓${NC} Analytics configured"
fi

echo "   Checking contact form..."
if grep -q "YOUR_FORMSPREE_ENDPOINT" public/contact.html; then
    echo -e "   ${YELLOW}⚠${NC} Update YOUR_FORMSPREE_ENDPOINT in public/contact.html"
else
    echo -e "   ${GREEN}✓${NC} Contact form configured"
fi

echo "   Checking social card image..."
if [ -f public/assets/img/social-card.jpg ]; then
    echo -e "   ${GREEN}✓${NC} Social card exists"
else
    echo -e "   ${YELLOW}⚠${NC} Create public/assets/img/social-card.jpg (1200×630px)"
fi

echo ""
echo "📦 Step 3: Installing dependencies..."
npm ci
echo -e "${GREEN}✓${NC} Dependencies installed"

echo ""
echo "🧪 Step 4: Running tests..."
npm test || {
    echo -e "${RED}✗${NC} Some tests failed. Review output above."
    echo "   You can proceed to deployment if failures are expected (e.g., no server running)"
    read -p "   Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

echo ""
echo "✅ Activation Complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 TODO Before Deployment:"
echo ""
echo "  1. Configure Analytics:"
echo "     Edit public/analytics.js:"
echo "     - Replace YOUR_PLAUSIBLE_DOMAIN with your domain"
echo "     - OR set provider to 'ga' and add GA4 ID"
echo ""
echo "  2. Configure Contact Form:"
echo "     Edit public/contact.html:"
echo "     - Replace YOUR_FORMSPREE_ENDPOINT with your endpoint"
echo "     - Get endpoint from: https://formspree.io"
echo ""
echo "  3. Create Social Card:"
echo "     Design and save to public/assets/img/social-card.jpg"
echo "     - Dimensions: 1200×630px"
echo "     - Format: JPG or PNG"
echo "     - Size: <300KB"
echo ""
echo "  4. Update Remaining Pages:"
echo "     Add meta tags and analytics to:"
echo "     - public/about.html"
echo "     - public/experience.html"
echo "     - public/resume.html"
echo "     - public/automation-lab.html"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Next Steps:"
echo ""
echo "  Local Preview:"
echo "    npm start"
echo "    → http://localhost:4173"
echo ""
echo "  Deploy to GitHub Pages:"
echo "    git add ."
echo "    git commit -m \"feat: Mobile-first refactor + SEO + analytics\""
echo "    git push origin main"
echo ""
echo "  Deploy to Vercel:"
echo "    vercel --prod"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✨ Ready to launch!${NC}"
echo ""
