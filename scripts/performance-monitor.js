#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Performance Monitoring Utility
 * Tracks bundle size changes over time and generates reports
 */

const PERFORMANCE_DATA_FILE = path.join(process.cwd(), '.performance-history.json');

function loadPerformanceHistory() {
  if (!fs.existsSync(PERFORMANCE_DATA_FILE)) {
    return { builds: [] };
  }
  
  try {
    return JSON.parse(fs.readFileSync(PERFORMANCE_DATA_FILE, 'utf8'));
  } catch (error) {
    console.warn('⚠️  Could not load performance history:', error.message);
    return { builds: [] };
  }
}

function savePerformanceHistory(data) {
  try {
    fs.writeFileSync(PERFORMANCE_DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Could not save performance history:', error.message);
  }
}

function recordBuildMetrics() {
  const buildDir = path.join(process.cwd(), '.next');
  const outDir = path.join(process.cwd(), 'out');
  
  // Check if build exists
  if (!fs.existsSync(buildDir) && !fs.existsSync(outDir)) {
    console.error('❌ No build found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  const analyzeDir = fs.existsSync(outDir) ? outDir : buildDir;
  const stats = getBundleStats(analyzeDir);
  
  const buildMetrics = {
    timestamp: new Date().toISOString(),
    commit: getGitCommit(),
    branch: getGitBranch(),
    metrics: {
      totalSize: stats.js.totalSize + stats.css.totalSize + stats.images.totalSize,
      jsSize: stats.js.totalSize,
      cssSize: stats.css.totalSize,
      imageSize: stats.images.totalSize,
      fileCount: {
        js: stats.js.files.length,
        css: stats.css.files.length,
        images: stats.images.files.length
      }
    }
  };
  
  const history = loadPerformanceHistory();
  history.builds.push(buildMetrics);
  
  // Keep only last 50 builds
  if (history.builds.length > 50) {
    history.builds = history.builds.slice(-50);
  }
  
  savePerformanceHistory(history);
  
  console.log('📊 Build metrics recorded:');
  console.log(`  Total Size: ${formatBytes(buildMetrics.metrics.totalSize)}`);
  console.log(`  JavaScript: ${formatBytes(buildMetrics.metrics.jsSize)}`);
  console.log(`  CSS: ${formatBytes(buildMetrics.metrics.cssSize)}`);
  console.log(`  Images: ${formatBytes(buildMetrics.metrics.imageSize)}`);
  
  // Check for regressions
  checkForRegressions(history);
}

function checkForRegressions(history) {
  if (history.builds.length < 2) {
    console.log('ℹ️  Not enough build history for regression analysis.');
    return;
  }
  
  const current = history.builds[history.builds.length - 1];
  const previous = history.builds[history.builds.length - 2];
  
  const sizeDiff = current.metrics.totalSize - previous.metrics.totalSize;
  const percentChange = (sizeDiff / previous.metrics.totalSize) * 100;
  
  console.log('\n🔍 Regression Analysis:');
  
  if (Math.abs(percentChange) < 1) {
    console.log('✅ No significant size changes detected.');
  } else if (sizeDiff > 0) {
    console.log(`⚠️  Bundle size increased by ${formatBytes(sizeDiff)} (${percentChange.toFixed(2)}%)`);
    
    if (percentChange > 10) {
      console.log('❌ Significant bundle size regression detected!');
      process.exit(1);
    }
  } else {
    console.log(`✅ Bundle size decreased by ${formatBytes(Math.abs(sizeDiff))} (${Math.abs(percentChange).toFixed(2)}%)`);
  }
}

function generateTrendReport() {
  const history = loadPerformanceHistory();
  
  if (history.builds.length === 0) {
    console.log('ℹ️  No performance history available.');
    return;
  }
  
  console.log('📈 Performance Trend Report');
  console.log('============================\n');
  
  const recent = history.builds.slice(-10); // Last 10 builds
  
  console.log('Recent Builds:');
  recent.forEach((build, index) => {
    const date = new Date(build.timestamp).toLocaleDateString();
    const time = new Date(build.timestamp).toLocaleTimeString();
    const commit = build.commit ? build.commit.substring(0, 7) : 'unknown';
    
    console.log(`  ${index + 1}. ${date} ${time} (${commit})`);
    console.log(`     Total: ${formatBytes(build.metrics.totalSize)}, JS: ${formatBytes(build.metrics.jsSize)}`);
  });
  
  if (recent.length >= 2) {
    const oldest = recent[0];
    const newest = recent[recent.length - 1];
    const totalChange = newest.metrics.totalSize - oldest.metrics.totalSize;
    const percentChange = (totalChange / oldest.metrics.totalSize) * 100;
    
    console.log(`\n📊 Trend over last ${recent.length} builds:`);
    console.log(`  Size change: ${totalChange >= 0 ? '+' : ''}${formatBytes(totalChange)} (${percentChange.toFixed(2)}%)`);
  }
}

function getBundleStats(buildDir) {
  const stats = {
    js: { files: [], totalSize: 0 },
    css: { files: [], totalSize: 0 },
    images: { files: [], totalSize: 0 }
  };
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath);
      } else {
        const size = fs.statSync(fullPath).size;
        const ext = path.extname(item).toLowerCase();
        
        if (['.js', '.mjs'].includes(ext)) {
          stats.js.files.push({ name: item, size });
          stats.js.totalSize += size;
        } else if (ext === '.css') {
          stats.css.files.push({ name: item, size });
          stats.css.totalSize += size;
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
          stats.images.files.push({ name: item, size });
          stats.images.totalSize += size;
        }
      }
    }
  }
  
  scanDirectory(buildDir);
  return stats;
}

function getGitCommit() {
  try {
    const { execSync } = require('child_process');
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    return null;
  }
}

function getGitBranch() {
  try {
    const { execSync } = require('child_process');
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'record':
    recordBuildMetrics();
    break;
  case 'trend':
    generateTrendReport();
    break;
  case 'clear':
    if (fs.existsSync(PERFORMANCE_DATA_FILE)) {
      fs.unlinkSync(PERFORMANCE_DATA_FILE);
      console.log('✅ Performance history cleared.');
    } else {
      console.log('ℹ️  No performance history to clear.');
    }
    break;
  default:
    console.log('Performance Monitor Usage:');
    console.log('  node scripts/performance-monitor.js record  - Record current build metrics');
    console.log('  node scripts/performance-monitor.js trend   - Show performance trends');
    console.log('  node scripts/performance-monitor.js clear   - Clear performance history');
    break;
}