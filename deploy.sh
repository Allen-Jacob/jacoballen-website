#!/bin/bash

# ============================================
# Script de déploiement sécurisé - Linktree
# ============================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/$USER/projects/linktree"
WEB_DIR="/var/www/link.jacoballen.ca"
NGINX_CONFIG="/etc/nginx/sites-available/link.jacoballen.ca"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}   Déploiement Linktree Sécurisé        ${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"

# Vérifier qu'on est dans le bon dossier
if [ ! -d "$PROJECT_DIR/.git" ]; then
    echo -e "${RED}❌ Erreur: Dossier Git non trouvé${NC}"
    echo -e "Exécutez ce script depuis: $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"

# Étape 1: Pull des dernières modifications
echo -e "\n${YELLOW}📥 Récupération des dernières modifications...${NC}"
git pull origin main || git pull origin master

# Étape 2: Créer le dossier web s'il n'existe pas
if [ ! -d "$WEB_DIR" ]; then
    echo -e "\n${YELLOW}📁 Création du dossier web...${NC}"
    sudo mkdir -p "$WEB_DIR"
    sudo chown -R $USER:www-data "$WEB_DIR"
    sudo chmod -R 755 "$WEB_DIR"
fi

# Étape 3: Copier UNIQUEMENT les fichiers nécessaires (SANS .git)
echo -e "\n${YELLOW}📋 Copie des fichiers vers le serveur web...${NC}"

# Liste des fichiers à copier
FILES_TO_COPY=(
    "index.html"
    "admin.html"
    "styles.css"
    "admin-styles.css"
    "script.js"
    "admin-script.js"
    "env.js"
)

for file in "${FILES_TO_COPY[@]}"; do
    if [ -f "$PROJECT_DIR/$file" ]; then
        sudo cp "$PROJECT_DIR/$file" "$WEB_DIR/"
        echo -e "  ${GREEN}✓${NC} Copié: $file"
    else
        echo -e "  ${YELLOW}⚠${NC}  Ignoré: $file (non trouvé)"
    fi
done

# Copier le dossier img/ s'il existe
if [ -d "$PROJECT_DIR/img" ]; then
    sudo mkdir -p "$WEB_DIR/img"
    sudo cp -r "$PROJECT_DIR/img/"* "$WEB_DIR/img/"
    echo -e "  ${GREEN}✓${NC} Copié: dossier img/"
fi

# Étape 4: Vérifier qu'il n'y a PAS de .git dans le web
echo -e "\n${YELLOW}🔒 Vérification sécurité...${NC}"
if [ -d "$WEB_DIR/.git" ]; then
    echo -e "${RED}❌ ALERTE: Dossier .git trouvé dans le web!${NC}"
    sudo rm -rf "$WEB_DIR/.git"
    echo -e "${GREEN}✓ Dossier .git supprimé${NC}"
else
    echo -e "${GREEN}✓ Aucun dossier .git dans le web${NC}"
fi

# Vérifier les autres fichiers sensibles
SENSITIVE_FILES=(".env" ".gitignore" ".dockerignore" "package.json" "README.md")
for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$WEB_DIR/$file" ]; then
        sudo rm -f "$WEB_DIR/$file"
        echo -e "${GREEN}✓ Fichier sensible supprimé: $file${NC}"
    fi
done

# Étape 5: Permissions correctes
echo -e "\n${YELLOW}🔐 Configuration des permissions...${NC}"
sudo chown -R $USER:www-data "$WEB_DIR"
sudo find "$WEB_DIR" -type d -exec chmod 755 {} \;
sudo find "$WEB_DIR" -type f -exec chmod 644 {} \;
echo -e "${GREEN}✓ Permissions configurées${NC}"

# Étape 6: Tester la config Nginx
echo -e "\n${YELLOW}🔧 Test de la configuration Nginx...${NC}"
if sudo nginx -t &>/dev/null; then
    echo -e "${GREEN}✓ Configuration Nginx valide${NC}"
    
    # Recharger Nginx
    echo -e "\n${YELLOW}🔄 Rechargement de Nginx...${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx rechargé${NC}"
else
    echo -e "${RED}❌ Erreur dans la configuration Nginx${NC}"
    sudo nginx -t
    exit 1
fi

# Résumé final
echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Déploiement terminé avec succès!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "\n📍 Site disponible sur: ${BLUE}https://link.jacoballen.ca${NC}"
echo -e "\n${YELLOW}Vérifications de sécurité:${NC}"
echo -e "  ${GREEN}✓${NC} Pas de dossier .git dans /var/www"
echo -e "  ${GREEN}✓${NC} Pas de fichiers sensibles exposés"
echo -e "  ${GREEN}✓${NC} Permissions correctes"
echo -e "  ${GREEN}✓${NC} Nginx rechargé"

# Test des URLs sensibles
echo -e "\n${YELLOW}🧪 Test des URLs sensibles (doivent retourner 404):${NC}"
curl -s -o /dev/null -w "  %{http_code} - https://link.jacoballen.ca/.git/config\n" https://link.jacoballen.ca/.git/config
curl -s -o /dev/null -w "  %{http_code} - https://link.jacoballen.ca/.env\n" https://link.jacoballen.ca/.env
curl -s -o /dev/null -w "  %{http_code} - https://link.jacoballen.ca/.gitignore\n" https://link.jacoballen.ca/.gitignore

echo -e "\n${GREEN}🎉 Déploiement sécurisé terminé!${NC}\n"