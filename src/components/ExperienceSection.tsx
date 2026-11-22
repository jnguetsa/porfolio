import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsapSetup';

export function ExperienceSection() {
  const { lang } = usePreferences();
  const data = getPortfolioData(lang);
  const { parcoursSection } = data;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      gsap.from('.parcours-header-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });

      const blocks = gsap.utils.toArray<HTMLElement>('.parcours-block', sectionRef.current);
      blocks.forEach((block) => {
        const aside = block.querySelectorAll('.parcours-aside');
        const cards = block.querySelectorAll('.parcours-card');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 84%',
            once: true,
          },
        });

        tl.from(aside, {
          x: -22,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }).from(
          cards,
          {
            y: 28,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          '-=0.4'
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parcours"
      className="border-b border-zinc-200/80 py-20 transition-colors duration-200 dark:border-zinc-800/80 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="parcours-header-reveal max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
            {parcoursSection.kicker}
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            {parcoursSection.title}
          </h2>
        </div>

        {/* Professional Experience */}
        <div className="parcours-block mt-12 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="parcours-aside lg:col-span-4">
              <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                {parcoursSection.expTitle}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {parcoursSection.expSubtitle}
              </p>
            </div>

            <div className="space-y-8 lg:col-span-8">
              {parcoursSection.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="parcours-card rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-colors duration-200 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none dark:hover:border-zinc-700 sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <h4 className="font-display text-xl font-semibold text-zinc-950 dark:text-white">
                      {exp.role}
                    </h4>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-blue-600 dark:text-blue-400">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {exp.organization} · {exp.location}
                  </p>

                  <ul className="mt-5 space-y-3 border-t border-zinc-200/80 pt-5 dark:border-zinc-800/80">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Education */}
        <div className="parcours-block mt-12 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="parcours-aside lg:col-span-4">
              <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                {parcoursSection.eduTitle}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {parcoursSection.eduSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {parcoursSection.educations.map((edu) => (
                <div
                  key={edu.id}
                  className="parcours-card flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none dark:hover:border-zinc-700"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {edu.status}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{edu.period}</span>
                    </div>
                    <h4 className="font-display mt-3 text-lg font-semibold leading-snug text-zinc-950 dark:text-white">
                      {edu.degree}
                    </h4>
                  </div>

                  <p className="mt-5 border-t border-zinc-200/80 pt-4 text-sm text-zinc-700 dark:border-zinc-800/80 dark:text-zinc-300">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagements, Hackathons & Languages */}
        <div className="parcours-block mt-12 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="parcours-aside lg:col-span-4">
              <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                {parcoursSection.engTitle}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {parcoursSection.engSubtitle}
              </p>

              <div className="mt-6 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
                <p className="text-xs font-medium text-zinc-500">
                  {parcoursSection.languagesTitle}
                </p>
                <div className="mt-2 space-y-1.5 text-sm text-zinc-800 dark:text-zinc-300">
                  {parcoursSection.languages.map((spokenLang) => (
                    <div key={spokenLang.name} className="flex items-center justify-between">
                      <span>{spokenLang.name}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {spokenLang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {parcoursSection.engagements.map((item) => (
                <div
                  key={item.id}
                  className="parcours-card flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none dark:hover:border-zinc-700"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-mono tabular-nums text-blue-600 dark:text-blue-400">
                        {item.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.place}</span>
                    </div>

                    <h4 className="font-display mt-3 text-lg font-semibold text-zinc-950 dark:text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>

                  {item.url && (
                    <div className="mt-5 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <span>{item.urlLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
