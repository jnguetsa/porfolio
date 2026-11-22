import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData } from '../data/portfolio';
import { TechIcon } from './TechIcon';

export function MarqueeStrip() {
  const { lang } = usePreferences();
  const items = getPortfolioData(lang).marquee;
  const repeated = [...items, ...items];

  return (
    <div
      aria-label={lang === 'en' ? 'Core technologies' : 'Technologies principales'}
      className="overflow-hidden border-b border-zinc-200/80 bg-white py-3.5 transition-colors duration-200 dark:border-zinc-800/80 dark:bg-[#08080A]"
    >
      <div className="animate-marquee items-center gap-8">
        {repeated.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-700 dark:text-zinc-300">
              <TechIcon name={item} className="h-3.5 w-3.5 shrink-0" />
              <span>{item}</span>
            </span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
