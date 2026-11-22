import type { Language } from '../context/PreferencesContext';

export type ProjectCategory = 'all' | 'backend-ai' | 'fullstack-pwa' | 'hackathon-arch';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  period: string;
  context: string;
  summary: string;
  architectureDetails: string;
  highlights: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  liveLabel?: string;
  featuredSpan: 'wide' | 'compact';
}

export interface SkillDomain {
  id: string;
  index: string;
  title: string;
  focus: string;
  tools: { name: string; note?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
}

export interface EngagementItem {
  id: string;
  title: string;
  date: string;
  place: string;
  description: string;
  url?: string;
  urlLabel?: string;
}

export const PROFILE_STATIC = {
  fullName: 'Junior Noumedem Nguetsa',
  shortName: 'Junior Noumedem',
  email: 'junior.noumedem@saintjeaningenieur.org',
  emails: [
    'junior.noumedem@saintjeaningenieur.org',
    'juniornoumedem02@gmail.com',
  ],
  phones: ['(+237) 680 738 475', '(+237) 657 152 687'],
  socials: {
    github: 'https://github.com/jnguetsa',
    gitlab: 'https://gitlab.com/jnior',
    linkedin: 'https://www.linkedin.com/in/junior-noumedem-nguetsa-13a339262',
  },
  heroImage: '/src/assets/images/junior_portrait.jpeg',
};

export interface PortfolioContent {
  nav: {
    links: { href: string; label: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  preferences: {
    lightLabel: string;
    darkLabel: string;
    themeAria: string;
    langAria: string;
  };
  hero: {
    roleKicker: string;
    headline: string;
    summary: string;
    ctaPrimary: string;
    ctaSecondary: string;
    seekingTag: string;
    heroImageAlt: string;
    metrics: { value: string; label: string }[];
  };
  marquee: string[];
  arch3d: {
    kicker: string;
    title: string;
    subtitle: string;
    hint: string;
    hoverLabel: string;
    selectedLabel: string;
    hideControls: string;
    showControls: string;
    explodedView: string;
    presets: { id: 'global' | 'backend-rag' | 'microservices'; label: string }[];
    pause: string;
    play: string;
    reset: string;
    fallbackAria: string;
  };
  projectsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    filters: { id: ProjectCategory; label: string }[];
    exploreArch: string;
    defaultLiveLabel: string;
    items: ProjectItem[];
    modal: {
      closeAria: string;
      archTitle: string;
      highlightsTitle: string;
      stackTitle: string;
    };
  };
  skillsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    allTab: string;
    domains: SkillDomain[];
  };
  parcoursSection: {
    kicker: string;
    title: string;
    expTitle: string;
    expSubtitle: string;
    experiences: ExperienceItem[];
    eduTitle: string;
    eduSubtitle: string;
    educations: EducationItem[];
    engTitle: string;
    engSubtitle: string;
    languagesTitle: string;
    languages: { name: string; level: string }[];
    engagements: EngagementItem[];
  };
  contactSection: {
    kicker: string;
    title: string;
    subtitle: string;
    location: string;
    copy: string;
    copied: string;
    copyEmailAria: string;
    copyPhoneAria: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    responseHint: string;
    validationError: string;
    mailPrepared: string;
    mailSubjectPrefix: string;
  };
  footer: {
    location: string;
  };
}

const FR_DATA: PortfolioContent = {
  nav: {
    links: [
      { href: '#profil', label: 'Profil' },
      { href: '#architecture-3d', label: 'Architecture 3D' },
      { href: '#projets', label: 'Projets' },
      { href: '#competences', label: 'Compétences' },
      { href: '#parcours', label: 'Parcours' },
    ],
    cta: 'Me contacter',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  preferences: {
    lightLabel: 'Clair',
    darkLabel: 'Sombre',
    themeAria: 'Basculer entre le mode clair et le mode sombre',
    langAria: 'Choisir la langue du portfolio',
  },
  hero: {
    roleKicker: 'Élève Ingénieur ING4 · Yaoundé, Cameroun',
    headline: 'Architecture Backend, Systèmes IA & Full-Stack.',
    summary:
      "Élève ingénieur en Informatique & Systèmes d'Information (ING4) et titulaire d'une Licence en Génie Logiciel. Développeur Full-Stack axé Backend, Bases de données et architectures IA (NestJS, Angular, PostgreSQL/pgvector), avec une appétence marquée pour le DevOps (Docker, CI/CD, Git). À la recherche d'un stage technique pour participer à la conception et au déploiement de solutions robustes.",
    ctaPrimary: 'Explorer les projets',
    ctaSecondary: 'Discuter d’un stage',
    seekingTag: 'Recherche stage technique',
    heroImageAlt: 'Portrait de Junior Noumedem Nguetsa, élève ingénieur en informatique',
    metrics: [
      { value: 'ING4', label: "Informatique & Systèmes d'Information — ISJ Yaoundé" },
      { value: '250+', label: 'Participants formés en algorithmique et Scratch' },
      { value: '04', label: 'Systèmes majeurs conçus, modélisés ou déployés' },
      { value: '02', label: 'Hackathons (NASA Space Apps & COM.S.A.S ENSPY)' },
    ],
  },
  marquee: [
    'NestJS',
    'PostgreSQL & pgvector',
    'Spring Boot',
    'Architecture Microservices',
    'Angular',
    'Docker & CI/CD',
    'React Native',
    'Clean Architecture',
    'Contrôle d’accès RBAC',
    'Tailwind CSS',
    'Modélisation UML',
  ],
  arch3d: {
    kicker: 'Exploration spatiale WebGL · Three.js',
    title: 'Écosystème d’architecture interactif',
    subtitle:
      'Faites pivoter la scène à 360°, cliquez sur un nœud 3D pour inspecter son rôle ou activez la vue éclatée pour observer chaque couche système.',
    hint: 'Glisser pour pivoter · Molette pour zoomer · Cliquer un module',
    hoverLabel: 'Aperçu au survol',
    selectedLabel: 'Module sélectionné',
    hideControls: 'Masquer les contrôles',
    showControls: 'Afficher les contrôles',
    explodedView: 'Vue éclatée',
    presets: [
      { id: 'global', label: 'Vue globale' },
      { id: 'backend-rag', label: 'Flux RAG' },
      { id: 'microservices', label: 'Microservices' },
    ],
    pause: 'Pause',
    play: 'Flux',
    reset: 'Réinitialiser',
    fallbackAria: 'Scène 3D interactive de l’architecture microservices et RAG',
  },
  projectsSection: {
    kicker: 'Réalisations sélectionnées',
    title: 'Projets & Architectures',
    subtitle:
      'Systèmes distribués, recherche vectorielle, applications hors-ligne et sprints hackathon. Filtrez par domaine pour afficher chaque réalisation en pleine largeur.',
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'backend-ai', label: 'Backend & IA' },
      { id: 'fullstack-pwa', label: 'Full-Stack & PWA' },
      { id: 'hackathon-arch', label: 'Hackathon & UML' },
    ],
    exploreArch: 'Explorer l’architecture',
    defaultLiveLabel: 'Voir en ligne',
    modal: {
      closeAria: 'Fermer les détails du projet',
      archTitle: 'Architecture & Conception',
      highlightsTitle: 'Points clés techniques',
      stackTitle: 'Technologies utilisées',
    },
    items: [
      {
        id: 'carnet-rouge',
        index: '01',
        title: 'CarnetRouge',
        subtitle: 'Gestion académique multi-établissements',
        category: 'fullstack-pwa',
        categoryLabel: 'Full-Stack & PWA',
        period: '2025',
        context: 'Plateforme académique sécurisée',
        summary:
          "Plateforme de suivi d'assiduité conçue pour plusieurs établissements, intégrant la gestion fine des rôles (RBAC), un module d'émargement PWA fonctionnant hors-ligne et une protection active contre les attaques par brute-force.",
        architectureDetails:
          "Architecture monolithique modulaire sous Spring Boot avec rendu serveur Thymeleaf et stylisation Tailwind CSS. Les données d'émargement sont persistées localement via Service Worker en mode déconnecté puis synchronisées automatiquement dès le retour réseau.",
        highlights: [
          'Contrôle d’accès basé sur les rôles (RBAC) cloisonné par établissement',
          'Module d’émargement PWA hors-ligne avec file de synchronisation',
          'Protection anti-brute-force et durcissement des endpoints d’authentification',
        ],
        stack: ['Spring Boot', 'Thymeleaf', 'Tailwind CSS', 'PWA Hors-ligne', 'RBAC'],
        image: '/src/assets/images/project_carnet_rouge_1795332635830.jpg',
        imageAlt: 'Interface analytique sombre de suivi d’assiduité CarnetRouge',
        featuredSpan: 'wide',
      },
      {
        id: 'the-last-light',
        index: '02',
        title: 'The Last Light',
        subtitle: 'NASA Space Apps Hackathon',
        category: 'hackathon-arch',
        categoryLabel: 'Hackathon NASA',
        period: '14–15 Novembre 2026',
        context: 'NASA Space Apps Challenge',
        summary:
          "Application web conçue, développée et déployée en conditions réelles de sprint durant le hackathon organisé par NASA SPACE les 14 et 15 novembre 2026.",
        architectureDetails:
          "Conception rapide d'une interface web interactive orientée narration scientifique et exploration de données spatiales, livrée et mise en production continue sur Vercel dans le délai imparti de 48 heures.",
        highlights: [
          'Sprint collaboratif de 48 heures sous contrainte de livraison continue',
          'Application web publique accessible en ligne sur Vercel',
          'Architecture front-end fluide orientée visualisation et réactivité',
        ],
        stack: ['Web App', 'Déploiement Vercel', 'NASA Space Apps', 'Git Flow'],
        image: '/src/assets/images/project_last_light_1795332637295.jpg',
        imageAlt: 'Horizon terrestre en orbite basse illuminé au crépuscule pour The Last Light',
        liveUrl: 'https://the-last-light-web.vercel.app',
        liveLabel: 'Visiter l’application',
        featuredSpan: 'compact',
      },
      {
        id: 'puolo',
        index: '03',
        title: 'PuoLo',
        subtitle: 'Intermédiation de services & immobilier',
        category: 'hackathon-arch',
        categoryLabel: 'Architecture & UML',
        period: 'Projet personnel',
        context: 'Modélisation & Base de données',
        summary:
          "Modélisation UML complète et architecture relationnelle de base de données pour une plateforme d'intermédiation mettant en relation prestataires de services, propriétaires et clients.",
        architectureDetails:
          "Définition rigoureuse des cas d'utilisation, diagrammes de classes et schémas entité-association garantissant l'intégrité référentielle des transactions, réservations et profils multi-rôles.",
        highlights: [
          'Diagrammes UML complets (cas d’utilisation, classes, séquences)',
          'Schéma relationnel normalisé prêt pour l’implémentation PostgreSQL / MySQL',
          'Séparation claire des domaines services, biens immobiliers et utilisateurs',
        ],
        stack: ['Modélisation UML', 'Architecture BDD', 'PostgreSQL', 'Clean Architecture'],
        image: '/src/assets/images/project_puolo_architecture_1795332637933.jpg',
        imageAlt: 'Maquette architecturale minimaliste sur plans techniques pour PuoLo',
        featuredSpan: 'compact',
      },
      {
        id: 'rag-chatbot',
        index: '04',
        title: 'Plateforme RAG & Chatbot IA',
        subtitle: 'Recherche vectorielle sur documents',
        category: 'backend-ai',
        categoryLabel: 'Backend & IA',
        period: '2025 – 2026',
        context: 'Architecture Multi-clients',
        summary:
          "Architecture complète d'un backend NestJS propulsé par recherche sémantique vectorielle (pgvector), accompagnée d'un dashboard d'administration sous Angular et d'une application mobile React Native.",
        architectureDetails:
          "Pipeline d'ingestion documentaire découpant et indexant les embeddings directement dans PostgreSQL via pgvector. L'API REST NestJS orchestre la récupération contextuelle et expose les flux aux clients web Angular et mobile React Native.",
        highlights: [
          'Indexation et similarité vectorielle sous PostgreSQL avec extension pgvector',
          'Backend API structuré en NestJS selon les principes de Clean Architecture',
          'Double interface : console d’administration Angular et client mobile React Native',
        ],
        stack: ['NestJS', 'PostgreSQL / pgvector', 'RAG', 'Angular', 'React Native'],
        image: '/src/assets/images/project_rag_vector_1795332636095.jpg',
        imageAlt: 'Schéma isométrique de couches documentaires et nœuds vectoriels pour le système RAG',
        featuredSpan: 'wide',
      },
    ],
  },
  skillsSection: {
    kicker: 'Socle technique',
    title: 'Compétences d’ingénierie',
    subtitle:
      'Un profil orienté backend, bases de données vectorielles et industrialisation DevOps, capable de livrer des interfaces web et mobiles complètes.',
    allTab: 'Tous les pôles',
    domains: [
      {
        id: 'backend',
        index: '01',
        title: 'Backend & API',
        focus: 'Conception de services robustes, APIs modulaires et logique métier scalable.',
        tools: [
          { name: 'NestJS', note: 'Architecture modulaire' },
          { name: 'Node.js', note: 'Runtime serveur' },
          { name: 'Python', note: 'Scripting & backend' },
          { name: 'Django', note: 'Framework web' },
          { name: 'Spring Boot', note: 'En perfectionnement' },
        ],
      },
      {
        id: 'frontend',
        index: '02',
        title: 'Frontend & Mobile',
        focus: 'Interfaces réactives, applications web progressives hors-ligne et clients mobiles.',
        tools: [
          { name: 'Angular', note: 'Dashboards & SPA' },
          { name: 'Tailwind CSS', note: 'Design systems' },
          { name: 'React & Next.js', note: 'Applications web' },
          { name: 'React Native', note: 'Mobile cross-platform' },
          { name: 'Thymeleaf & PWA', note: 'Rendu serveur & offline' },
        ],
      },
      {
        id: 'data-ai',
        index: '03',
        title: 'Bases de données & IA',
        focus: 'Stockage relationnel, recherche sémantique vectorielle et modélisation rigoureuse.',
        tools: [
          { name: 'PostgreSQL', note: 'pgvector & RAG' },
          { name: 'MySQL', note: 'Bases relationnelles' },
          { name: 'MongoDB', note: 'Stockage document' },
          { name: 'Pipelines RAG', note: 'Indexation vectorielle' },
          { name: 'Modélisation UML', note: 'Conception SI' },
        ],
      },
      {
        id: 'devops',
        index: '04',
        title: 'DevOps & Versioning',
        focus: 'Conteneurisation, automatisation des déploiements et workflows collaboratifs.',
        tools: [
          { name: 'Docker', note: 'Conteneurisation' },
          { name: 'CI/CD', note: 'GitLab CI & GitHub Actions' },
          { name: 'Git', note: 'Git Flow, GitHub, GitLab' },
          { name: 'Linux (CLI)', note: 'Administration système' },
        ],
      },
      {
        id: 'arch',
        index: '05',
        title: 'Architecture & Sécurité',
        focus: 'Structuration logicielle maintenable, services distribués et contrôle d’accès.',
        tools: [
          { name: 'Architecture Microservices', note: 'Services découplés & APIs' },
          { name: 'APIs REST', note: 'Contrats & validation' },
          { name: 'Clean Architecture', note: 'Découplage métier' },
          { name: 'Contrôle d’accès (RBAC)', note: 'Gestion des rôles' },
          { name: 'Algorithmique', note: 'Optimisation embarquée & SI' },
        ],
      },
    ],
  },
  parcoursSection: {
    kicker: 'Expérience, Formation & Engagements',
    title: 'Parcours académique & terrain',
    expTitle: '01. Expérience professionnelle',
    expSubtitle: 'Encadrement technique, robotique embarquée et transmission pédagogique.',
    experiences: [
      {
        id: 'foudjem',
        role: 'Coordinateur Technique & Encadrant (Stagiaire)',
        organization: "Fondation Jean Félicien Gacha – Think Tank Foud'jem",
        location: 'Bangangté, Cameroun',
        period: 'Mai 2025 – Août 2025',
        bullets: [
          "Encadrement technique : coordination d'une équipe pluridisciplinaire (mécatronique), gestion du versioning du code avec Git et optimisation des algorithmes embarqués pour dispositifs robotiques.",
          "Formation & pédagogie : conception et animation d'ateliers d'initiation à l'algorithmique et à la programmation (Scratch) pour plus de 250 participants.",
        ],
      },
    ],
    eduTitle: '02. Formation académique',
    eduSubtitle: 'Double ancrage en génie logiciel et systèmes d’information.',
    educations: [
      {
        id: 'isj',
        degree: "Diplôme d'Ingénieur en Informatique et Systèmes d'Information (ING4)",
        institution: 'Institut Saint Jean Ingénieur',
        location: 'Yaoundé',
        period: 'Septembre 2025 – En cours',
        status: 'Cycle Ingénieur',
      },
      {
        id: 'cosendai',
        degree: "Licence en Génie Logiciel et Systèmes d'Information",
        institution: 'Université Adventiste Cosendai',
        location: 'Nanga-Eboko',
        period: 'Octobre 2021 – Juillet 2024',
        status: 'Diplôme obtenu',
      },
    ],
    engTitle: '03. Hackathons & Langues',
    engSubtitle: 'Compétitions inter-écoles, défis internationaux et maîtrise linguistique.',
    languagesTitle: 'Langues parlées',
    languages: [
      { name: 'Français', level: 'Courant' },
      { name: 'Anglais', level: 'Académique' },
    ],
    engagements: [
      {
        id: 'nasa-space',
        title: 'Hackathon NASA Space Apps',
        date: '14–15 Novembre 2026',
        place: 'Édition 2026',
        description:
          "Conception et déploiement en équipe de l'application web The Last Light durant le hackathon organisé par NASA SPACE.",
        url: 'https://the-last-light-web.vercel.app',
        urlLabel: 'the-last-light-web.vercel.app',
      },
      {
        id: 'comsas',
        title: 'Hackathon & Pitch de Projet (COM.S.A.S)',
        date: 'Juin 2025',
        place: 'Polytechnique Yaoundé (ENSPY)',
        description:
          "Participation et présentation d'un pitch de projet lors de la compétition inter-écoles organisée par le COMSAS à l'ENSPY.",
      },
    ],
  },
  contactSection: {
    kicker: 'Contact direct',
    title: 'Disponible pour un stage technique',
    subtitle:
      'Ouvert aux opportunités de stage en développement Backend, Full-Stack, architectures IA ou DevOps à Yaoundé, à l’international ou en télétravail.',
    location: 'Yaoundé, Cameroun',
    copy: 'Copier',
    copied: 'Copié',
    copyEmailAria: "Copier l'adresse email",
    copyPhoneAria: 'Copier le numéro',
    formTitle: 'Envoyer un message',
    formSubtitle:
      'Rédigez votre proposition ou demande d’entretien : votre messagerie s’ouvrira pré-remplie.',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Ex. Marc Fotso',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'nom@entreprise.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Contexte du stage, stack technique, dates souhaitées...',
    submitLabel: 'Préparer l’email',
    responseHint: 'Réponse rapide par email ou téléphone',
    validationError: 'Veuillez renseigner votre nom, votre email et votre message.',
    mailPrepared: 'Votre client mail vient d’être préparé avec votre message.',
    mailSubjectPrefix: 'Contact Portfolio',
  },
  footer: {
    location: 'Yaoundé, Cameroun',
  },
};

const EN_DATA: PortfolioContent = {
  nav: {
    links: [
      { href: '#profil', label: 'Profile' },
      { href: '#architecture-3d', label: '3D Architecture' },
      { href: '#projets', label: 'Projects' },
      { href: '#competences', label: 'Skills' },
      { href: '#parcours', label: 'Background' },
    ],
    cta: 'Contact me',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  preferences: {
    lightLabel: 'Light',
    darkLabel: 'Dark',
    themeAria: 'Toggle between light and dark mode',
    langAria: 'Select portfolio language',
  },
  hero: {
    roleKicker: 'Engineering Student (ING4) · Yaoundé, Cameroon',
    headline: 'Backend Architecture, AI Systems & Full-Stack.',
    summary:
      'Computer Science & Information Systems engineering student (ING4) holding a Bachelor’s degree in Software Engineering. Full-Stack developer focused on Backend, Databases, and AI architectures (NestJS, Angular, PostgreSQL/pgvector), with a strong drive for DevOps (Docker, CI/CD, Git). Seeking a technical internship to design and deploy robust systems.',
    ctaPrimary: 'Explore projects',
    ctaSecondary: 'Discuss an internship',
    seekingTag: 'Seeking technical internship',
    heroImageAlt: 'Portrait of Junior Noumedem Nguetsa, computer science engineering student',
    metrics: [
      { value: 'ING4', label: 'Computer Science & Information Systems — ISJ Yaoundé' },
      { value: '250+', label: 'Participants trained in algorithms and Scratch' },
      { value: '04', label: 'Major software systems architected or deployed' },
      { value: '02', label: 'Hackathons (NASA Space Apps & COM.S.A.S ENSPY)' },
    ],
  },
  marquee: [
    'NestJS',
    'PostgreSQL & pgvector',
    'Spring Boot',
    'Microservices Architecture',
    'Angular',
    'Docker & CI/CD',
    'React Native',
    'Clean Architecture',
    'RBAC Access Control',
    'Tailwind CSS',
    'UML Modeling',
  ],
  arch3d: {
    kicker: 'WebGL Spatial Explorer · Three.js',
    title: 'Interactive Architecture Ecosystem',
    subtitle:
      'Orbit the 3D scene in 360°, click any 3D subsystem node to inspect its role, or slide the exploded view to examine every architectural layer.',
    hint: 'Drag to orbit · Scroll to zoom · Click a module',
    hoverLabel: 'Hover preview',
    selectedLabel: 'Selected module',
    hideControls: 'Hide controls',
    showControls: 'Show controls',
    explodedView: 'Exploded View',
    presets: [
      { id: 'global', label: 'Overview' },
      { id: 'backend-rag', label: 'RAG Flow' },
      { id: 'microservices', label: 'Microservices' },
    ],
    pause: 'Pause',
    play: 'Flow',
    reset: 'Reset',
    fallbackAria: 'Interactive 3D microservices and RAG architecture scene',
  },
  projectsSection: {
    kicker: 'Selected Works',
    title: 'Projects & Architectures',
    subtitle:
      'Distributed systems, vector search, offline-capable web apps, and hackathon sprints. Filter by domain to inspect each project full-width.',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'backend-ai', label: 'Backend & AI' },
      { id: 'fullstack-pwa', label: 'Full-Stack & PWA' },
      { id: 'hackathon-arch', label: 'Hackathon & UML' },
    ],
    exploreArch: 'Explore architecture',
    defaultLiveLabel: 'View live',
    modal: {
      closeAria: 'Close project details',
      archTitle: 'Architecture & Design',
      highlightsTitle: 'Key Technical Highlights',
      stackTitle: 'Technologies Used',
    },
    items: [
      {
        id: 'carnet-rouge',
        index: '01',
        title: 'CarnetRouge',
        subtitle: 'Multi-Campus Academic Management',
        category: 'fullstack-pwa',
        categoryLabel: 'Full-Stack & PWA',
        period: '2025',
        context: 'Secure Academic Platform',
        summary:
          'Multi-institution attendance tracking platform built with Spring Boot, Thymeleaf, and Tailwind CSS, featuring fine-grained role-based access control (RBAC), an offline-first PWA sign-in module, and brute-force protection.',
        architectureDetails:
          'Modular Spring Boot architecture with server-rendered Thymeleaf templates and Tailwind CSS. Attendance records are persisted locally via Service Worker when offline and automatically synchronized once connectivity resumes.',
        highlights: [
          'Institution-scoped Role-Based Access Control (RBAC)',
          'Offline-capable PWA attendance check-in with background sync queue',
          'Brute-force protection and authentication endpoint hardening',
        ],
        stack: ['Spring Boot', 'Thymeleaf', 'Tailwind CSS', 'Offline PWA', 'RBAC'],
        image: '/src/assets/images/project_carnet_rouge_1795332635830.jpg',
        imageAlt: 'CarnetRouge dark analytics attendance tracking interface mockup',
        featuredSpan: 'wide',
      },
      {
        id: 'the-last-light',
        index: '02',
        title: 'The Last Light',
        subtitle: 'NASA Space Apps Hackathon',
        category: 'hackathon-arch',
        categoryLabel: 'NASA Hackathon',
        period: 'November 14–15, 2026',
        context: 'NASA Space Apps Challenge',
        summary:
          'Web application designed, built, and deployed live during the 48-hour NASA SPACE Hackathon held on November 14–15, 2026.',
        architectureDetails:
          'Rapid engineering of an interactive web experience focused on space data exploration and visual storytelling, continuously deployed to Vercel within the 48-hour hackathon sprint.',
        highlights: [
          '48-hour collaborative engineering sprint under live delivery constraints',
          'Publicly deployed web application hosted on Vercel',
          'Responsive front-end architecture tailored for data storytelling',
        ],
        stack: ['Web App', 'Vercel Deployment', 'NASA Space Apps', 'Git Flow'],
        image: '/src/assets/images/project_last_light_1795332637295.jpg',
        imageAlt: 'Orbital twilight horizon view for The Last Light NASA project',
        liveUrl: 'https://the-last-light-web.vercel.app',
        liveLabel: 'Visit live app',
        featuredSpan: 'compact',
      },
      {
        id: 'puolo',
        index: '03',
        title: 'PuoLo',
        subtitle: 'Services & Real Estate Intermediation',
        category: 'hackathon-arch',
        categoryLabel: 'Architecture & UML',
        period: 'Personal Project',
        context: 'Modeling & Database Design',
        summary:
          'Comprehensive UML modeling and relational database architecture for a service intermediation and real estate marketplace connecting providers, landlords, and clients.',
        architectureDetails:
          'Detailed use-case, class, and sequence diagrams paired with a normalized relational schema ensuring referential integrity across bookings, service listings, and multi-role accounts.',
        highlights: [
          'Full UML specification (use-case, class, and sequence diagrams)',
          'Normalized relational database schema ready for PostgreSQL / MySQL',
          'Clear domain boundaries separating services, real estate assets, and users',
        ],
        stack: ['UML Modeling', 'Database Architecture', 'PostgreSQL', 'Clean Architecture'],
        image: '/src/assets/images/project_puolo_architecture_1795332637933.jpg',
        imageAlt: 'Minimalist architectural scale model on technical blueprints for PuoLo',
        featuredSpan: 'compact',
      },
      {
        id: 'rag-chatbot',
        index: '04',
        title: 'RAG & AI Document Chatbot',
        subtitle: 'Vector Search Over Enterprise Documents',
        category: 'backend-ai',
        categoryLabel: 'Backend & AI',
        period: '2025 – 2026',
        context: 'Multi-Client Architecture',
        summary:
          'End-to-end NestJS backend powered by semantic vector search (pgvector), paired with an Angular administration dashboard and a React Native mobile client.',
        architectureDetails:
          'Document ingestion pipeline chunking and indexing vector embeddings directly inside PostgreSQL via pgvector. The NestJS REST API orchestrates contextual retrieval for both the Angular web console and React Native mobile app.',
        highlights: [
          'Vector indexing and similarity search powered by PostgreSQL pgvector',
          'Modular NestJS API structured around Clean Architecture principles',
          'Dual client ecosystem: Angular admin dashboard and React Native mobile app',
        ],
        stack: ['NestJS', 'PostgreSQL / pgvector', 'RAG', 'Angular', 'React Native'],
        image: '/src/assets/images/project_rag_vector_1795332636095.jpg',
        imageAlt: 'Isometric layered documents and vector search nodes for RAG platform',
        featuredSpan: 'wide',
      },
    ],
  },
  skillsSection: {
    kicker: 'Technical Stack',
    title: 'Engineering Capabilities',
    subtitle:
      'Focused on backend engineering, vector databases, and DevOps automation, with full-stack delivery across web and mobile.',
    allTab: 'All domains',
    domains: [
      {
        id: 'backend',
        index: '01',
        title: 'Backend & API',
        focus: 'Designing resilient services, modular APIs, and scalable business logic.',
        tools: [
          { name: 'NestJS', note: 'Modular architecture' },
          { name: 'Node.js', note: 'Server runtime' },
          { name: 'Python', note: 'Scripting & backend' },
          { name: 'Django', note: 'Web framework' },
          { name: 'Spring Boot', note: 'Advancing mastery' },
        ],
      },
      {
        id: 'frontend',
        index: '02',
        title: 'Frontend & Mobile',
        focus: 'Responsive interfaces, offline-capable progressive web apps, and mobile clients.',
        tools: [
          { name: 'Angular', note: 'Dashboards & SPAs' },
          { name: 'Tailwind CSS', note: 'Design systems' },
          { name: 'React & Next.js', note: 'Web applications' },
          { name: 'React Native', note: 'Cross-platform mobile' },
          { name: 'Thymeleaf & PWA', note: 'SSR & offline' },
        ],
      },
      {
        id: 'data-ai',
        index: '03',
        title: 'Databases & AI',
        focus: 'Relational persistence, semantic vector retrieval, and rigorous system modeling.',
        tools: [
          { name: 'PostgreSQL', note: 'pgvector & RAG' },
          { name: 'MySQL', note: 'Relational databases' },
          { name: 'MongoDB', note: 'Document store' },
          { name: 'RAG Pipelines', note: 'Vector indexing' },
          { name: 'UML Modeling', note: 'IS design' },
        ],
      },
      {
        id: 'devops',
        index: '04',
        title: 'DevOps & Versioning',
        focus: 'Containerization, automated CI/CD pipelines, and collaborative Git workflows.',
        tools: [
          { name: 'Docker', note: 'Containerization' },
          { name: 'CI/CD', note: 'GitLab CI & GitHub Actions' },
          { name: 'Git', note: 'Git Flow, GitHub, GitLab' },
          { name: 'Linux (CLI)', note: 'System administration' },
        ],
      },
      {
        id: 'arch',
        index: '05',
        title: 'Architecture & Security',
        focus: 'Maintainable software design, distributed microservices, and access control.',
        tools: [
          { name: 'Microservices Architecture', note: 'Decoupled services & APIs' },
          { name: 'REST APIs', note: 'Contracts & validation' },
          { name: 'Clean Architecture', note: 'Domain decoupling' },
          { name: 'Access Control (RBAC)', note: 'Role management' },
          { name: 'Algorithms', note: 'Embedded & IS optimization' },
        ],
      },
    ],
  },
  parcoursSection: {
    kicker: 'Experience, Education & Initiatives',
    title: 'Academic & Field Background',
    expTitle: '01. Professional Experience',
    expSubtitle: 'Technical leadership, embedded robotics, and algorithmic mentorship.',
    experiences: [
      {
        id: 'foudjem',
        role: 'Technical Coordinator & Mentor (Intern)',
        organization: "Fondation Jean Félicien Gacha – Think Tank Foud'jem",
        location: 'Bangangté, Cameroon',
        period: 'May 2025 – August 2025',
        bullets: [
          'Technical leadership: coordinated a multidisciplinary mechatronics team, managed Git code versioning, and optimized embedded algorithms for robotic devices.',
          'Training & pedagogy: designed and led introductory workshops on algorithms and programming (Scratch) for over 250 participants.',
        ],
      },
    ],
    eduTitle: '02. Academic Education',
    eduSubtitle: 'Dual foundation in software engineering and information systems.',
    educations: [
      {
        id: 'isj',
        degree: 'Engineering Degree in Computer Science & Information Systems (ING4)',
        institution: 'Institut Saint Jean Ingénieur',
        location: 'Yaoundé',
        period: 'September 2025 – Present',
        status: 'Engineering Cycle',
      },
      {
        id: 'cosendai',
        degree: 'Bachelor’s Degree in Software Engineering & Information Systems',
        institution: 'Université Adventiste Cosendai',
        location: 'Nanga-Eboko',
        period: 'October 2021 – July 2024',
        status: 'Graduated',
      },
    ],
    engTitle: '03. Hackathons & Languages',
    engSubtitle: 'Inter-school competitions, global challenges, and language proficiency.',
    languagesTitle: 'Languages',
    languages: [
      { name: 'French', level: 'Fluent' },
      { name: 'English', level: 'Academic' },
    ],
    engagements: [
      {
        id: 'nasa-space',
        title: 'NASA Space Apps Hackathon',
        date: 'November 14–15, 2026',
        place: '2026 Edition',
        description:
          'Team design and live deployment of The Last Light web application during the hackathon organized by NASA SPACE.',
        url: 'https://the-last-light-web.vercel.app',
        urlLabel: 'the-last-light-web.vercel.app',
      },
      {
        id: 'comsas',
        title: 'Hackathon & Project Pitch (COM.S.A.S)',
        date: 'June 2025',
        place: 'Polytechnique Yaoundé (ENSPY)',
        description:
          'Participated and pitched an innovative technical project during the inter-school competition organized by COMSAS at ENSPY.',
      },
    ],
  },
  contactSection: {
    kicker: 'Direct Contact',
    title: 'Available for a Technical Internship',
    subtitle:
      'Open to internship opportunities in Backend, Full-Stack, AI architectures, or DevOps in Yaoundé, internationally, or remotely.',
    location: 'Yaoundé, Cameroon',
    copy: 'Copy',
    copied: 'Copied',
    copyEmailAria: 'Copy email address',
    copyPhoneAria: 'Copy phone number',
    formTitle: 'Send a Message',
    formSubtitle:
      'Write your inquiry or interview invitation: your email client will open pre-filled.',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Marc Fotso',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@company.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Internship context, tech stack, preferred dates...',
    submitLabel: 'Prepare Email',
    responseHint: 'Fast response via email or phone',
    validationError: 'Please enter your name, email address, and message.',
    mailPrepared: 'Your email client has been opened with your message.',
    mailSubjectPrefix: 'Portfolio Inquiry',
  },
  footer: {
    location: 'Yaoundé, Cameroon',
  },
};

export function getPortfolioData(lang: Language): PortfolioContent {
  return lang === 'en' ? EN_DATA : FR_DATA;
}
