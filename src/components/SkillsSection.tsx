import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData } from '../data/portfolio';
import { gsap, ScrollTrigger } from '../lib/gsapSetup';
import { TechIcon } from './TechIcon';

export function SkillsSection() {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = usePreferences();
  const sectionData = getPortfolioData(lang).skillsSection;
  const domains = sectionData.domains;

  const visibleDomains =
    selectedDomain === 'all'
      ? domains
      : domains.filter((domain) => domain.id === selectedDomain);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      gsap.from('.skills-header-reveal', {
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

      const rows = gsap.utils.toArray<HTMLElement>('.skill-domain-row', sectionRef.current);
      rows.forEach((row) => {
        const tools = row.querySelectorAll('.skill-tool-item');

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 87%',
            once: true,
          },
        });

        rowTl
          .from(row, {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          })
          .from(
            tools,
            {
              y: 14,
              opacity: 0,
              duration: 0.4,
              stagger: 0.045,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            },
            '-=0.35'
          );
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
    return () => window.clearTimeout(timer);
  }, [selectedDomain]);

  return (
    <section
      ref={sectionRef}
      id="competences"
      className="border-b border-zinc-200/80 py-20 dark:border-zinc-800/80 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="skills-header-reveal max-w-2xl">
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

          <div
            role="tablist"
            aria-label={sectionData.title}
            className="skills-header-reveal flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1.5 self-start dark:border-zinc-800/90 dark:bg-[#0A0A0D] lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedDomain === 'all'}
              onClick={() => setSelectedDomain('all')}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedDomain === 'all'
                  ? 'text-white'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {selectedDomain === 'all' && (
                <motion.span
                  layoutId="skills-filter-active"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-lg bg-blue-600"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{sectionData.allTab}</span>
            </button>
            {domains.map((domain) => {
              const isActive = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-filter-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-blue-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{domain.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Hairline-Divided Engineering Matrix with Technology Icons */}
        <motion.div
          key={selectedDomain}
          initial={selectedDomain === 'all' ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 divide-y divide-zinc-200/80 rounded-2xl border border-zinc-200/90 bg-white dark:divide-zinc-800/80 dark:border-zinc-800/80 dark:bg-[#09090C]"
        >
          {visibleDomains.map((domain) => (
            <div
              key={domain.id}
              className="skill-domain-row grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:items-start md:p-8"
            >
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                    {domain.index}.
                  </span>
                  <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                    {domain.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {domain.focus}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7 lg:grid-cols-3">
                {domain.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="skill-tool-item group flex items-start gap-3 border-b border-zinc-200/70 pb-3 transition-transform duration-150 hover:-translate-y-0.5 dark:border-zinc-800/60 sm:border-b-0 sm:pb-0"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 transition-colors duration-150 group-hover:border-blue-500/40 group-hover:bg-blue-50/50 dark:border-zinc-800/90 dark:bg-[#0D0D12] dark:group-hover:bg-[#11131B]">
                      <TechIcon name={tool.name} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {tool.name}
                      </p>
                      {tool.note && (
                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          {tool.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
