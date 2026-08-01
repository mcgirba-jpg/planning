# 📅 Planning 2026 - Application React

Application web interactive pour gérer et visualiser les plannings de 2026 pour Mihaela Boulu.

## 🎯 Fonctionnalités

✅ **Affichage interactif** des 12 mois + plannings additionnels  
✅ **Recherche en temps réel** pour trouver rapidement un planning  
✅ **Statistiques** : nombre de mois, plannings personnels, résumés annuels  
✅ **Design moderne** avec gradient violet/bleu et animations fluides  
✅ **Modal interactif** pour afficher les détails de chaque planning  
✅ **Responsive** : parfait sur mobile, tablette et desktop  
✅ **Icônes dynamiques** avec lucide-react  
✅ **Accès direct** aux Google Sheets de chaque mois  

## 📦 Fichiers fournis

### 1. **planning_app_standalone.html** (⭐ RECOMMANDÉ)
**Version la plus simple à utiliser !**

- ✅ Fichier HTML unique et autonome
- ✅ Aucune installation requise
- ✅ Double-cliquer pour ouvrir dans le navigateur
- ✅ Tous les CDN sont inclus (React, Tailwind, Lucide)
- ✅ Fonctionne hors ligne après chargement

**Comment utiliser :**
```bash
# Simplement ouvrir dans le navigateur :
open planning_app_standalone.html
# ou double-cliquer sur le fichier
```

### 2. **planning_app_react.jsx**
**Pour intégration dans un projet React existant**

- Composant React moderne avec Hooks
- Utilise Tailwind CSS pour le styling
- Utilise lucide-react pour les icônes
- Facile à customiser et étendre

**Installation dans un projet React :**
```bash
# 1. Installer les dépendances
npm install lucide-react

# 2. Copier le composant dans votre projet
# 3. Importer et utiliser :

import PlanningApp from './planning_app_react.jsx';

export default function App() {
  return <PlanningApp />;
}
```

## 🎨 Design & Features

### Sections
- **Header** : Titre, sous-titre, barre de recherche
- **Stats** : 3 cartes affichant les statistiques clés
- **Grille de mois** : 12 cartes pour chaque mois (3 colonnes)
- **Plannings additionnels** : Total Annuel + MB/JR Planning (2 colonnes)
- **Modal** : Détails + bouton d'ouverture direct
- **Footer** : Crédits et statut

### Couleurs
- **Gradient principal** : Purple → Indigo
- **Cartes** : Blanc avec ombres et hover effects
- **Badges** : Violet pour les mois, Orange pour les additionnels
- **Fond** : Gradient sombre (slate-900 → slate-800)

### Interactions
- 🔍 Recherche filtre les plannings en temps réel
- 📌 Clic sur une carte ouvre un modal
- 🔗 Bouton externe ouvre la Google Sheet
- ✨ Hover effects fluides avec transitions CSS
- 📱 Responsive : adapté à tous les écrans

## 🛠️ Personnalisation

### Ajouter un nouveau mois
Éditer le tableau `planningData` dans le composant :

```javascript
planningData = [
  // ... mois existants
  { 
    id: 16, 
    name: 'Janvier 2027', 
    type: 'month', 
    emoji: '📅', 
    link: 'https://docs.google.com/spreadsheets/...' 
  },
]
```

### Modifier les couleurs
Changer les classes Tailwind dans le JSX :
- `from-purple-600 to-indigo-700` → gradient du header
- `from-blue-500 to-purple-500` → hover des cartes mois
- `from-orange-500 to-red-500` → hover des additionnels

### Modifier le texte
Tous les textes sont en français, faciles à trouver et modifier :
```javascript
<h1 className="text-3xl font-bold">Planning 2026</h1>
<p className="text-purple-200 text-sm">Mihaela Boulu - Tous les mois</p>
```

## 📋 Dépendances

### Pour la version standalone (HTML)
- **React 18** via CDN
- **ReactDOM 18** via CDN
- **Babel** (JSX)
- **Tailwind CSS 3** via CDN
- **Lucide React** (icônes) via CDN

Tous les CDN sont inclus dans le fichier HTML.

### Pour la version React component
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^latest",
    "tailwindcss": "^3.0.0"
  }
}
```

## 🚀 Déploiement

### Option 1 : GitHub Pages (Gratuit)
```bash
# 1. Créer un repo GitHub
# 2. Uploader planning_app_standalone.html
# 3. Activer GitHub Pages dans les settings
# 4. Accéder via https://votre-username.github.io/planning_app_standalone.html
```

### Option 2 : Netlify (Gratuit)
```bash
# 1. Créer un compte Netlify
# 2. Drag & drop le fichier HTML
# 3. Voilà ! App en ligne avec URL personnalisée
```

### Option 3 : Vercel (Gratuit pour projets React)
```bash
# 1. Créer un compte Vercel
# 2. Connecter repo GitHub
# 3. Vercel déploie automatiquement
```

## 🔧 Troubleshooting

### L'app ne charge pas
- ✅ Vérifier la connexion internet (CDN requis)
- ✅ Essayer avec un autre navigateur
- ✅ Vider le cache du navigateur (Ctrl+Shift+Del)

### Les icônes ne s'affichent pas
- ✅ Vérifier la connexion internet (Lucide charge depuis CDN)
- ✅ Essayer de recharger la page

### Recherche ne fonctionne pas
- ✅ Vérifier la console (F12 > Console) pour les erreurs
- ✅ Recharger la page

## 📊 Structure des données

```javascript
{
  id: 1,                    // Identifiant unique
  name: 'Janvier 2026',     // Nom affiché
  type: 'month',            // 'month' | 'summary' | 'personal'
  emoji: '📅',              // Emoji affiché
  link: 'https://docs...'   // URL de la Google Sheet
}
```

## 💡 Futures améliorations possibles

- [ ] Ajouter un calendrier interactif
- [ ] Exporter les données en CSV/PDF
- [ ] Synchronisation avec Google Calendar
- [ ] Mode sombre/clair
- [ ] Notifications de rappel
- [ ] Gestion des préférences utilisateur
- [ ] Multi-langue
- [ ] Diagramme de Gantt
- [ ] Analytics/statistiques avancées

## 📄 Licence

Libre d'utilisation et de modification.

## 👩‍💻 Support

Besoin d'aide ? Contacter le créateur ou consulter la documentation React/Tailwind.

---

**Développé avec ❤️ pour simplifier la gestion des plannings 2026**

**Planning 2026 © Mihaela Boulu**
