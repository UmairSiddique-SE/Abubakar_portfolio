import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TikTokLive from "./components/TikTokLive";
import Vibes from "./components/Vibes";
import About from "./components/About";
import Squad from "./components/Squad";
import FanCard from "./components/FanCard";
import FanQuests from "./components/FanQuests";
import { Collab, FanWall, Footer } from "./components/Community";
import MobileBottomBar from "./components/MobileBottomBar";
import InstallPwaBanner from "./components/InstallPwaBanner";
import { useRevealObserver } from "./hooks";
import { ArrowUp } from "./components/Icons";

type ToastItem = { id: number; msg: string };

function Toasts() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let counter = 0;
    const timers: number[] = [];
    const onToast = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      const id = ++counter;
      setItems((prev) => [...prev.slice(-2), { id, msg }]);
      timers.push(window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3000));
    };
    window.addEventListener("ma-toast", onToast);
    return () => {
      window.removeEventListener("ma-toast", onToast);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[120] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      {items.map((t) => (
        <div
          key={t.id}
          className="toast-in glass w-full rounded-2xl border-ice/30 px-5 py-3.5 text-center text-sm font-semibold text-cream shadow-[0_12px_44px_rgba(0,0,0,0.6)]"
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[90] grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full grad-brand text-ink shadow-[0_8px_32px_rgba(143,91,255,0.5)] transition-all duration-300 hover:-translate-y-1 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp />
    </button>
  );
}

/** Fixed aurora that slowly shifts hue as you travel through the sections. */
function Ambient() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (ref.current) ref.current.style.filter = `hue-rotate(${Math.round(p * 55)}deg)`;
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
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 will-change-[filter]" aria-hidden="true">
      <div className="absolute -top-40 left-1/4 h-[60vh] w-[60vh] rounded-full bg-grape/8 blur-[160px] animate-blob" />
      <div className="absolute -bottom-40 right-1/4 h-[55vh] w-[55vh] rounded-full bg-ice/7 blur-[160px] animate-blob-slow" />
    </div>
  );
}

export default function App() {
  const ready = true;
  useRevealObserver(ready);

  return (
    <div className="min-h-screen bg-ink font-body text-cream antialiased">
      <Ambient />
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <div className="relative z-10">
        <main>
          <Hero />
          <TikTokLive />
          <Vibes />
          <About />
          <Squad />
          <FanWall />
          <FanCard />
          <Collab />
        </main>
        <Footer />
      </div>
      <Toasts />
      <FanQuests />
      <BackToTop />
      <MobileBottomBar />
      <InstallPwaBanner />
    </div>
  );
}