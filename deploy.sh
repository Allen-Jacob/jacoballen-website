#!/bin/bash
# deploy.sh : met le serveur web à jour automariquement avec GitHub

# Chemin du projet A CHANGER AVEC LE CHEMIN DE VOTRE SITE WEB
cd /var/www/jacoballen.ca || exit 1

# Récupérer les dernières infos depuis GitHub
git push origin main
git fetch origin

# Réinitialiser le serveur pour matcher GitHub
git reset --hard origin/main

# (Optionnel, si vous utuliser docker pour votre site) Relancer ton conteneur Docker si nécessaire
# docker-compose -f /var/www/jacoballen.ca/docker-compose.yml up -d
