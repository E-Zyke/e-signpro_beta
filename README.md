# 📄 E-Sign PRO Beta

![CI Status](https://github.com/E-Zyke/e-signpro_beta/actions/workflows/ci.yml/badge.svg)
## 🎯 Aperçu du projet

**E-Sign PRO Beta** est une plateforme web innovante conçue pour **dématérialiser et simplifier le processus de signature des conventions de stage (PFMP)** pour les lycées professionnels. Fini la paperasse et les retards ! Notre solution offre une expérience fluide, sécurisée et 100% en ligne pour tous les acteurs impliqués : élèves, parents, entreprises et équipes pédagogiques.

[cite_start]Ce projet s'inscrit dans le cadre d'un parcours RNCP 5 en développement fullstack, visant à créer un Produit Minimum Viable (MVP) robuste, professionnel et évolutif. [cite: 8, 39, 40, 60]

## ✨ Fonctionnalités clés

* [cite_start]**Création de convention simplifiée** : Un formulaire unique et intuitif en 5 sections pour générer des conventions complètes sans effort. [cite: 51]
* [cite_start]**Signature numérique sans friction** : Chaque signataire reçoit un lien unique et sécurisé par e-mail pour signer la convention, sans nécessiter la création d'un compte ou de mot de passe. [cite: 20, 23]
* [cite_start]**Suivi en temps réel** : Visualisez l'état d'avancement de la signature de chaque convention (qui a signé, qui est en attente) pour une transparence totale. [cite: 14]
* **Sécurité et conformité RGPD** : Utilisation de tokens JWT à expiration, hachage des signatures numériques, consentement explicite et HTTPS pour garantir la protection des données. [cite_start]Les PDF sont supprimés des serveurs après envoi pour limiter les coûts et respecter la vie privée. [cite: 21, 24, 25, 190]
* [cite_start]**Génération de PDF dynamique** : Création automatique de documents PDF personnalisés à partir des données saisies. [cite: 45]
* [cite_start]**Envoi d'e-mails automatisé** : Notifications par e-mail pour guider chaque signataire tout au long du processus. [cite: 35]

## 🛠️ Stack technique (MVP)

Ce projet est construit avec des technologies modernes et robustes pour assurer performance et maintenabilité :

**Backend (API RESTful)**
* [cite_start]**Node.js** avec **Express.js** [cite: 30, 43]
* [cite_start]**Base de données PostgreSQL** avec **Sequelize** (ORM) [cite: 33, 44]
* [cite_start]**Authentification par JWT** (`jsonwebtoken`) pour des liens de signature sécurisés et temporaires (24h). [cite: 20, 29, 46]
* [cite_start]**Génération de PDF** avec `pdf-lib` et `pdfkit`. [cite: 32, 45, 124]
* [cite_start]**Envoi d'e-mails** via `nodemailer`. [cite: 35, 116]
* **Validation des données** avec `Joi`.

**Frontend (Application Web & Mobile)**
* [cite_start]**React** (avec Vite pour un développement rapide) [cite: 152, 157]
* **React Router DOM** pour la navigation.
* **Axios** pour les requêtes HTTP.
* [cite_start]**Tailwind CSS** pour un design rapide et personnalisable. [cite: 157]

## 🚀 Comment lancer le projet (Localement)

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
# Ouvrez .env et configurez DB_NAME, DB_USER, DB_PASS, JWT_SECRET, etc.
npm start
```
Le serveur backend devrait démarrer sur `http://localhost:7000`.

### 3. Configuration du Frontend

```bash
cd ../frontend
npm install
# Lancez l'application frontend
npm run dev
```
L'application frontend devrait être accessible sur `http://localhost:5173`.

## 🧪 Tests

Le projet intègre des tests unitaires pour garantir la fiabilité du code.

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

Ce projet utilise **GitHub Actions** pour automatiser les tests à chaque `push` sur la branche `main` et à chaque `pull request`. Cela garantit que toutes les nouvelles contributions au code sont automatiquement validées et ne cassent pas les fonctionnalités existantes.

Le workflow CI est configuré dans le fichier `.github/workflows/ci.yml`.

## 🛣️ Prochaines étapes (Roadmap)

* [cite_start]**Intégration de l'interface admin** pour la gestion et le suivi centralisé des conventions. [cite: 15, 60]
* **Optimisation de la génération PDF** pour des conventions plus complexes.
* **Amélioration de l'expérience utilisateur** et des fonctionnalités de signature.
* **Déploiement en production** d'un MVP pour validation.

## 📄 Licence

Ce projet est sous licence ISC.

---

[cite_start]**Développé par :** Enes (Développeur Fullstack) [cite: 8]
[cite_start]**Période :** Avril 2025 [cite: 8]
```
