# Utiliser une image officielle Node.js 18 comme image de base
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le répertoire de travail du conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les autres fichiers dans le répertoire de travail du conteneur
COPY . .

# Compiler l'application
RUN npm run build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start:prod"]
