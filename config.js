// Configuration file for ETF Bitcoin Dashboard
// Configurazione per il Dashboard ETF Bitcoin

const CONFIG = {
  // API Configuration - INSERISCI LA TUA API KEY QUI
  api: {
    baseUrl: "https://api.sosovalue.xyz",
    endpoint: "/openapi/v2/etf/historicalInflowChart",

    // 🔑 INSERISCI LA TUA API KEY QUI
    apiKey: "SOSO-93326e6df0144bbeb8e6bd0389a41ec0",

    timeout: 30000,
    retries: 3,
    etfType: "us-btc-spot", // or 'us-eth-spot'
  },

  // Dashboard settings
  dashboard: {
    // Auto-refresh interval (in milliseconds)
    refreshInterval: 5 * 60 * 1000, // 5 minutes

    // Default chart periods
    defaultChartPeriod: 90, // days

    // Animation settings
    enableAnimations: true,

    // Data formatting
    currency: "USD",
    locale: "it-IT",
  },

  // Chart configuration
  charts: {
    // TradingView settings
    tradingView: {
      symbol: "BITSTAMP:BTCUSD",
      theme: "dark",
      locale: "it",
      timezone: "Europe/Rome",
      interval: "D",
    },

    // Chart.js settings
    inflowChart: {
      type: "line",
      responsive: true,
      maintainAspectRatio: false,
      tension: 0.4,
      pointRadius: 2,
    },
  },

  // UI Configuration
  ui: {
    // Theme colors (CSS variables)
    theme: {
      primaryColor: "#f7931a",
      secondaryColor: "#1e2028",
      backgroundColor: "#0a0b0f",
      successColor: "#00d4aa",
      dangerColor: "#ff6b6b",
    },

    // Table settings
    table: {
      pageSize: 50,
      enableSearch: true,
      enableExport: true,
    },

    // Notification settings
    notifications: {
      duration: 5000, // 5 seconds
      position: "top-right",
    },
  },

  // Demo mode settings
  demo: {
    enabled: true, // Set to false when using real API
    dataPoints: 300, // Number of demo data points to generate

    // Demo data generation parameters
    baseInflow: {
      min: -50000000, // -50M USD
      max: 150000000, // 150M USD
    },

    volatility: 50000000, // 50M USD
    trendFactor: 100000, // Trend multiplier
  },

  // Feature flags
  features: {
    enableAutoRefresh: true,
    enableExport: true,
    enableSearch: true,
    enableNotifications: true,
    enableAnimations: true,
  },

  // Development settings
  development: {
    debugMode: false,
    logApiCalls: false,
    mockApiDelay: 1000, // milliseconds
  },
};

// Export configuration for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
} else if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}

// Configuration validation
function validateConfig() {
  const errors = [];

  if (!CONFIG.demo.enabled && !CONFIG.api.apiKey) {
    errors.push("API key is required when demo mode is disabled");
  }

  if (CONFIG.dashboard.refreshInterval < 60000) {
    errors.push(
      "Refresh interval should be at least 1 minute to avoid rate limiting"
    );
  }

  if (CONFIG.demo.dataPoints > 300) {
    errors.push("Demo data points should not exceed 300 (API limit)");
  }

  return errors;
}

// Helper functions for configuration
const ConfigHelper = {
  // Check if demo mode is enabled
  isDemoMode: () => CONFIG.demo.enabled || !CONFIG.api.apiKey,

  // Get formatted API URL
  getApiUrl: () => `${CONFIG.api.baseUrl}${CONFIG.api.endpoint}`,

  // Get chart configuration
  getChartConfig: (chartType) => CONFIG.charts[chartType] || {},

  // Update configuration at runtime
  updateConfig: (path, value) => {
    const keys = path.split(".");
    let obj = CONFIG;

    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = value;
  },

  // Validate current configuration
  validate: validateConfig,
};

// Make helper available globally
if (typeof window !== "undefined") {
  window.ConfigHelper = ConfigHelper;
}
