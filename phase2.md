# 📄 E-Sign PRO — Phase 2 : Choix techniques & architecture (RNCP5)

_Auteur : Enes (Développeur Fullstack)_  
_Période : Avril 2025_  
_Phase : Construction technique et organisation du projet backend_

---

## 🧠 Résumé de la phase

Cette phase a consisté à transformer l'analyse fonctionnelle en un **plan technique détaillé** et **prêt à coder**.  
L'objectif était de choisir les outils adaptés, modéliser les données, planifier l'API et poser l'architecture du projet.  
Toutes les décisions ont été prises dans une optique de **MVP réaliste**, **propre** et **scalable** pour respecter les besoins de l’établissement scolaire et les contraintes RNCP.

---

## ✅ Choix techniques validés

| Élément                      | Décision |
|-------------------------------|----------|
| Backend API                   | **Express.js** |
| Base de données               | **PostgreSQL** |
| Génération de PDF             | **pdf-lib** |
| Authentification              | **JWT** avec expiration 24h |
| Signature                    | Saisie manuscrite (canvas) ou saisie nom |
| Stockage horaires             | **JSONB** dans PostgreSQL |
| Organisation du projet        | Dossiers `/controllers/`, `/models/`, `/routes/`, `/services/`, `/middlewares/`, `/utils/` |
| Gestion des CGU               | Page dédiée + case à cocher obligatoire |

---

## 📝 Formulaire utilisateur complet

Formulaire unique en 5 grandes sections :

- **Informations Lycée**
- **Informations Élève**
- **Informations Entreprise**
- **Informations Stage**
- **Conditions d'utilisation**

Avec toutes les données nécessaires pour remplir la convention sans surcharge inutile.

---

## 🛠️ Base de données - Table `conventions`

- Stockage complet des données de convention
- UUID automatique
- Champs spécifiques pour les horaires (sous forme JSONB)
- Statut du processus de signature (`en_attente`, `en_cours`, `terminé`)
- URL du PDF généré

---

## 🛡️ API Express.js prévue

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/conventions` | Créer une convention |
| GET | `/api/conventions/:id` | Récupérer une convention |
| PATCH | `/api/conventions/:id` | Modifier une convention |
| POST | `/api/signatures/:token` | Signer une convention |
| GET | `/api/status/:id` | Voir l'état de la signature |

---

# 📦 Prochaines étapes

1. Créer l'**arborescence backend** propre.
2. Installer les **dépendances Node.js**.
3. Développer **les premières routes API** pour manipuler les conventions.
4. Générer **un premier PDF dynamique** simple.

---

> Cette phase marque la fin de la préparation technique.  
> Le développement actif du projet E-Sign PRO peut maintenant démarrer sur des bases solides et professionnelles.

---

# ✅ Conclusion

Tout est prêt pour attaquer **la construction du backend** proprement.  
On avance étape par étape, sans perdre de vue l'objectif : un **MVP efficace, propre, et livrable** pour valider ton **RNCP5** 🎯
