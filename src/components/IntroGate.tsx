import { useEffect, useRef, useState } from "react";
import { HANDLE } from "../data";
import { CrownIcon } from "./Icons";

const STATUS = ["Squad ko bula rahe hain…", "Vibes check ho rahi hain…", "Feed set ho rahi hai…"];
const CREW = [
  { l: "R", g: "from-[#25f4ee] to-[#8f5bff]" },
  { l: "M", g: "from-[#3ddc97] to-[#25f4ee]" },
  { l: "M", g: "from-[#ffb62e] to-[#fe2c55]" },
  { l: "R", g: "from-[#8f5bff] to-[#25f4ee]" },
];

export default function IntroGate({ onExitStart, onFinished }: { onExitStart: () => void; onFinished: () => void }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitedRef = useRef(false);
  const timers = useRef<number[]>([]);

  const startExit = () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setPct(100);
    setExiting(true);
    onExitStart();
    timers.current.push(window.setTimeout(onFinished, 1000));
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startExit();
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const t = now - t0;
      const p = Math.max(0, Math.min(100, Math.round(((t - 1450) / 1150) * 100)));
      setPct((prev) => (prev === p ? prev : p));
      if (t > 2750) {
        startExit();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    timers.current.push(window.setTimeout(startExit, 6000)); // safety net
    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = STATUS[pct < 40 ? 0 : pct < 78 ? 1 : 2];

  return (
    <div className={`fixed inset-0 z-[200] overflow-hidden ${exiting ? "pointer-events-none" : ""}`} aria-hidden={exiting}>
      {/* split panels */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-ink transition-transform duration-[800ms] delay-200 ease-[cubic-bezier(0.83,0,0.17,1)] ${exiting ? "-translate-y-full" : ""}`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[2px] grad-brand opacity-80" />
        <p className="absolute left-6 top-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-fog/70 sm:left-10 sm:top-8">
          TikTok Star · est. 2026
        </p>
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-ink transition-transform duration-[800ms] delay-200 ease-[cubic-bezier(0.83,0,0.17,1)] ${exiting ? "translate-y-full" : ""}`}
      >
        <div className="absolute inset-x-0 top-0 h-[2px] grad-brand opacity-80" />
      </div>

      {/* centre stage */}
      <div
        className={`absolute inset-0 grid place-items-center transition-all duration-300 ${exiting ? "scale-95 opacity-0" : "opacity-100"}`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-ice/14 blur-[130px] animate-blob" />
          <div className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-tik/16 blur-[140px] animate-blob-slow" />
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grape/12 blur-[110px]" />
          <div className="absolute inset-0 dot-grid opacity-50" />
        </div>

        <div className="relative flex flex-col items-center px-6 text-center">
          {/* monogram */}
          <div className="intro-pop relative h-24 w-24">
            <div className="absolute -inset-2 overflow-hidden rounded-3xl opacity-80">
              <div className="absolute inset-[-60%] animate-spin-slow bg-[conic-gradient(from_0deg,#25f4ee,#8f5bff,#fe2c55,#ffb62e,#25f4ee)]" />
            </div>
            <div className="relative grid h-full w-full place-items-center rounded-2xl bg-ink font-display text-5xl font-black">
              <span className="intro-m absolute text-ice" style={{ "--gx": "-12px", "--gy": "4px" } as React.CSSProperties}>M</span>
              <span className="intro-m absolute text-tik" style={{ "--gx": "12px", "--gy": "-4px" } as React.CSSProperties}>M</span>
              <span className="relative text-cream">M</span>
            </div>
          </div>

          {/* name */}
          <div className="mt-7 overflow-hidden">
            <div className="chroma font-display text-4xl font-black tracking-tight text-cream sm:text-6xl" aria-label="MAHAR">
              {"MAHAR".split("").map((c, i) => (
                <span key={i} className="intro-letter" style={{ animationDelay: `${600 + i * 45}ms` }}>{c}</span>
              ))}
            </div>
          </div>
          <div className="mt-1 overflow-hidden">
            <div className="stroke-cream font-display text-2xl font-black tracking-tight sm:text-4xl" aria-label="ABUBAKAR">
              {"ABUBAKAR".split("").map((c, i) => (
                <span key={i} className="intro-letter" style={{ animationDelay: `${880 + i * 38}ms` }}>{c}</span>
              ))}
            </div>
          </div>

          <p className="intro-fade font-urdu mt-4 text-xl leading-loose text-ice/90" style={{ animationDelay: "1350ms" }} dir="rtl">
            مہر ابوبکر
          </p>

          <div className="intro-fade mt-3 flex items-center gap-3" style={{ animationDelay: "1550ms" }}>
            <span className="rounded-full border border-edge bg-panel/70 px-4 py-1.5 font-mono text-[11px] text-fog">{HANDLE}</span>
            <span className="flex -space-x-2">
              {CREW.map((c, i) => (
                <span key={i} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-gradient-to-br ${c.g} font-display text-[10px] font-black text-[#07070f]/85`}>
                  {c.l}
                </span>
              ))}
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-gradient-to-br from-[#fe2c55] to-[#8f5bff] text-[#07070f]">
                <CrownIcon className="h-3 w-3" />
              </span>
            </span>
          </div>
        </div>

        {/* loader row */}
        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-4 sm:inset-x-10">
          <div className="min-w-0 max-w-[58%]">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-fog sm:text-[11px] sm:tracking-[0.25em]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-tik animate-pulse-dot" /> <span className="truncate">{status}</span>
            </p>
            <p className="mt-1.5 font-mono text-[10px] text-fog/60">Punjab → For You Page</p>
          </div>
          <p className="grad-text shrink-0 font-display text-4xl font-black tabular-nums sm:text-6xl">{pct}%</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-edge/40">
          <div className="h-full grad-brand transition-[width] duration-150 ease-linear" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* skip */}
      {!exiting && (
        <button
          onClick={startExit}
          className="absolute right-6 top-6 z-10 rounded-full border border-edge bg-panel/70 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-fog backdrop-blur-sm transition-colors hover:border-ice/60 hover:text-ice sm:right-10 sm:top-8"
        >
          Skip ↦
        </button>
      )}
    </div>
  );
}