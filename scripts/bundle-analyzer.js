#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Bundle Analysis Script
 * Generates bundle reports and monitors bundle size
 */

const BUNDLE_SIZE_LIMITS = {
  // Performance budgets in KB
  initialJS: 100, // Initial JavaScript bundle should be under 100KB
  totalJS: 250,   // Total JavaScript should be under 250KB
  css: 50,        // CSS should be under 50KB
  images: 500,    // Images should be under 500KB total
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundleSize() {
  console.log('🔍 Analyzing bundle size...\n');
  
  const buildDir = path.join(process.cwd(), '.next');
  const outDir = path.join(process.cwd(), 'out');
  
  // Check if build exists
  if (!fs.existsSync(buildDir) && !fs.existsSync(outDir)) {
    console.error('❌ No build found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  // Analyze static export if it exists (for GitHub Pages)
  const analyzeDir = fs.existsSync(outDir) ? outDir : buildDir;
  
  try {
    // Get bundle sizes
    const bundleStats = getBundleStats(analyzeDir);
    
    // Display results
    displayBundleReport(bundleStats);
    
    // Check against performance budgets
    checkPerformanceBudgets(bundleStats);
    
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message);
    process.exit(1);
  }
}

function getBundleStats(buildDir) {
  const stats = {
    js: { files: [], totalSize: 0 },
    css: { files: [], totalSize: 0 },
    images: { files: [], totalSize: 0 },
    other: { files: [], totalSize: 0 }
  };
  
  function scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativeFilePath = path.join(relativePath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath, relativeFilePath);
      } else {
        const size = fs.statSync(fullPath).size;
        const ext = path.extname(item).toLowerCase();
        
        if (['.js', '.mjs'].includes(ext)) {
          stats.js.files.push({ name: relativeFilePath, size });
          stats.js.totalSize += size;
        } else if (ext === '.css') {
          stats.css.files.push({ name: relativeFilePath, size });
          stats.css.totalSize += size;
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
          stats.images.files.push({ name: relativeFilePath, size });
          stats.images.totalSize += size;
        } else {
          stats.other.files.push({ name: relativeFilePath, size });
          stats.other.totalSize += size;
        }
      }
    }
  }
  
  scanDirectory(buildDir);
  return stats;
}

function displayBundleReport(stats) {
  console.log('📊 Bundle Size Report');
  console.log('=====================\n');
  
  // JavaScript files
  console.log('📄 JavaScript Files:');
  stats.js.files
    .sort((a, b) => b.size - a.size)
    .slice(0, 10) // Show top 10 largest JS files
    .forEach(file => {
      console.log(`  ${file.name}: ${formatBytes(file.size)}`);
    });
  console.log(`  Total JS: ${formatBytes(stats.js.totalSize)}\n`);
  
  // CSS files
  if (stats.css.files.length > 0) {
    console.log('🎨 CSS Files:');
    stats.css.files
      .sort((a, b) => b.size - a.size)
      .forEach(file => {
        console.log(`  ${file.name}: ${formatBytes(file.size)}`);
      });
    console.log(`  Total CSS: ${formatBytes(stats.css.totalSize)}\n`);
  }
  
  // Images
  if (stats.images.files.length > 0) {
    console.log('🖼️  Image Files:');
    stats.images.files
      .sort((a, b) => b.size - a.size)
      .slice(0, 5) // Show top 5 largest images
      .forEach(file => {
        console.log(`  ${file.name}: ${formatBytes(file.size)}`);
      });
    console.log(`  Total Images: ${formatBytes(stats.images.totalSize)}\n`);
  }
  
  // Summary
  const totalSize = stats.js.totalSize + stats.css.totalSize + stats.images.totalSize + stats.other.totalSize;
  console.log('📈 Summary:');
  console.log(`  Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`  JavaScript: ${formatBytes(stats.js.totalSize)} (${((stats.js.totalSize / totalSize) * 100).toFixed(1)}%)`);
  console.log(`  CSS: ${formatBytes(stats.css.totalSize)} (${((stats.css.totalSize / totalSize) * 100).toFixed(1)}%)`);
  console.log(`  Images: ${formatBytes(stats.images.totalSize)} (${((stats.images.totalSize / totalSize) * 100).toFixed(1)}%)`);
  console.log(`  Other: ${formatBytes(stats.other.totalSize)} (${((stats.other.totalSize / totalSize) * 100).toFixed(1)}%)\n`);
}

function checkPerformanceBudgets(stats) {
  console.log('🎯 Performance Budget Check');
  console.log('============================\n');
  
  let budgetPassed = true;
  
  // Check JavaScript budget
  const jsKB = stats.js.totalSize / 1024;
  if (jsKB > BUNDLE_SIZE_LIMITS.totalJS) {
    console.log(`❌ JavaScript budget exceeded: ${jsKB.toFixed(2)}KB > ${BUNDLE_SIZE_LIMITS.totalJS}KB`);
    budgetPassed = false;
  } else {
    console.log(`✅ JavaScript budget: ${jsKB.toFixed(2)}KB ≤ ${BUNDLE_SIZE_LIMITS.totalJS}KB`);
  }
  
  // Check CSS budget
  const cssKB = stats.css.totalSize / 1024;
  if (cssKB > BUNDLE_SIZE_LIMITS.css) {
    console.log(`❌ CSS budget exceeded: ${cssKB.toFixed(2)}KB > ${BUNDLE_SIZE_LIMITS.css}KB`);
    budgetPassed = false;
  } else {
    console.log(`✅ CSS budget: ${cssKB.toFixed(2)}KB ≤ ${BUNDLE_SIZE_LIMITS.css}KB`);
  }
  
  // Check Images budget
  const imagesKB = stats.images.totalSize / 1024;
  if (imagesKB > BUNDLE_SIZE_LIMITS.images) {
    console.log(`❌ Images budget exceeded: ${imagesKB.toFixed(2)}KB > ${BUNDLE_SIZE_LIMITS.images}KB`);
    budgetPassed = false;
  } else {
    console.log(`✅ Images budget: ${imagesKB.toFixed(2)}KB ≤ ${BUNDLE_SIZE_LIMITS.images}KB`);
  }
  
  console.log('');
  
  if (budgetPassed) {
    console.log('🎉 All performance budgets passed!');
  } else {
    console.log('⚠️  Some performance budgets exceeded. Consider optimizing your bundle.');
    process.exit(1);
  }
}

function generateDetailedReport() {
  console.log('🔍 Generating detailed bundle analysis...\n');
  
  try {
    // Set environment variable and run build with analyzer
    process.env.ANALYZE = 'true';
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('\n✅ Detailed bundle analysis complete!');
    console.log('📊 Check the opened browser window for interactive bundle analysis.');
    
  } catch (error) {
    console.error('❌ Error generating detailed report:', error.message);
    process.exit(1);
  }
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'analyze':
    analyzeBundleSize();
    break;
  case 'detailed':
    generateDetailedReport();
    break;
  case 'budget':
    // Build first, then analyze
    try {
      console.log('🔨 Building project...');
      execSync('npm run build', { stdio: 'inherit' });
      analyzeBundleSize();
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
    break;
  default:
    console.log('Bundle Analyzer Usage:');
    console.log('  node scripts/bundle-analyzer.js analyze   - Analyze existing build');
    console.log('  node scripts/bundle-analyzer.js detailed  - Generate detailed interactive report');
    console.log('  node scripts/bundle-analyzer.js budget    - Build and check performance budgets');
    break;
}