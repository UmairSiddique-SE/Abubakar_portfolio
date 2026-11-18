import { CATEGORIES, HANDLE, SOCIALS } from "../data";
import { ArrowUpRight, ClapperIcon, FlameIcon, LaughIcon, PlayIcon, TikTokIcon, UsersIcon } from "./Icons";

const ICONS = { laugh: LaughIcon, flame: FlameIcon, clapper: ClapperIcon, users: UsersIcon };

const ACCENT = {
  volt: { text: "text-volt", tile: "from-[#ffb62e]/25 to-[#fe2c55]/10 text-volt", ring: "hover:border-volt/60", glow: "hover:shadow-[0_18px_60px_rgba(255,182,46,0.18)]", chip: "border-volt/30 text-volt" },
  tik: { text: "text-tik", tile: "from-[#fe2c55]/25 to-[#8f5bff]/10 text-tik", ring: "hover:border-tik/60", glow: "hover:shadow-[0_18px_60px_rgba(254,44,85,0.2)]", chip: "border-tik/30 text-tik" },
  ice: { text: "text-ice", tile: "from-[#25f4ee]/25 to-[#8f5bff]/10 text-ice", ring: "hover:border-ice/60", glow: "hover:shadow-[0_18px_60px_rgba(37,244,238,0.18)]", chip: "border-ice/30 text-ice" },
  grape: { text: "text-grape", tile: "from-[#8f5bff]/25 to-[#25f4ee]/10 text-grape", ring: "hover:border-grape/60", glow: "hover:shadow-[0_18px_60px_rgba(143,91,255,0.22)]", chip: "border-grape/30 text-grape" },
};

export default function Vibes() {
  return (
    <section id="vibes" className="relative overflow-hidden border-t border-edge bg-coal/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-volt/8 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-grape/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-tik">
              <FlameIcon className="h-4 w-4" /> Content
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
              Feed ka <span className="grad-text">Mood</span>
            </h2>
            <p className="mt-3 max-w-md text-fog">
              Char rang, aik channel — har category ki videos seedhi live feed mein chalti hain.
            </p>
          </div>
          <a
            data-reveal
            href="#live"
            className="group flex items-center gap-2 rounded-xl border border-tik/50 bg-tik/10 px-5 py-3 text-sm font-bold text-tik transition-all hover:bg-tik hover:text-white"
          >
            <PlayIcon className="h-4 w-4" />
            Videos chalao — Live Feed
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const a = ACCENT[c.accent];
            const Icon = ICONS[c.icon];
            return (
              <a
                key={c.title}
                href="#live"
                data-reveal
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                className={`group relative flex flex-col rounded-3xl border border-edge bg-panel/70 p-6 transition-all duration-300 hover:-translate-y-2 ${a.ring} ${a.glow}`}
              >
                <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${a.tile} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-cream">{c.title}</h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-fog">{c.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className={`rounded-md border bg-ink/50 px-2 py-1 font-mono text-[10.5px] font-semibold ${a.chip}`}>{t}</span>
                  ))}
                </div>
                <span className={`mt-5 flex items-center gap-1.5 text-[12.5px] font-bold ${a.text}`}>
                  Live feed mein dekho
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>

        {/* weekly drop schedule — live, day-aware */}
        {(() => {
          const days = [
            { d: 1, label: "Peer", type: "Comedy", color: "text-volt", ring: "border-volt/60", dot: "bg-volt" },
            { d: 3, label: "Budh", type: "Trend", color: "text-tik", ring: "border-tik/60", dot: "bg-tik" },
            { d: 5, label: "Jummah", type: "Vlog", color: "text-ice", ring: "border-ice/60", dot: "bg-ice" },
            { d: 0, label: "Itwar", type: "Squad", color: "text-grape", ring: "border-grape/60", dot: "bg-grape" },
          ];
          const today = new Date().getDay();
          const isToday = days.some((x) => x.d === today);
          const next = isToday
            ? days.find((x) => x.d === today)!
            : [...days].map((x) => ({ ...x, wait: (x.d - today + 7) % 7 })).sort((a, b) => a.wait - b.wait)[0];
          return (
            <div data-reveal className="mt-10 rounded-3xl border border-edge bg-panel/50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-cream">Hafte ka schedule</p>
                <span className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold ${next.ring} ${next.color} bg-ink/50`}>
                  <span className={`h-2 w-2 rounded-full ${next.dot} animate-pulse-dot`} />
                  {isToday ? `Aaj ${next.type} drop — feed check karo 🔥` : `Agla drop: ${next.label} · ${next.type}`}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {days.map((d) => {
                  const active = d.d === today;
                  const isNext = !isToday && d.d === next.d;
                  return (
                    <a
                      key={d.label}
                      href="#live"
                      className={`group rounded-2xl border p-4 text-center transition-all hover:-translate-y-1 ${
                        active ? `${d.ring} bg-ink/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)]` : isNext ? `${d.ring} bg-ink/40` : "border-edge bg-ink/30 hover:border-fog/40"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-fog">{d.label}</p>
                      <p className={`mt-1 font-display text-sm font-extrabold ${d.color}`}>{d.type}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-fog/60">
                        {active ? "● AAJ" : isNext ? "NEXT ↑" : "9:00 PM"}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })()}

        <div data-reveal className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-edge bg-panel/50 px-6 py-4 text-center">
          <TikTokIcon className="h-4 w-4 text-ice" />
          <p className="text-sm text-fog">
            Yeh sirf jhalak hai — <span className="font-bold text-cream">poori videos</span>{" "}
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="font-mono font-bold text-tik hover:underline">{HANDLE}</a>{" "}
            pe roz upload hoti hain.
          </p>
        </div>
      </div>
    </section>
  );
}