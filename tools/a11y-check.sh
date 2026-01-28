#!/bin/bash
set -euo pipefail

echo "♿ Accessibility Check"
echo "===================="

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
  echo "❌ npx not found. Install Node.js and npm."
  exit 1
fi

# Run accessibility tests if they exist
if [[ -f "tests/a11y.spec.js" ]]; then
  npx playwright test tests/a11y.spec.js --reporter=list
else
  echo "⚠️  No accessibility tests found at tests/a11y.spec.js"
  echo "   Run existing test suite for basic a11y checks:"
  npm test -- --grep="accessibility|a11y" --reporter=list || echo "   No a11y-specific tests found"
fi
