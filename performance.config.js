/**
 * Performance Configuration
 * Defines performance budgets and monitoring settings
 */

module.exports = {
  // Performance budgets in KB
  budgets: {
    // Initial JavaScript bundle (critical path)
    initialJS: 100,
    
    // Total JavaScript across all chunks
    totalJS: 250,
    
    // CSS bundle size
    css: 50,
    
    // Total image assets
    images: 500,
    
    // Total bundle size (all assets)
    total: 800
  },
  
  // Regression thresholds
  regressionThresholds: {
    // Fail CI if bundle size increases by more than 10%
    failureThreshold: 10,
    
    // Warn if bundle size increases by more than 5%
    warningThreshold: 5
  },
  
  // Monitoring settings
  monitoring: {
    // Number of builds to keep in history
    historyLimit: 50,
    
    // Enable automatic performance recording after builds
    autoRecord: true,
    
    // Generate reports in CI
    ciReporting: true
  },
  
  // Bundle analysis settings
  analysis: {
    // Show top N largest files in reports
    topFilesCount: 10,
    
    // Minimum file size to include in detailed reports (bytes)
    minFileSize: 1024,
    
    // File extensions to analyze
    extensions: {
      js: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
      css: ['.css', '.scss', '.sass'],
      images: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'],
      fonts: ['.woff', '.woff2', '.ttf', '.otf', '.eot']
    }
  }
};