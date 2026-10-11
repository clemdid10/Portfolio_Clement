# Portfolio — Clément Didier

Site portfolio personnel : une seule page, animée, avec un mode clair/sombre et des projets filtrables.

## 📁 Organisation des fichiers

| Fichier | À quoi il sert | Faut-il le modifier ? |
|---|---|---|
| `js/data.js` | **Tout le contenu** : textes, parcours, projets, compétences | ✅ Oui, c'est le seul |
| `css/style.css` | Couleurs et mise en page (les couleurs sont en haut du fichier) | Seulement pour changer les couleurs |
| `js/main.js` | Animations et fonctionnement du site | Non |
| `index.html` | Structure de la page | Non |
| `assets/` | Ta photo, ton CV en PDF, tes images | Tu y déposes tes fichiers |

## ✏️ Ajouter un projet

Dans `js/data.js`, copie un bloc de la liste `projets` et colle-le à la suite :

```js
{
  titre: "Nom du projet",
  categorie: "Études",          // doit faire partie de la liste "categories"
  annee: 2025,
  emoji: "🚀",
  resume: "Une phrase visible sur la carte.",
  description: "Le texte complet affiché quand on clique sur la carte.",
  competences: ["Compétence 1", "Compétence 2"],
  lien: "",                     // facultatif : un lien vers le projet
},
```

## 🌐 Mettre le site en ligne (GitHub Pages, gratuit)

1. Sur GitHub, ouvre le dépôt → **Settings** → **Pages**.
2. Dans **Build and deployment**, choisis **Source : Deploy from a branch**.
3. Sélectionne la branche (`main`, ou la branche de travail) et le dossier **/ (root)**, puis **Save**.
4. Une à deux minutes plus tard, le site est en ligne à l'adresse
   `https://clemdid10.github.io/Portfolio_Clement/`.

## 👀 Voir le site sur ton ordinateur

Ouvre simplement le fichier `index.html` dans ton navigateur (double-clic).
