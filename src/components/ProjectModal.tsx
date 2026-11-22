import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData, type ProjectItem } from '../data/portfolio';
import { TechIcon } from './TechIcon';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const { lang } = usePreferences();
  const sectionData = getPortfolioData(lang).projectsSection;

  // Keep modal content synchronized when switching language while modal is open
  const localizedProject = project
    ? sectionData.items.find((p) => p.id === project.id) ?? project
    : null;

  useEffect(() => {
    setImgError(false);
  }, [localizedProject?.id]);

  useEffect(() => {
    if (!localizedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [localizedProject, onClose]);

  return (
    <AnimatePresence>
      {localizedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="modal-scrollbar relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#0B0B0E]"
          >
            {/* High-Contrast Sticky Close Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#0B0B0E]/95">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                  {localizedProject.index}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {localizedProject.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{localizedProject.period}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={sectionData.modal.closeAria}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Unobstructed High-Resolution Visual */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200 bg-zinc-950 dark:border-zinc-800/80">
              {!imgError ? (
                <img
                  src={localizedProject.image}
                  alt={localizedProject.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-[#050505]">
                  <Layers className="h-8 w-8 text-blue-500" aria-hidden="true" />
                  <p className="font-display text-base text-zinc-200">
                    {localizedProject.title}
                  </p>
                </div>
              )}
            </div>

            {/* Project Architectural Details */}
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl"
                >
                  {localizedProject.title}
                </h3>
                <p className="mt-1 text-base font-medium text-zinc-700 dark:text-zinc-300">
                  {localizedProject.subtitle}
                </p>
              </div>

              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {localizedProject.summary}
              </p>

              <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800/80">
                <h4 className="font-display text-sm font-semibold text-zinc-950 dark:text-white">
                  {sectionData.modal.archTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {localizedProject.architectureDetails}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800/80">
                <h4 className="font-display text-sm font-semibold text-zinc-950 dark:text-white">
                  {sectionData.modal.highlightsTitle}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {localizedProject.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-5 border-t border-zinc-200 pt-5 dark:border-zinc-800/80 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    {sectionData.modal.stackTitle}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                    {localizedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200"
                      >
                        <TechIcon name={tech} className="h-4 w-4 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {localizedProject.liveUrl && (
                  <a
                    href={localizedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {localizedProject.liveLabel ?? sectionData.defaultLiveLabel}
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
