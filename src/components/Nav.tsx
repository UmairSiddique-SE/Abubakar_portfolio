import { useEffect, useState } from "react";
import { EMAIL, HANDLE, PROFILE, SOCIALS } from "../data";
import { useScrollLock, useTheme } from "../hooks";
import { MailIcon, MenuIcon, MoonIcon, SunIcon, TikTokIcon, XIcon } from "./Icons";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "live", label: "Live" },
  { id: "vibes", label: "Vibes" },
  { id: "about", label: "Story" },
  { id: "squad", label: "Squad" },
  { id: "gallery", label: "Gallery" },
  { id: "fans", label: "Fans" },
  { id: "club", label: "Club" },
  { id: "collab", label: "Collab" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-edge shadow-[0_8px_40px_rgba(0,0,0,0.5)]" : "bg-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute top-0 left-0 h-[2.5px] grad-brand transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative grid h-10 w-10 place-items-center rounded-xl grad-brand shadow-[0_0_24px_rgba(143,91,255,0.45)] transition-transform duration-300 group-hover:rotate-6">
              <span className="grid h-[37px] w-[37px] place-items-center rounded-[10px] bg-ink font-display text-sm font-extrabold text-cream">
                M
              </span>
            </span>
            <span className="font-display text-[13px] font-bold tracking-[0.14em] text-cream leading-tight">
              MAHAR<span className="text-tik">.</span>
              <span className="block text-[10px] font-medium tracking-[0.3em] text-fog">ABUBAKAR</span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                    active === l.id ? "text-cream" : "text-fog hover:text-cream"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full grad-brand transition-all duration-300 ${
                      active === l.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-2 rounded-full border border-edge bg-panel/70 px-3.5 py-1.5 text-xs font-semibold text-fog xl:flex">
              <span className="h-2 w-2 rounded-full bg-tik animate-pulse-dot" />
              {PROFILE.followers} day-one fans
            </span>
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Light theme lagao" : "Dark theme lagao"}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
              className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-edge bg-panel/70 text-fog transition-all hover:-translate-y-0.5 hover:border-volt/60 hover:text-volt"
            >
              <SunIcon
                className={`absolute h-5 w-5 transition-all duration-500 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
              />
              <MoonIcon
                className={`absolute h-5 w-5 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"}`}
              />
            </button>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-tik px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_24px_rgba(254,44,85,0.4)] transition-all hover:shadow-[0_4px_36px_rgba(254,44,85,0.7)] hover:-translate-y-0.5"
            >
              <TikTokIcon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              Follow
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-edge bg-panel/70 text-cream lg:hidden"
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        <div
          className={`lg:hidden overflow-hidden border-b border-edge bg-ink/95 backdrop-blur-2xl transition-[max-height,opacity] duration-400 ${
            open ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 border-b-0"
          }`}
        >
          {/* Mobile Profile Card Header in Menu */}
          <div className="flex items-center gap-3.5 border-b border-edge/80 bg-panel/60 p-4 mx-4 mt-3 rounded-2xl">
            <img src="/images/abubakar-hero.jpg" alt="Mahar Abubakar" className="h-12 w-12 rounded-xl object-cover border border-white/20 shadow-md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold text-cream truncate">Mahar Abubakar</span>
                <span className="text-[10px] text-tik font-bold bg-tik/15 px-1.5 py-0.5 rounded-full">PRO</span>
              </div>
              <p className="font-mono text-xs text-fog/80 truncate">{HANDLE}</p>
            </div>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-tik px-3 py-1.5 text-xs font-bold text-white shadow"
            >
              Follow
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-2 px-4 py-3">
            {LINKS.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-3 font-display text-[13px] font-semibold tracking-wide transition-all ${
                    active === l.id
                      ? "bg-gradient-to-r from-tik/20 to-grape/20 border border-tik/40 text-cream shadow-sm"
                      : "bg-panel/40 border border-edge/50 text-fog hover:bg-panel hover:text-cream"
                  }`}
                >
                  <span className="truncate">{l.label}</span>
                  <span className="text-[10px] font-mono text-fog/50">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-edge/80 px-5 py-4 bg-coal/40">
            <span className="text-xs font-mono text-ice font-semibold">{HANDLE}</span>
            <div className="flex items-center gap-2">
              <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="grid h-9 w-9 place-items-center rounded-xl border border-edge bg-panel/80 text-fog hover:text-ice transition-colors"><TikTokIcon className="h-4 w-4" /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-xl border border-edge bg-panel/80 text-fog hover:text-mint transition-colors"><MailIcon className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}