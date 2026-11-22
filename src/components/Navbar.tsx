import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData, PROFILE_STATIC } from '../data/portfolio';
import { gsap, REDUCED_MOTION_QUERY } from '../lib/gsapSetup';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, lang, setLang } = usePreferences();
  const data = getPortfolioData(lang);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!progressBarRef.current) return;
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        }
      );
    });

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches && progressBarRef.current) {
      progressBarRef.current.style.transform = 'scaleX(0)';
    }

    return () => mm.revert();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#F8F9FB]/85 backdrop-blur-md transition-colors duration-200 dark:border-zinc-800/80 dark:bg-[#050505]/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#profil"
          className="font-display text-lg font-semibold tracking-tight text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-white whitespace-nowrap shrink-0"
        >
          {PROFILE_STATIC.shortName}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-7">
          {data.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 whitespace-nowrap shrink-0"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-200 group-hover:scale-x-100 dark:bg-blue-500"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-blue-500 active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            {data.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? data.nav.closeMenu : data.nav.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Scroll-driven GSAP progress hairline */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400"
      />

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-[#F8F9FB] px-6 py-4 dark:border-zinc-800/80 dark:bg-[#050505] md:hidden">
          <nav aria-label="Navigation mobile" className="flex flex-col gap-3">
            {data.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800/80">
              <div
                role="group"
                aria-label={data.preferences.langAria}
                className="inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-[#0D0D10]"
              >
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    lang === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={data.preferences.themeAria}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#0D0D10] dark:text-zinc-200"
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

            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              {data.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
