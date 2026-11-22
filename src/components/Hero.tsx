import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Moon, Sun, Terminal } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData, PROFILE_STATIC } from '../data/portfolio';
import { gsap } from '../lib/gsapSetup';
import { SocialIcon } from './TechIcon';

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const { theme, toggleTheme, lang, setLang } = usePreferences();
  const data = getPortfolioData(lang);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        clearProps: 'transform,opacity',
      })
        .from(
          '.hero-portrait-frame',
          {
            y: 24,
            scale: 0.96,
            opacity: 0,
            duration: 0.85,
            clearProps: 'transform,opacity',
          },
          '-=0.55'
        )
        .from(
          '.hero-metric-item',
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
            clearProps: 'transform,opacity',
          },
          '-=0.45'
        );

      if (portraitImgRef.current) {
        gsap.fromTo(
          portraitImgRef.current,
          { scale: 1.07, yPercent: -3 },
          {
            scale: 1.07,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profil"
      className="border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        {/* Hero Toolbar: Kicker + Theme / Language Controls */}
        <div className="hero-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {data.hero.roleKicker}
          </p>

          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <div
              role="group"
              aria-label={data.preferences.langAria}
              className="inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-[#0D0D10]"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                aria-pressed={lang === 'fr'}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'fr'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Light / Dark Mode Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={data.preferences.themeAria}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#0D0D10] dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-white whitespace-nowrap shrink-0"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                  <span>{data.preferences.lightLabel}</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                  <span>{data.preferences.darkLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h1 className="hero-stagger font-display text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                {PROFILE_STATIC.fullName}
              </h1>

              <p className="hero-stagger font-display mt-3 text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl text-balance">
                {data.hero.headline}
              </p>

              <p className="hero-stagger mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {data.hero.summary}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-6 pt-4">
              <div className="hero-stagger flex flex-wrap items-center gap-4">
                <a
                  href="#projets"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-500 active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <span>{data.hero.ctaPrimary}</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#0D0D10] dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <span>{data.hero.ctaSecondary}</span>
                </a>
              </div>

              <div className="hero-stagger flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <a
                  href={PROFILE_STATIC.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  <SocialIcon
                    network="github"
                    className="h-3.5 w-3.5 text-zinc-800 dark:text-zinc-300"
                  />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
                <a
                  href={PROFILE_STATIC.socials.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  <SocialIcon network="gitlab" className="h-3.5 w-3.5" />
                  <span>GitLab</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
                <a
                  href={PROFILE_STATIC.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  <SocialIcon network="linkedin" className="h-3.5 w-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
                <span>{data.hero.seekingTag}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Matching-Height Portrait Visual with Scroll Parallax */}
          <div className="lg:col-span-5">
            <div className="hero-portrait-frame relative h-80 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-[#0D0D10] sm:h-[420px] lg:h-full lg:min-h-[440px]">
              {!imgError ? (
                <img
                  ref={portraitImgRef}
                  src={PROFILE_STATIC.heroImage}
                  alt={data.hero.heroImageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-[center_18%] will-change-transform"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-200 to-zinc-100 p-6 text-center dark:from-zinc-900 dark:to-[#050505]">
                  <Terminal className="h-8 w-8 text-blue-600 dark:text-blue-500" aria-hidden="true" />
                  <p className="font-display text-base font-medium text-zinc-900 dark:text-zinc-200">
                    {PROFILE_STATIC.fullName}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Backend · IA · DevOps</p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium text-white">
                  {PROFILE_STATIC.fullName}
                </p>
                <p className="mt-0.5 text-xs text-zinc-200">
                  NestJS · Spring Boot · PostgreSQL / pgvector · Docker
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Key Metrics Strip Below Hero Split */}
        <div className="mt-12 grid grid-cols-2 divide-y divide-zinc-200/80 rounded-2xl border border-zinc-200/90 bg-white dark:divide-zinc-800/80 dark:border-zinc-800/80 dark:bg-[#0A0A0D] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {data.hero.metrics.map((metric) => (
            <div
              key={metric.value + metric.label}
              className="hero-metric-item p-5 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-[#0E0E13] sm:p-6"
            >
              <div className="font-mono text-2xl font-medium tracking-tight text-zinc-950 tabular-nums dark:text-white sm:text-3xl">
                {metric.value}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
