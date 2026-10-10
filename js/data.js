/* =========================================================================
   📝 TES DONNÉES — C'est le SEUL fichier à modifier pour mettre à jour le site.
   -------------------------------------------------------------------------
   Les textes entre [crochets] sont des exemples à remplacer.
   Pour ajouter un projet : copie un bloc { ... } dans "projets", colle-le
   à la suite (n'oublie pas la virgule entre deux blocs) et change le texte.
   ========================================================================= */

const PORTFOLIO = {
  profil: {
    prenom: "Clément",
    nom: "Didier",
    // Les phrases qui défilent sous ton nom dans l'en-tête
    titres: [
      "[Ton métier / poste recherché]",
      "Curieux & motivé",
      "Prêt pour de nouveaux défis",
    ],
    accroche:
      "[Une phrase qui te résume : ce que tu fais, ce qui te passionne et ce que tu cherches (stage, alternance, CDI…).]",
    localisation: "[Ta ville], France",
    email: "clementdidier683@gmail.com",
    linkedin: "", // ex : "https://www.linkedin.com/in/ton-profil"
    github: "https://github.com/clemdid10",
    cv: "", // ex : "assets/CV_Clement_Didier.pdf" (dépose le PDF dans le dossier assets)
    photo: "", // ex : "assets/photo.jpg" — laisse vide pour afficher tes initiales
  },

  aPropos: [
    "[Paragraphe 1 — Qui es-tu ? Ton parcours en quelques lignes.]",
    "[Paragraphe 2 — Ce qui te motive, tes qualités, ce que tu apportes à une entreprise.]",
  ],

  // Les chiffres clés animés
  chiffres: [
    { valeur: 5, suffixe: "+", label: "Projets réalisés" },
    { valeur: 3, suffixe: "", label: "Expériences" },
    { valeur: 2, suffixe: "", label: "Langues parlées" },
  ],

  // Ton parcours (du plus récent au plus ancien)
  parcours: [
    {
      periode: "[2024 — Aujourd'hui]",
      titre: "[Poste ou formation]",
      lieu: "[Entreprise / École]",
      type: "experience", // "experience" ou "formation"
      description: "[Ce que tu y fais / as appris, en 1 ou 2 phrases.]",
    },
    {
      periode: "[2022 — 2024]",
      titre: "[Master / Diplôme]",
      lieu: "[École / Université]",
      type: "formation",
      description: "[Spécialité, matières phares, mention…]",
    },
    {
      periode: "[2019 — 2022]",
      titre: "[Licence / BUT / BTS]",
      lieu: "[École / Université]",
      type: "formation",
      description: "[Spécialité, projets marquants…]",
    },
  ],

  // Catégories affichées dans la barre de filtres des projets
  // (chaque projet doit utiliser une de ces catégories)
  categories: ["Études", "Professionnel", "Personnel", "Associatif"],

  projets: [
    {
      titre: "[Projet de fin d'études]",
      categorie: "Études",
      annee: 2024,
      emoji: "🎓",
      resume: "[Résumé du projet en une phrase.]",
      description:
        "[Description détaillée : le contexte, ton rôle, ce que tu as fait et le résultat obtenu.]",
      competences: ["Gestion de projet", "Travail d'équipe"],
      lien: "",
    },
    {
      titre: "[Mission en entreprise]",
      categorie: "Professionnel",
      annee: 2024,
      emoji: "💼",
      resume: "[Ce que tu as accompli pendant ton stage / alternance.]",
      description:
        "[Contexte de l'entreprise, ta mission, les outils utilisés et l'impact concret (chiffres si possible).]",
      competences: ["Analyse", "Communication"],
      lien: "",
    },
    {
      titre: "[Projet personnel]",
      categorie: "Personnel",
      annee: 2023,
      emoji: "🚀",
      resume: "[Un projet que tu as mené par passion.]",
      description:
        "[Pourquoi tu l'as lancé, ce que tu as appris, ce dont tu es fier.]",
      competences: ["Autonomie", "Créativité"],
      lien: "",
    },
    {
      titre: "[Engagement associatif]",
      categorie: "Associatif",
      annee: 2022,
      emoji: "🤝",
      resume: "[Ton rôle dans une association, un club sportif, un BDE…]",
      description:
        "[Ce que tu as organisé, combien de personnes, ce que ça t'a apporté.]",
      competences: ["Leadership", "Organisation"],
      lien: "",
    },
    {
      titre: "[Projet de groupe]",
      categorie: "Études",
      annee: 2022,
      emoji: "📊",
      resume: "[Un projet universitaire marquant.]",
      description: "[Sujet, taille de l'équipe, ton rôle, le résultat.]",
      competences: ["Recherche", "Présentation orale"],
      lien: "",
    },
  ],

  // Compétences : niveau de 0 à 100 (pour la jauge animée)
  competences: [
    {
      groupe: "Compétences techniques",
      items: [
        { nom: "[Compétence 1]", niveau: 85 },
        { nom: "[Compétence 2]", niveau: 75 },
        { nom: "[Compétence 3]", niveau: 65 },
      ],
    },
    {
      groupe: "Outils",
      items: [
        { nom: "Pack Office", niveau: 85 },
        { nom: "[Logiciel]", niveau: 70 },
        { nom: "[Logiciel]", niveau: 60 },
      ],
    },
    {
      groupe: "Langues",
      items: [
        { nom: "Français", niveau: 100 },
        { nom: "Anglais", niveau: 75 },
      ],
    },
  ],

  // Petits badges "savoir-être" et centres d'intérêt
  qualites: ["Curieux", "Rigoureux", "Esprit d'équipe", "Adaptable"],
  interets: ["[Sport]", "[Voyage]", "[Passion]"],
};
