import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE } from "../data";
import { loadJSON, saveJSON, toast } from "../hooks";
import { ArrowUpRight, CheckIcon, CrownIcon, HeartIcon, SendIcon, SparkIcon, SunIcon, TikTokIcon, UsersIcon, XIcon } from "./Icons";

type QState = {
  vibes: number;
  card: boolean;
  comment: boolean;
  squad: boolean;
  follow: boolean;
  themes: string[];
};

const DEF: QState = { vibes: 0, card: false, comment: false, squad: false, follow: false, themes: [] };
const LEVELS = ["Naya Dost", "Naya Dost", "Pakka Fan", "Pakka Fan", "Day-One OG", "Day-One OG", "Squad Family 👑"];
const R = 11;
const C = 2 * Math.PI * R;

export function quest(key: string) {
  window.dispatchEvent(new CustomEvent("ma-quest", { detail: key }));
}

export default function FanQuests() {
  const [state, setState] = useState<QState>(() => ({ ...DEF, ...loadJSON<Partial<QState>>("ma-quests", {}) }));
  const [open, setOpen] = useState(false);
  const [ping, setPing] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const prevDone = useRef(-1);

  /* listen for quest events + follow-link clicks + record current theme */
  useEffect(() => {
    const apply = (key: string) => {
      setState((s) => {
        if (key === "vibe") return { ...s, vibes: s.vibes + 1 };
        if (key === "card") return s.card ? s : { ...s, card: true };
        if (key === "comment") return s.comment ? s : { ...s, comment: true };
        if (key === "squad") return s.squad ? s : { ...s, squad: true };
        if (key === "follow") return s.follow ? s : { ...s, follow: true };
        if (key.startsWith("theme-")) {
          const t = key.slice(6);
          return s.themes.includes(t) ? s : { ...s, themes: [...s.themes, t] };
        }
        return s;
      });
    };
    const onQuest = (e: Event) => apply((e as CustomEvent<string>).detail);
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(`a[href*="tiktok.com/@funnyvelog607"]`)) apply("follow");
    };
    window.addEventListener("ma-quest", onQuest);
    document.addEventListener("click", onClick);
    apply(document.documentElement.classList.contains("light") ? "theme-light" : "theme-dark");
    return () => {
      window.removeEventListener("ma-quest", onQuest);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => saveJSON("ma-quests", state), [state]);

  /* close on outside click / Esc */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const quests = useMemo(
    () => [
      { id: "vibe", icon: HeartIcon, label: "Phone pe 5 vibes do", done: state.vibes >= 5, prog: Math.min(state.vibes, 5), target: 5, href: "#home", cta: "Hero" },
      { id: "squad", icon: UsersIcon, label: "Squad member ki profile kholo", done: state.squad, href: "#squad", cta: "Squad" },
      { id: "card", icon: SparkIcon, label: "Apna member card banao", done: state.card, href: "#club", cta: "Club" },
      { id: "comment", icon: SendIcon, label: "Fan wall pe message chhoro", done: state.comment, href: "#fans", cta: "Fans" },
      { id: "theme", icon: SunIcon, label: "Light aur dark dono try karo", done: state.themes.length >= 2, prog: state.themes.length, target: 2 },
      { id: "follow", icon: TikTokIcon, label: "Follow button dabao", done: state.follow, href: PROFILE.url, cta: "TikTok", ext: true },
    ],
    [state]
  );

  const done = quests.filter((q) => q.done).length;
  const level = LEVELS[Math.min(done, LEVELS.length - 1)];
  const frac = done / quests.length;

  /* level-up feedback */
  useEffect(() => {
    if (prevDone.current === -1) {
      prevDone.current = done;
      return;
    }
    if (done > prevDone.current) {
      setPing((p) => p + 1);
      toast(done === quests.length ? "Squad Family ban gaye! 👑 Poore 6/6!" : `Level up — ${LEVELS[done]}! ${done}/6 quests ✨`);
    }
    prevDone.current = done;
  }, [done, quests.length]);

  return (
    <div ref={boxRef} className="fixed bottom-6 left-4 z-[90] sm:left-6">
      {/* panel */}
      <div
        className={`absolute bottom-16 left-0 w-[calc(100vw-2rem)] max-w-[330px] origin-bottom-left rounded-3xl border border-edge bg-panel/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="Fan quests"
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-volt">
              <CrownIcon className="h-3.5 w-3.5" /> Fan Level
            </p>
            <p className="mt-1 font-display text-lg font-black text-cream">{level}</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close quests" className="grid h-8 w-8 place-items-center rounded-lg border border-edge text-fog transition-colors hover:text-cream">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/70">
            <div className="h-full rounded-full grad-brand transition-[width] duration-700" style={{ width: `${frac * 100}%` }} />
          </div>
          <span className="font-mono text-[11px] font-bold text-fog">{done}/6</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {quests.map((q) => (
            <li key={q.id}>
              <div className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${q.done ? "border-mint/30 bg-mint/8" : "border-edge bg-ink/40"}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${q.done ? "bg-mint/15 text-mint" : "bg-edge/50 text-fog"}`}>
                  {q.done ? <CheckIcon className="h-4 w-4" /> : <q.icon className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-[12.5px] font-bold ${q.done ? "text-mint" : "text-cream"}`}>{q.label}</p>
                  {q.target && !q.done && (
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-edge/60">
                        <div className="h-full rounded-full grad-brand transition-[width] duration-500" style={{ width: `${((q.prog ?? 0) / q.target) * 100}%` }} />
                      </div>
                      <span className="font-mono text-[9.5px] font-bold text-fog">{q.prog ?? 0}/{q.target}</span>
                    </div>
                  )}
                </div>
                {!q.done && q.href && (
                  <a
                    href={q.href}
                    {...(q.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    className="flex shrink-0 items-center gap-0.5 rounded-lg border border-edge px-2 py-1 text-[10px] font-bold text-ice transition-colors hover:border-ice/50"
                  >
                    {q.cta} <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[10px] text-fog/60">Progress aapke browser mein save hai — roz aao, level barhao.</p>
      </div>

      {/* pill */}
      <button
        key={ping}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Fan level: ${level}, ${done} of 6 quests`}
        className={`glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-0.5 ${ping ? "animate-pop" : ""}`}
      >
        <span className="relative grid h-9 w-9 place-items-center">
          <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90">
            <defs>
              <linearGradient id="questGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-ice)" />
                <stop offset="50%" stopColor="var(--color-grape)" />
                <stop offset="100%" stopColor="var(--color-tik)" />
              </linearGradient>
            </defs>
            <circle cx="14" cy="14" r={R} fill="none" stroke="var(--color-edge)" strokeWidth="3" />
            <circle
              cx="14" cy="14" r={R} fill="none" stroke="url(#questGrad)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${frac * C} ${C}`} className="transition-all duration-700"
            />
          </svg>
          <CrownIcon className={`h-4 w-4 ${done === 6 ? "text-volt" : "text-fog"}`} />
        </span>
        <span className="text-left">
          <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-fog">Fan Level</span>
          <span className="block font-display text-[11.5px] font-extrabold text-cream">{level}</span>
        </span>
      </button>
    </div>
  );
}