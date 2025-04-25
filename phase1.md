# 📄 E-Sign PRO — Phase 1 : Analyse fonctionnelle & cadrage (RNCP 5)

_Auteur : Enes (Développeur Fullstack)_  
_Période : Avril 2025_  
_Dépôt de référence : Phase de préparation avant développement du MVP (niveau RNCP 5)_

---

## 🧠 Résumé de la phase

Cette première phase du projet **E-Sign PRO** pose les bases solides d'une application web destinée à **dématérialiser les conventions de stage PFMP**.  
En tant que développeur fullstack, j’ai pris le temps de **redéfinir les rôles, le flux de signature, les contraintes légales (RGPD), les outils techniques et les choix d’architecture** pour aboutir à une vision claire, simple et professionnelle du produit.

---

## 🎯 Objectif du projet

Créer une plateforme intuitive, sécurisée et accessible pour permettre à tous les acteurs impliqués dans un stage (élève, parent, entreprise, enseignant) de **signer numériquement la convention de stage**, sans friction ni perte d'information.

---

## ✅ Ce qui a été validé

| Sujet                            | Choix stratégique |
|----------------------------------|-------------------|
| Utilisateurs                     | Élève, Parent, Entreprise, Équipe pédagogique |
| Déclenchement du processus       | L'élève initie la convention |
| Suivi du processus               | Chaque signataire voit l'avancement (ex : 2/4 signés) |
| Interface Admin                  | Présente pour gestion, relances, visualisation des conventions |
| Archivage des documents          | PDF supprimé après envoi, utilisateur averti clairement |
| Récupération des documents       | Lien sécurisé par e-mail uniquement |
| QR Code / Code de récupération   | ❌ Non retenus (volonté de simplification) |
| Authentification                 | Lien sécurisé par JWT (24h), sans création de compte |
| Sécurité                         | HTTPS, tokens signés, consentement à la signature obligatoire, hash des signatures numériques |

---

## ⚖️ Pourquoi ces choix ?

- **Accessibilité maximale** : pas de création de compte, pas de mot de passe, chaque utilisateur signe via un simple lien reçu par e-mail.
- **Sécurité maîtrisée** : tokens JWT avec expiration, hash de signature, consentement explicite, HTTPS.
- **Simplicité d'usage** : le PDF final est envoyé par e-mail, puis supprimé des serveurs pour limiter les coûts et respecter la vie privée.
- **Vision claire** : chaque signataire voit où il en est dans le processus (ex : « étape 3/4 »), ce qui évite les blocages.

---

## 🔐 Stack technique prévisionnelle (MVP)

| Besoin                  | Outil/API envisagé         |
|-------------------------|----------------------------|
| Authentification        | `jsonwebtoken` (JWT)       |
| Backend                 | Express.js ou NestJS       |
| Signature / PDF         | `pdf-lib` + canvas (dessin ou saisie nom) |
| Base de données         | SQLite (MVP) puis PostgreSQL |
| Envoi de mails          | `nodemailer`               |

---

## 🛣️ Prochaines étapes

1. **Valider la stack technique définitive** (backend, PDF, base de données)
2. **Créer l’architecture du projet**
3. **Développer un premier parcours de signature complet**
4. **Intégrer l’interface admin**
5. **Finaliser le MVP**

---

> Ce dépôt représente une phase d’analyse et de cadrage structurée, avant la mise en œuvre du code.  
> Le développement actif sera lancé dans un nouveau dépôt (`SignFlow`, `Conventio`, etc.) basé sur ces fondations.

---

