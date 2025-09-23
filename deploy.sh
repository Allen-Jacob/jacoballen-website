#!/bin/bash
# deploy.sh : met le serveur à jour avec GitHub

# Chemin du projet
cd /var/www/jacoballen.ca || exit 1

# Récupérer les dernières infos depuis GitHub
git fetch origin

# Réinitialiser le serveur pour matcher GitHub
git reset --hard origin/main

# (Optionnel) Relancer ton conteneur Docker si nécessaire
# docker-compose -f /var/www/jacoballen.ca/docker-compose.yml up -d
