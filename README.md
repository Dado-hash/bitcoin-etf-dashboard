# 🚀 Bitcoin ETF Dashboard

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tuo-username/etf_btc)

Una dashboard professionale per monitorare gli inflow degli ETF Bitcoin in tempo reale, con integrazione TradingView e analisi avanzate.

## ✨ Caratteristiche Principali

- **📊 Dati ETF in Tempo Reale**: Inflow, volumi, AUM e metriche cumulative
- **📈 Integrazione TradingView Avanzata**: Charts professionali con overlay ETF
- **🔍 Analisi di Correlazione**: Relazione tra inflow ETF e prezzo Bitcoin
- **🎯 Sistema di Alert**: Notifiche per soglie personalizzabili
- **🌡️ Heatmap Interattiva**: Visualizzazione performance per periodo
- **📱 Design Responsive**: Ottimizzato per tutti i dispositivi
- **💾 Export Dati**: Funzionalità CSV con filtri avanzati
- **🔄 Auto-refresh**: Aggiornamento automatico ogni 5 minuti

## 🎯 Demo Live

🌐 **[Visualizza Demo Live](https://tuo-link-vercel.vercel.app)**

## 🚀 Deploy Rapido

### Deploy su Vercel (Raccomandato)

1. **Fork del Repository**
   ```bash
   git clone https://github.com/tuo-username/etf_btc.git
   cd etf_btc
   ```

2. **Deploy con Vercel CLI**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Deploy con GitHub**
   - Fork questo repository
   - Connetti il tuo account Vercel a GitHub
   - Deploy automatico ad ogni push

### Deploy Locale

```bash
# Clone del repository
git clone https://github.com/tuo-username/etf_btc.git
cd etf_btc

# Apri in browser
open index.html
# Oppure usa un server locale
python -m http.server 3000
```

## 📁 Struttura Progetto

```
etf_btc/
├── 📄 index.html              # Dashboard principale
├── 🎨 styles.css              # Stili CSS responsive
├── ⚡ app.js                  # Logica JavaScript avanzata
├── ⚙️ config.js               # Configurazione API
├── 🚀 package.json            # Configurazione NPM
├── 🔧 vercel.json             # Configurazione deploy Vercel
├── 📚 README.md               # Documentazione
└── 🔒 .gitignore              # File da escludere dal git
```

## 🛠️ Configurazione API

La dashboard utilizza l'API SoSoValue per dati ETF reali. La configurazione è già pronta in `config.js`:

```javascript
// config.js - Già configurato
const config = {
    apiKey: 'demo-api-key-sosovalue',
    apiBaseUrl: 'https://api.sosovalue.xyz',
    // ... altre configurazioni
};
```

## 🔧 Funzionalità Tecniche

### Caratteristiche Avanzate

- **📊 TradingView Widget**: Integrazione completa con overlay personalizzati
- **🔄 Real-time Updates**: Refresh automatico ogni 5 minuti
- **💾 Local Storage**: Cache dati per performance migliori
- **🎯 Alert System**: Notifiche push per soglie personalizzabili
- **📈 Correlation Analysis**: Calcolo correlazione ETF-Bitcoin
- **🌡️ Interactive Heatmap**: Visualizzazione performance multi-periodo
- **🔍 Advanced Filters**: Filtri per data, volume, tipologia ETF

### API Integration

```javascript
// Configurazione API SoSoValue
const ETF_API_CONFIG = {
    baseUrl: 'https://api.sosovalue.xyz',
    endpoint: '/openapi/v2/etf/historicalInflowChart',
    key: 'demo-api-key-sosovalue',
    rateLimit: '100 req/day'
};
```

### Performance Optimizations

- **Lazy Loading**: Caricamento progressivo dei componenti
- **Data Caching**: Sistema cache intelligente
- **Image Optimization**: SVG icons per prestazioni migliori
- **CSS Minification**: Stili ottimizzati per produzione

## � Deploy su Vercel

### Step 1: Preparazione Repository

```bash
# Clone e setup iniziale
git clone https://github.com/tuo-username/etf_btc.git
cd etf_btc

# Verifica file deployment
ls -la package.json vercel.json .gitignore
```

### Step 2: Deploy automatico

```bash
# Installa Vercel CLI
npm install -g vercel

# Login Vercel
vercel login

# Deploy in produzione
vercel --prod
```

### Step 3: Configurazione dominio (opzionale)

```bash
# Aggiungi dominio personalizzato
vercel domains add tuo-dominio.com
vercel alias set your-project-url.vercel.app tuo-dominio.com
```

## 📊 Metriche e Analytics

### KPI Tracciati

- **📈 Total Inflow**: Inflow cumulativo ETF Bitcoin
- **💰 Daily Volume**: Volume giornaliero di trading
- **🏦 AUM (Asset Under Management)**: Patrimonio totale gestito
- **📊 Price Correlation**: Correlazione prezzo BTC-inflow ETF
- **⚡ Volatility Index**: Indice di volatilità inflow

### Dati Storici

- **Periodo**: Ultimi 2 anni di dati ETF
- **Frequenza**: Aggiornamento giornaliero
- **Granularità**: Dati giorno per giorno
- **Provider**: SoSoValue API ufficiale

## 🎯 Roadmap e Sviluppi Futuri

### Versione 2.0 (Planned)

- [ ] **Multi-Asset Support**: Ethereum ETF, Solana ETF
- [ ] **Advanced Charts**: Candlestick patterns, technical indicators  
- [ ] **Portfolio Tracker**: Tracking personalizzato investimenti
- [ ] **Mobile App**: PWA con push notifications
- [ ] **API Dashboard**: Gestione chiavi API personalizzate
- [ ] **Premium Features**: Analisi predittive AI-powered

### Versione 1.5 (In Development)

- [x] **Vercel Deployment**: Deploy produzione ready
- [x] **TradingView Integration**: Charts professionali
- [x] **Real API Data**: Integrazione SoSoValue completa
- [ ] **Dark/Light Mode**: Switch tema automatico
- [ ] **Export Advanced**: PDF reports, Excel format

## 🤝 Contributing

### Come Contribuire

1. **Fork** del repository
2. **Create** un feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Apri** una Pull Request

### Linee Guida

- **Code Style**: JavaScript ES6+, CSS3 moderno
- **Testing**: Test funzionalità prima del commit
- **Documentation**: Aggiorna README per nuove features
- **Performance**: Mantieni bundle size ottimizzato

## � Licenza

Questo progetto è rilasciato sotto licenza **MIT**. Vedi il file `LICENSE` per dettagli.

## 🙏 Crediti

- **API Data**: [SoSoValue](https://sosovalue.com) - ETF data provider
- **Charts**: [TradingView](https://tradingview.com) - Professional charting
- **Icons**: [Lucide](https://lucide.dev) - Modern icon library
- **Fonts**: [Inter](https://rsms.me/inter/) - UI font family

## 📞 Supporto

- **Issues**: [GitHub Issues](https://github.com/tuo-username/etf_btc/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tuo-username/etf_btc/discussions)
- **Email**: sviluppatore@esempio.com

---

**🚀 Ready to deploy!** Carica su GitHub e deploy su Vercel in 2 minuti.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tuo-username/etf_btc)

### Dati ETF (da SoSoValue API)

- **totalNetInflow**: Inflow netto giornaliero (USD)
- **totalValueTraded**: Volume totale scambiato (USD)
- **totalNetAssets**: Valore totale asset ETF (USD)
- **cumNetInflow**: Inflow cumulativo dall'inizio (USD)

### Visualizzazioni

- **Line Chart**: Trend temporali inflow e volume
- **Statistics Cards**: Metriche chiave con variazioni percentuali
- **Data Table**: Vista dettagliata con filtri

## 🔐 Sicurezza

- Non esporre mai le API key nel codice frontend
- Usa variabili d'ambiente per credenziali sensitive
- Implementa rate limiting per chiamate API

## 📞 Support

Per domande o problemi:
- Controlla la documentazione SoSoValue API
- Verifica la console browser per errori
- Controlla la connettività di rete

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: Luglio 2025  
**Compatibilità API**: SoSoValue v2