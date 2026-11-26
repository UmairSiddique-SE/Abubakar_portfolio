import { HANDLE, PROFILE, SOCIALS, SQUAD, STATS, compact } from "../data";
import { useCountUp, useInView } from "../hooks";
import {
  ClapperIcon,
  FlameIcon,
  HeartIcon,
  PlayIcon,
  TikTokIcon,
  UsersIcon,
} from "./Icons";

const TICKER = [
  { text: "DESI COMEDY", color: "text-ice" },
  { text: "TRENDS", color: "text-tik" },
  { text: "VLOGS", color: "text-volt" },
  { text: "MAHAR SQUAD", color: "text-grape" },
  { text: "ROAD TO 1K", color: "text-mint" },
  { text: "FAMILY FRIENDLY", color: "text-ice" },
  { text: "PUNJAB TO THE WORLD", color: "text-tik" },
];

function StatItem({ stat, active, index }: { stat: (typeof STATS)[number]; active: boolean; index: number }) {
  const value = useCountUp(stat.value, active, 1700 + index * 200);
  const isGoal = "goal" in stat && stat.goal;
  const Icon =
    stat.icon === "users" ? UsersIcon : stat.icon === "heart" ? HeartIcon : stat.icon === "clapper" ? ClapperIcon : FlameIcon;
  return (
    <div
      data-reveal
      style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
      className="group relative px-4 py-7 text-center sm:px-6 sm:py-8"
    >
      <Icon className={`mx-auto mb-3 h-5 w-5 ${stat.accent} opacity-80 transition-transform group-hover:scale-125`} />
      <div className="font-display text-3xl font-extrabold tracking-tight text-cream md:text-4xl">
        {compact(value)}
        <span className={stat.accent}>{stat.suffix}</span>
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-fog">{stat.label}</div>
      {isGoal && (
        <div className="mx-auto mt-3 h-1.5 w-24 overflow-hidden rounded-full bg-edge/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-mint to-ice transition-[width] duration-[1600ms] ease-out"
            style={{ width: active ? `${Math.max(2.5, (PROFILE.followers / PROFILE.goal) * 100)}%` : "0%" }}
          />
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from "react";

export default function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const blobRef = useRef<HTMLDivElement | null>(null);

  /* scroll parallax on the atmosphere layer */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (blobRef.current && y < window.innerHeight * 1.3) {
          blobRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-[72px]">
      {/* layered atmosphere */}
      <div ref={blobRef} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-ice/14 blur-[130px] animate-blob" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-tik/16 blur-[140px] animate-blob-slow" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-grape/14 blur-[120px] animate-blob" />
        <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* ——— copy ——— */}
        <div className="relative z-10 text-center lg:text-left">
          <div data-reveal className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="flex items-center gap-2 rounded-full border border-tik/40 bg-tik/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-tik">
              <span className="h-2 w-2 rounded-full bg-tik animate-pulse-dot" /> Live on TikTok
            </span>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-edge bg-panel/70 px-4 py-1.5 font-mono text-xs text-fog transition-colors hover:border-ice/50 hover:text-ice"
            >
              {HANDLE}
            </a>
          </div>

          <p data-reveal style={{ "--d": "80ms" } as React.CSSProperties} className="font-urdu text-2xl leading-loose text-ice/90" dir="rtl">
            مہر ابوبکر
          </p>

          <h1
            data-reveal
            style={{ "--d": "140ms" } as React.CSSProperties}
            className="mt-2 font-display font-black leading-[0.98] tracking-tight"
          >
            <span className="chroma block text-[clamp(2.9rem,9vw,6.2rem)] text-cream">MAHAR</span>
            <span className="stroke-cream block text-[clamp(2.1rem,6.6vw,4.6rem)]">ABUBAKAR</span>
          </h1>

          <p
            data-reveal
            style={{ "--d": "220ms" } as React.CSSProperties}
            className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-fog lg:mx-0"
          >
            Punjab ki galiyon se aapki <span className="text-cream">For You page</span> tak — desi comedy, trends aur
            kahaniyan, <span className="grad-text font-bold">poore Mahar Squad</span> ke saath. Day-one bano, saath barho.
          </p>

          <div
            data-reveal
            style={{ "--d": "300ms" } as React.CSSProperties}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#live"
              className="group flex items-center gap-2.5 rounded-2xl grad-hot px-7 py-4 font-display text-sm font-bold text-white shadow-[0_8px_36px_rgba(254,44,85,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(254,44,85,0.65)]"
            >
              <PlayIcon className="h-4 w-4 transition-transform group-hover:scale-125" />
              Live Feed Dekho
            </a>
            <a
              href="#squad"
              className="flex items-center gap-2.5 rounded-2xl border border-ice/40 bg-ice/5 px-7 py-4 font-display text-sm font-bold text-ice transition-all hover:-translate-y-1 hover:bg-ice/15 hover:shadow-[0_8px_36px_rgba(37,244,238,0.25)]"
            >
              <UsersIcon className="h-4 w-4" />
              Meet the Squad
            </a>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok profile"
              className="grid h-[54px] w-[54px] place-items-center rounded-2xl border border-edge bg-panel text-cream transition-all hover:-translate-y-1 hover:border-ice/50 hover:text-ice"
            >
              <TikTokIcon />
            </a>
          </div>

          <div
            data-reveal
            style={{ "--d": "380ms" } as React.CSSProperties}
            className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
          >
            <div className="flex -space-x-3">
              <img src="/images/abubakar-hero.jpg" alt="Mahar Abubakar avatar" className="h-10 w-10 rounded-full border-2 border-ink object-cover" />
              {SQUAD.filter((m) => !m.leader).map((m) => (
                <span
                  key={m.slug}
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-gradient-to-br ${m.grad} font-display text-xs font-black text-[#07070f]/85`}
                >
                  {m.name.charAt(0)}
                </span>
              ))}
            </div>
            <p className="text-left text-sm text-fog">
              <span className="font-bold text-cream">{PROFILE.followers} day-one fans</span> — manzil 1K 🚀
              <span className="block text-xs text-fog/70">abhi join karo, kal kehna "main pehle se tha"</span>
            </p>
          </div>
        </div>

        {/* ——— TikTok profile phone (Pure clean portrait) ——— */}
        <div data-reveal style={{ "--d": "200ms" } as React.CSSProperties} className="relative z-10 mx-auto w-full max-w-[340px] sm:max-w-[380px]">
          <div className="relative animate-floaty">
            {/* Glow halo */}
            <div className="absolute -inset-4 sm:-inset-6 overflow-hidden rounded-[3rem] opacity-80 blur-xl">
              <div className="absolute inset-[-60%] animate-spin-slow bg-[conic-gradient(from_0deg,#25f4ee,#8f5bff,#fe2c55,#ffb62e,#25f4ee)]" />
            </div>

            {/* Premium Mobile Phone Frame */}
            <div className="relative rounded-[2.8rem] bg-gradient-to-b from-[#2a2a44] via-[#151525] to-[#0a0a14] p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(37,244,238,0.25)]">
              {/* Phone Outer Edge Ring */}
              <div className="relative overflow-hidden rounded-[2.6rem] bg-ink border border-white/10">
                {/* Dynamic Island / Speaker notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase font-bold">LIVE • 4K</span>
                  <div className="h-2 w-2 rounded-full bg-tik" />
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-12 left-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-tik/40 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
                  <span className="text-tik">👑</span>
                  <span>Mahar Abubakar</span>
                </div>

                {/* TikTok Badge Right */}
                <div className="absolute top-12 right-4 z-20 flex items-center gap-1 rounded-full bg-tik/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-extrabold text-white shadow-[0_0_15px_rgba(254,44,85,0.6)]">
                  <span>TikTok</span>
                </div>

                {/* Main Portrait Visual */}
                <div className="relative overflow-hidden aspect-[9/16] min-h-[500px] sm:min-h-[580px] bg-coal">
                  <img
                    src="/images/abubakar-hero.jpg"
                    alt="Mahar Abubakar"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle Gradient Overlays for readability and premium feel */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 via-ink/20 to-transparent" />

                  {/* Floating Action Bar (TikTok Style) on right */}
                  <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-3.5">
                    <div className="flex flex-col items-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                        <HeartIcon className="h-5 w-5 text-tik fill-tik" />
                      </div>
                      <span className="mt-1 text-[10px] font-bold text-white drop-shadow">99.8K</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                        <FlameIcon className="h-5 w-5 text-volt" />
                      </div>
                      <span className="mt-1 text-[10px] font-bold text-white drop-shadow">Viral</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                        <TikTokIcon className="h-5 w-5 text-ice" />
                      </div>
                      <span className="mt-1 text-[10px] font-bold text-white drop-shadow">Share</span>
                    </div>
                  </div>

                  {/* Bottom User Info on Phone */}
                  <div className="absolute inset-x-4 bottom-5 z-20 pr-14 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-extrabold text-white drop-shadow-md">@funnyvelog607</span>
                      <span className="rounded-full bg-ice/20 p-0.5 text-ice">
                        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-white/90 drop-shadow">
                      Mahar Abubakar 👑 TikTok Creator & Entertainer · Punjab, Pakistan
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-ice">
                      <span>🎵 Sound: Original Viral Beat - Mahar Abubakar</span>
                    </div>
                  </div>
                </div>

                {/* Bottom home indicator line */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 h-1 w-28 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ——— stats band ——— */}
      <div ref={ref} className="relative border-y border-edge bg-coal/80">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-edge/60 max-lg:[&>*:nth-child(3)]:border-l-0 max-lg:[&>*:nth-child(n+3)]:border-t max-lg:[&>*:nth-child(n+3)]:border-edge/60 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} active={inView} index={i} />
          ))}
        </div>
      </div>

      {/* ——— marquee ——— */}
      <div className="relative overflow-hidden border-b border-edge bg-ink py-1">
        <div className="-rotate-[0.6deg] scale-[1.02] border-y border-edge/70 bg-panel/50 py-3.5">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
                {TICKER.map((t) => (
                  <span key={`${dup}-${t.text}`} className="flex items-center font-display text-xs font-bold tracking-[0.3em] text-cream/80">
                    <span className="px-6">{t.text}</span>
                    <span className={`${t.color} text-sm`}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}