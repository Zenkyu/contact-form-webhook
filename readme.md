# Form Submission to Discord Webhook

Ce projet est une application Node.js utilisant Express.js pour recevoir des soumissions de formulaires et les envoyer à un webhook Discord. 

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)

## Prérequis

- Node.js (version 14.x ou supérieure)
- npm (version 6.x ou supérieure)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

## Configuration

Créez un fichier `.env.local` à la racine du projet et ajoutez les variables d'environnement suivantes :
    ```plaintext
    PORT=3000
    DISCORD_WEBHOOK_URL=votre_webhook_discord_url
    ```