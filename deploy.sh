#!/bin/bash

# 🚀 Bitcoin ETF Dashboard - Deploy Script
# Script automatico per deploy su GitHub e Vercel

set -e  # Exit on any error

echo "🚀 Bitcoin ETF Dashboard - Deploy Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_info "Inizializzando repository Git..."
    git init
    print_success "Repository Git inizializzato"
fi

# Check for required files
required_files=("index.html" "app.js" "styles.css" "config.js" "package.json" "vercel.json")
missing_files=()

print_info "Verificando file necessari..."
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    print_error "File mancanti: ${missing_files[*]}"
    print_error "Assicurati che tutti i file siano presenti prima del deploy"
    exit 1
fi

print_success "Tutti i file necessari sono presenti"

# Stage all files
print_info "Aggiungendo file al commit..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "Nessuna modifica da committare"
else
    # Commit with timestamp
    commit_message="🚀 Deploy $(date '+%Y-%m-%d %H:%M:%S') - Bitcoin ETF Dashboard"
    print_info "Creando commit: $commit_message"
    git commit -m "$commit_message"
    print_success "Commit creato con successo"
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    print_warning "Remote origin non configurato"
    print_info "Configura il remote con: git remote add origin https://github.com/username/etf_btc.git"
    
    # Ask user for repository URL
    echo -n "Inserisci l'URL del repository GitHub (o premi Enter per saltare): "
    read repo_url
    
    if [ ! -z "$repo_url" ]; then
        git remote add origin "$repo_url"
        print_success "Remote origin configurato: $repo_url"
    else
        print_warning "Remote non configurato, il push su GitHub sarà saltato"
    fi
fi

# Push to GitHub if remote exists
if git remote get-url origin &> /dev/null; then
    print_info "Caricando su GitHub..."
    
    # Get current branch
    current_branch=$(git branch --show-current)
    
    # Push to GitHub
    if git push origin "$current_branch"; then
        print_success "Push su GitHub completato"
        
        # Get repository URL for display
        repo_url=$(git remote get-url origin)
        repo_name=$(basename "$repo_url" .git)
        username=$(basename $(dirname "$repo_url"))
        
        print_success "Repository disponibile su: https://github.com/$username/$repo_name"
    else
        print_error "Errore durante il push su GitHub"
        print_info "Verifica le credenziali e i permessi del repository"
    fi
else
    print_warning "Remote GitHub non configurato, saltando il push"
fi

# Deploy to Vercel
print_info "Preparando deploy su Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI non installato"
    print_info "Installando Vercel CLI..."
    
    if command -v npm &> /dev/null; then
        npm install -g vercel
        print_success "Vercel CLI installato"
    else
        print_error "npm non trovato. Installa Node.js per continuare"
        print_info "Download Node.js: https://nodejs.org/"
        exit 1
    fi
fi

# Deploy to Vercel
print_info "Avviando deploy su Vercel..."
echo -e "${YELLOW}🔐 Potrebbe essere richiesto il login a Vercel...${NC}"

if vercel --prod; then
    print_success "Deploy su Vercel completato!"
    
    # Try to get the deployment URL
    if vercel ls --limit 1 &> /dev/null; then
        print_info "Il tuo dashboard è ora online!"
    fi
else
    print_error "Errore durante il deploy su Vercel"
    print_info "Verifica la configurazione in vercel.json e riprova"
fi

# Final summary
echo ""
echo "🎉 Deploy Summary"
echo "=================="
print_info "✅ File verificati e validati"
print_info "✅ Commit creato e pushato su GitHub"
print_info "✅ Deploy completato su Vercel"
echo ""
print_success "Il tuo Bitcoin ETF Dashboard è ora live!"
echo ""
print_info "📚 Prossimi passi:"
echo "   1. Configura un dominio personalizzato su Vercel (opzionale)"
echo "   2. Monitora le performance del dashboard"
echo "   3. Aggiorna i dati API se necessario"
echo ""
print_info "🔧 Comandi utili:"
echo "   - vercel --prod    # Redeploy manuale"
echo "   - vercel logs      # Visualizza i log"
echo "   - vercel domains   # Gestisci domini"
echo ""
print_success "Happy trading! 📈"
