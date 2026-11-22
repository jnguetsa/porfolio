import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData, type ProjectCategory, type ProjectItem } from '../data/portfolio';
import { gsap, ScrollTrigger } from '../lib/gsapSetup';
import { TechIcon } from './TechIcon';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  const { lang } = usePreferences();
  const sectionData = getPortfolioData(lang).projectsSection;
  const projects = sectionData.items;

  const isFilteredView = activeFilter !== 'all';

  const filteredProjects = isFilteredView
    ? projects.filter((project) => project.category === activeFilter)
    : projects;

  const getCount = (id: ProjectCategory) =>
    id === 'all'
      ? projects.length
      : projects.filter((project) => project.category === id).length;

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (event.pointerType !== 'mouse') return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 4.5;
    const rotateX = ((y / rect.height) - 0.5) * -4.5;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1100,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleCardPointerLeave = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      gsap.from('.projects-header-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });

      if (gridWrapperRef.current) {
        gsap.from('.project-scroll-card', {
          y: 38,
          scale: 0.98,
          opacity: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: gridWrapperRef.current,
            start: 'top 84%',
            once: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 360);
    return () => window.clearTimeout(timer);
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="border-b border-zinc-200/80 py-20 dark:border-zinc-800/80 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="projects-header-reveal max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
              {sectionData.kicker}
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {sectionData.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {sectionData.subtitle}
            </p>
          </div>

          {/* Enhanced Segmented Filter Bar */}
          <div
            role="tablist"
            aria-label={sectionData.title}
            className="projects-header-reveal flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1.5 self-start dark:border-zinc-800/90 dark:bg-[#0A0A0D] lg:self-auto"
          >
            {sectionData.filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = getCount(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                  <span
                    className={`relative z-10 font-mono text-[11px] tabular-nums ${
                      isActive ? 'text-blue-100' : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Grid (All) vs Full-Width Showcase (Filtered) */}
        <div ref={gridWrapperRef}>
          <motion.div
            key={activeFilter}
            initial={isFilteredView ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-10 grid gap-6 ${
              isFilteredView ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isWideBento = !isFilteredView && project.featuredSpan === 'wide';
                const hasFailed = Boolean(failedImages[project.id]);

                if (isFilteredView) {
                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-[#0B0B0E] dark:hover:border-zinc-700"
                    >
                      <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                        {/* Left Visual Frame (7 cols) */}
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          aria-label={`${sectionData.exploreArch} — ${project.title}`}
                          className="relative min-h-[260px] w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-950 text-left focus-visible:outline-none dark:border-zinc-800/80 lg:col-span-7 lg:min-h-[380px] lg:border-r lg:border-b-0"
                        >
                          {!hasFailed ? (
                            <img
                              src={project.image}
                              alt={project.imageAlt}
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(project.id)}
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-[#070709] p-6 text-center">
                              <Layers className="h-8 w-8 text-blue-500" aria-hidden="true" />
                              <span className="font-display text-base font-medium text-zinc-200">
                                {project.title}
                              </span>
                            </div>
                          )}
                        </button>

                        {/* Right Architectural Details (5 cols) */}
                        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                                  {project.index}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                  {project.categoryLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="tabular-nums">{project.period}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => onSelectProject(project)}
                                aria-label={project.title}
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors duration-150 hover:border-blue-500/60 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                              >
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>

                            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                              <button
                                type="button"
                                onClick={() => onSelectProject(project)}
                                className="text-left transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {project.title}
                              </button>
                            </h3>
                            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                              {project.subtitle}
                            </p>

                            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {project.summary}
                            </p>

                            <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800/80">
                              {project.highlights.slice(0, 2).map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 space-y-5 border-t border-zinc-200 pt-5 dark:border-zinc-800/80">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                  <TechIcon name={tech} className="h-4 w-4 shrink-0" />
                                  <span>{tech}</span>
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() => onSelectProject(project)}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98] whitespace-nowrap shrink-0"
                              >
                                <span>{sectionData.exploreArch}</span>
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>

                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-800 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-white whitespace-nowrap shrink-0"
                                >
                                  <span>{project.liveLabel ?? sectionData.defaultLiveLabel}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                }

                return (
                  <article
                    key={project.id}
                    onPointerMove={handleCardPointerMove}
                    onPointerLeave={handleCardPointerLeave}
                    className={`project-scroll-card group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white transition-colors duration-300 hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-[#0B0B0E] dark:hover:border-zinc-700 will-change-transform ${
                      isWideBento ? 'lg:col-span-2' : 'lg:col-span-1'
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.12), transparent 60%)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="flex h-full w-full flex-col text-left focus-visible:outline-none"
                    >
                      {/* Visual Media Frame */}
                      <div
                        className={`relative w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-950 dark:border-zinc-800/80 ${
                          isWideBento ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        {!hasFailed ? (
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            referrerPolicy="no-referrer"
                            onError={() => handleImageError(project.id)}
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-[#070709] p-6 text-center">
                            <Layers className="h-7 w-7 text-blue-500" aria-hidden="true" />
                            <span className="font-display text-sm font-medium text-zinc-200">
                              {project.title}
                            </span>
                          </div>
                        )}

                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/20 to-transparent dark:block"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                              <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                                {project.index}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {project.categoryLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">{project.period}</span>
                            </div>

                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-blue-500/60 group-hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:group-hover:text-white">
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>

                          <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {project.subtitle}
                          </p>

                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.summary}
                          </p>
                        </div>

                        {/* Technology Icons & Labels */}
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800/80">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300"
                            >
                              <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                              <span>{tech}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>

                    {project.liveUrl && (
                      <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-3 dark:border-zinc-800/80 dark:bg-[#09090C]">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <span>{project.liveLabel ?? sectionData.defaultLiveLabel}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
