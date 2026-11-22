import { useEffect, useState } from 'react';
import { Architecture3DSection } from './components/Architecture3DSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { PreferencesProvider } from './context/PreferencesContext';
import type { ProjectItem } from './data/portfolio';
import { ScrollTrigger } from './lib/gsapSetup';

function PortfolioContent() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) {
        ScrollTrigger.refresh();
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-zinc-900 transition-colors duration-200 dark:bg-[#050505] dark:text-[#F4F4F5]">
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Architecture3DSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <PortfolioContent />
    </PreferencesProvider>
  );
}
