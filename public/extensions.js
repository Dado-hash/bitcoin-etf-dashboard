// extensions.js - Estensioni opzionali per il dashboard
// File opzionale per funzionalità avanzate

// 🔔 Sistema di notifiche
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        // Crea container per notifiche
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 300px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            color: var(--text-primary);
            animation: slideIn 0.3s ease;
            position: relative;
        `;
        
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--danger-color)',
            warning: 'var(--warning-color)',
            info: 'var(--primary-color)'
        };
        
        notification.style.borderLeftColor = colors[type];
        notification.style.borderLeftWidth = '4px';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: var(--text-secondary); cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.getElementById('notification-container').appendChild(notification);

        // Auto-remove dopo duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// 📊 Analisi avanzata dei dati
class DataAnalyzer {
    constructor(data) {
        this.data = data;
    }

    // Calcola la media mobile
    movingAverage(period = 7) {
        const result = [];
        for (let i = period - 1; i < this.data.length; i++) {
            const sum = this.data.slice(i - period + 1, i + 1)
                .reduce((acc, item) => acc + item.totalNetInflow, 0);
            result.push({
                date: this.data[i].date,
                value: sum / period
            });
        }
        return result;
    }

    // Identifica trend
    identifyTrend(period = 14) {
        if (this.data.length < period * 2) return 'insufficient_data';
        
        const recent = this.data.slice(0, period);
        const previous = this.data.slice(period, period * 2);
        
        const recentAvg = recent.reduce((acc, item) => acc + item.totalNetInflow, 0) / period;
        const previousAvg = previous.reduce((acc, item) => acc + item.totalNetInflow, 0) / period;
        
        const change = ((recentAvg - previousAvg) / Math.abs(previousAvg)) * 100;
        
        if (change > 10) return 'strong_uptrend';
        if (change > 5) return 'uptrend';
        if (change < -10) return 'strong_downtrend';
        if (change < -5) return 'downtrend';
        return 'sideways';
    }

    // Calcola volatilità
    calculateVolatility(period = 30) {
        if (this.data.length < period) return 0;
        
        const recentData = this.data.slice(0, period);
        const values = recentData.map(item => item.totalNetInflow);
        
        const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
        const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
        
        return Math.sqrt(variance);
    }

    // Trova outliers
    findOutliers(threshold = 2) {
        const values = this.data.map(item => item.totalNetInflow);
        const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
        const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
        
        return this.data.filter(item => {
            const zscore = Math.abs((item.totalNetInflow - mean) / stdDev);
            return zscore > threshold;
        });
    }
}

// 🔄 Comparatore con altri asset
class AssetComparator {
    constructor() {
        this.symbols = ['BTC-USD', 'ETH-USD', 'SPY', 'GLD'];
    }

    async fetchPriceData(symbol, days = 90) {
        // Esempio di chiamata a API per dati di prezzo
        // Sostituisci con la tua API preferita (Alpha Vantage, Yahoo Finance, etc.)
        try {
            // Demo implementation
            const data = this.generateMockPriceData(symbol, days);
            return data;
        } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return [];
        }
    }

    generateMockPriceData(symbol, days) {
        const data = [];
        const basePrice = symbol.includes('BTC') ? 45000 : 
                         symbol.includes('ETH') ? 3000 : 
                         symbol.includes('SPY') ? 400 : 1800;
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            const randomChange = (Math.random() - 0.5) * 0.1; // ±5% change
            const price = basePrice * (1 + randomChange);
            
            data.push({
                date: date.toISOString().split('T')[0],
                price: price,
                symbol: symbol
            });
        }
        return data;
    }

    calculateCorrelation(data1, data2) {
        if (data1.length !== data2.length) return 0;
        
        const n = data1.length;
        const sum1 = data1.reduce((acc, val) => acc + val, 0);
        const sum2 = data2.reduce((acc, val) => acc + val, 0);
        const sum1Sq = data1.reduce((acc, val) => acc + val * val, 0);
        const sum2Sq = data2.reduce((acc, val) => acc + val * val, 0);
        const sum12 = data1.reduce((acc, val, i) => acc + val * data2[i], 0);
        
        const numerator = (n * sum12) - (sum1 * sum2);
        const denominator = Math.sqrt(((n * sum1Sq) - (sum1 * sum1)) * ((n * sum2Sq) - (sum2 * sum2)));
        
        return denominator === 0 ? 0 : numerator / denominator;
    }
}

// 📈 Alert system per soglie
class AlertSystem {
    constructor() {
        this.alerts = [];
        this.checkInterval = 60000; // 1 minute
        this.isActive = false;
    }

    addAlert(type, threshold, condition, callback) {
        const alert = {
            id: Date.now(),
            type: type, // 'inflow', 'volume', 'price', etc.
            threshold: threshold,
            condition: condition, // 'above', 'below', 'crosses'
            callback: callback,
            triggered: false,
            created: new Date()
        };
        
        this.alerts.push(alert);
        return alert.id;
    }

    removeAlert(id) {
        this.alerts = this.alerts.filter(alert => alert.id !== id);
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.intervalId = setInterval(() => {
            this.checkAlerts();
        }, this.checkInterval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.isActive = false;
        }
    }

    checkAlerts() {
        if (!window.etfDashboard || !window.etfDashboard.data.length) return;
        
        const latestData = window.etfDashboard.data[0];
        
        this.alerts.forEach(alert => {
            if (alert.triggered) return;
            
            let currentValue;
            switch (alert.type) {
                case 'inflow':
                    currentValue = latestData.totalNetInflow;
                    break;
                case 'volume':
                    currentValue = latestData.totalValueTraded;
                    break;
                case 'assets':
                    currentValue = latestData.totalNetAssets;
                    break;
                default:
                    return;
            }
            
            let shouldTrigger = false;
            switch (alert.condition) {
                case 'above':
                    shouldTrigger = currentValue > alert.threshold;
                    break;
                case 'below':
                    shouldTrigger = currentValue < alert.threshold;
                    break;
            }
            
            if (shouldTrigger) {
                alert.triggered = true;
                alert.callback(alert, currentValue, latestData);
            }
        });
    }
}

// 💾 Data persistence
class DataPersistence {
    constructor() {
        this.storageKey = 'etf_dashboard_data';
    }

    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                data: data,
                timestamp: Date.now(),
                version: '1.0'
            }));
        } catch (error) {
            console.warn('Could not save data to localStorage:', error);
        }
    }

    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return null;
            
            const parsed = JSON.parse(stored);
            
            // Check if data is not too old (24 hours)
            if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
                this.clear();
                return null;
            }
            
            return parsed.data;
        } catch (error) {
            console.warn('Could not load data from localStorage:', error);
            return null;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('Could not clear localStorage:', error);
        }
    }
}

// Inizializzazione delle estensioni
if (typeof window !== 'undefined') {
    window.NotificationSystem = NotificationSystem;
    window.DataAnalyzer = DataAnalyzer;
    window.AssetComparator = AssetComparator;
    window.AlertSystem = AlertSystem;
    window.DataPersistence = DataPersistence;
    
    // Auto-initialize se richiesto nella configurazione
    document.addEventListener('DOMContentLoaded', () => {
        if (window.CONFIG?.features?.enableNotifications) {
            window.notifications = new NotificationSystem();
        }
        
        if (window.CONFIG?.features?.enableAlerts) {
            window.alertSystem = new AlertSystem();
            window.alertSystem.start();
        }
        
        if (window.CONFIG?.features?.enablePersistence) {
            window.dataPersistence = new DataPersistence();
        }
    });
}

// Esempio di utilizzo delle estensioni
/*
// Aggiungere notifiche
window.notifications.show('Dashboard caricato con successo!', 'success');

// Analizzare i dati
const analyzer = new DataAnalyzer(window.etfDashboard.data);
const trend = analyzer.identifyTrend();
console.log('Current trend:', trend);

// Aggiungere alert
window.alertSystem.addAlert(
    'inflow', 
    100000000, // 100M USD
    'above', 
    (alert, value) => {
        window.notifications.show(
            `🚨 Inflow ETF sopra ${alert.threshold}! Valore attuale: ${value}`, 
            'warning'
        );
    }
);

// Salvare dati
window.dataPersistence.save(window.etfDashboard.data);
*/