#!/usr/bin/env node

/**
 * Build Resume JSON from Source PDFs
 * Parses PDF resume files and generates structured JSON Resume format
 * Falls back to existing resume.json if PDFs not available
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(PROJECT_ROOT, 'content', 'source');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'public', 'assets', 'data', 'resume.json');

// PDF files to check (in order of preference)
const PDF_FILES = [
  'Brooke Alexis-Hanger-Account Executive – Cloud & AI Solutions.pdf',
  'Brooke Alexis-Hanger.pdf'
];

/**
 * Check if PDF parsing library is available
 */
async function hasPdfParse() {
  try {
    await import('pdf-parse/lib/pdf-parse.js');
    return true;
  } catch {
    return false;
  }
}

/**
 * Find available PDF source file
 */
async function findSourcePdf() {
  try {
    const files = await fs.readdir(SOURCE_DIR);
    for (const pdfFile of PDF_FILES) {
      if (files.includes(pdfFile)) {
        return path.join(SOURCE_DIR, pdfFile);
      }
    }
  } catch (error) {
    // Source directory doesn't exist
  }
  return null;
}

/**
 * Parse PDF to extract text (basic implementation)
 * In production, this would use pdf-parse or similar
 */
async function parsePdf(pdfPath) {
  console.log(`⚠️  PDF parsing not fully implemented. Using template data.`);
  console.log(`   To enable: npm install pdf-parse`);
  console.log(`   Source: ${pdfPath}`);
  return null;
}

/**
 * Get template resume data
 */
function getTemplateData() {
  return {
    "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
    "basics": {
      "name": "Brooke Alexis Hanger",
      "label": "Account Executive – Cloud & AI Solutions",
      "email": "brookehanger@gmail.com",
      "phone": "(631) 506-1147",
      "url": "https://brookehanger.com",
      "summary": "Multilingual Account Executive with experience in B2B sales, cloud infrastructure, AI solutions, nonprofit leadership, and education. Proven ability to drive revenue through consultative selling, pipeline management, CRM optimization, and cross-functional collaboration.",
      "location": {
        "city": "New York",
        "countryCode": "US",
        "region": "NY"
      },
      "profiles": [
        {
          "network": "LinkedIn",
          "username": "brookehanger",
          "url": "https://linkedin.com/in/brookehanger"
        }
      ]
    },
    "meta": {
      "canonical": "https://brooke-hanger.com/resume.json",
      "version": "v1.0.0",
      "lastModified": new Date().toISOString()
    }
  };
}

/**
 * Load existing resume.json if available
 */
async function loadExistingResume() {
  try {
    const content = await fs.readFile(OUTPUT_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Main build function
 */
async function buildResume() {
  console.log('🔨 Building resume.json...\n');

  // Check for PDF source
  const pdfPath = await findSourcePdf();
  
  if (pdfPath) {
    console.log(`✓ Found source PDF: ${path.basename(pdfPath)}`);
    
    // Check if pdf-parse is available
    if (await hasPdfParse()) {
      console.log('✓ PDF parsing available');
      const pdfData = await parsePdf(pdfPath);
      if (pdfData) {
        // Would map PDF data to JSON Resume format here
        console.log('✓ Parsed PDF data');
      }
    } else {
      console.log('⚠️  pdf-parse not installed. Using template data.');
      console.log('   To enable: npm install -D pdf-parse');
    }
  } else {
    console.log('⚠️  No source PDF found in content/source/');
    console.log('   Expected files:');
    PDF_FILES.forEach(f => console.log(`   - ${f}`));
  }

  // Load existing or use template
  let resumeData = await loadExistingResume();
  
  if (!resumeData) {
    console.log('⚠️  No existing resume.json found. Using template.');
    resumeData = getTemplateData();
  } else {
    console.log('✓ Loaded existing resume.json');
    // Update metadata
    resumeData.meta = resumeData.meta || {};
    resumeData.meta.lastModified = new Date().toISOString();
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  await fs.mkdir(outputDir, { recursive: true });

  // Write JSON file
  await fs.writeFile(
    OUTPUT_PATH,
    JSON.stringify(resumeData, null, 2) + '\n',
    'utf-8'
  );

  console.log(`\n✅ Resume built successfully!`);
  console.log(`   Output: ${path.relative(PROJECT_ROOT, OUTPUT_PATH)}`);
  console.log(`   Size: ${JSON.stringify(resumeData).length} bytes`);
  
  // Validation checks
  const checks = [
    resumeData.basics?.name ? '✓' : '✗',
    resumeData.basics?.email ? '✓' : '✗',
    resumeData.work?.length > 0 ? '✓' : '✗',
    resumeData.education?.length > 0 ? '✓' : '✗',
    resumeData.skills?.length > 0 ? '✓' : '✗'
  ];
  
  console.log(`\n   Validation:`);
  console.log(`   ${checks[0]} Name present`);
  console.log(`   ${checks[1]} Email present`);
  console.log(`   ${checks[2]} Work history (${resumeData.work?.length || 0} entries)`);
  console.log(`   ${checks[3]} Education (${resumeData.education?.length || 0} entries)`);
  console.log(`   ${checks[4]} Skills (${resumeData.skills?.length || 0} categories)`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildResume().catch(error => {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  });
}

export { buildResume };
