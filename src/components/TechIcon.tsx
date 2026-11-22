import {
  AppWindow,
  Binary,
  Blocks,
  Cpu,
  Database,
  GitBranch,
  GitMerge,
  Globe,
  Layers,
  Orbit,
  ShieldCheck,
  Smartphone,
  Terminal,
  WifiOff,
  Workflow,
} from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export function SocialIcon({
  network,
  className = 'h-4 w-4',
}: {
  network: 'github' | 'gitlab' | 'linkedin';
  className?: string;
}) {
  if (network === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
        />
      </svg>
    );
  }

  if (network === 'gitlab') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="m21.4 13.5-1.1-3.3-2.1-6.5a.4.4 0 0 0-.8 0l-2.1 6.5H8.7L6.6 3.7a.4.4 0 0 0-.8 0l-2.1 6.5-1.1 3.3a.8.8 0 0 0 .3.9L12 21l9.1-6.6a.8.8 0 0 0 .3-.9Z"
          fill="#E24329"
        />
        <path d="M12 21 15.3 10.2H8.7L12 21Z" fill="#FC6D26" />
        <path d="M12 21 8.7 10.2H3.7L12 21Z" fill="#FCA326" opacity="0.9" />
        <path d="M12 21l3.3-10.8h5L12 21Z" fill="#FCA326" opacity="0.9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75ZM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export function TechIcon({ name, className = 'h-4 w-4' }: TechIconProps) {
  const key = name.toLowerCase();

  // NestJS
  if (key.includes('nestjs')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5C7.2 2.5 3.4 6.1 3.1 10.8c-.2 3.1 1.2 6 3.7 7.8.4.3.9 0 .9-.5 0-1.3.4-2.6 1.3-3.5-1.1-.8-1.8-2.1-1.8-3.6 0-2.5 2-4.5 4.5-4.5 2.1 0 3.9 1.4 4.4 3.4.3 1.1.1 2.4-.5 3.4-.2.4.1.9.6.9 2.3 0 4.5-1.7 4.7-4.5C21.2 5.9 17.1 2.5 12 2.5Z"
          fill="#E0234E"
        />
        <path
          d="M12 13.5c-1.7 0-3 1.3-3 3 0 2.1 1.7 4.1 3 5 1.3-.9 3-2.9 3-5 0-1.7-1.3-3-3-3Z"
          fill="#E0234E"
          opacity="0.85"
        />
      </svg>
    );
  }

  // Node.js
  if (key.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.2 20.5 7.1v9.8L12 21.8 3.5 16.9V7.1L12 2.2Z"
          stroke="#5FA04E"
          strokeWidth="1.8"
          fill="#5FA04E"
          fillOpacity="0.14"
        />
        <path
          d="M9.5 15V9l5 6V9"
          stroke="#4E943F"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Python
  if (key.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M11.9 3C8.5 3 8.8 4.5 8.8 4.5v2.2h3.2v.7H6.6S4 7.1 4 10.6c0 3.5 2.3 3.4 2.3 3.4h1.4v-1.7s-.1-2.3 2.2-2.3h4s2.1 0 2.1-2V5.1S16.3 3 11.9 3Zm-1.8 1.4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z"
          fill="#3776AB"
        />
        <path
          d="M12.1 21c3.4 0 3.1-1.5 3.1-1.5v-2.2H12v-.7h5.4s2.6.3 2.6-3.2c0-3.5-2.3-3.4-2.3-3.4h-1.4v1.7s.1 2.3-2.2 2.3h-4s-2.1 0-2.1 2v2.9S7.7 21 12.1 21Zm1.8-1.4a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z"
          fill="#EAB308"
        />
      </svg>
    );
  }

  // Django
  if (key.includes('django')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#092E20" stroke="#44B78B" strokeWidth="1.4" />
        <path
          d="M10.8 6.8v7.6c-1.3.2-2.2.3-2.9.3-2 0-3-.9-3-2.4 0-1.6 1.1-2.6 2.8-2.6.4 0 .8 0 1.2.2V6.8h1.9Zm-1.9 4.5c-.3-.1-.6-.1-.9-.1-.9 0-1.4.5-1.4 1.2 0 .7.4 1.1 1.3 1.1.3 0 .6 0 1-.1v-2.1Zm4.6-4.5h1.9v7.8c0 1.8-.4 2.7-1.6 3.5l-1.5-.8c1-.6 1.2-1.2 1.2-2.5V6.8Zm0-2h1.9v1.3h-1.9V4.8Z"
          fill="#44B78B"
        />
      </svg>
    );
  }

  // Spring Boot
  if (key.includes('spring')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5 20.2 7.2v9.6L12 21.5 3.8 16.8V7.2L12 2.5Z"
          fill="#6DB33F"
          fillOpacity="0.16"
          stroke="#6DB33F"
          strokeWidth="1.6"
        />
        <path
          d="M12 7.5v4.2m-2.8-2.4a4.2 4.2 0 1 0 5.6 0"
          stroke="#6DB33F"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Angular
  if (key.includes('angular')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5 3.5 5.6l1.3 11.1L12 21.5l7.2-4.8 1.3-11.1L12 2.5Z"
          fill="#DD0031"
          fillOpacity="0.16"
          stroke="#E11D48"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.8 8 15.8h1.6l.8-1.9h3.2l.8 1.9H16L12 6.8Zm0 3.2 1.1 2.6h-2.2L12 10Z"
          fill="#E11D48"
        />
      </svg>
    );
  }

  // Tailwind CSS
  if (key.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.6 7.2 14.5 6 12 6ZM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-1-1-2.1-2.2-4.6-2.2Z"
          fill="#0EA5E9"
        />
      </svg>
    );
  }

  // React / React Native / React & Next.js
  if (key.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="1.8" fill="#0EA5E9" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#0EA5E9" strokeWidth="1.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(60 12 12)"
          stroke="#0EA5E9"
          strokeWidth="1.4"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(120 12 12)"
          stroke="#0EA5E9"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  // Next.js
  if (key.includes('next.js')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`${className} text-zinc-900 dark:text-white`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9 15.5V8.5l7.2 9M15 8.5v4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Thymeleaf
  if (key.includes('thymeleaf')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M19.5 4.5C12 4.5 6.5 8.5 5 16c-.3 1.4-.2 2.8-.2 3.5.7 0 2.1.1 3.5-.2C15.5 17.8 19.5 12 19.5 4.5Z"
          fill="#22C55E"
          fillOpacity="0.18"
          stroke="#16A34A"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 18.5C9 15 12.5 11.5 16.5 8"
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // PWA Hors-ligne / Offline PWA
  if (key.includes('pwa') || key.includes('hors-ligne') || key.includes('offline')) {
    return <WifiOff className={`${className} text-sky-600 dark:text-sky-400`} aria-hidden="true" />;
  }

  // PostgreSQL / pgvector
  if (key.includes('postgres') || key.includes('pgvector')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse
          cx="12"
          cy="6.5"
          rx="7"
          ry="3"
          stroke="#2563EB"
          strokeWidth="1.6"
          fill="#3B82F6"
          fillOpacity="0.15"
        />
        <path d="M5 6.5v11c0 1.7 3.1 3 7 3s7-1.3 7-3v-11" stroke="#2563EB" strokeWidth="1.6" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#2563EB" strokeWidth="1.4" opacity="0.75" />
      </svg>
    );
  }

  // MySQL
  if (key.includes('mysql')) {
    return <Database className={`${className} text-cyan-600 dark:text-cyan-400`} aria-hidden="true" />;
  }

  // MongoDB
  if (key.includes('mongodb')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.8c2.9 3.1 4.8 6.4 4.8 9.8 0 3.3-1.8 6.1-4.8 7.7-3-1.6-4.8-4.4-4.8-7.7 0-3.4 1.9-6.7 4.8-9.8Z"
          fill="#47A248"
          fillOpacity="0.2"
          stroke="#16A34A"
          strokeWidth="1.6"
        />
        <path d="M12 8.5v12.8" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // RAG / Vector Pipelines
  if (key.includes('rag')) {
    return <Binary className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // Docker
  if (key.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4.5 13h14.2c1.4 0 2.5-.6 3.1-1.6-.6-.5-1.5-.7-2.2-.4.2-.8-.1-1.7-.9-2.2-.5.7-.7 1.6-.4 2.5H4.5c-.7 0-1.2.6-1.2 1.3 0 3.9 2.7 6.9 7.6 6.9 4.5 0 7.9-2.2 9.4-6.5"
          stroke="#0EA5E9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="6" y="9.5" width="2.5" height="2.2" rx="0.4" fill="#0EA5E9" />
        <rect x="9.5" y="9.5" width="2.5" height="2.2" rx="0.4" fill="#0EA5E9" />
        <rect x="13" y="9.5" width="2.5" height="2.2" rx="0.4" fill="#0EA5E9" />
        <rect x="9.5" y="6.5" width="2.5" height="2.2" rx="0.4" fill="#0EA5E9" />
        <rect x="13" y="6.5" width="2.5" height="2.2" rx="0.4" fill="#0EA5E9" />
      </svg>
    );
  }

  // CI/CD
  if (key.includes('ci/cd') || key.includes('gitlab ci') || key.includes('github actions')) {
    return <GitMerge className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // Git / Git Flow
  if (key.includes('git')) {
    return <GitBranch className={`${className} text-orange-600 dark:text-orange-400`} aria-hidden="true" />;
  }

  // Linux
  if (key.includes('linux')) {
    return <Terminal className={`${className} text-zinc-700 dark:text-zinc-200`} aria-hidden="true" />;
  }

  // Vercel
  if (key.includes('vercel')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${className} text-zinc-900 dark:text-zinc-100`}
        aria-hidden="true"
      >
        <path d="M12 4 21 19.5H3L12 4Z" />
      </svg>
    );
  }

  // UML / Database Architecture
  if (key.includes('uml') || key.includes('bdd') || key.includes('database')) {
    return <Workflow className={`${className} text-indigo-600 dark:text-indigo-400`} aria-hidden="true" />;
  }

  // REST APIs
  if (key.includes('rest') || key.includes('api')) {
    return <Globe className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // Microservices Architecture
  if (key.includes('microservice')) {
    return <Blocks className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // Clean Architecture
  if (key.includes('clean architecture')) {
    return <Layers className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // RBAC
  if (key.includes('rbac') || key.includes('accès') || key.includes('access')) {
    return <ShieldCheck className={`${className} text-emerald-600 dark:text-emerald-400`} aria-hidden="true" />;
  }

  // Algorithms
  if (key.includes('algorithm')) {
    return <Cpu className={`${className} text-amber-600 dark:text-amber-400`} aria-hidden="true" />;
  }

  // NASA Space Apps
  if (key.includes('nasa')) {
    return <Orbit className={`${className} text-blue-600 dark:text-blue-400`} aria-hidden="true" />;
  }

  // Web App / Mobile fallback
  if (key.includes('mobile')) {
    return <Smartphone className={`${className} text-sky-600 dark:text-sky-400`} aria-hidden="true" />;
  }

  return <AppWindow className={`${className} text-zinc-600 dark:text-zinc-300`} aria-hidden="true" />;
}
