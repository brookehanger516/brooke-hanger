#!/bin/bash
set -euo pipefail

# Production Activation Script
# Archives old files and activates -new files as production versions

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_DIR="archive/${TIMESTAMP}"
DRY_RUN=false

[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

echo "🚀 Production Activation Script"
echo "================================"
$DRY_RUN && echo "⚠️  DRY RUN MODE - No changes will be made"

# Create archive directory
if ! $DRY_RUN; then
  mkdir -p "${ARCHIVE_DIR}"/{html,js,css}
  echo "✅ Created archive: ${ARCHIVE_DIR}"
fi

# Function to archive and replace
activate_file() {
  local new_file="$1"
  local prod_file="${new_file//-new/}"
  
  # Skip if production name doesn't exist as -new
  [[ ! -f "$new_file" ]] && return
  
  echo "📦 Activating: $(basename "$prod_file")"
  
  if $DRY_RUN; then
    echo "   Would move: $new_file → $prod_file"
    [[ -f "$prod_file" ]] && echo "   Would archive: $prod_file → ${ARCHIVE_DIR}/"
  else
    # Archive old production version if exists
    if [[ -f "$prod_file" ]]; then
      local subdir=$(dirname "$prod_file" | sed 's|^public/||')
      mkdir -p "${ARCHIVE_DIR}/${subdir}"
      cp "$prod_file" "${ARCHIVE_DIR}/${subdir}/"
      echo "   ✓ Archived old version"
    fi
    
    # Move new to production
    mv "$new_file" "$prod_file"
    echo "   ✓ Activated: $(basename "$prod_file")"
  fi
}

# Activate all -new files
echo ""
echo "🔄 Processing files..."
activate_file "public/index-new.html"
activate_file "public/nav-new.js"
activate_file "public/contact-new.html"
activate_file "public/resume-new.html"

# Update internal links
if ! $DRY_RUN; then
  echo ""
  echo "🔗 Updating internal links..."
  
  find public -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i \
    -e 's/index-new\.html/index.html/g' \
    -e 's/nav-new\.js/nav.js/g' \
    -e 's/contact-new\.html/contact.html/g' \
    -e 's/resume-new\.html/resume.html/g' \
    {} +
  
  echo "   ✓ Links updated"
fi

# Summary
echo ""
echo "✨ Activation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update analytics.js domain (line 10)"
echo "   2. Add Formspree endpoint to contact.html"
echo "   3. Run: npm run validate"
echo "   4. Run: npm test"
echo "   5. Deploy: npm run deploy"
