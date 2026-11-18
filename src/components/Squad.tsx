import { useEffect, useRef, useState } from "react";
import { SQUAD, type Member } from "../data";
import { useScrollLock } from "../hooks";
import { quest } from "./FanQuests";
import {
  ArrowUpRight, CameraIcon, CheckIcon, ChevronLeft, ChevronRight, ClapperIcon, CrownIcon,
  FlameIcon, LaughIcon, SparkIcon, TikTokIcon, UsersIcon, XIcon,
} from "./Icons";

/* Real photos auto-load from src/assets/squad/{slug}.jpg — no code change needed. */
const PHOTOS = import.meta.glob("../assets/squad/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function photoFor(slug: string): string | undefined {
  const key = Object.keys(PHOTOS).find((k) => k.includes(`/${slug}.`));
  return key ? PHOTOS[key] : undefined;
}

const ICONS = { crown: CrownIcon, laugh: LaughIcon, flame: FlameIcon, camera: CameraIcon, users: UsersIcon };

const ACCENT: Record<Member["accent"], { text: string; ring: string; chip: string; glow: string }> = {
  ice: { text: "text-ice", ring: "group-hover:border-ice/70", chip: "bg-ice/12 text-ice border-ice/30", glow: "group-hover:shadow-[0_18px_60px_rgba(37,244,238,0.2)]" },
  tik: { text: "text-tik", ring: "group-hover:border-tik/70", chip: "bg-tik/12 text-tik border-tik/30", glow: "group-hover:shadow-[0_18px_60px_rgba(254,44,85,0.22)]" },
  volt: { text: "text-volt", ring: "group-hover:border-volt/70", chip: "bg-volt/12 text-volt border-volt/30", glow: "group-hover:shadow-[0_18px_60px_rgba(255,182,46,0.2)]" },
  grape: { text: "text-grape", ring: "group-hover:border-grape/70", chip: "bg-grape/12 text-grape border-grape/30", glow: "group-hover:shadow-[0_18px_60px_rgba(143,91,255,0.25)]" },
  mint: { text: "text-mint", ring: "group-hover:border-mint/70", chip: "bg-mint/12 text-mint border-mint/30", glow: "group-hover:shadow-[0_18px_60px_rgba(61,220,151,0.2)]" },
};

function Avatar({ m, big = false }: { m: Member; big?: boolean }) {
  const src = photoFor(m.slug);
  const Icon = ICONS[m.icon];
  if (src) {
    return (
      <img
        src={src}
        alt={`${m.name} — ${m.role}`}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-106 ${big ? "aspect-square" : "aspect-[4/5]"}`}
      />
    );
  }
  return (
    <div className={`relative grid w-full place-items-center overflow-hidden bg-gradient-to-br ${m.grad} ${big ? "aspect-square" : "aspect-[4/5]"}`}>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(rgba(7,7,15,0.7) 1.2px, transparent 1.2px)", backgroundSize: "14px 14px" }}
      />
      <span className="relative font-display text-6xl font-black text-[#07070f]/85 drop-shadow-[0_2px_0_rgba(245,242,233,0.25)] transition-transform duration-500 group-hover:scale-110 sm:text-7xl">
        {m.name.charAt(0)}
      </span>
      <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-xl bg-ink/80 text-cream backdrop-blur-sm">
        <Icon className="h-4.5 w-4.5" />
      </span>
      {m.leader && (
        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-ink/80 text-volt backdrop-blur-sm">
          <CrownIcon className="h-4.5 w-4.5" />
        </span>
      )}
    </div>
  );
}

/* ——— member detail drawer ——— */
function MemberDrawer({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (d: 1 | -1) => void;
}) {
  const open = index !== null;
  const lastRef = useRef(0);
  if (index !== null) lastRef.current = index;
  const m = SQUAD[index ?? lastRef.current];
  const a = ACCENT[m.accent];
  const Icon = ICONS[m.icon];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onStep]);

  return (
    <div className={`fixed inset-0 z-[110] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        aria-label="Close profile"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        tabIndex={open ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${m.name} — profile`}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-edge bg-panel shadow-[-24px_0_80px_rgba(0,0,0,0.5)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center gap-2 border-b border-edge px-5 py-4">
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-xl border border-edge text-fog transition-all hover:rotate-90 hover:border-tik hover:text-tik">
            <XIcon className="h-4.5 w-4.5" />
          </button>
          <span className="ml-1 font-mono text-xs text-fog">{(index ?? lastRef.current) + 1} / {SQUAD.length}</span>
          <span className="ml-auto flex gap-2">
            <button onClick={() => onStep(-1)} aria-label="Previous member" className="grid h-10 w-10 place-items-center rounded-xl border border-edge text-fog transition-colors hover:border-ice hover:text-ice"><ChevronLeft className="h-4.5 w-4.5" /></button>
            <button onClick={() => onStep(1)} aria-label="Next member" className="grid h-10 w-10 place-items-center rounded-xl border border-edge text-fog transition-colors hover:border-ice hover:text-ice"><ChevronRight className="h-4.5 w-4.5" /></button>
          </span>
        </div>

        {/* body */}
        <div key={m.slug} className="faq-body flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="group relative overflow-hidden rounded-2xl border border-edge">
            <Avatar m={m} big />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink/60 border border-edge px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-fog">{m.name.split(" ")[0]}</span>
            {m.leader && (
              <span className="flex items-center gap-1 rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-volt">
                <CrownIcon className="h-3 w-3" /> Captain
              </span>
            )}
            <span className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${a.chip}`}>
              <ClapperIcon className="h-3 w-3" /> {m.day} drop
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl font-black text-cream">{m.name}</h3>
          <p className={`mt-1 flex items-center gap-1.5 text-sm font-bold ${a.text}`}><Icon className="h-4 w-4" /> {m.role}</p>
          <p className="mt-3 border-l-2 border-edge pl-3 text-[14px] italic leading-relaxed text-fog">“{m.quote}”</p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-cream/90">{m.bio}</p>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-fog">Auzaar-e-khaas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {m.tools.map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-lg border border-edge bg-ink/50 px-3 py-1.5 text-[12px] font-semibold text-cream/85">
                <CheckIcon className={`h-3 w-3 ${a.text}`} /> {t}
              </span>
            ))}
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-fog">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {m.skills.map((s) => (
              <span key={s} className="rounded-md bg-edge/50 px-2.5 py-1 text-[11px] font-semibold text-cream/80">{s}</span>
            ))}
          </div>

          {m.handle ? (
            <a
              href="https://www.tiktok.com/@funnyvelog607"
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-tik py-3.5 font-display text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(254,44,85,0.5)]"
            >
              <TikTokIcon className="h-4 w-4" /> {m.handle} pe dekho
            </a>
          ) : (
            <a
              href="#collab"
              onClick={onClose}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl grad-brand py-3.5 font-display text-[13px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(143,91,255,0.5)]"
            >
              {m.name.split(" ")[1]} ke saath kaam karo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {/* dots */}
          <div className="mt-5 flex justify-center gap-2 pb-2">
            {SQUAD.map((s, i) => (
              <span key={s.slug} className={`h-1.5 rounded-full transition-all ${i === (index ?? lastRef.current) ? "w-6 grad-brand" : "w-1.5 bg-edge"}`} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function Squad() {
  const leader = SQUAD.find((m) => m.leader)!;
  const members = SQUAD.filter((m) => !m.leader);
  const LeaderIcon = ICONS[leader.icon];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const openMember = (m: Member) => {
    setOpenIdx(SQUAD.indexOf(m));
    quest("squad");
  };
  const step = (d: 1 | -1) => setOpenIdx((i) => (i === null ? i : (i + d + SQUAD.length) % SQUAD.length));

  return (
    <section id="squad" className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-volt/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-grape/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-volt">
            <UsersIcon className="h-4 w-4" /> The Crew
          </p>
          <h2 data-reveal className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
            <span className="chroma text-cream">MAHAR</span> <span className="stroke-cream">SQUAD</span>
          </h2>
          <p data-reveal className="mt-4 text-lg text-fog">
            Akela banda video banata hai — <span className="font-bold text-cream">squad trend banata hai.</span>
          </p>
          <div data-reveal className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-mint">
            <span className="h-2 w-2 rounded-full bg-mint animate-pulse-dot" />
            Mahar + Raja · 5 Bhai · Aik Squad
          </div>
          <p data-reveal className="mt-3 text-sm text-fog/80">
            Do khandan, aik mission — <span className="font-bold text-ice">Raja</span> brothers aur{" "}
            <span className="font-bold text-tik">Mahar</span> brothers, aik hi frame mein.
          </p>
        </div>

        {/* ——— captain card ——— */}
        <div data-reveal className="mt-14">
          <div className="group relative overflow-hidden rounded-3xl p-[2px] grad-brand">
            <div className="relative grid gap-0 overflow-hidden rounded-[calc(1.5rem-2px)] bg-panel sm:grid-cols-[240px_1fr]">
              <button onClick={() => openMember(leader)} aria-label="Captain ki full profile kholo" className="relative cursor-pointer overflow-hidden text-left">
                <Avatar m={leader} big />
              </button>
              <div className="relative flex flex-col justify-center p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-tik/15 blur-[70px]" />
                <span className="flex w-fit items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-volt">
                  <LeaderIcon className="h-3.5 w-3.5" /> Captain of the Squad
                </span>
                <h3 className="mt-3 font-display text-2xl font-black text-cream sm:text-3xl">{leader.name}</h3>
                <p className="mt-1 text-sm font-bold text-tik">{leader.role}</p>
                <p className="mt-3 max-w-lg text-[15px] italic leading-relaxed text-fog">“{leader.quote}”</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {leader.skills.map((s) => (
                    <span key={s} className="rounded-md bg-edge/50 px-2.5 py-1 text-[11px] font-semibold text-cream/85">{s}</span>
                  ))}
                  <span className="ml-auto flex flex-wrap gap-2">
                    <button
                      onClick={() => openMember(leader)}
                      className="flex items-center gap-1.5 rounded-lg grad-brand px-3 py-1.5 text-[11.5px] font-bold text-ink transition-all hover:-translate-y-0.5"
                    >
                      <SparkIcon className="h-3.5 w-3.5" /> Full profile
                    </button>
                    <a
                      href="https://www.tiktok.com/@funnyvelog607"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-edge bg-ink/60 px-3 py-1.5 font-mono text-[11.5px] font-bold text-ice transition-colors hover:border-ice/60"
                    >
                      <TikTokIcon className="h-3.5 w-3.5" /> {leader.handle}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ——— the four ——— */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {members.map((m, i) => {
            const a = ACCENT[m.accent];
            const Icon = ICONS[m.icon];
            return (
              <article
                key={m.slug}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={`${m.name} ki profile kholo`}
                onClick={() => openMember(m)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openMember(m);
                  }
                }}
                className={`group relative cursor-pointer rounded-3xl border border-edge bg-panel/70 p-4 transition-all duration-300 hover:-translate-y-2 focus-visible:border-ice ${a.ring} ${a.glow}`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <Avatar m={m} />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] font-bold text-cream backdrop-blur-sm">
                    0{i + 1}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-cream/85 backdrop-blur-sm">
                    {m.name.split(" ")[0]}
                  </span>
                  <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-1.5 rounded-xl bg-ink/80 py-2 text-[11px] font-bold text-ice opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Profile dekho <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="px-1.5 pb-2 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-extrabold text-cream">{m.name}</h3>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-edge ${a.text}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <span className={`mt-2 inline-block rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider ${a.chip}`}>
                    {m.role}
                  </span>
                  <p className="mt-3 min-h-[40px] text-[13.5px] italic leading-snug text-fog">“{m.quote}”</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.skills.map((s) => (
                      <span key={s} className="rounded-md bg-edge/50 px-2 py-1 text-[10.5px] font-semibold text-cream/80">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p data-reveal className="mt-5 text-center text-[12px] font-semibold text-fog/70">
          👆 Kisi bhi member pe click karo — poori profile khulti hai (← → se agla member)
        </p>

        {/* ——— work with the squad ——— */}
        <div
          data-reveal
          className="relative mt-12 overflow-hidden rounded-3xl border border-edge bg-gradient-to-r from-panel via-coal to-panel p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-tik/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-ice/12 blur-[80px]" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl font-extrabold text-cream">Squad ke saath kaam karna hai? 🎬</h3>
              <p className="mt-2 text-fog">
                Brand deal, shoot ya collab — <span className="font-bold text-cream">Mahar Ilyas</span> aur poori team aik
                message door hai. Day-one pe judo, saath barho.
              </p>
            </div>
            <a
              href="#collab"
              className="group flex items-center gap-2.5 rounded-2xl grad-brand px-7 py-4 font-display text-sm font-bold text-ink transition-all hover:-translate-y-1 hover:shadow-[0_12px_44px_rgba(143,91,255,0.5)]"
            >
              Baat shuru karo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <MemberDrawer index={openIdx} onClose={() => setOpenIdx(null)} onStep={step} />
    </section>
  );
}