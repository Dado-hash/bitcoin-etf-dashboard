// config.production.js - Example production configuration
// Copia questo file e rinominalo in config.js per utilizzare le API reali

const CONFIG = {
    // API Configuration - RIEMPI QUESTI CAMPI
    api: {
        baseUrl: 'https://api.sosovalue.com',
        endpoint: '/openapi/v2/etf/historicalInflowChart',
        
        // 🔑 INSERISCI LA TUA API KEY QUI
        apiKey: 'YOUR_SOSOVALUE_API_KEY_HERE',
        
        timeout: 30000,
        retries: 3,
        etfType: 'us-btc-spot' // or 'us-eth-spot'
    },

    // Dashboard settings
    dashboard: {
        refreshInterval: 5 * 60 * 1000, // 5 minuti
        defaultChartPeriod: 90,
        enableAnimations: true,
        currency: 'USD',
        locale: 'it-IT'
    },

    // Chart configuration
    charts: {
        tradingView: {
            symbol: 'BITSTAMP:BTCUSD', // Cambia se necessario
            theme: 'dark',
            locale: 'it',
            timezone: 'Europe/Rome',
            interval: 'D'
        },
        
        inflowChart: {
            type: 'line',
            responsive: true,
            maintainAspectRatio: false,
            tension: 0.4,
            pointRadius: 2
        }
    },

    // UI Configuration
    ui: {
        theme: {
            primaryColor: '#f7931a',
            secondaryColor: '#1e2028',
            backgroundColor: '#0a0b0f',
            successColor: '#00d4aa',
            dangerColor: '#ff6b6b'
        },
        
        table: {
            pageSize: 50,
            enableSearch: true,
            enableExport: true
        },
        
        notifications: {
            duration: 5000,
            position: 'top-right'
        }
    },

    // 🚨 IMPORTANTE: Disabilita la modalità demo quando usi API reali
    demo: {
        enabled: false, // ← Cambia questo in false
        dataPoints: 300,
        baseInflow: {
            min: -50000000,
            max: 150000000
        },
        volatility: 50000000,
        trendFactor: 100000
    },

    // Feature flags
    features: {
        enableAutoRefresh: true,
        enableExport: true,
        enableSearch: true,
        enableNotifications: true,
        enableAnimations: true
    },

    // Development settings
    development: {
        debugMode: false, // Imposta true per debug
        logApiCalls: true, // Utile per verificare le chiamate API
        mockApiDelay: 1000
    }
};

// ===================================================================
// 📋 ISTRUZIONI PER L'UTILIZZO:
// ===================================================================
//
// 1. Ottieni le credenziali API da SoSoValue:
//    - Vai su https://sosovalue.com
//    - Registrati e ottieni una API key
//
// 2. Configura questo file:
//    - Sostituisci 'YOUR_SOSOVALUE_API_KEY_HERE' con la tua API key
//    - Imposta demo.enabled = false
//    - Verifica che l'endpoint sia corretto
//
// 3. Rinomina questo file:
//    - Da: config.production.js
//    - A: config.js
//
// 4. Testa la configurazione:
//    - Apri index.html
//    - Verifica che i dati reali vengano caricati
//    - Controlla la console per errori
//
// 5. Monitoraggio:
//    - Abilita development.logApiCalls per vedere le chiamate
//    - Controlla i rate limits dell'API
//    - Verifica la qualità dei dati ricevuti
//
// ===================================================================

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Helper per verificare la configurazione
function validateProductionConfig() {
    const errors = [];
    
    if (!CONFIG.api.apiKey || CONFIG.api.apiKey === 'YOUR_SOSOVALUE_API_KEY_HERE') {
        errors.push('❌ API key non configurata correttamente');
    }
    
    if (CONFIG.demo.enabled) {
        errors.push('⚠️ Modalità demo ancora attiva - disabilitala per usare API reali');
    }
    
    if (CONFIG.development.debugMode) {
        console.log('🔍 Debug mode attivo');
    }
    
    if (errors.length > 0) {
        console.error('🚨 Errori di configurazione:', errors);
        return false;
    }
    
    console.log('✅ Configurazione valida per produzione');
    return true;
}

// Esegui validazione al caricamento
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(validateProductionConfig, 1000);
    });
}