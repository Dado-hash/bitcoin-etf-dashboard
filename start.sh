#!/bin/bash

# 🚀 ETF Bitcoin Dashboard - Quick Start Script
# Script per avviare rapidamente il dashboard

echo "🔥 ETF Bitcoin Dashboard - Setup e Avvio"
echo "========================================"

# Verifica che i file necessari esistano
echo "📁 Verificando file del progetto..."

required_files=("index.html" "app.js" "styles.css" "config.js" "README.md")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ File mancanti: ${missing_files[*]}"
    echo "Assicurati di essere nella directory corretta del progetto."
    exit 1
fi

echo "✅ Tutti i file necessari sono presenti"

# Verifica la configurazione
echo ""
echo "⚙️ Verificando configurazione..."

if grep -q "enabled: true" config.js; then
    echo "📊 Modalità DEMO attiva - utilizzando dati simulati"
    echo "   Per usare dati reali, configura config.production.js"
else
    echo "🔴 Modalità PRODUZIONE - utilizzando API SoSoValue"
    echo "   Assicurati che la tua API key sia configurata"
fi

# Funzione per aprire il browser
open_browser() {
    if command -v open > /dev/null 2>&1; then
        # macOS
        open "$1"
    elif command -v xdg-open > /dev/null 2>&1; then
        # Linux
        xdg-open "$1"
    elif command -v start > /dev/null 2>&1; then
        # Windows
        start "$1"
    else
        echo "Apri manualmente: $1"
    fi
}

# Avvia un server HTTP locale se possibile
echo ""
echo "🌐 Avviando il dashboard..."

if command -v python3 > /dev/null 2>&1; then
    echo "🐍 Utilizzando Python 3 per server HTTP locale"
    echo "📍 URL: http://localhost:8000"
    echo ""
    echo "💡 Per fermare il server, premi Ctrl+C"
    echo ""
    
    # Apri il browser automaticamente dopo 2 secondi
    (sleep 2 && open_browser "http://localhost:8000") &
    
    # Avvia il server
    python3 -m http.server 8000
    
elif command -v python > /dev/null 2>&1; then
    echo "🐍 Utilizzando Python 2 per server HTTP locale"
    echo "📍 URL: http://localhost:8000"
    echo ""
    echo "💡 Per fermare il server, premi Ctrl+C"
    echo ""
    
    # Apri il browser automaticamente dopo 2 secondi
    (sleep 2 && open_browser "http://localhost:8000") &
    
    # Avvia il server
    python -m SimpleHTTPServer 8000
    
elif command -v node > /dev/null 2>&1; then
    echo "🟢 Node.js disponibile"
    echo "Installa un server HTTP: npm install -g http-server"
    echo "Poi esegui: http-server"
    
else
    echo "🔗 Aprendo il file direttamente nel browser..."
    current_dir=$(pwd)
    file_path="file://$current_dir/index.html"
    open_browser "$file_path"
fi

echo ""
echo "📚 Risorse utili:"
echo "   - README.md: Documentazione completa"
echo "   - config.production.js: Esempio configurazione API reale"
echo "   - SoSoValue API: https://sosovalue.gitbook.io/soso-value-api-doc/"
echo ""
echo "🎯 Caratteristiche del dashboard:"
echo "   ✓ Dati ETF Bitcoin in tempo reale"
echo "   ✓ Grafici interattivi con Chart.js"
echo "   ✓ Integrazione TradingView"
echo "   ✓ Export dati CSV"
echo "   ✓ Design responsive"
echo "   ✓ Aggiornamento automatico"
echo ""
echo "🔧 Personalizzazione rapida:"
echo "   - Modifica config.js per impostazioni generali"
echo "   - Modifica styles.css per cambiare i colori"
echo "   - Usa config.production.js per API reali"