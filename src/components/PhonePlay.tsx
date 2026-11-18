import { useEffect, useRef, useState } from "react";
import { loadJSON, saveJSON } from "../hooks";
import { HeartIcon } from "./Icons";

type Burst = { id: number; x: number; y: number };

const HEARTS = [
  { dx: -70, dy: -110, r: -24, c: "text-tik", s: 26 },
  { dx: 60, dy: -130, r: 18, c: "text-ice", s: 20 },
  { dx: -30, dy: -150, r: -8, c: "text-volt", s: 22 },
  { dx: 90, dy: -80, r: 30, c: "text-grape", s: 18 },
  { dx: -95, dy: -60, r: -32, c: "text-tik", s: 16 },
  { dx: 20, dy: -100, r: 10, c: "text-cream", s: 30 },
  { dx: -55, dy: -90, r: 22, c: "text-ice", s: 14 },
];

/** TikTok-style double-tap heart bursts + pointer tilt around the hero phone. */
export default function PhonePlay({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const lastTap = useRef(0);
  const timers = useRef<number[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [vibes, setVibes] = useState<number>(() => loadJSON<number>("ma-vibes", 0));

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    const now = Date.now();
    if (now - lastTap.current < 320) {
      lastTap.current = 0;
      const rect = wrapRef.current!.getBoundingClientRect();
      const id = now + Math.random();
      setBursts((b) => [...b.slice(-4), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setVibes((v) => {
        const next = v + 1;
        saveJSON("ma-vibes", next);
        return next;
      });
      window.dispatchEvent(new CustomEvent("ma-quest", { detail: "vibe" }));
      timers.current.push(window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 950));
    } else {
      lastTap.current = now;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tiltRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.style.transform = `perspective(1100px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
    >
      <div ref={tiltRef} className="transition-transform duration-200 ease-out will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* heart bursts */}
      {bursts.map((b) => (
        <span key={b.id} className="pointer-events-none absolute z-30" style={{ left: b.x, top: b.y }}>
          {HEARTS.map((h, i) => (
            <span
              key={i}
              className={`burst-heart ${h.c}`}
              style={{ "--dx": `${h.dx}px`, "--dy": `${h.dy}px`, "--r": `${h.r}deg`, width: h.s, height: h.s, animationDelay: `${i * 22}ms` } as React.CSSProperties}
            >
              <HeartIcon filled className="h-full w-full" />
            </span>
          ))}
        </span>
      ))}

      {vibes > 0 && (
        <span className="glass absolute -bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-tik">
          <HeartIcon filled className="h-3.5 w-3.5" /> {vibes} vibe{vibes > 1 ? "s" : ""} from you
        </span>
      )}

      <p className="mt-5 text-center text-[11px] font-semibold tracking-wide text-fog/70">
        Double-tap = vibes ❤️ <span className="hidden sm:inline">· mouse ghumao = 3D tilt</span>
      </p>
    </div>
  );
}