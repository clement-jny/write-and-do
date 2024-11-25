# ---- Base Stage ----
# Utilisation de Node pour installer les dépendances
FROM node:lts AS base
# Créer un répertoire pour l'application
WORKDIR /write-and-do
# Copier package.json et package-lock.json uniquement pour installer les dépendances
COPY package*.json .


# ---- Development Stage ----
# Expose le port et lance le serveur en mode dev
FROM base AS dev
# Installe toutes les dépendances (y compris devDependencies)
RUN npm install
# Copier le reste de l'application
COPY . .
# Expose le port sur lequel l'application fonctionne en dev
EXPOSE 3000
# Lancer le serveur en mode développement
CMD ["npm", "run", "dev"]



# --- Production Stage ---
# Construction de l'application pour la production
# FROM base AS prod
# Installation des dépendances de production uniquement
# RUN npm ci
# Copier le reste des fichiers de l'application après l'installation des dépendances
# COPY . .
# Construire l'application Vue avec Vite
# RUN npm run build
# CMD ["npm", "run", "start"]
