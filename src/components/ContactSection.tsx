import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Moon, Phone, Send, Sun } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData, PROFILE_STATIC } from '../data/portfolio';
import { gsap } from '../lib/gsapSetup';
import { SocialIcon } from './TechIcon';

export function ContactSection() {
  const { lang, setLang, theme, toggleTheme } = usePreferences();
  const data = getPortfolioData(lang);
  const { contactSection } = data;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [noticeType, setNoticeType] = useState<'error' | 'prepared' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });

      tl.from('.contact-left-reveal', {
        x: -24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }).from(
        '.contact-form-reveal',
        {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        },
        '-=0.45'
      );
    });

    return () => mm.revert();
  }, []);

  const handleCopy = async (value: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === fieldKey ? null : prev));
      }, 2200);
    } catch {
      setCopiedField(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setNoticeType('error');
      return;
    }

    const subject = encodeURIComponent(`${contactSection.mailSubjectPrefix} — ${trimmedName}`);
    const body = encodeURIComponent(
      `${contactSection.nameLabel} : ${trimmedName}\n${contactSection.emailLabel} : ${trimmedEmail}\n\n${trimmedMessage}`
    );

    window.location.href = `mailto:${PROFILE_STATIC.emails[0]}?cc=${encodeURIComponent(PROFILE_STATIC.emails[1])}&subject=${subject}&body=${body}`;
    setNoticeType('prepared');
  };

  const formNotice =
    noticeType === 'error'
      ? contactSection.validationError
      : noticeType === 'prepared'
        ? contactSection.mailPrepared
        : null;

  return (
    <>
      <section ref={sectionRef} id="contact" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Direct Coordinates & Socials */}
            <div className="lg:col-span-5">
              <div className="contact-left-reveal">
                <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
                  {contactSection.kicker}
                </p>
                <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
                  {contactSection.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {contactSection.subtitle}
                </p>
              </div>

              <div className="mt-8 space-y-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
                {PROFILE_STATIC.emails.map((email, idx) => {
                  const key = `email-${idx}`;
                  return (
                    <div
                      key={email}
                      className="contact-left-reveal flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none dark:hover:border-zinc-700"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Mail className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                        <a
                          href={`mailto:${email}`}
                          className="truncate text-sm text-zinc-800 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                        >
                          {email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(email, key)}
                        aria-label={`${contactSection.copyEmailAria} ${email}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                      >
                        {copiedField === key ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                            <span>{contactSection.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{contactSection.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}

                {PROFILE_STATIC.phones.map((phone, idx) => {
                  const key = `phone-${idx}`;
                  const telHref = `tel:${phone.replace(/[^+\d]/g, '')}`;
                  return (
                    <div
                      key={phone}
                      className="contact-left-reveal flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none dark:hover:border-zinc-700"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                        <a
                          href={telHref}
                          className="font-mono text-sm tabular-nums text-zinc-800 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                        >
                          {phone}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(phone, key)}
                        aria-label={`${contactSection.copyPhoneAria} ${phone}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                      >
                        {copiedField === key ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                            <span>{contactSection.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{contactSection.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}

                <div className="contact-left-reveal flex items-center gap-3 px-1 pt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                  <span>{contactSection.location}</span>
                </div>
              </div>

              <div className="contact-left-reveal mt-6 flex flex-wrap items-center gap-5 border-t border-zinc-200/80 pt-6 text-sm font-medium text-zinc-700 dark:border-zinc-800/80 dark:text-zinc-300">
                <a
                  href={PROFILE_STATIC.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <SocialIcon network="linkedin" className="h-4 w-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE_STATIC.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <SocialIcon network="github" className="h-4 w-4 text-zinc-900 dark:text-zinc-200" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE_STATIC.socials.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <SocialIcon network="gitlab" className="h-4 w-4" />
                  <span>GitLab</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Message Composer */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="contact-form-reveal rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800/80 dark:bg-[#0A0A0D] dark:shadow-none sm:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-zinc-950 dark:text-white">
                  {contactSection.formTitle}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {contactSection.formSubtitle}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {contactSection.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        setNoticeType(null);
                      }}
                      placeholder={contactSection.namePlaceholder}
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {contactSection.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        setNoticeType(null);
                      }}
                      placeholder={contactSection.emailPlaceholder}
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {contactSection.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setNoticeType(null);
                    }}
                    placeholder={contactSection.messagePlaceholder}
                    className="mt-2 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-[#050505] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  />
                </div>

                {formNotice && (
                  <p
                    className={`mt-4 text-xs font-medium ${
                      noticeType === 'error'
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}
                    role="status"
                  >
                    {formNotice}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{contactSection.submitLabel}</span>
                  </button>

                  <span className="text-xs text-zinc-500">{contactSection.responseHint}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200/80 bg-[#F8F9FB] py-8 transition-colors duration-200 dark:border-zinc-800/80 dark:bg-[#050505]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © 2026 {PROFILE_STATIC.fullName} · {data.footer.location}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {data.nav.links
              .filter((item) => item.href !== '#architecture-3d')
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                  {item.label}
                </a>
              ))}
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
            <div
              role="group"
              aria-label={data.preferences.langAria}
              className="inline-flex items-center rounded-md border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-[#0B0B0F]"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                aria-pressed={lang === 'fr'}
                className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                  lang === 'fr'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                  lang === 'en'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={data.preferences.themeAria}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#0B0B0F] dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="h-3 w-3 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="h-3 w-3 text-blue-600" aria-hidden="true" />
              )}
              <span>
                {theme === 'dark' ? data.preferences.lightLabel : data.preferences.darkLabel}
              </span>
            </button>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
            <a
              href={PROFILE_STATIC.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <SocialIcon network="github" className="h-4 w-4" />
            </a>
            <a
              href={PROFILE_STATIC.socials.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitLab"
              className="transition-opacity hover:opacity-80"
            >
              <SocialIcon network="gitlab" className="h-4 w-4" />
            </a>
            <a
              href={PROFILE_STATIC.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#0A66C2] transition-opacity hover:opacity-80"
            >
              <SocialIcon network="linkedin" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
