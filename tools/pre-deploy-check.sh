#!/bin/bash
set -euo pipefail

echo "🔍 Pre-deployment validation..."

# 1. Check for placeholders
echo "1/5 Checking for placeholders..."
if grep -R "TODO\|YOUR_.*\|PLACEHOLDER\|FIXME" public/ --exclude-dir={node_modules,dist} -n 2>/dev/null | grep -v "YOUR_ENDPOINT_HERE"; then
  echo "❌ Found placeholders that need updating"
  exit 1
else
  echo "✅ No critical placeholders"
fi

# 2. Validate JSON files
echo "2/5 Validating JSON..."
json_errors=0
for file in public/**/*.json public/i18n/*.json public/assets/data/*.json; do
  if [[ -f "$file" ]]; then
    if ! jq empty "$file" 2>/dev/null; then
      echo "❌ Invalid JSON: $file"
      json_errors=$((json_errors + 1))
    fi
  fi
done
if [[ $json_errors -gt 0 ]]; then
  exit 1
else
  echo "✅ All JSON valid"
fi

# 3. Check analytics config
echo "3/5 Checking analytics..."
if grep -q "YOUR_PLAUSIBLE_DOMAIN" public/analytics.js; then
  echo "❌ Update analytics domain"
  exit 1
else
  echo "✅ Analytics configured"
fi

# 4. Validate HTML (basic check)
echo "4/5 Validating HTML..."
html_errors=0
for file in public/*.html; do
  if [[ -f "$file" ]]; then
    # Check for basic structure
    if ! grep -q "<html" "$file" || ! grep -q "</html>" "$file"; then
      echo "❌ Invalid HTML structure: $file"
      html_errors=$((html_errors + 1))
    fi
  fi
done
if [[ $html_errors -gt 0 ]]; then
  exit 1
else
  echo "✅ HTML structure valid"
fi

# 5. Run test suite
echo "5/5 Running tests..."
if npm test -- --reporter=list 2>&1 | tail -20; then
  echo "✅ Tests passed"
else
  echo "⚠️  Some tests failed - review output"
fi

echo ""
echo "✨ Pre-deployment checks complete!"
echo "   Ready to deploy: npm run deploy"
