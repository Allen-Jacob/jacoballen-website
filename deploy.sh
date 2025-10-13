#!/bin/bash
set -e

# ============================================
# Script de déploiement final - jacoballen-website
# ============================================

SRC="/home/projects/jacoballen-website/"
DEST="/var/www/jacoballen.ca/"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📦 Déploiement jacoballen-website - copie des fichiers du site...${NC}"

rsync -av \
  --exclude='.git/' \
  --exclude='.gitignore' \
  --exclude='.gitmodules' \
  --exclude='.github/' \
  --exclude='deploy.sh' \
  --exclude='README.md' \
  "$SRC" "$DEST"

echo -e "${GREEN}✓ Copie terminée !${NC}"

# Copier les dossiers importants s'ils existent
for dir in "img" "assets" "media"; do
  if [ -d "$SRC/$dir" ]; then
    mkdir -p "$DEST/$dir"
    rsync -av "$SRC/$dir/" "$DEST/$dir/"
    echo -e "${GREEN}✓ Dossier copié : $dir${NC}"
  fi
done

echo -e "${YELLOW}🔐 Configuration des permissions...${NC}"
chown -R $USER:www-data "$DEST"
find "$DEST" -type d -exec chmod 755 {} \;
find "$DEST" -type f -exec chmod 644 {} \;
echo -e "${GREEN}✓ Permissions configurées${NC}"

echo -e "${YELLOW}🔄 Rechargement de Nginx...${NC}"
nginx -t && systemctl reload nginx
echo -e "${GREEN}✓ Nginx rechargé${NC}"

echo -e "${GREEN}🎉 Déploiement jacoballen-website terminé avec succès !${NC}"
