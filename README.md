# Planning Jules Verne 2026

Application web / PWA destinée à faciliter l'accès au **planning 2026 du Centre d'Imagerie Médicale Jules Verne**.

L'application est hébergée sur **GitHub Pages** et peut être utilisée sur ordinateur ou installée sur l'écran d'accueil d'un smartphone.

## État actuel

**Version fonctionnelle — août 2026**

### Planning

* Accès aux 12 mois du planning 2026
* Liens vers les plannings Google Sheets
* Utilisation sur ordinateur
* Utilisation sur smartphone
* Installation comme PWA depuis l'écran d'accueil

### Messagerie interne

Une messagerie interne en temps réel est intégrée à l'application avec **Firebase Cloud Firestore**.

Fonctions actuellement opérationnelles :

* 💬 bouton flottant d'accès à la messagerie
* affichage des messages en temps réel
* envoi de messages
* touche **Entrée** pour envoyer
* **Maj + Entrée** pour revenir à la ligne
* mémorisation des initiales de l'utilisateur
* affichage de la date et de l'heure
* défilement automatique vers les nouveaux messages
* 🗑️ suppression des messages avec confirmation
* ❌ fermeture de la fenêtre de messagerie
* 🔴 badge indiquant le nombre de nouveaux messages non lus
* remise à zéro du compteur à l'ouverture du chat
* synchronisation en temps réel entre ordinateur et smartphone
* fonctionnement depuis la PWA installée sur smartphone

## Technologies utilisées

* HTML
* CSS
* JavaScript
* React / JSX
* GitHub
* GitHub Pages
* PWA
* Firebase
* Cloud Firestore
* Google Sheets

## Structure principale

```text
index.html
chat.js
manifest.json
service-worker.js
planning_app_react.jsx
icone-192.png
icone-512.png
```

## Firebase

Projet Firebase :

```text
planning-jules-verne
```

Collection Firestore utilisée pour la messagerie :

```text
messages
```

Structure actuelle d'un message :

```javascript
{
  author: "MB",
  text: "Message",
  createdAt: serverTimestamp()
}
```

Les initiales de l'utilisateur sont mémorisées localement dans le navigateur :

```javascript
localStorage.getItem("planningInitiales")
```

## Temps réel

La messagerie utilise un listener Firestore avec :

```javascript
onSnapshot()
```

Les nouveaux messages sont donc transmis automatiquement aux appareils connectés sans avoir à actualiser la page.

## PWA

L'application utilise notamment :

```text
manifest.json
service-worker.js
icone-192.png
icone-512.png
```

Elle peut être installée sur l'écran d'accueil d'un smartphone et utilisée comme une application.

## Sécurité — IMPORTANT

La messagerie fonctionne actuellement **sans Firebase Authentication**.

Cette décision est temporaire et a permis de stabiliser le fonctionnement du chat avant de remettre en place l'identification des utilisateurs.

Les règles Firestore utilisées pendant cette phase de test sont volontairement permissives pour la collection `messages`.

**Cette configuration ne doit pas être considérée comme la sécurité définitive de l'application.**

## Prochaine phase

La prochaine évolution concerne la **sécurisation de la messagerie**.

Ordre prévu :

1. mettre en place une identification fiable des utilisateurs ;
2. conserver les initiales associées à chaque utilisateur ;
3. attribuer un identifiant Firebase unique à chaque utilisateur ;
4. limiter les droits d'accès à la messagerie ;
5. limiter la suppression d'un message à son auteur et/ou à un administrateur ;
6. remplacer les règles Firestore temporaires par des règles sécurisées ;
7. vérifier que l'authentification reste active dans la PWA sur smartphone ;
8. retester le temps réel, le badge et la suppression après sécurisation.

## État des tests

| Fonction                     | État      |
| ---------------------------- | --------- |
| GitHub Pages                 | ✅         |
| Planning ordinateur          | ✅         |
| Planning smartphone          | ✅         |
| Installation PWA             | ✅         |
| Envoi de messages            | ✅         |
| Réception en temps réel      | ✅         |
| Suppression 🗑️              | ✅         |
| Badge messages non lus       | ✅         |
| Compteur du badge            | ✅         |
| Utilisation PWA smartphone   | ✅         |
| Firebase Authentication      | ⏳ À faire |
| Règles Firestore définitives | ⏳ À faire |

---

**Dernière mise à jour : 19 août 2026**
