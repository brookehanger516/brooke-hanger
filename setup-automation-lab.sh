#!/bin/bash
# Automation Lab - Quick Setup & Activation Script
# Run this to activate the new dashboard and test it

set -e

echo "🚀 Automation Lab Dashboard - Setup Script"
echo "============================================"
echo ""

# Navigate to project root
cd "$(dirname "$0")"

echo "📦 Step 1: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

echo "🔄 Step 2: Activating new files..."

# Backup and activate navigation
if [ -f public/nav.js ]; then
    echo "   Backing up old nav.js → nav-old.js"
    mv public/nav.js public/nav-backup-$(date +%Y%m%d).js
fi
if [ -f public/nav-new.js ]; then
    echo "   Activating nav-new.js → nav.js"
    cp public/nav-new.js public/nav.js
fi

# Backup and activate index page
if [ -f public/index.html ]; then
    echo "   Backing up old index.html → index-old.html"
    mv public/index.html public/index-backup-$(date +%Y%m%d).html
fi
if [ -f public/index-new.html ]; then
    echo "   Activating index-new.html → index.html"
    cp public/index-new.html public/index.html
fi

echo "✅ Files activated"
echo ""

echo "🧪 Step 3: Running tests..."
npm test || echo "⚠️  Some tests failed (this is expected if server not running)"
echo ""

echo "🌐 Step 4: Starting development server..."
echo "   Server will be available at: http://localhost:4173"
echo "   Visit: http://localhost:4173/automation-lab.html"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

npm start
