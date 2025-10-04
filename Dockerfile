# Utiliser Nginx Alpine pour un container léger
FROM nginx:alpine

# Copier les fichiers du site vers le répertoire par défaut de Nginx
COPY . /usr/share/nginx/html/

# Copier la configuration Nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]