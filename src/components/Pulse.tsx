import { useMemo, useState } from "react";
import { HANDLE, PROFILE, PULSE } from "../data";
import { useInView } from "../hooks";
import { FlameIcon, HeartIcon, SparkIcon, ClapperIcon } from "./Icons";

type Mode = "videos" | "likes";
const R = 80;
const C = 2 * Math.PI * R;

export default function Pulse() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [mode, setMode] = useState<Mode>("videos");
  const [hover, setHover] = useState<number | null>(null);

  const total = mode === "videos" ? PROFILE.videos : PROFILE.likes;
  const segs = useMemo(() => {
    let cum = 0;
    return PULSE.categories.map((c) => {
      const val = mode === "videos" ? c.videos : c.likes;
      const frac = val / total;
      const seg = { ...c, val, frac, start: cum };
      cum += frac;
      return seg;
    });
  }, [mode, total]);

  const active = hover !== null ? segs[hover] : null;
  const maxWeek = Math.max(...PULSE.weeks);
  const avg = Math.round(PROFILE.likes / PROFILE.videos);
  const streak = [...PULSE.weeks].reverse().findIndex((w) => w === 0);
  const streakWeeks = streak === -1 ? PULSE.weeks.length : streak;

  return (
    <section id="pulse" className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-ice/8 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-volt/8 blur-[130px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-mint">
              <SparkIcon className="h-4 w-4" /> Hisaab Kitaab
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
              Channel <span className="grad-text">Pulse</span>
            </h2>
            <p className="mt-3 max-w-md text-fog">
              Chhota channel, saaf hisaab — kya banta hai, kya chalta hai, sab saamne.
            </p>
          </div>
          <span data-reveal className="flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-4 py-2 font-mono text-xs text-fog">
            <span className="h-2 w-2 rounded-full bg-mint animate-pulse-dot" /> totals: {HANDLE}
          </span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* ——— donut: category split ——— */}
          <div data-reveal className="rounded-3xl border border-edge bg-panel/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-cream">Category split</h3>
              <div className="flex rounded-full border border-edge bg-ink/50 p-1">
                {(["videos", "likes"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                      mode === m ? "grad-brand text-ink shadow-[0_2px_14px_rgba(143,91,255,0.4)]" : "text-fog hover:text-cream"
                    }`}
                  >
                    {m === "videos" ? "Videos" : "Likes"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
              <div className="relative h-[220px] w-[220px] shrink-0">
                <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                  <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-edge)" strokeOpacity="0.5" strokeWidth="24" />
                  {segs.map((s, i) => {
                    const len = Math.max(0, s.frac * C - 3);
                    return (
                      <circle
                        key={s.key}
                        cx="100"
                        cy="100"
                        r={R}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={hover === i ? 30 : 24}
                        strokeDasharray={inView ? `${len} ${C - len}` : `0 ${C}`}
                        strokeDashoffset={-s.start * C}
                        className="cursor-pointer transition-all duration-700 ease-out"
                        style={{ transitionDelay: inView ? `${i * 90}ms` : "0ms" }}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(null)}
                        opacity={hover === null || hover === i ? 1 : 0.35}
                      />
                    );
                  })}
                </svg>
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className={`font-display text-4xl font-black ${active ? active.text : "text-cream"}`}>
                      {active ? active.val : total}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fog">
                      {active ? `${active.key} · ${Math.round(active.frac * 100)}%` : mode === "videos" ? "Total videos" : "Total likes"}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="w-full flex-1 space-y-2.5">
                {segs.map((s, i) => (
                  <li key={s.key}>
                    <button
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      onClick={() => setHover(hover === i ? null : i)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all ${
                        hover === i ? "border-fog/40 bg-ink/50" : "border-transparent hover:border-edge"
                      }`}
                    >
                      <span className={`h-3 w-3 shrink-0 rounded-sm ${s.bg}`} style={{ borderRadius: i % 2 ? "9999px" : "3px" }} />
                      <span className="text-sm font-bold text-cream">{s.key}</span>
                      <span className="ml-auto font-mono text-sm font-bold text-fog">{s.val}</span>
                      <span className={`w-11 text-right font-mono text-[11px] font-bold ${s.text}`}>{Math.round(s.frac * 100)}%</span>
                    </button>
                  </li>
                ))}
                <li className="px-4 pt-1 text-[10.5px] text-fog/60">Split team estimate hai — totals live profile se.</li>
              </ul>
            </div>
          </div>

          {/* ——— weekly uploads + derived stats ——— */}
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="flex flex-col gap-6">
            <div className="flex-1 rounded-3xl border border-edge bg-panel/70 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-cream">Uploads · pichle 8 hafte</h3>
                <span className="flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-[10.5px] font-bold text-mint">
                  <FlameIcon className="h-3 w-3" /> {streakWeeks} hafte ki streak
                </span>
              </div>
              <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
                {PULSE.weeks.map((w, i) => (
                  <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className={`font-mono text-[11px] font-bold transition-opacity ${w ? "text-cream opacity-0 group-hover:opacity-100" : "opacity-0"}`}>
                      {w}
                    </span>
                    <div
                      className="w-full max-w-[38px] rounded-t-lg grad-brand transition-all duration-700 ease-out group-hover:brightness-125"
                      style={{
                        height: inView ? `${Math.max(4, (w / maxWeek) * 100)}%` : "4%",
                        transitionDelay: `${i * 70}ms`,
                        opacity: w === 0 ? 0.25 : 1,
                      }}
                    />
                    <span className={`text-[9.5px] font-bold uppercase tracking-wider ${i === PULSE.weeks.length - 1 ? "text-ice" : "text-fog/70"}`}>
                      {i === PULSE.weeks.length - 1 ? "Abhi" : `H${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: HeartIcon, n: String(avg), l: "Avg likes / video", c: "text-tik" },
                { icon: FlameIcon, n: "Comedy", l: "Top category", c: "text-volt" },
                { icon: ClapperIcon, n: "4 / hafta", l: "Upload pace", c: "text-ice" },
              ].map((s) => (
                <div key={s.l} className="group rounded-2xl border border-edge bg-panel/70 p-4 text-center transition-all hover:-translate-y-1 hover:border-fog/40">
                  <s.icon className={`mx-auto h-4 w-4 ${s.c} transition-transform group-hover:scale-125`} />
                  <p className="mt-2 font-display text-base font-extrabold text-cream sm:text-lg">{s.n}</p>
                  <p className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-fog">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}