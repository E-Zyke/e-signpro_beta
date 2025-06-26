# 📄 E-Sign PRO Beta

[![CI E-Sign PRO](https://github.com/E-Zyke/e-signpro_beta/actions/workflows/e_signpro_ci.yml/badge.svg)](https://github.com/E-Zyke/e-signpro_beta/actions/workflows/e_signpro_ci.yml)

## 🎯 Aperçu du projet

**E-Sign PRO Beta** est une plateforme web innovante conçue pour **dématérialiser et simplifier le processus de signature des conventions de stage (PFMP)** pour les lycées professionnels. Fini la paperasse et les retards ! Notre solution offre une expérience fluide, sécurisée et 100% en ligne pour tous les acteurs impliqués : élèves, parents, entreprises et équipes pédagogiques.

Ce projet a été développé dans le cadre d'un parcours **RNCP 5 en développement Fullstack**, avec l'objectif de créer un Produit Minimum Viable (MVP) robuste, professionnel et évolutif.

**Note sur l'état actuel du projet :** Le développement de E-Sign PRO est mis en pause pour le moment. L'application est fonctionnelle et déployée à titre personnel pour démonstration, mais certaines fonctionnalités prévues dans la roadmap ne sont pas encore implémentées, et des optimisations/améliorations restent à apporter.

## ✨ Fonctionnalités clés (implémentées)

* **Création de convention simplifiée** : Un formulaire unique et intuitif en 5 sections pour générer des conventions complètes sans effort.
* **Signature numérique sans friction** : Chaque signataire reçoit un lien unique et sécurisé par e-mail pour signer la convention, sans nécessiter la création d'un compte ou de mot de passe.
* **Suivi en temps réel** : Visualisez l'état d'avancement de la signature de chaque convention (qui a signé, qui est en attente) pour une transparence totale.
* **Sécurité et conformité RGPD** : Utilisation de tokens JWT à expiration, hachage des signatures numériques, consentement explicite et HTTPS pour garantir la protection des données.
* **Génération de PDF dynamique** : Création automatique de documents PDF personnalisés à partir des données saisies, avec archivage des PDFs générés.
* **Envoi d'e-mails automatisé** : Notifications par e-mail pour guider chaque signataire tout au long du processus.

## 🛠️ Stack technique

Ce projet est construit avec des technologies modernes et robustes pour assurer performance et maintenabilité :

**Backend (API RESTful)**
* **Node.js** avec **Express.js** 
* **Base de données PostgreSQL** avec **Sequelize** (ORM) 
* **Authentification par JWT** (`jsonwebtoken`) pour des liens de signature sécurisés et temporaires (24h)
* **Génération de PDF** avec `pdf-lib` et `pdfkit`.
* **Envoi d'e-mails** via `nodemailer`.
* **Validation des données** avec `Joi`.

**Frontend (Application Web & Mobile)**
* **React** (avec Vite pour un développement rapide) 
* **React Router DOM** pour la navigation
* **Axios** pour les requêtes HTTP
* **Tailwind CSS** pour un design rapide et personnalisable
* **react-helmet-async** pour la gestion du `<head>` des pages

## 🚀 Déploiement

Le projet est actuellement déployé à titre personnel pour démonstration.

* **Frontend :** Hébergé sur **Netlify**. L'application est déployée depuis le dossier `frontend` du dépôt, avec une configuration de réécriture pour gérer le routage des SPA (`_redirects` dans `frontend/public`)
* **Backend & Base de Données :** Le service Node.js/Express et la base de données PostgreSQL sont hébergés sur **Railway**. Le service backend est configuré pour écouter sur le port `8080` en production et utilise un volume persistant pour l'archivage des PDF.

### Accès à l'application déployée

* **Application Frontend :** [https://e-signpro.netlify.app/](https://e-signpro.netlify.app/)
* **API Backend :** [https://e-signprobeta-production.up.railway.app/](https://e-signprobeta-production.up.railway.app/)

## 🛠️ Lancer le projet localement

Pour faire tourner E-Sign PRO Beta sur votre machine locale, suivez ces étapes :

### Prérequis

* Node.js (v20 ou supérieur recommandé)
* npm ou Yarn 
* PostgreSQL (base de données) 

### 1. Cloner le dépôt

```bash
git clone [https://github.com/E-Zyke/e-signpro_beta.git](https://github.com/E-Zyke/e-signpro_beta.git)
cd e-signpro_beta
```

### 2. Configuration du Backend

```bash
cd backend
npm install
# Créez un fichier .env à partir de .env_exemple et remplissez vos informations
cp .env_exemple .env
# Ouvrez .env et configurez DB_NAME, DB_USER, DB_PASS, JWT_SECRET, SMTP_*, FRONTEND_URL, BACKEND_URL
# Assurez-vous d'utiliser les vraies URLs de déploiement si vous testez l'intégration
# BACKEND_URL doit être l'URL publique de votre backend Railway
# FRONTEND_URL doit être l'URL publique de votre frontend Netlify

npm start
```
Le serveur backend devrait démarrer sur `http://localhost:7000` (en développement)

### 3. Configuration du Frontend

```bash
cd ../frontend
npm install
# Lancez l'application frontend
npm run dev
```
L'application frontend devrait être accessible sur `http://localhost:5173`

## 🧪 Tests

Le projet intègre des tests unitaires pour garantir la fiabilité du code

### Backend Tests

Dans le dossier `backend` :
```bash
npm test
```

### Frontend Tests

Dans le dossier `frontend` :
```bash
npm test
```

## 🔄 Intégration Continue (CI)

Ce projet utilise **GitHub Actions** pour automatiser les tests à chaque `push` sur la branche `main` et à chaque `pull request`. Cela garantit que toutes les nouvelles contributions au code sont automatiquement validées et ne cassent pas les fonctionnalités existantes. Le workflow CI est configuré dans le fichier `.github/workflows/e_signpro_ci.yml`

## 🛣️ Prochaines étapes (Roadmap)

Bien que le développement soit en pause, voici les axes d'amélioration envisagés :

* **Intégration de l'interface admin** pour la gestion et le suivi centralisé des conventions
* **Optimisation de la génération PDF** pour des conventions plus complexes
* **Amélioration de l'expérience utilisateur** et des fonctionnalités de signature
* **Consolidation du déploiement en production** pour une validation officielle avec les lycées partenaires

## 📄 Licence

Ce projet est sous licence ISC.

---

**Développé par :** Enes (Développeur Fullstack)
**Période :** Avril 2025 - Juin 2025
